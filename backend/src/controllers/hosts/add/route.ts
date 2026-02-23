import {
  controller,
  httpGet,
  httpPost,
  requestBody
} from "inversify-express-utils";
import { inject } from "inversify";
import NetworkInformationManager from "../../../lib/lan-scanner/src/manager/networkInformationManager";
import path from "path"
import HostInformation from "../../../lib/lan-scanner/src/entity/hostInformation";

type AddHostRequest = {
  ipAddress: string; 
  ports: number[]
}

@controller("/hosts/add")
export class AddHostController {
  constructor(
    @inject(NetworkInformationManager) private readonly networkInfoManager: NetworkInformationManager
  ) {}

  @httpPost("/")
    public async create(
        @requestBody() body: AddHostRequest
    ) {
        const { ipAddress, ports } = body;

        const newItem = await this.networkInfoManager.addHost(ipAddress, ports);
        if(newItem) {
          return newItem
        }
        
          return {message: "failed to add item"}
    }
}
