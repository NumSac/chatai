import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/provider/user.service';

@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
}
