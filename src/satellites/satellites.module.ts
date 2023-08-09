import { Module } from '@nestjs/common';
import { SatellitesController } from './satellites.controller';
import { SatellitesService } from './satellites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Satellite } from './satellite.entity';
import { PlanetsModule } from 'src/planets/planets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Satellite]), PlanetsModule],
  controllers: [SatellitesController],
  providers: [SatellitesService]
})
export class SatellitesModule {}
