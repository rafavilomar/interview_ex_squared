import { Column, Entity, ObjectIdColumn } from 'typeorm';
import VehicleTypes from './vehicleTypes.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export default class Makes {
  @ObjectIdColumn()
  id?: string;

  @Field()
  @Column({ nullable: false, type: 'number' })
  makeId: number;

  @Field()
  @Column({ nullable: false, type: 'text' })
  makeName: string;

  @Field(() => [VehicleTypes])
  @Column()
  vehicleTypes: VehicleTypes[];
}
