import MakeExternalResponse from 'src/module/makes/dtos/MakeExternalResponse';
import MakesAdapter from './makes.adapter';
import Makes from 'src/module/makes/entity/makes.entity';

describe('Parse external make response', () => {
  it('Parse to database entity', () => {
    const makeExternal: MakeExternalResponse = {
      AllVehicleMakes: {
        children: [
          { Make_ID: { content: 1 } },
          { Make_Name: { content: 'name' } },
        ],
      },
    };
    const makeParsed: Makes = {
      makeId: 1,
      makeName: 'name',
      vehicleTypes: [],
    };
    expect(MakesAdapter.parse(makeExternal, [])).toEqual(makeParsed);
  });
});
