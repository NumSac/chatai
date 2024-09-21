import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiUser } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { CreateUserProvider } from './provider/create-user.provider';
import { UserService } from './provider/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApiUser]), forwardRef(() => AuthModule)],
  providers: [UserService, CreateUserProvider],
  exports: [UserService],
})
export class UserModule {}
