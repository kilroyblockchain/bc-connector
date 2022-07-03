export class ProjectVersionResponseDto {
  id: string;

  versionName: string;

  logFilePath: string;

  logFileVersion: string;

  logFileBCHash: string;

  versionModel: string;

  noteBookVersion: string;

  testDataSets: string;

  testDatasetBCHash: string;

  trainDataSets: string;

  trainDatasetBCHash: string;

  artifacts: string;

  codeVersion: string;

  codeRepo: string;

  comment: string;

  versionStatus: string;

  status: boolean;

  project: string;

  recordDate: string;

  entryUser: string;
}
