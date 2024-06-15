import VehicleTpeExternalResponse from '../dtos/VehicleTypeExternalResponse';
import VehicleTypes from '../entity/vehicleTypes.entity';

export default class VehicleTypesAdapter {
  static parse(vehicleType: VehicleTpeExternalResponse): VehicleTypes {
    return {
      typeId:
        vehicleType.VehicleTypesForMakeIds.children[0].VehicleTypeId.content,
      typeName:
        vehicleType.VehicleTypesForMakeIds.children[1].VehicleTypeName.content,
    };
  }
}
