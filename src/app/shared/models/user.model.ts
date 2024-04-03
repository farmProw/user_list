import { UserTypeEnum } from '../enums/user.enum';

export class User {
  id!: number;
  username!: string;
  first_name!: string;
  last_name!: string;
  email!: string;
  password!: string;
  repeatPassword!: string;
  user_type!: UserTypeEnum;

  constructor(
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    user_type: UserTypeEnum,
    password: string,
    repeatPassword: string
  ) {
    this.id = id;
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.user_type = user_type;
    this.password = password;
    this.repeatPassword = repeatPassword;
  }
}
