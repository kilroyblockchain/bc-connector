import { IsNotEmpty, IsString } from 'class-validator';
export class SDKResponseDto {
  @IsString()
  channelName: string;

  @IsString()
  chaincodeName: string;

  @IsString()
  functionName: string;

  @IsNotEmpty()
  args: any;

  @IsString()
  orgName: string;
}
