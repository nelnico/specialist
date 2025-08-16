import { Controller, Get, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { ListClientsQueryDto } from './dto/list-clients.query.dto';
import { ClientListItem, PaginatedResult } from '@repo/types';

@Controller('admin/client')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Get()
  list(
    @Query() query: ListClientsQueryDto,
  ): Promise<PaginatedResult<ClientListItem>> {
    return this.service.listClients(query);
  }
}
