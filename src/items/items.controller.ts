import { Body, Controller, Post } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { ItemsService } from "./items.service";
import { v1 as uuidv1 } from 'uuid';
import { io } from "socket.io-client";


@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService: ItemsService) {}

    @Post()
    create(@Body() createItemDto: CreateItemDto): void {
        this.itemsService.create(createItemDto, uuidv1())
        this.socket(createItemDto.name)
        console.log("Item " + createItemDto.name + " envíado")
    }

    socket(name: string): void {
        const socket = io("http://localhost:3001")
        socket.emit('message', name)
        socket.on('message', data => {
        console.log("Item envíado y recibido por socket " + data)
        socket.disconnect()
        })
    }
}