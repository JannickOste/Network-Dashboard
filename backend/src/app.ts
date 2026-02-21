import "reflect-metadata";
import { Container } from "inversify";
import { HttpServer } from "./lib/http-server/server";

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
        this.server = await this.server.build();
     }

    public async start(
        port: number = 3000
    ): Promise<void> {
        await this.setup();
        this.server.listen(port);
    }
}