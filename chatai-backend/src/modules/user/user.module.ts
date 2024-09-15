import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiUser } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiUser])],
  providers: [UserModule],
  exports: [UserModule],
})
export class UserModule {}
