import VehicleTypesAdapter from './vehicleTypes.adapter';
import VehicleTpeExternalResponse from '../dtos/VehicleTypeExternalResponse';
import VehicleTypes from '../entity/vehicleTypes.entity';

describe('Parse external vehicle type response', () => {
  it('Parse to database entity', () => {
    const vehicleTypeExternal: VehicleTpeExternalResponse = {
      VehicleTypesForMakeIds: {
        children: [
          { VehicleTypeId: { content: 1 } },
          { VehicleTypeName: { content: 'name' } },
        ],
      },
    };
    const vehicleTypeParsed: VehicleTypes = {
      typeId: 1,
      typeName: 'name',
    };
    expect(VehicleTypesAdapter.parse(vehicleTypeExternal)).toEqual(
      vehicleTypeParsed,
    );
  });
});
