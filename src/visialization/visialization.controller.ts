import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { VisializationService } from "./visialization.service";
import { User } from "src/types/entities/user.interface";
import { AuthGuard } from "@nestjs/passport";

@Controller("visialization")
export class VisializationController {
  constructor(private readonly visializationService: VisializationService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("browsing")
  async browsing(@Request() res: any) {
    const user: User = res.user;
    return this.visializationService.getVisiBrowsingData(user.id);
  }
}
