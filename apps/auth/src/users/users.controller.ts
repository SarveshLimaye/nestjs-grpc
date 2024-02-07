import { Controller,  } from '@nestjs/common';
import { Observable} from 'rxjs';
import { UsersService } from './users.service';
import {UserServiceController ,FindUserByIdDto, CreateUserDto,PaginationDto, UpdateUserDto , UserServiceControllerMethods} from '@app/common';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}


  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  
  findOneUser(findOneUserDto: FindUserByIdDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

 
  updateUser( updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }


  deleteUser(findOneUserDto: FindUserByIdDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  queryUser(paginationDtoStream: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDtoStream);
  }
}
