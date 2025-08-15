import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { SearchSpecialistsDto } from './dto/search-specialists.dto';

@Controller('specialists')
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  // GET /specialists?orderBy=newest&skip=0&take=50&query=...&provinceId=...
  @Get()
  async search(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: SearchSpecialistsDto,
  ) {
    return this.specialistService.searchSpecialists(query);
  }
}
