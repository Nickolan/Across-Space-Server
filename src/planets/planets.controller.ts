import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { Planet } from './planet.entity';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
@Controller('planets')
export class PlanetsController {
    constructor(private planetService: PlanetsService){}

    @Get()
    getAll(): Promise<Planet[]>{
        return this.planetService.getPlanets();
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number){
        return this.planetService.getOnePlanetById(id)
    }

    @Get('/name/:planetName')
    getOnebyName(@Param('planetName') planetName: string){
        return this.planetService.getOnePlanet(planetName)
    }

    @Post()
    createPlanet(@Body() newPlanet: CreatePlanetDto){
        return this.planetService.createPlanet(newPlanet);
    }

    @Patch(':id')
    updatePlanet(@Body() newPlanet: UpdatePlanetDto, @Param('id', ParseIntPipe) id: number){
        return this.planetService.updatePlanet(id, newPlanet);
    }

    @Delete(':id')
    eliminatePlanet(@Param('id', ParseIntPipe) id: number){
        return this.planetService.deletePlanet(id);
    }

}
