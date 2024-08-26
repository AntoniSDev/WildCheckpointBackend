import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";
import { AppDataSource } from "../db";

@Resolver()
export class CountryResolver {
  private countryRepository = AppDataSource.getRepository(Country);

  @Query(() => [Country])
  async getCountries(): Promise<Country[]> {
    return await this.countryRepository.find();
  }

  @Query(() => Country, { nullable: true })
  async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    return await this.countryRepository.findOneBy({ code });
  }

  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continent") continent: string
  ): Promise<Country> {
    const country = this.countryRepository.create({
      code,
      name,
      emoji,
      continent,
    });
    return await this.countryRepository.save(country);
  }

  @Query(() => [Country])
  async getCountriesByContinent(
    @Arg("continent") continent: string
  ): Promise<Country[]> {
    return await this.countryRepository.findBy({ continent });
  }
}
