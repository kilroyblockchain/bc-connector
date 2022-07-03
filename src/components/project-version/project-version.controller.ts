import {
  Body,
  Controller,
  HttpStatus,
  Headers,
  Post,
  HttpCode,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { AuthorizationGuard } from 'src/@core/auth/guards/authorization.guard';
import { BlockchainStatusGuard } from 'src/@core/auth/guards/blockchain-status.guard';
import { Response } from 'src/@core/common/dto/response.dto';
import { StoreProjectVersionDto } from './dto/store-project-version.dto';
import { ProjectVersionService } from './project-version.service';

@Controller('project-version')
export class ProjectVersionController {
  constructor(private readonly projectVersionService: ProjectVersionService) {}

  @Post()
  @UseGuards(BlockchainStatusGuard, AuthorizationGuard)
  @HttpCode(HttpStatus.OK)
  async storeProjectVersion(
    @Body() storeProjectVersionDto: StoreProjectVersionDto,
    @Headers() header,
  ): Promise<Response> {
    return new Response(
      'Project Version Stored',
      await this.projectVersionService.storeVersionProject(
        storeProjectVersionDto,
        header.key,
        header.org_name,
        header.channel_name,
        header.salt,
      ),
    ).setStatusCode(HttpStatus.OK);
  }

  @Get(':projectVersionId')
  @UseGuards(BlockchainStatusGuard, AuthorizationGuard)
  @HttpCode(HttpStatus.OK)
  async getProjectVersion(
    @Param('projectVersionId') projectVersionId: string,
    @Headers() header,
  ): Promise<Response> {
    return new Response(
      'Project Version Fetched',
      await this.projectVersionService.getProjectVersion(
        projectVersionId,
        header.key,
        header.org_name,
        header.channel_name,
        header.salt,
      ),
    ).setStatusCode(HttpStatus.OK);
  }

  @Get('history/:projectVersionId')
  @UseGuards(BlockchainStatusGuard, AuthorizationGuard)
  @HttpCode(HttpStatus.OK)
  async getProjectVersionHistory(
    @Param('projectVersionId') projectVersionId: string,
    @Headers() header,
  ): Promise<Response> {
    return new Response(
      'Project Version History Fetched',
      await this.projectVersionService.getProjectVersionHistory(
        projectVersionId,
        header.key,
        header.org_name,
        header.channel_name,
        header.salt,
      ),
    ).setStatusCode(HttpStatus.OK);
  }
}
