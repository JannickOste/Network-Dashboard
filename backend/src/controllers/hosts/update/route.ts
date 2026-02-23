import {
    controller,
    httpPut,
    requestBody,
    requestParam
} from "inversify-express-utils";
import { inject } from "inversify";
import NetworkInformationManager from "../../../lib/lan-scanner/src/manager/networkInformationManager";
import HostInformation from "../../../lib/lan-scanner/src/entity/hostInformation";

type UpdateHostRequest = {
    ports: number[]
};

@controller("/hosts/update")
export class UpdateHostController {
    constructor(
        @inject(NetworkInformationManager)
        private readonly networkInfoManager: NetworkInformationManager
    ) {}

    @httpPut("/:id")
    public async update(
        @requestParam("id") id: string,
        @requestBody() body: UpdateHostRequest
    ) {
        const numericId = Number(id);

        if (Number.isNaN(numericId)) {
            return { message: "Invalid id" };
        }

        const { ports } = body;

        const updatedItem = await this.networkInfoManager.updateById(
            numericId,
            {
                portList: ports
            }
        );

        if (!updatedItem) {
            return { message: "failed to update item" };
        }

        return updatedItem;
    }
}