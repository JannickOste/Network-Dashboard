import {
  controller,
  httpGet
} from "inversify-express-utils";
import { inject } from "inversify";
import NetworkInformationManager from "../../../lib/lan-scanner/src/manager/networkInformationManager";

@controller("/hosts/unkown")
export class UnkownHostsController {
  constructor(
    @inject(NetworkInformationManager) private readonly networkInfoManager: NetworkInformationManager
  ) {}

  
  @httpGet("/")
  public async getUnkownHosts() {
    return await this.networkInfoManager.getUnkown()
  }
}
