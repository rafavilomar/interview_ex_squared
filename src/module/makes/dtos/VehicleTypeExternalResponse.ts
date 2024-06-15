export default interface VehicleTpeExternalResponse {
  VehicleTypesForMakeIds: {
    children: [
      { VehicleTypeId: { content: number } },
      { VehicleTypeName: { content: string } },
    ];
  };
}
