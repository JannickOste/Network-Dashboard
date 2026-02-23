import { inject } from "inversify";
import { HostInformationDto } from "../dto/HostInformationDto";
import HostInformationResolver from "../resolver/HostInformationResolver";
import { HostInformationService } from "../service/HostInformationService";
import HostInformation from "../entity/hostInformation";
import NetworkProbeService from "../service/NetworkProbeService";

export default class NetworkInformationManager 
{
    public constructor(
        @inject(HostInformationResolver) private readonly hostInfoResolver: HostInformationResolver,
        @inject(HostInformationService) private readonly hostInfoService: HostInformationService,
        @inject(NetworkProbeService) private readonly networkProbeService: NetworkProbeService,
    ) { 

    }

    public async getUnkown(): Promise<Array<HostInformationDto>>
    {
        const out: HostInformationDto[] = [];

        const blacklist = (await this.hostInfoService.getAllHosts())
                        .map(v => v.ipAddress)

        //TODO: change in future using configuration 
        const items =  (await this.networkProbeService.getHosts("192.168.10.0/24"))
                        .filter(v => v.status === "up" && !blacklist.includes(v.ipAddress))
       
        return items;
    }

    public async getAll(): Promise<Array<HostInformationDto>> 
    {
        const savedHosts = await this.hostInfoService.getAllHosts();
        
        return Promise.all(
            savedHosts.map(async(host) => this.hostInfoResolver.resolve(host))
        );
    }

    public async getByIP(ipAddress: string): Promise<HostInformationDto | null>
    {
        const host = await this.hostInfoService.getHostByIP(ipAddress);
        if(host)
        {
            return this.hostInfoResolver.resolve(
                host
            )
        }

        return host;
    }

    public async getById(
        id: number 
    ): Promise<HostInformationDto | null>
    {
        const host = await this.hostInfoService.getHostById(id)
        if(host)
        {
            return this.hostInfoResolver.resolve(
                host
            )
        }

        return host;
    }

    public async addHost(
        ipAddress: string, 
        ports: number[] = []
    ): Promise<HostInformationDto | null>
    {
        if(await this.hostInfoService.getHostByIP(ipAddress))
        {
            throw new Error(`Host for ipAddress (${ipAddress}) already exists.`);
        }

        const hostInfoDB = await this.hostInfoService.createHost(ipAddress, ports);
        return this.hostInfoResolver.resolve(
            hostInfoDB
        )
    }

    public async updateById(
        id: number, 
        newInfo: Partial<HostInformation>
    ) {
        let hostInfo: HostInformation | null = null
        return (hostInfo = await this.hostInfoService.updateHost(id, newInfo)) 
                ? this.hostInfoResolver.resolve(hostInfo)
                : null;
    }

    public async removeHostById(
        id: number
    ): Promise<boolean>
    {
        const hostInfo = await this.hostInfoService.getHostById(id)
        if(!hostInfo)
        {
            throw new Error(`Host with id (${id}) not found`) 
        }

        return this.hostInfoService.deleteHost(id)
    }
}