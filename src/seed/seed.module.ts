import { Module } from '@nestjs/common';
//
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommonModule } from 'src/common/common.module';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  imports: [PokemonModule, CommonModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
