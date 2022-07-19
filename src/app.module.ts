import { Module } from '@nestjs/common';
import { BcUserModule } from './components/blockchain/bc-user/bc-user.module';
import { ConnectionModule } from './components/connection/connection.module';
import { ModelVersionModule } from './components/model-version/model-version.module';
import { ProjectModule } from './components/project/project.module';

@Module({
  imports: [BcUserModule, ProjectModule, ConnectionModule, ModelVersionModule],
})
export class AppModule {}
