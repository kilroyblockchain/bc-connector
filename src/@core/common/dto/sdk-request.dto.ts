import { IsNotEmpty, IsString } from 'class-validator';
export class SDKRequestDto {
  @IsString()
  channelName: string;
  @IsString()
  chaincodeName: string;
  @IsString()
  functionName: string;
  @IsNotEmpty()
  args: any;

  constructor(
    channelName?: string,
    chaincodeName?: string,
    functionName?: string,
    args?: any,
  ) {
    this.channelName = channelName;
    this.chaincodeName = chaincodeName;
    this.functionName = functionName;
    this.args = args;
  }
}
