import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { PlaygroundService } from "./playground.service";
import { CreateUserDto } from "../types/requestDto/user.dto";

@Controller("playground")
export class PlaygroundController {
  constructor(private playgroundService: PlaygroundService) {}

  @Get()
  async index() {
    return this.playgroundService.findAll();
  }

  @Get(":name")
  async show(@Param("name") name: string) {
    return this.playgroundService.findOne(name);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.playgroundService.create(createUserDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.playgroundService.delete(id);
  }
}
