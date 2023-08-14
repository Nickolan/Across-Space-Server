import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SatellitesService } from './satellites.service';
import { Satellite } from './satellite.entity';
import { CreateSatelliteDto } from './dto/create-satellite.dto';
import { UpdateSatelliteDto } from './dto/update-satelite.dto';

@Controller('satellites')
export class SatellitesController {
    constructor(private satelliteService: SatellitesService){}

    @Get()
    getAllSatellites(): Promise<Satellite[]>{
        return this.satelliteService.getAll();
    }

    @Get(':satelliteName')
    getOneSatellite(@Param('satelliteName') satelliteName: string){
        return this.satelliteService.getOne(satelliteName);
    }

    @Post()
    createSatellite(@Body() newSatellite: CreateSatelliteDto){
        return this.satelliteService.createOne(newSatellite);
    }

    @Delete(':id')
    deleteSatellite(@Param('id', ParseIntPipe) id: number){
        return this.satelliteService.deleteOne(id);
    }

    @Patch(':id')
    modifySatellite(@Param('id', ParseIntPipe) id: number, @Body() newSatellite: UpdateSatelliteDto){
        return this.satelliteService.updateOne(id, newSatellite);
    }
}
