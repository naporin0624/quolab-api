import { Controller, Get, Request, UseGuards, Param, HttpException, HttpStatus } from '@nestjs/common';
import { VisializationService } from "./visialization.service";
import { User } from "src/types/entities/user.interface";
import { AuthGuard } from "@nestjs/passport";
import { LabService } from "../lab/lab.service";
import { RoomService } from "../room/room.service";
import { UserService } from "../user/user.service";
import { addHours } from "date-fns";
import { EnvDataService } from "../env-data/env-data.service";
import { RequestWithUser } from "src/types";

@UseGuards(AuthGuard("jwt"))
@Controller("visialization")
export class VisializationController {
  constructor(
    private readonly userService: UserService,
    private readonly visializationService: VisializationService,
    private readonly labService: LabService,
    private readonly roomService: RoomService,
    private readonly envDataService: EnvDataService,
  ) {}

  @Get("browsing")
  async browsing(@Request() res: any) {
    const user: User = res.user;
    return this.visializationService.getVisiBrowsingData(user.id);
  }
  j;
  @Get("key")
  async key(@Request() res: any) {
    const user: User = res.user;
    return this.visializationService.getVisiKeyData(user.id);
  }

  @Get("software")
  async software(@Request() res: any) {
    const user: User = res.user;
    return this.visializationService.getVisiUseSoftwareData(user.id);
  }

  @Get("envdata/:sensorName")
  async envdata(@Request() res: RequestWithUser, @Param("sensorName") sensorName: string) {
    if (!sensorName) {
      throw new HttpException("sensorName指定してないから壊れた", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const user = await this.userService.findOne(res.user.email);
    const rooms = await this.roomService.findByLabId(user.labId);
    const monipiIdList = this.unique(
      rooms.map(room => room.monipiId).filter(id => !!id),
    );
    const sensorData = await Promise.all(monipiIdList.map(id => this.envDataService.filterSensorData(id, sensorName)));
    return { monipiIdList, sensorData };
 }
  @Get("sensor_category")
  async sensorCategory(@Request() res: any) {
    const user = await this.userService.findOne(res.user.email);
    const rooms = await this.roomService.findByLabId(user.labId);
    const monipiIdList = this.unique(
      rooms.map(room => room.monipiId).filter(id => !!id),
    );
    const registeredSensorNames: any[][] = await Promise.all(
      monipiIdList.map(id => this.envDataService.registeredSensorNames(id)),
    );
    return this.flatSingle(
      this.flatSingle(registeredSensorNames).map(Object.values),
    ).filter(a => !!a);
  }



  private unique(l) {
    return l.filter((x, i, self) => self.indexOf(x) === i);
  }
  private flatSingle(arr: any[][]) {
    return [].concat(...arr);
  }
}
