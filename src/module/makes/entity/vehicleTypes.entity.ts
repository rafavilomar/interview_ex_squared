import { Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType()
export default class VehicleTypes {
  @Field()
  @Column({ nullable: false, type: 'text' })
  typeId: number;

  @Field()
  @Column({ nullable: false, type: 'text' })
  typeName: string;
}
