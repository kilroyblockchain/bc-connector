import {
  Body,
  Controller,
  HttpStatus,
  Headers,
  Post,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthorizationGuard } from 'src/@core/auth/guards/authorization.guard';
import { BlockchainStatusGuard } from 'src/@core/auth/guards/blockchain-status.guard';
import { Response } from 'src/@core/common/dto/response.dto';
import { SDKRequestDto } from 'src/@core/common/dto/sdk-request.dto';
import { BcInvokeService } from './bc-invoke.service';

@Controller('bc-invoke')
export class BcInvokeController {
  constructor(private readonly bcInvokeService: BcInvokeService) {}

  @Post()
  @UseGuards(BlockchainStatusGuard, AuthorizationGuard)
  @HttpCode(HttpStatus.OK)
  async invokeChaincode(
    @Body() sDKRequestDto: SDKRequestDto,
    @Headers() header,
  ): Promise<Response> {
    return new Response(
      'Data Stored Successfully',
      await this.bcInvokeService.invokeChaincode(
        sDKRequestDto,
        header.user_id,
        header.org_name,
      ),
    ).setStatusCode(HttpStatus.OK);
  }
}
