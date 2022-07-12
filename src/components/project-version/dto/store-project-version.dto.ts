import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class StoreProjectVersionDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  versionName: string;

  @IsString()
  @IsNotEmpty()
  logFilePath: string;

  @IsString()
  @IsNotEmpty()
  logFileVersion: string;

  @IsString()
  @IsOptional()
  logFileBCHash: string;

  @IsString()
  @IsNotEmpty()
  versionModel: string;

  @IsString()
  @IsNotEmpty()
  noteBookVersion: string;

  @IsString()
  @IsNotEmpty()
  testDataSets: string;

  @IsString()
  @IsOptional()
  testDatasetBCHash: string;

  @IsString()
  @IsNotEmpty()
  trainDataSets: string;

  @IsString()
  @IsOptional()
  trainDatasetBCHash: string;

  @IsString()
  @IsNotEmpty()
  artifacts: string;

  @IsString()
  @IsNotEmpty()
  codeVersion: string;

  @IsString()
  @IsNotEmpty()
  codeRepo: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  versionStatus: string;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsString()
  @IsNotEmpty()
  project: string;

  @IsString()
  @IsNotEmpty()
  entryUser: string;
}
