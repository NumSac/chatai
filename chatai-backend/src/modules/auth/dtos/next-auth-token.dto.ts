import { PartialType } from '@nestjs/swagger';
import { RefreshTokenDto } from './refresh-token.dto';

export class NextAuthAuthTokenDto extends PartialType(RefreshTokenDto) {}
