import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SpecialistModule } from './specialist/specialist.module';
// import { ClientModule } from './admin/client/client.module';

@Module({
  imports: [PrismaModule, SpecialistModule],
  // imports: [PrismaModule, SpecialistModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
