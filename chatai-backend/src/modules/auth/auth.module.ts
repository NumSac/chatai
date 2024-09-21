import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './provider/auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { GenerateTokensProvider } from './provider/generate-tokens.provider';
import { TokenProvider } from './provider/token.provider';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [AuthService, GenerateTokensProvider, TokenProvider],
  exports: [AuthService],
})
export class AuthModule {}
