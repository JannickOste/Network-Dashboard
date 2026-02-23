import { inject, injectable } from "inversify";
import HostInformationResolver from "../resolver/HostInformationResolver";
import HostInformation from "../entity/hostInformation";
import { HostInformationDto } from "../dto/HostInformationDto";

@injectable()
export default class NetworkProbeService 
{ 
    public constructor(
        @inject(HostInformationResolver) private readonly hostInfoResolver: HostInformationResolver
    ) {

    }
    
    private ipv4ToInt(ip: string): number {
        return ip.split(".")
                .reduce(
                    (acc, octet) => (acc << 8) + parseInt(octet, 10), 0
                ) >>> 0;
    }

    private intToIpv4(int: number): string {
        return [
        (int >>> 24) & 255,
        (int >>> 16) & 255,
        (int >>> 8) & 255,
        int & 255,
        ].join(".");
    }

    private getIPRange(cidr: string): string[] {
        const [ip, prefixStr] = cidr.split("/");
        const prefix = parseInt(prefixStr, 10);
        const ipInt = this.ipv4ToInt(ip);
        const hostBits = 32 - prefix;
        const totalIps = 2 ** hostBits;
        const networkMask = (0xffffffff << hostBits) >>> 0;
        const network = ipInt & networkMask;
        const broadcast = network + totalIps - 1;
        const hosts: string[] = [];

        if (prefix === 32) return [this.intToIpv4(network)];
        if (prefix === 31) return [this.intToIpv4(network), this.intToIpv4(network + 1)];

        for (let i = network + 1; i < broadcast; i++) hosts.push(this.intToIpv4(i));
        return hosts;
    }

    public async getHosts(cidr: string): Promise<Array<HostInformationDto>>
    {
        const ipSet = this.getIPRange(cidr)

        return Promise.all(
            ipSet.map(async(ipAddr) => {
                const hostInfo = new HostInformation();
                hostInfo.ipAddress = ipAddr; 

                return this.hostInfoResolver.resolve(hostInfo)
            })
        )
    }
}