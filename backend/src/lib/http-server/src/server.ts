import "reflect-metadata";
import express from "express";
import { Container, injectable } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import loadControllers from "./load-controllers";
import { getContainer } from "../../container";

@injectable()
export class HttpServer {
    private server!: Readonly<InversifyExpressServer>;
    private _app!: express.Application;
    public get app(): Readonly<express.Application>
    {
        if (!this._app) {
            throw new Error("Server not built. Call build() first.");
        }

        return this._app;
    }

    public async build(

    ): Promise<this> {
        this.server = new InversifyExpressServer(getContainer());

        this.server.setConfig((app) => {
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
        });

        await loadControllers()

        this._app = this.server.build();
        return this;
    }

    public listen(
        port: number = 3000
    ): void {
        this.app.listen(port, "0.0.0.0", () => {
            console.log(`Server started on http://localhost:${port}`);
        });
    }
}