import { Module } from '@nestjs/common';
import { BcInvokeModule } from '../blockchain/bc-invoke/bc-invoke.module';
import { BcQueryModule } from '../blockchain/bc-query/bc-query.module';
import { BcUserModule } from '../blockchain/bc-user/bc-user.module';
import { ProjectVersionController } from './project-version.controller';
import { ProjectVersionService } from './project-version.service';

@Module({
  imports: [BcInvokeModule, BcUserModule, BcQueryModule],
  controllers: [ProjectVersionController],
  providers: [ProjectVersionService],
})
export class ProjectVersionModule {}
