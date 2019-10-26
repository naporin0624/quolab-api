import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { CreateLabRequestDto } from '../../types/requestDto/createLabRequestDto'
import { Lab } from "../../types/entities/lab"

import { Model } from "mongoose";

@Injectable()
export class CreateLabService {
  constructor(
    @InjectModel("lab") private readonly labModel: Model<Lab>,
  ) {}

  createLab(createLabRequestDto: CreateLabRequestDto) {
    const labCode = Math.random().toString(32).substring(2)
    createLabRequestDto.labCode = labCode
    const createdLab = new this.labModel(createLabRequestDto);
    return createdLab.save();
  }
}
