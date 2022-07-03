import { Module } from '@nestjs/common';
import { BcUserModule } from './components/blockchain/bc-user/bc-user.module';
import { ConnectionModule } from './components/connection/connection.module';
import { ProjectVersionModule } from './components/project-version/project-version.module';
import { ProjectModule } from './components/project/project.module';

@Module({
  imports: [
    BcUserModule,
    ProjectModule,
    ConnectionModule,
    ProjectVersionModule,
  ],
})
export class AppModule {}
