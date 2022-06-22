import { Module } from '@nestjs/common';
import { ConnectionController } from './connection.controller';

@Module({
  controllers: [ConnectionController],
})
export class ConnectionModule {}
