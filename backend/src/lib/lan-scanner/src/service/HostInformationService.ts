import { inject, injectable } from "inversify";
import { HostInformationRepository } from "../repository/HostInformationRepository";
import HostInformation from "../entity/hostInformation";

@injectable()
export class HostInformationService {
    constructor(
        @inject(HostInformationRepository) private readonly hostRepository: HostInformationRepository
    ) {}

    async createHost(
        ipAddress: string,
        portList: number[]
    ): Promise<HostInformation> {
        return this.hostRepository.createHost(ipAddress, portList);
    }

    async getAllHosts(): Promise<HostInformation[]> {
        return this.hostRepository.getAllHosts();
    }

    async getHostById(
        id: number
    ): Promise<HostInformation | null> {
        return this.hostRepository.getHostById(id);
    }

    async getHostByIP(
        ipAddress: string
    ): Promise<HostInformation | null> {
        return this.hostRepository.getHostByIP(ipAddress);
    }

    async updateHost(
        id: number,
        update: Partial<HostInformation>
    ): Promise<HostInformation | null> {
        return this.hostRepository.updateHost(id, update);
    }

    async deleteHost(
        id: number
    ): Promise<boolean> {
        return this.hostRepository.deleteHost(id);
    }
}
