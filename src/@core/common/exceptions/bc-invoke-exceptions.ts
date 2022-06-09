import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_CONSTANT } from '../constants/user.constant';

// eslint-disable-next-line
export const ThrowBcInvokeException = (err: Error) => {
  if (err.message.includes('Channel not found ')) {
    throw new NotFoundException([err.message]);
  } else if (err.message.includes(USER_CONSTANT.USER_NOT_FOUND)) {
    throw new UnauthorizedException([err.message]);
  } else {
    throw new InternalServerErrorException([err.message]);
  }
};
