import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlanetsModule } from './planets/planets.module';
import { SatellitesModule } from './satellites/satellites.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'mysqlnikolan',
    database: 'spacezdb',
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
