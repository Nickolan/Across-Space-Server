import { Module } from '@nestjs/common';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './planet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  controllers: [PlanetsController],
  providers: [PlanetsService],
  exports: [PlanetsService]
})
export class PlanetsModule {}
