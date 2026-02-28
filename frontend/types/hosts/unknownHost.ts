import PortInformation from "./ports";

type UnknownHostInformation = {
    ipAddress: string,
    status: "up" | "down",
    portList: PortInformation[]
}

export default UnknownHostInformation;