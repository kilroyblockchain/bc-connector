import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EntryUserDetailDto } from './entry-user-detail.dto';

export class ReviewDocument {
  @IsString()
  @IsNotEmpty()
  docUrl: string;
  @IsString()
  @IsNotEmpty()
  docName: string;
}

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReviewDocument)
  reviewDocuments: ReviewDocument[];

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
