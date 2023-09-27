import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
//
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './config/env.config';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    // read .env variables
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    // serve a static resource
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // connection mongodb
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'pokemondb',
    }),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {
  // constructor() {console.log(process.env);}
}
