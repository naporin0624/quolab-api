export class UserDto {
  readonly _id: string;
  readonly email: string;
  readonly password: string;

  readonly createdAt?: Date;
}
