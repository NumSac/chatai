import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthType } from '../auth/enums/auth-type-enum';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { ActiveUserData } from '../auth/interfaces/active-user-data.interface';

@Controller('user')
export class UserController {
  constructor() {}

  @Auth(AuthType.Bearer)
  @Post('create-user')
  public async createUser(
    @Body() createUserDto: CreateUserDto,
    @ActiveUser() user: ActiveUserData,
  ) {}
}
