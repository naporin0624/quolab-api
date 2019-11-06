import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Lab } from "../../types/entities/lab.interface";

@Injectable()
export class GetLabMembersService {
  constructor(@InjectModel("lab") private readonly labModel: Model<Lab>) {}

  get(labId: string) {
    return null;
  }
}
