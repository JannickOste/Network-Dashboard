import ping from "ping";
import { injectable } from 'inversify';
import { HostInformationDto, PortInformationDto } from "../dto/HostInformationDto";

const TIMEOUT_MS = 1000;


@injectable()
export default class HostProbeService {
    private async isIPActive(
        ipAddress: string
    ): Promise<boolean> {
        const res = await ping.promise.probe(ipAddress, {
            timeout: TIMEOUT_MS / 1000
        });
        return res.alive;
    }

    public async getHost(
        ipAddress: string
    ): Promise<HostInformationDto> {
        return {
            ipAddress: ipAddress,
            status: await this.isIPActive(ipAddress) ? "up" : "down",
        }
    }
}
