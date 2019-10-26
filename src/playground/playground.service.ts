import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../types/entities/user.interface";
import { CreateUserDto } from "../types/requestDto/user.dto";

@Injectable()
export class PlaygroundService {
  constructor(
    @InjectModel("playground") private readonly userModel: Model<User>,
  ) {}

  async findAll() {
    return this.userModel.find();
  }
  async findOne(name: string) {
    return this.userModel.find().where({ name });
  }
  async create(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }
  async delete(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
