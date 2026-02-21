import HostInformation from "../entity/hostInformation";

export type PortInformationDto = {
    port: number; 
    status: "up" | "down"
}

export type HostInformationDto = Omit<HostInformation, "id" | "portList"> & {
    id?: number; 
    ipAddress: string,
    portList?: PortInformationDto[],
    status: "up" | "down"
};
