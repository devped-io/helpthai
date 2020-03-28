import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser: User = this.usersRepository.create(createUserDto);
    const savedUser: User = await this.usersRepository.save(createdUser);

    return savedUser;
  }

  async findOne(condition): Promise<User> {
    return this.usersRepository.findOne(condition);
  }
}
