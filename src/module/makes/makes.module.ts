import { Module } from '@nestjs/common';
import { MakesService } from './makes.service';
import { MakesProxy } from './proxy/makes.proxy';
import { VehicleTypesProxy } from './proxy/vehicleTypes.proxy';
import { MakesResolver } from './resolver.resolver';
import VehicleTypes from './entity/vehicleTypes.entity';
import Makes from './entity/makes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Makes, VehicleTypes])],
  providers: [MakesService, MakesProxy, VehicleTypesProxy, MakesResolver],
})
export class MakesModule {}
