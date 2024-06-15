import { Injectable } from "@nestjs/common";
import axios from "axios";
import { convertXML } from "simple-xml-to-json";
import VehicleTpeExternalResponse from "../dtos/VehicleTypeExternalResponse";

@Injectable()
export class VehicleTypesProxy {

    async getAll(): Promise<VehicleTpeExternalResponse[]> {
        const response = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/440?format=xml");
        return convertXML(response.data).Response.children[3]?.Results?.children
    }
}