import {
  Injectable,
  ExecutionContext,
  CanActivate,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ThrowBcUserException } from 'src/@core/common/exceptions/throw-bc-user-exceptions';
import { BcUserService } from 'src/components/blockchain/bc-user/bc-user.service';
dotenv.config();

@Injectable()
export class BlockchainStatusGuard implements CanActivate {
  constructor(private readonly bcUserService: BcUserService) {}

  // eslint-disable-next-line
  async canActivate(context: ExecutionContext) {
    const logger = new Logger('BlockchainGuard');
    const headers = context.switchToHttp().getRequest().headers;
    if (!headers.user_id) {
      logger.error('User Id not found on the header: user_id');
      throw new BadRequestException(['User Id not found on the header']);
    }
    if (!headers.org_name) {
      logger.error('Organization name not found on the header: org_name');
      throw new BadRequestException([
        'Organization name not found on the header',
      ]);
    }
    try {
      await this.bcUserService.getClientInfoForOrg(
        headers.org_name,
        headers.user_id,
      );
    } catch (err) {
      ThrowBcUserException(err);
    }
    return headers;
  }
}
