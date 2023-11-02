import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {

  constructor(@Inject('RABBIT_SERVICE') private client: ClientProxy) {}

  async create(createItemDto: CreateItemDto, uuid: string) {
    this.client.emit('event', {
        name: createItemDto.name,
        priority: createItemDto.priority,
        uuid: uuid
    })
  }
}