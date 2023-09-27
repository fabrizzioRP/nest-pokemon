import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-responde.interface';

@Injectable()
export class SeedService {
  constructor(
    // Inyectamos el modelo para usar la bd.
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    // Inyectamos nuestro Adapter.
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany(); // delete * from pokemons;

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=650';
    const data = await this.http.get<PokeResponse>(url);

    const pokemonsToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[6];
      name = name.toLocaleLowerCase();

      pokemonsToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);

    return 'Seed Executed';
  }
}
