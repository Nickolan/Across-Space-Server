import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Satellite } from './satellite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSatelliteDto } from './dto/create-satellite.dto';
import { UpdateSatelliteDto } from './dto/update-satelite.dto';
import { PlanetsService } from 'src/planets/planets.service';
@Injectable()
export class SatellitesService {
    constructor(
        private plantesService: PlanetsService,
        @InjectRepository(Satellite) private satelliteService:Repository<Satellite>){}

    getAll(){
        return this.satelliteService.find();
    }

    async getOne(satelliteName:string){
        const satellite = await this.satelliteService.findOne({
            where: {
                name: satelliteName
            }
        });
        if (!satellite) {
            return new HttpException('Satellite not found', HttpStatus.NOT_FOUND)
        }

        return satellite;
    }

    async createOne(newSatellite: CreateSatelliteDto){

        const planetFound = await this.plantesService.getOnePlanet(newSatellite.planetId)

        if (!planetFound) return new HttpException('Planet not found', HttpStatus.NOT_FOUND)

        const satelliteCreated = this.satelliteService.create(newSatellite)
        return this.satelliteService.save(satelliteCreated)
    }

    async deleteOne(id: number){
        const response = await this.satelliteService.delete({id});
        if (response.affected === 0) {
            return new HttpException('Satellite not found', HttpStatus.NOT_FOUND)
        }
        return response.affected;


    }

    async updateOne(id: number, newSatellite: UpdateSatelliteDto){
        const satellite = this.satelliteService.findOne({
            where: {
                id
            }
        });
        if (!satellite) {
            return new HttpException('Satellite not found', HttpStatus.NOT_FOUND)
        }

        const replace = Object.assign(satellite, newSatellite)

        return this.satelliteService.save(replace)


    }
}
