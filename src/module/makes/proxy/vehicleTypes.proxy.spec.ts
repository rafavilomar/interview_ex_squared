import { VehicleTypesProxy } from './vehicleTypes.proxy';

describe('Vehicle Types Proxy', () => {
  let vehicleTypes: VehicleTypesProxy;

  beforeEach(() => {
    vehicleTypes = new VehicleTypesProxy();
  });

  it('Get all vehicle types', async () => {
    const response = await vehicleTypes.getAll();
    expect(response.length).toBeGreaterThan(0);
  });
});
