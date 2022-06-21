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
import { StoreProjectDto } from './dto/store-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(BlockchainStatusGuard, AuthorizationGuard)
  @HttpCode(HttpStatus.OK)
  async storeProject(
    @Body() storeProjectDto: StoreProjectDto,
    @Headers() header,
  ): Promise<Response> {
    return new Response(
      'Project Stored',
      await this.projectService.storeProject(
        storeProjectDto,
        header.user_id,
        header.org_name,
        header.channel_name,
      ),
    ).setStatusCode(HttpStatus.OK);
  }

  @Get(':projectId')
  @UseGuards(BlockchainStatusGuard, AuthorizationGuard)
  @HttpCode(HttpStatus.OK)
  async getProject(
    @Param('projectId') projectId: string,
    @Headers() header,
  ): Promise<Response> {
    return new Response(
      'Project Fetched',
      await this.projectService.getProject(
        projectId,
        header.user_id,
        header.org_name,
        header.channel_name,
      ),
    ).setStatusCode(HttpStatus.OK);
  }
}
