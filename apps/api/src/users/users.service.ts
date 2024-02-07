import { Injectable , OnModuleInit , Inject} from '@nestjs/common';
import { CreateUserDto,UpdateUserDto , UserServiceClient , USER_SERVICE_NAME} from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import {AUTH_SERVICE} from './constants'

@Injectable()
export class UsersService implements OnModuleInit{
  private userService: UserServiceClient

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>("UserService");
  }
  create(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  findAll() {
    return this.userService.findAllUsers({});
  }

  findOne(id: string) {
    return this.userService.findOneUser({id});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({id, ...updateUserDto});
  }

  remove(id: string) {
    return this.userService.deleteUser({id});
  }
}
