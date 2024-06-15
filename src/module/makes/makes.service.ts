import { Injectable } from '@nestjs/common';
import { MakesProxy } from './proxy/makes.proxy';
import VehicleTypesAdapter from './adapter/vehicleTypes.adapter';
import { VehicleTypesProxy } from './proxy/vehicleTypes.proxy';
import MakesAdapter from './adapter/makes.adapter';
import { InjectRepository } from '@nestjs/typeorm';
import Makes from './entity/makes.entity';
import { Repository } from 'typeorm';
import VehicleTypes from './entity/vehicleTypes.entity';

@Injectable()
export class MakesService {
  constructor(
    @InjectRepository(Makes)
    private makesRepository: Repository<Makes>,
    private readonly makesProxy: MakesProxy,
    private readonly vehicleTypesProxy: VehicleTypesProxy) {}

  /**
   * Get all makes from database or NHTSA's API
   * @returns 
   */
  async getAllMakes(): Promise<Makes[]> {

    let response: Makes[] = await this.makesRepository.find();

    if (response.length === 0) {
      response = await this.getMakesFromExternalService();
    }

    return response;
  }

  /**
   * Get all makes from the NHTSA's API.
   * The response from this service will be save it into the database, so next requests won't have to use the NHTSA's API
   */
  private async getMakesFromExternalService(): Promise<Makes[]> {
    const makes: Makes[] = [];

    const [vehicleTypes, makesToParse]: [VehicleTypes[], any[]] = await Promise.all([
      this.getVehicleTypesFromExternalService(),
      this.makesProxy.getAll()
    ]);

    makesToParse.forEach(make => {
      makes.push(MakesAdapter.parse(make, vehicleTypes))
    })

    this.makesRepository.save(makes);

    return makes;
  }

  /**
   * Get all makes from the NHTSA's API.
   */
  private async getVehicleTypesFromExternalService() {
    const vehicleTypes: VehicleTypes[] = [];
    (await this.vehicleTypesProxy.getAll()).forEach(type => {
      vehicleTypes.push(VehicleTypesAdapter.parse(type));
    });

    return vehicleTypes;
  }
}
