import { Injectable } from '@nestjs/common';
import { SDKRequestDto } from 'src/@core/common/dto/sdk-request.dto';
import { BcInvokeService } from '../blockchain/bc-invoke/bc-invoke.service';
import { BcQueryService } from '../blockchain/bc-query/bc-query.service';
import { StoreProjectDto } from './dto/store-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';

@Injectable()
export class ProjectService {
  // Name of Project Chaincode
  private readonly CHAINCODE_NAME = 'project';
  constructor(
    private readonly bcInvokeService: BcInvokeService,
    private readonly bcQueryService: BcQueryService,
  ) {}

  /**
   * Create Project Function calls 'StoreProject' chaincode functions on chaincode 'project' which creates new state if non and updates the existing state.
   *
   *
   * @param {StoreProjectDto} storeProjectDto - Object of StoreProjectDto
   * @param {string} key - Key of the user to get the detail
   * @param {string} orgName - Name of the Organization to be used for transaction
   * @param {string} channelName - Name of the channel to send the transaction
   * @param {string} salt - Unique string associated with the key generated
   * @returns {Promise<ProjectResponseDto>} - Returns Promise of ProjectResponseDto
   *
   *
   **/
  async storeProject(
    storeProjectDto: StoreProjectDto,
    key: string,
    orgName: string,
    channelName: string,
    salt: string,
  ): Promise<ProjectResponseDto> {
    const chaincodeFunctionName = 'StoreProject';

    const sDKRequestDto = new SDKRequestDto();
    sDKRequestDto.chaincodeName = this.CHAINCODE_NAME;
    sDKRequestDto.functionName = chaincodeFunctionName;
    sDKRequestDto.args = [JSON.stringify(storeProjectDto)];
    sDKRequestDto.channelName = channelName;
    const response = await this.bcInvokeService.invokeChaincode(
      sDKRequestDto,
      key,
      orgName,
      salt,
    );
    return this.buildProjectResponseDto(JSON.parse(response.args));
  }

  /**
   * GetProject Function calls 'GetProject' chaincode functions on chaincode 'project' which returns the project current state on the basis of project id
   *
   *
   * @param {string} projectId - Id of the project state to fetch
   * @param {string} key - Key of the user to get the detail
   * @param {string} orgName - Name of the Organization to be used for transaction
   * @param {string} channelName - Name of the channel to send the transaction
   * @param {string} salt - Unique string associated with the key generated
   * @returns {Promise<ProjectResponseDto>} - Returns Promise of ProjectResponseDto
   *
   *
   **/
  async getProject(
    projectId: string,
    key: string,
    orgName: string,
    channelName: string,
    salt,
  ): Promise<ProjectResponseDto> {
    const chaincodeFunctionName = 'GetProject';

    const sDKRequestDto = new SDKRequestDto();
    sDKRequestDto.chaincodeName = this.CHAINCODE_NAME;
    sDKRequestDto.functionName = chaincodeFunctionName;
    sDKRequestDto.args = [projectId];
    sDKRequestDto.channelName = channelName;
    const response = await this.bcQueryService.queryChaincode(
      sDKRequestDto,
      key,
      orgName,
      salt,
    );
    return this.buildProjectResponseDto(response.args);
  }

  /**
   * GetProjectHistory Function calls 'GetProjectHistory' chaincode functions on chaincode 'project' which returns all the state of project stored on the basis of project id
   *
   *
   * @param {string} projectId - Id of the project state to fetch
   * @param {string} key - Key of the user to get the detail
   * @param {string} orgName - Name of the Organization to be used for transaction
   * @param {string} channelName - Name of the channel to send the transaction
   * @param {string} salt - Unique string associated with the key generated
   * @returns {Promise<ProjectResponseDto>} - Returns Promise of ProjectResponseDto
   *
   *
   **/
  async getProjectHistory(
    projectId: string,
    key: string,
    orgName: string,
    channelName: string,
    salt,
  ): Promise<ProjectResponseDto[]> {
    const chaincodeFunctionName = 'GetProjectHistory';

    const sDKRequestDto = new SDKRequestDto();
    sDKRequestDto.chaincodeName = this.CHAINCODE_NAME;
    sDKRequestDto.functionName = chaincodeFunctionName;
    sDKRequestDto.args = [projectId];
    sDKRequestDto.channelName = channelName;
    const response = await this.bcQueryService.queryChaincode(
      sDKRequestDto,
      key,
      orgName,
      salt,
    );
    return this.buildProjectResponseDtoList(response.args);
  }

  private buildProjectResponseDto(args: any): ProjectResponseDto {
    const projectResponseDto: ProjectResponseDto = {
      projectId: args.id,
      name: args.name == null ? null : args.name,
      detail: args.detail == null ? null : args.detail,
      domain: args.domain == null ? null : args.domain,
      members: args.members == null ? null : args.members,
      entryUser: args.entryUser == null ? null : args.entryUser,
      recordDate: args.recordDate == null ? null : args.recordDate,
    };
    return projectResponseDto;
  }

  private buildProjectResponseDtoList(args: any): ProjectResponseDto[] {
    const projectResponseDtoList = [];
    for (const data of args) {
      const projectResponseDto = new ProjectResponseDto();
      projectResponseDto.projectId = data.name == null ? null : data.id;
      projectResponseDto.name = data.name == null ? null : data.name;
      projectResponseDto.detail = data.name == null ? null : data.detail;
      projectResponseDto.domain = data.name == null ? null : data.domain;
      projectResponseDto.members = data.name == null ? null : data.members;
      projectResponseDto.entryUser = data.name == null ? null : data.entryUser;
      projectResponseDto.recordDate =
        data.name == null ? null : data.recordDate;
      projectResponseDtoList.push(projectResponseDto);
    }
    return projectResponseDtoList;
  }
}
