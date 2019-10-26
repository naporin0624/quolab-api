export class UserDto {
  readonly _id: string;
  readonly name: string;
  readonly password: string;

  readonly createdAt?: Date;
}
