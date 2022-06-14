import { Injectable, Logger } from '@nestjs/common';
import { CHANNEL_CONSTANT } from 'src/@core/common/constants/channel.constant';
import { ChaincodeResponseDto } from 'src/@core/common/dto/chaincode-response.dto';
import { SDKRequestDto } from 'src/@core/common/dto/sdk-request.dto';
import { HandleChaincodeException } from 'src/@core/common/exceptions/chaincode-exceptions';
import { BcUserService } from '../bc-user/bc-user.service';
import { ProposalRequestDto } from '../dto/proposal-request.dto';

@Injectable()
export class BcQueryService {
  constructor(private readonly bcUserService: BcUserService) {}

  async queryChaincode(
    sdkRequest: SDKRequestDto,
    loggedInUserId: string,
    orgName: string,
  ): Promise<Response> {
    await new Promise((r) => setTimeout(r, 2000));
    const logger = new Logger('QueryChaincode');
    let responsePayload = null;
    const peerNames = JSON.parse(process.env.PEER_NAMES);
    const client = await this.bcUserService.getClientInfoForOrg(
      orgName,
      loggedInUserId,
    );
    const channel = client.getChannel(sdkRequest.channelName);
    if (!channel) {
      logger.error(
        'Channel ' +
          sdkRequest.channelName +
          ' was not defined in the connection profile',
      );
      throw new Error(CHANNEL_CONSTANT.CHANNEL_NOT_FOUND);
    }

    const proposalRequestDto = new ProposalRequestDto();
    proposalRequestDto.targets = peerNames;
    proposalRequestDto.chaincodeId = sdkRequest.chaincodeName;
    proposalRequestDto.fcn = sdkRequest.functionName;
    proposalRequestDto.args = sdkRequest.args;
    responsePayload = await channel.queryByChaincode(proposalRequestDto);
    if (
      responsePayload &&
      responsePayload[0] &&
      responsePayload[0].toString()
    ) {
      if (responsePayload[0] instanceof Error) {
        const responsePayloadString = responsePayload[0].toString();
        if (responsePayloadString.includes('statusCode')) {
          const responseError = responsePayloadString.split('{');
          const errorMessage = '{' + responseError[1];
          const responseErrorToChaincode: ChaincodeResponseDto =
            JSON.parse(errorMessage);
          logger.error(responseError);
          await HandleChaincodeException(responseErrorToChaincode);
        }
        throw new Error(responsePayloadString);
        // await this.HandleKnownError(responsePayloadString);
      }
      const responseBuffer = responsePayload[0].toString();
      const response: ChaincodeResponseDto = JSON.parse(responseBuffer);
      return response.result;
    } else {
      logger.error('Response payload is null');
      throw new Error('Response payload is null');
      // await this.HandleKnownError('Response payload is null');
    }
  }

  // private async HandleCommonError(
  //   chaincodeResponseDto: ChaincodeResponseDto,
  // ): Promise<void> {
  //   switch (chaincodeResponseDto.statusCode) {
  //     case HttpStatus.BAD_REQUEST:
  //       throw new BadRequestException([chaincodeResponseDto.message]);
  //     case HttpStatus.NOT_FOUND:
  //       throw new NotFoundException([chaincodeResponseDto.message]);
  //     default:
  //       throw new InternalServerErrorException([chaincodeResponseDto.message]);
  //   }
  // }

  // private async HandleKnownError(errorString: string): Promise<void> {
  //   if (errorString.includes('Incorrect number of params')) {
  //     throw new BadRequestException([errorString]);
  //   }
  //   if (errorString.includes('not found')) {
  //     throw new NotFoundException([errorString]);
  //   }
  //   throw new InternalServerErrorException([errorString]);
  // }
}
