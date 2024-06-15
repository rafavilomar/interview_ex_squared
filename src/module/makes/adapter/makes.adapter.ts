import MakeExternalResponse from '../dtos/MakeExternalResponse';
import Makes from '../entity/makes.entity';
import VehicleTypes from '../entity/vehicleTypes.entity';

export default class MakesAdapter {
  static parse(
    make: MakeExternalResponse,
    vehicleTypes: VehicleTypes[],
  ): Makes {
    return {
      makeId: make.AllVehicleMakes.children[0].Make_ID.content,
      makeName: make.AllVehicleMakes.children[1].Make_Name.content,
      vehicleTypes,
    };
  }
}
