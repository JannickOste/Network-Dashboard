import { inject, injectable } from "inversify";
import HostInformation from "../entity/hostInformation";
import { HostInformationDto } from "../dto/HostInformationDto";
import HostProbeService from "../service/HostProbeService";
import PortInformationResolver from "./PortInformationResolver";

@injectable()
export default class HostInformationResolver 
{
    public constructor(
        @inject(HostProbeService) private readonly hostProbeService: HostProbeService,
        @inject(PortInformationResolver) private readonly portResolver: PortInformationResolver
    ) {

    }
    public async resolve(
        info: HostInformation
    ): Promise<HostInformationDto>
    {
        let hostInfo = {
            id: info.id,
            ... (await this.hostProbeService.getHost(info.ipAddress))
        }
        if(hostInfo.status === "up")
        {
            const upInfo: Partial<HostInformationDto> = {
                portList: await this.portResolver.resolve(info)
            }

            return {
                ...hostInfo, 
                ... upInfo
            }
        }
        
        return hostInfo;

    }
}