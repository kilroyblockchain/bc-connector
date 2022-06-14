import { IsArray, IsNotEmpty, IsString } from 'class-validator';
export class SDKRequestDto {
  @IsString()
  @IsNotEmpty()
  channelName: string;

  @IsString()
  @IsNotEmpty()
  chaincodeName: string;

  @IsString()
  @IsNotEmpty()
  functionName: string;

  @IsNotEmpty()
  @IsArray()
  // eslint-disable-next-line
  args: any;
}
