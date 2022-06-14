import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_CONSTANT } from '../constants/user.constant';

// eslint-disable-next-line
export const ThrowBcQueryException = (err: Error) => {
  if (
    err.message.includes('Channel not found ') ||
    err.message.includes('not found')
  ) {
    throw new NotFoundException([err.message]);
  } else if (err.message.includes('Response payload is null')) {
    throw new BadRequestException(['Response payload is null']);
  } else if (err.message.includes(USER_CONSTANT.USER_NOT_FOUND)) {
    throw new UnauthorizedException([err.message]);
  } else {
    throw new InternalServerErrorException([err.message]);
  }
};
