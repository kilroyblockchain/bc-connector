import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// eslint-disable-next-line
export const ThrowBcUserException = (err: Error) => {
  if (err.message.includes('Already Registered And Enrolled')) {
    throw new ConflictException([err.message]);
  } else if (err.message.includes('not found')) {
    throw new NotFoundException([err.message]);
  } else if (err.message.includes('Invalid Key')) {
    throw new UnauthorizedException([err.message]);
  } else {
    throw new InternalServerErrorException([err.message]);
  }
};
