import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SpecialistModule } from './specialist/specialist.module';

@Module({
  imports: [PrismaModule, SpecialistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
