import "reflect-metadata";
import { Container, inject, injectable } from "inversify";
import { HttpServer } from "./lib/http-server";
import { DataSource } from "typeorm";
import { getContainer } from "./lib/container";

@injectable()
export class App {
    public static get AppRoot(): string 
    {
        return __dirname;
    }

    constructor(
        @inject(HttpServer) private server: Readonly<HttpServer>,
        @inject(DataSource) private dataSource: Readonly<DataSource>,
    ) {
     }

     private async setup() 
     {
        if(!this.dataSource.isInitialized) 
        {
            await this.dataSource.initialize();
        }

        this.server = await this.server.build();
     }

    public async start(
        port: number = 3000
    ): Promise<void> {
        await this.setup();
        this.server.listen(port);
    }
}