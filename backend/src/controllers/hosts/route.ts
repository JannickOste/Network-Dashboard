import {
  controller,
  httpGet
} from "inversify-express-utils";
import { inject } from "inversify";

@controller("/hosts")
export class GetHostsController {
  constructor(
  ) {}

  @httpGet("/")
  public getHosts() {
    return [];
  }
}
