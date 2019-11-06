import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lab } from '../../types/entities/lab.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class GetLabMembersService {
  constructor(@InjectModel('lab') private readonly labModel: Model<Lab>, private readonly userService: UserService) {}

  get(labId: String) {
    const users = this.userService.getUsersByLabId(labId)
    return users
  }
}
