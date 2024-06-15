import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MakesService } from './makes.service';
import Makes from './entity/makes.entity';
import { MakesProxy } from './proxy/makes.proxy';
import { VehicleTypesProxy } from './proxy/vehicleTypes.proxy';
import MakesAdapter from './adapter/makes.adapter';

describe('AppService', () => {
  let makesService: MakesService;
  let makesRepository: Repository<Makes>;
  let makesProxy: MakesProxy;
  let vehicleTypesProxy: VehicleTypesProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MakesService,
        {
          provide: getRepositoryToken(Makes),
          useClass: Repository,
        },
        VehicleTypesProxy,
        MakesProxy,
      ],
    }).compile();

    makesService = module.get<MakesService>(MakesService);
    makesRepository = module.get<Repository<Makes>>(getRepositoryToken(Makes));
    makesProxy = module.get<MakesProxy>(MakesProxy);
    vehicleTypesProxy = module.get<VehicleTypesProxy>(VehicleTypesProxy);
  });

  it('should return makes from the database if available', async () => {
    const makesFromDb: Makes[] = [
      { makeId: 1, makeName: "name", vehicleTypes: [{ typeId: 1, typeName: "name" }] }];
    jest.spyOn(makesRepository, 'find').mockResolvedValueOnce(makesFromDb);

    const result = await makesService.getAllMakes();
    expect(result).toEqual(makesFromDb);
  });

  it('should fetch makes from external service if database is empty', async () => {
    const parsedMakes: Makes[] = [{ makeId: 1, makeName: 'name', vehicleTypes: [] }];

    jest.spyOn(makesRepository, 'find').mockResolvedValueOnce([]);
    jest.spyOn(makesProxy, 'getAll').mockResolvedValueOnce([{AllVehicleMakes: null}]);
    jest.spyOn(vehicleTypesProxy, 'getAll').mockResolvedValueOnce([]);
    jest.spyOn(makesRepository, 'save').mockResolvedValueOnce(parsedMakes as any);

    jest.spyOn(MakesAdapter, 'parse').mockImplementation(({}, []) => {
      return { makeId: 1, makeName: "name", vehicleTypes: [] };
    });

    const result = await makesService.getAllMakes();
    expect(result).toEqual(parsedMakes);
  });
});
