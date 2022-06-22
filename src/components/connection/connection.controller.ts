import {
  Controller,
  HttpStatus,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthorizationGuard } from 'src/@core/auth/guards/authorization.guard';
import { Response } from 'src/@core/common/dto/response.dto';

@Controller('connection')
export class ConnectionController {
  @Get()
  @UseGuards(AuthorizationGuard)
  @HttpCode(HttpStatus.OK)
  async checkConnection(): Promise<Response> {
    return new Response('OK', true).setStatusCode(HttpStatus.OK);
  }
}
