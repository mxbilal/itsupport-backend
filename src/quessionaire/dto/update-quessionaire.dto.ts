import { PartialType } from '@nestjs/mapped-types';
import { CreateQuessionaireDto } from './create-quessionaire.dto';

export class UpdateQuessionaireDto extends PartialType(CreateQuessionaireDto) {}
