import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = {
  synchronize: false,
  migrations: ['src/migrations/*.js'],
} as DataSourceOptions;

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'], // for e2e we need TS files
      migrationsRun: true,
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL, // heroku env variable to connect to posgres
      migrationsRun: true,
      entities: ['**/*.entity.js'], // in production, we are running js
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('unknown environment');
}

// module.exports = dbConfig;

export const dataSourceOptions: DataSourceOptions = dbConfig;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
