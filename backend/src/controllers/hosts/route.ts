import {
  controller,
  httpGet
} from "inversify-express-utils";
import { inject } from "inversify";
import NetworkInformationManager from "../../lib/lan-scanner/src/manager/networkInformationManager";

@controller("/hosts")
export class GetHostsController {
  constructor(
    @inject(NetworkInformationManager) private readonly networkInfoManager: NetworkInformationManager
  ) {}

  @httpGet("/")
  public async getHosts() {
    return await this.networkInfoManager.getAll()
  }

  
  @httpGet("/unkown")
  public async getUnkownHosts() {
    return await this.networkInfoManager.getUnkown()
  }
}
