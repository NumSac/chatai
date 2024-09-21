import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiUser } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserProvider } from './create-user.provider';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    /**
     * Injecting usersRepository
     */
    @InjectRepository(ApiUser)
    private userRepository: Repository<ApiUser>,
    /**
     * Inject Create Users Provider
     */
    private readonly createUserProvider: CreateUserProvider,
  ) {}

  /**
   * Method to create a new user
   */
  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }

  /**
   * Public method used to find one user using the ID of the user
   */
  public async findOneById(id: number): Promise<ApiUser> {
    let user = undefined;

    try {
      user = await this.userRepository.findOneBy({
        id,
      });
      return user;
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }
  }
}
