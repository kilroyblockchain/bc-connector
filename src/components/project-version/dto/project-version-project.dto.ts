import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectVersionProjectDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  versionName: string;
}
