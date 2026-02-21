import "reflect-metadata";
import { Container } from "inversify";
import { HttpServer } from "./lib/http-server/server";
import dataSource from "./lib/database/data-source";

export class App {
    private server!: Readonly<HttpServer>;

    public static get AppRoot(): string 
    {
        return __dirname;
    }

    constructor(
        container: Readonly<Container>
    ) {
        this.server = new HttpServer(container)
     }

     private async setup() 
     {
        if(!dataSource.isInitialized) 
        {
            await dataSource.initialize();
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