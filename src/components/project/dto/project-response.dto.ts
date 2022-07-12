import { ProjectVersionProjectDto } from 'src/components/project-version/dto/project-version-project.dto';

export class ProjectResponseDto {
  projectId: string;

  name: string;

  detail: string;

  domain: string;

  members: string[];

  status: boolean;

  creatorMSP: string;

  entryUser: string;

  recordDate: string;

  projectVersions: ProjectVersionProjectDto[];
}
