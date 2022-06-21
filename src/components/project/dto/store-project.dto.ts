import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class StoreProjectDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsNotEmpty()
  @IsArray()
  members: string[];

  @IsOptional()
  @IsString()
  entryUser: string;
}
