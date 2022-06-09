import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_CONSTANT } from '../constants/user.constant';

// eslint-disable-next-line
export const ThrowBcUserException = (err: Error) => {
  if (err.message.includes('Already Registered And Enrolled')) {
    throw new ConflictException([err.message]);
  } else if (err.message.includes(USER_CONSTANT.USER_NOT_FOUND)) {
    throw new UnauthorizedException([err.message]);
  } else {
    throw new InternalServerErrorException([err.message]);
  }
};
