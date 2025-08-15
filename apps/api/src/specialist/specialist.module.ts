import { Module } from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { SpecialistController } from './specialist.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SpecialistController],
  providers: [SpecialistService, PrismaService],
  exports: [SpecialistService],
})
export class SpecialistModule {}
