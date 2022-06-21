import { Module } from '@nestjs/common';
import { BcUserModule } from './components/blockchain/bc-user/bc-user.module';
import { ProjectModule } from './components/project/project.module';

@Module({
  imports: [BcUserModule, ProjectModule],
})
export class AppModule {}
