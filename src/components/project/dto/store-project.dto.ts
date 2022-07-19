import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ModelVersionProjectDto } from 'src/components/model-version/dto/model-version-project.dto';

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
  @Type(() => ModelVersionProjectDto)
  projectVersions: ModelVersionProjectDto[];

  @IsOptional()
  @IsString()
  entryUser: string;
}
