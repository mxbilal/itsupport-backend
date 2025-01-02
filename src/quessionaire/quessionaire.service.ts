import { Injectable } from '@nestjs/common';
import { CreateQuessionaireDto } from './dto/create-quessionaire.dto';
import { UpdateQuessionaireDto } from './dto/update-quessionaire.dto';

@Injectable()
export class QuessionaireService {
  create(createQuessionaireDto: CreateQuessionaireDto) {
    return 'This action adds a new quessionaire';
  }

  findAll() {
    return `This action returns all quessionaire`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quessionaire`;
  }

  update(id: number, updateQuessionaireDto: UpdateQuessionaireDto) {
    return `This action updates a #${id} quessionaire`;
  }

  remove(id: number) {
    return `This action removes a #${id} quessionaire`;
  }
}
