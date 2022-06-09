import {
  ForbiddenException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

// eslint-disable-next-line
export const ThrowChaincodeException = (response: any) => {
  if (response.statusCode == HttpStatus.FORBIDDEN) {
    throw new ForbiddenException([response.message]);
  } else {
    throw new InternalServerErrorException([response.message]);
  }
};
