import { Module } from '@nestjs/common';
import { BcInvokeModule } from './components/blockchain/bc-invoke/bc-invoke.module';
import { BcUserModule } from './components/blockchain/bc-user/bc-user.module';

@Module({
  imports: [BcUserModule, BcInvokeModule],
})
export class AppModule {}
