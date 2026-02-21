import { DataSource, Repository } from "typeorm";
import { inject, injectable } from "inversify";
import HostInformation from "../entity/hostInformation";

@injectable()
export class HostInformationRepository {
    private readonly repo: Readonly<Repository<HostInformation>>
    constructor(
        @inject(DataSource) dataSource: DataSource
    ) {
        this.repo = dataSource.getRepository(HostInformation)
    }

    async createHost(
        ipAddress: string, 
        portList: number[]
    ): Promise<HostInformation> {
        const host = this.repo.create({ ipAddress, portList });
        return this.repo.save(host);
    }

    async getAllHosts(

    ): Promise<HostInformation[]> {
        return this.repo.find();
    }

    async getHostById(
        id: number
    ): Promise<HostInformation | null> {
        return this.repo.findOneBy({ id });
    }

    async getHostByIP(
        ipAddress: string
    ): Promise<HostInformation | null> {
        return this.repo.findOneBy({ ipAddress });
    }

    async updateHost(
        id: number, 
        update: Partial<HostInformation>
    ): Promise<HostInformation | null> {
        const host = await this.getHostById(id);
        if (!host) return null;

        Object.assign(host, update);
        return this.repo.save(host);
    }

    async deleteHost(
        id: number
    ): Promise<boolean> {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
