import { Injectable } from '@nestjs/common';
import { SDKRequestDto } from 'src/@core/common/dto/sdk-request.dto';
import { BcInvokeService } from '../blockchain/bc-invoke/bc-invoke.service';
import { BcQueryService } from '../blockchain/bc-query/bc-query.service';
import { ProjectVersionResponseDto } from './dto/project-version-response.dto';
import { StoreProjectVersionDto } from './dto/store-project-version.dto';

@Injectable()
export class ProjectVersionService {
  // Name of ProjectVersion Chaincode
  private readonly CHAINCODE_NAME = 'project-version';
  constructor(
    private readonly bcInvokeService: BcInvokeService,
    private readonly bcQueryService: BcQueryService,
  ) {}

  /**
   * Create Project Version Function calls 'StoreProjectVersion' chaincode functions on chaincode 'project version' which creates new state if non and updates the existing state.
   *
   *
   * @param {StoreProjectVersionDto} storeProjectVersionDto - Object of StoreProjectVersionDto
   * @param {string} key - Key of the user to get the detail
   * @param {string} orgName - Name of the Organization to be used for transaction
   * @param {string} channelName - Name of the channel to send the transaction
   * @param {string} salt - Unique string associated with the key generated
   * @returns {Promise<ProjectResponseDto>} - Returns Promise of ProjectResponseDto
   *
   *
   **/
  async storeVersionProject(
    storeProjectVersionDto: StoreProjectVersionDto,
    key: string,
    orgName: string,
    channelName: string,
    salt: string,
  ): Promise<ProjectVersionResponseDto> {
    const chaincodeFunctionName = 'StoreProjectVersion';

    const sDKRequestDto = new SDKRequestDto();
    sDKRequestDto.chaincodeName = this.CHAINCODE_NAME;
    sDKRequestDto.functionName = chaincodeFunctionName;
    sDKRequestDto.args = [JSON.stringify(storeProjectVersionDto)];
    sDKRequestDto.channelName = channelName;
    const response = await this.bcInvokeService.invokeChaincode(
      sDKRequestDto,
      key,
      orgName,
      salt,
    );
    return this.buildProjectVersionResponseDto(JSON.parse(response.args));
  }

  /**
   * GetProject Function calls 'GetProject' chaincode functions on chaincode 'project version' which returns the project version current state on the basis of project version id
   *
   *
   * @param {string} projectVersionId - Id of the project version state to fetch
   * @param {string} key - Key of the user to get the detail
   * @param {string} orgName - Name of the Organization to be used for transaction
   * @param {string} channelName - Name of the channel to send the transaction
   * @param {string} salt - Unique string associated with the key generated
   * @returns {Promise<ProjectVersionResponseDto>} - Returns Promise of ProjectVersionResponseDto
   *
   *
   **/
  async getProjectVersion(
    projectVersionId: string,
    key: string,
    orgName: string,
    channelName: string,
    salt,
  ): Promise<ProjectVersionResponseDto> {
    const chaincodeFunctionName = 'GetProjectVersion';

    const sDKRequestDto = new SDKRequestDto();
    sDKRequestDto.chaincodeName = this.CHAINCODE_NAME;
    sDKRequestDto.functionName = chaincodeFunctionName;
    sDKRequestDto.args = [projectVersionId];
    sDKRequestDto.channelName = channelName;
    const response = await this.bcQueryService.queryChaincode(
      sDKRequestDto,
      key,
      orgName,
      salt,
    );
    return this.buildProjectVersionResponseDto(response.args);
  }

  /**
   * GetProjectHistory Function calls 'GetProjectHistory' chaincode functions on chaincode 'project version' which returns all the state of project version stored on the basis of project version id
   *
   *
   * @param {string} projectVersionId - Id of the project version state to fetch
   * @param {string} key - Key of the user to get the detail
   * @param {string} orgName - Name of the Organization to be used for transaction
   * @param {string} channelName - Name of the channel to send the transaction
   * @param {string} salt - Unique string associated with the key generated
   * @returns {Promise<ProjectVersionResponseDto>} - Returns Promise of ProjectVersionResponseDto
   *
   *
   **/
  async getProjectVersionHistory(
    projectVersionId: string,
    key: string,
    orgName: string,
    channelName: string,
    salt,
  ): Promise<ProjectVersionResponseDto[]> {
    const chaincodeFunctionName = 'GetProjectVersionHistory';

    const sDKRequestDto = new SDKRequestDto();
    sDKRequestDto.chaincodeName = this.CHAINCODE_NAME;
    sDKRequestDto.functionName = chaincodeFunctionName;
    sDKRequestDto.args = [projectVersionId];
    sDKRequestDto.channelName = channelName;
    const response = await this.bcQueryService.queryChaincode(
      sDKRequestDto,
      key,
      orgName,
      salt,
    );
    return this.buildProjectVersionResponseDtoList(response.args);
  }

  /**
   * *******************PRIVATE FUNCTION*******************
   * BuildProjectVersionResponseDto Sync Function typecasts args of type any to ProjectVersionResponseDto
   *
   *
   * @param {any} args - args response from chaincode.
   * @returns {ProjectVersionResponseDto} - Returns ProjectVersionResponseDto
   *
   *
   **/
  private buildProjectVersionResponseDto(args: any): ProjectVersionResponseDto {
    const projectVersionResponseDto: ProjectVersionResponseDto = args;
    projectVersionResponseDto.recordDate = args.recordDate;
    return projectVersionResponseDto;
  }

  /**
   * *******************PRIVATE FUNCTION*******************
   * BuildProjectVersionResponseDtoList Sync Function typecasts args of type any to ProjectVersionResponseDto List
   *
   *
   * @param {any} args - args response from chaincode
   * @returns {ProjectVersionResponseDto[]} - Returns ProjectVersionResponseDto List
   *
   *
   **/
  private buildProjectVersionResponseDtoList(
    args: any,
  ): ProjectVersionResponseDto[] {
    const projectVersionResponseDtoList = [];
    for (const data of args) {
      const projectVersionResponseDto =
        this.buildProjectVersionResponseDto(data);
      projectVersionResponseDtoList.push(projectVersionResponseDto);
    }
    return projectVersionResponseDtoList;
  }
}
