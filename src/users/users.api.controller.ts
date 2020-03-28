import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { ER_DUP_ENTRY } from 'mysql/lib/protocol/constants/errors';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('api/v1/users')
export class UsersApiController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(`hello`);
    try {
      const user: User = await this.usersService.createUser(createUserDto);

      return user;
    } catch (e) {
      console.log(e);

      if (e.errno === ER_DUP_ENTRY) {
        throw new ConflictException(`User already exists`);
      }

      throw new InternalServerErrorException();
    }
  }
}
