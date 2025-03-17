import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  constructor(props: { id: string; name: string; email: string }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }
} 