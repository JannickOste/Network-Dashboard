import { inject, injectable } from "inversify";
import HostInformation from "../entity/hostInformation";
import { HostInformationDto, PortInformationDto } from "../dto/HostInformationDto";
import HostProbeService from "../service/HostProbeService";
import PortProbeService from "../service/PortProbeService";

@injectable()
export default class PortInformationResolver 
{
    public constructor(
        @inject(PortProbeService) private readonly portProbeService: PortProbeService
    ) {

    }
    public async resolve(
        info: HostInformation
    ): Promise<PortInformationDto[]>
    {
        return Promise.all(info.portList.map(async(port) => ({
            port: port,
            status: await this.portProbeService.isTCPOpen(info.ipAddress, port) ? "up" : "down"
        })))
    }
}