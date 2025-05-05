import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { sequencesService } from './sequence.service';
import { CreateSequenceDto } from './dto/create-sequence.dto';
import { UpdateSequenceDto } from './dto/update-sequence.dto';
import { Sequence } from './entities/sequence.entity';

@Controller('sequences')
export class sequencesController {
    constructor(private readonly sequencesService: sequencesService) {}

    @Post()
    create(@Body() createSequenceDto: CreateSequenceDto) {
        return this.sequencesService.create(createSequenceDto);
    }

    @Get()
    findAll(@Query('name') name?: string): Sequence[] {
      return this.sequencesService.findAll(name);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.sequencesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSequenceDto: UpdateSequenceDto) {
        return this.sequencesService.update(id, updateSequenceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.sequencesService.remove(id);
    }
}