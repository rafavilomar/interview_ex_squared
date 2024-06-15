export default interface MakeExternalResponse {
  AllVehicleMakes: {
    children: [
      { Make_ID: { content: number } },
      { Make_Name: { content: string } },
    ];
  };
}
