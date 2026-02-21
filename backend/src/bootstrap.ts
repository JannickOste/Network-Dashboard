import { InversifyExpressServer } from "inversify-express-utils";
import "reflect-metadata";
import { getContainer } from "./lib/container/container";
import { App } from "./app";

(async() => {
    const container = getContainer()
    const server = new App(container);

    const app = server.build();

    app.listen(3000);
})()
