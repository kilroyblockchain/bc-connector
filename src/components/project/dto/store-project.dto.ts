import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProjectVersionProjectDto } from 'src/components/project-version/dto/project-version-project.dto';
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

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProjectVersionProjectDto)
  projectVersions: ProjectVersionProjectDto[];

  @IsOptional()
  @IsString()
  entryUser: string;
}
