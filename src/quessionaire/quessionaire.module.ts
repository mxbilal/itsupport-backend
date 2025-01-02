import { Module } from '@nestjs/common';
import { QuessionaireService } from './quessionaire.service';
import { QuessionaireController } from './quessionaire.controller';

@Module({
  controllers: [QuessionaireController],
  providers: [QuessionaireService],
})
export class QuessionaireModule {}
