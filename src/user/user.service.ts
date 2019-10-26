import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "../types/entities/user.interface";
import { UserDto } from "../types/dto/user.dto";
import { hashSync } from "bcrypt";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel("user") private readonly userModel: Model<User>) {}

  async isExist(name: string) {
    return this.userModel.exists({ name });
  }

  async findOne(name: string) {
    return this.userModel.findOne({ name });
  }

  async create(createUserDto: Partial<UserDto>) {
    const user = new this.userModel({
      ...createUserDto,
      password: hashSync(createUserDto.password, 15),
    });
    return user.save();
  }
}
