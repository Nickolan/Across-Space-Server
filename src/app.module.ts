import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlanetsModule } from './planets/planets.module';
import { SatellitesModule } from './satellites/satellites.module';
import { AuthModule } from './auth/auth.module';
require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_NAME, DB_DEPLOY, DB_HOST} = process.env

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: DB_HOST,
    port: 3306,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }),
  UsersModule,
  PlanetsModule,
  SatellitesModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
