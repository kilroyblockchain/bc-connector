import { Module } from '@nestjs/common';
import { BcInvokeModule } from './components/blockchain/bc-invoke/bc-invoke.module';
import { BcQueryModule } from './components/blockchain/bc-query/bc-query.module';
import { BcUserModule } from './components/blockchain/bc-user/bc-user.module';

@Module({
  imports: [BcUserModule, BcInvokeModule, BcQueryModule],
})
export class AppModule {}
