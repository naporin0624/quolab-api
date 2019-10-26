import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { AppService } from "./app.service";
import { UserService } from "./user/user.service";
import { AuthService } from "./auth/auth.service";

import { UserDto } from "./types/dto/user.dto";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("signin")
  async signin(@Body() createUserDto: Partial<UserDto>) {
    if (await this.userService.isExist(createUserDto.name)) {
      throw new HttpException(
        `${createUserDto.name} is aleady exist`,
        HttpStatus.CONFLICT,
      );
    }
    const user = await this.userService.create(createUserDto);
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  getProfile(@Request() req: any) {
    console.log(req.user);
    return 1;
  }
}
