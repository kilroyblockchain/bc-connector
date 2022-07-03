import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
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
  @IsNotEmpty()
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
  @IsNotEmpty()
  testDatasetBCHash: string;

  @IsString()
  @IsNotEmpty()
  trainDataSets: string;

  @IsString()
  @IsNotEmpty()
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
