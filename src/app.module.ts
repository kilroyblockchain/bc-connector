import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BcUserModule } from './components/blockchain/bc-user/bc-user.module';

@Module({
  imports: [BcUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
