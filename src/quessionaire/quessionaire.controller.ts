import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuessionaireService } from './quessionaire.service';
import { CreateQuessionaireDto } from './dto/create-quessionaire.dto';
import { UpdateQuessionaireDto } from './dto/update-quessionaire.dto';

@Controller('quessionaire')
export class QuessionaireController {
  constructor(private readonly quessionaireService: QuessionaireService) {}

  @Post()
  create(@Body() createQuessionaireDto: CreateQuessionaireDto) {
    return this.quessionaireService.create(createQuessionaireDto);
  }

  @Get()
  findAll() {
    return this.quessionaireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quessionaireService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuessionaireDto: UpdateQuessionaireDto) {
    return this.quessionaireService.update(+id, updateQuessionaireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quessionaireService.remove(+id);
  }
}
