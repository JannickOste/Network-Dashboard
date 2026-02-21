import * as net from "net";
import * as dgram from "dgram";
import { injectable } from "inversify";

export type TCPPortScanOptions = {
    timeout: number;
}

export type UDPPortScanOptions = { 
    pingPacket: Buffer;
    timeout: number;
}

@injectable()
export default class PortProbeService {
    private tcpDefaultOptions: TCPPortScanOptions = { timeout: 1000 };
    private udpDefaultOptions: UDPPortScanOptions = { pingPacket: Buffer.from("ping"), timeout: 1000 };

    public async isTCPOpen(
        ipAddress: string,
        port: number,
        options?: Partial<TCPPortScanOptions>
    ): Promise<boolean> {
        const { timeout } = { ...this.tcpDefaultOptions, ...(options ?? {}) };

        return new Promise((resolve) => {
            const socket = new net.Socket();
            let done = false;
            socket.setTimeout(timeout);

            socket.on("connect", () => {
                done = true;
                socket.destroy();
                resolve(true);
            });

            socket.on("timeout", () => {
                if (!done) {
                    done = true;
                    socket.destroy();
                    resolve(false);
                }
            });

            socket.on("error", () => {
                if (!done) {
                    done = true;
                    socket.destroy();
                    resolve(false);
                }
            });

            socket.connect(port, ipAddress);
        });
    }

    public async isUDPOpen(
        ipAddress: string,
        port: number,
        options?: Partial<UDPPortScanOptions>
    ): Promise<boolean> {
        const { timeout, pingPacket } = { ...this.udpDefaultOptions, ...(options ?? {}) };

        return new Promise((resolve) => {
            const udpProtocol = net.isIPv6(ipAddress) ? "udp6" : "udp4";
            const client = dgram.createSocket(udpProtocol);
            let done = false;

            const timer = setTimeout(() => {
                if (!done) {
                    done = true;
                    client.close();
                    resolve(true);
                }
            }, timeout);

            client.send(pingPacket, port, ipAddress, (err) => {
                if (err) {
                    done = true;
                    clearTimeout(timer);
                    client.close();
                    resolve(false);
                }
            });

            client.on("error", () => {
                if (!done) {
                    done = true;
                    clearTimeout(timer);
                    client.close();
                    resolve(false);
                }
            });
        });
    }
}