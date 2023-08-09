import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Planet } from './planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
@Injectable()
export class PlanetsService {
    constructor(@InjectRepository(Planet) private planetService: Repository<Planet>){}

    getPlanets(){
        const planets = this.planetService.find({
            relations: ['satellite']
        })
        return planets;
    }

    getOnePlanet(id: number){
        const planet = this.planetService.findOne({
            where: {
                id
            },
            relations: ['satellite']
        })
        if (!planet) {
            return new HttpException('Planet not found', HttpStatus.NOT_FOUND)
        }

        return planet;
    }

    async createPlanet(planet: CreatePlanetDto){
        const planetFound = await this.planetService.findOne({
            where: {
                name: planet.name
            }
        })

        if (planetFound) {
            return new HttpException('Planet already exists', HttpStatus.CONFLICT)
        }

        const newPlanet = this.planetService.create(planet);
        return this.planetService.save(newPlanet);
    }

    async deletePlanet(id: number) {
        const response = await this.planetService.delete({id});
        if (response.affected === 0) {
            return new HttpException('That planet does not exist', HttpStatus.NOT_FOUND);
        }

        return response

    }

    async updatePlanet(id: number, newPlanet:UpdatePlanetDto){
        const planetFound = await this.planetService.findOne({
            where: {
                id
            }
        })

        if (!planetFound) {
            return new HttpException('That planet does not exist', HttpStatus.NOT_FOUND)
        }

        const modifiedPlanet = Object.assign(planetFound, newPlanet);

        return this.planetService.save(modifiedPlanet);
    }
}
