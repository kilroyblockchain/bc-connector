import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EntryUserDetailDto } from './entry-user-detail.dto';

export class StoreModelReviewDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  deployedUrl: string;

  @IsString()
  @IsOptional()
  deploymentInstruction: string;

  @IsString()
  @IsOptional()
  productionURL: string;

  @IsString()
  @IsOptional()
  reviewSupportingDocument: string;

  @IsString()
  @IsNotEmpty()
  reviewStatus: string;

  @IsString()
  @IsOptional()
  ratings: string;

  @IsString()
  @IsOptional()
  comment: string;

  @ValidateNested({ each: true })
  @Type(() => EntryUserDetailDto)
  entryUserDetail: EntryUserDetailDto;
}
