import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true, // ne pas utiliser en production
  entities: [__dirname + "/entities/*.ts"],
  logging: true,
});
