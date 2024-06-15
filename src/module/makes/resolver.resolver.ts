import { MakesService } from './makes.service';
import { Query, Resolver } from '@nestjs/graphql';
import Makes from './entity/makes.entity';

@Resolver(() => [Makes])
export class MakesResolver {
  constructor(private readonly makesService: MakesService) {}

  @Query(() => [Makes])
  async getAllMakes(): Promise<Makes[]> {
    return await this.makesService.getAllMakes();
  }
}
