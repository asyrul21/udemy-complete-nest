import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { dataSourceOptions } from '../ormconfig';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
// import { TypeOrmConfigService } from './config/typeorm.config';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    // TypeOrmModule.forRootAsync({
    //   // for dev and e2e test
    //   useClass: TypeOrmConfigService,
    // }),
    /**
     * Injecting environment variable to TypeORM.
     * This helps to use seperate databases for development and (e2e/integration) testing
     */
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'),
    //       entities: [User, Report],
    //       synchronize: true,
    //     };
    //   },
    // }),
  ],
  //   TypeOrmModule.forRoot({
  //     type: 'sqlite',
  //     database: 'db.sqlite',
  //     entities: [User, Report],
  //     synchronize: true,
  //   }),
  // ],
  controllers: [AppController],
  providers: [
    AppService,
    /*
     * Configuring Validation Pipe in App Module
     */
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          // keys: ['whatever'],
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
