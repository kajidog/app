import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class Biome {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  temperature: number;

  @IsNumber()
  humidity: number;

  @IsArray()
  @IsString({ each: true })
  flora: string[];

  @IsArray()
  @IsString({ each: true })
  fauna: string[];

  constructor(props: {
    id: string;
    name: string;
    description: string;
    temperature: number;
    humidity: number;
    flora: string[];
    fauna: string[];
  }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.temperature = props.temperature;
    this.humidity = props.humidity;
    this.flora = props.flora;
    this.fauna = props.fauna;
  }
} 