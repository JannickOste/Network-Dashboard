import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

export class App {
    private server!: Readonly<InversifyExpressServer>;
    private _app!: express.Application;
    public get app(): Readonly<express.Application>
    {
        if (!this._app) {
            throw new Error("Server not built. Call build() first.");
        }

        return this._app;
    }

    constructor(
        private readonly container: Readonly<Container>
    ) { }

    public build(

    ): this {
        this.server = new InversifyExpressServer(this.container);

        this.server.setConfig((app) => {
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
        });

        this._app = this.server.build();
        return this;
    }

    public listen(
        port: number = 3000
    ): void {
        this.app.listen(port, () => {
            console.log(`Server started on http://localhost:${port}`);
        });
    }
}