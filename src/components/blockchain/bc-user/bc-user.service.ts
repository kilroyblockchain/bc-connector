import { Injectable, Logger } from '@nestjs/common';
import Client, * as hfc from 'fabric-client';
import { USER_CONSTANT } from 'src/@core/common/constants/user.constant';
import { GenerateSHA256Hash } from 'src/@core/utils/helper';
import { ThrowBcUserException } from 'src/@core/common/exceptions/throw-bc-user-exceptions';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class BcUserService {
  /**
   * GetClientInfoForOrg function loads the client necessary connection and crypto details from the data provided on connection profile
   * If username is passed on the parameter then, checks whether the user is enrolled or not before getting the client information
   *
   *
   * @param {string} orgName - Name of the organization to get the connection profile details
   * @param {string} userName - Name of the user to get the detail
   * @returns {Promise<Client>} - Returns response type Client
   *
   *
   **/
  async getClientInfoForOrg(
    orgName: string,
    userName?: string,
  ): Promise<Client> {
    try {
      const logger = new Logger('GetClientForOrg');
      const connectionProfilePath = process.env.CONNECTION_FILE_PATH;
      const configFile =
        connectionProfilePath +
        'connection-profile-' +
        orgName.toLowerCase() +
        '.yaml';
      const client: Client = hfc.loadFromConfig(configFile);
      // this will create both the state store and the crypto store based
      // on the settings in the client section of the connection profile
      await client.initCredentialStores();

      if (userName) {
        // Hash Username
        const hashedUsername = GenerateSHA256Hash(userName);
        const user = await client.getUserContext(hashedUsername, true);
        if (!user) {
          logger.error('User ' + userName + ' not found on the wallet');
          throw new Error(USER_CONSTANT.USER_NOT_FOUND);
        }
        logger.log('User ' + userName + ' found on the wallet');
      }
      return client;
    } catch (err) {
      const error: Error = err;
      if (error.message.includes('no such file or directory')) {
        throw new Error(
          'Connection Profile not found for the organization ' + orgName,
        );
      }
      throw new Error(err);
    }
  }

  /**
   * EnrollAndRegisterUser function that registers the user on blockchain network and stores the user credentials on the wallet
   *
   *
   * @param {string} userName - Username to be registered
   * @param {string} orgName - Name of the organization where the user is going to be enrolled
   * @returns {Promise<Client>} - Returns response type Client
   *
   *
   **/
  async enrollAndRegisterUser(
    registerUserDto: RegisterUserDto,
    orgName: string,
  ): Promise<string[]> {
    const logger = new Logger('EnrollAndRegisterUser');
    try {
      const caAdminId = process.env.CA_ADMIN_ID;
      const caAdminPassword = process.env.CA_ADMIN_PWD;
      const client = await this.getClientInfoForOrg(orgName);

      // Hash Username
      const hashedUsername = GenerateSHA256Hash(registerUserDto.userName);

      // client can now act as an agent for organization
      // first check to see if the user is already on the wallet
      let user = await client.getUserContext(hashedUsername, true);
      if (user && user.isEnrolled()) {
        logger.error(USER_CONSTANT.USER_ALREADY_REGISTERED);
        throw new Error(
          'User ' +
            registerUserDto.userName +
            ' Is Already Registered And Enrolled',
        );
      } else {
        // user was not enrolled, so we will need an admin user object to register
        logger.log(
          'User ' +
            registerUserDto.userName +
            ' was not enrolled, so we will need admin user object to register',
        );

        const adminUserObj = await client.setUserContext({
          username: caAdminId,
          password: caAdminPassword,
        });
        logger.log(USER_CONSTANT.USER_CONTEXT_SET_SUCCESS + caAdminId);
        const caClient = client.getCertificateAuthority();
        const secret = await caClient.register(
          {
            enrollmentID: hashedUsername,
            affiliation: 'org1.department1',
          },
          adminUserObj,
        );
        logger.log(USER_CONSTANT.USER_SECRET_FOUND + registerUserDto.userName);
        // Add User credentials to the wallet
        user = await client.setUserContext({
          username: hashedUsername,
          password: secret,
        });
        logger.log(
          'Successfully enrolled username ' +
            registerUserDto.userName +
            ' and setUserContext on the client object',
        );
      }
      return [hashedUsername];
    } catch (err) {
      logger.error(err);
      await ThrowBcUserException(err);
    }
  }

  // async checkUser(userName: string, orgName: string): Promise<Response> {
  //   const client = await this.getClientInfoForOrg(orgName);
  //   if (!clientResponse.success) {
  //     return clientResponse;
  //   }

  //   const client: Client = clientResponse.data;
  //   const hashedUserName = GenerateSHA256Hash(userName);
  //   const user = await client.getUserContext(hashedUserName, true);
  //   if (!user) {
  //     throw new NotFoundException(['User Does not Exist']);
  //   }

  // const hashedLoginUser = GenerateSHA256Hash(loggedInUserId);
  // console.log('HASHED===>', hashedLoginUser);
  // const loginUserContext = await client.getUserContext(
  //   hashedLoginUser,
  //   true,
  // );
  // if (!loginUserContext){
  //   logger.error(USER_CONSTANT.USER_NOT_FOUND);
  //   throw new Error('')
  // }
  // console.log('LOGIN USER====>', loginUserContext);
  // }
}
