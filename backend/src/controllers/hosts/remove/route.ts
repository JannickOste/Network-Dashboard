import {
    controller,
    httpDelete,
    httpGet,
    requestParam
} from "inversify-express-utils";
import { inject } from "inversify";
import NetworkInformationManager from "../../../lib/lan-scanner/src/manager/networkInformationManager";

@controller("/hosts/remove")
export class RemoveHostController {
    constructor(
        @inject(NetworkInformationManager) private readonly networkInfoManager: NetworkInformationManager
    ) { }

    @httpDelete("/:id")
    public async removeHost(
        @requestParam("id") id: string,
    ) {
        const numericId = Number(id);

        if (Number.isNaN(numericId)) {
            return { message: "Invalid id" };
        }

        return await this.networkInfoManager.removeHostById(numericId)
    }
}
