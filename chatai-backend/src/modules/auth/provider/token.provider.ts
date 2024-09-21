import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { UserService } from 'src/modules/user/provider/user.service';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { JwtService } from '@nestjs/jwt';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { NextAuthAuthTokenDto } from '../dtos/next-auth-token.dto';

@Injectable()
export class TokenProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    // Inject User Repository for finding and creating users
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    // Inject token provider
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async validateNextAuthToken(nextAuthTokenDto: NextAuthAuthTokenDto) {
    // Verify the refresh token using jwtService
    try {
      const token = await this.isValidToken(nextAuthTokenDto.refreshToken);

      const user = await this.userService.findOneById(token.sub);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    // Verify the refresh token using jwtService
    try {
      const token = await this.isValidToken(refreshTokenDto.refreshToken);

      const user = await this.userService.findOneById(token.sub);

      // Generate the tokens
      return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  private async isValidToken(token: string) {
    return await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'>>(
      token,
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      },
    );
  }
}
