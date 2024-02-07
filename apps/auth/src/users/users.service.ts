import { Injectable ,OnModuleInit , NotFoundException} from '@nestjs/common';
import {User, Users, CreateUserDto , UpdateUserDto ,PaginationDto,} from "@app/common"
import { Observable, Subject } from 'rxjs';
import {randomUUID} from 'crypto';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    for (let i = 0; i <= 100; i++) {
      this.create({ username: randomUUID(), password: randomUUID(), age: 0 });
    }
  }
  create(createUserDto: CreateUserDto) {
   const user: User = {
    ...createUserDto,
    subscribed: false,
    socialMedia:{},
    id : randomUUID()
   }
   this.users.push(user);
   return user;
  }

  findAll(): Users {
    return {users: this.users};
  }

  findOne(id: string) : User {
    return this.users.find(user => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) : User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if(userIndex === -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto
      };
      return this.users[userIndex];
    }
    throw new NotFoundException(`User not found by id {id}`);
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if(userIndex === -1) {
      return this.users.splice(userIndex)[0];
    }
    throw new NotFoundException(`User not found by id ${id}.`);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>): Observable<Users> {
    const subject = new Subject<Users>();
    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.limit;
      subject.next({users: this.users.slice(start, start + paginationDto.limit)});
    }
    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({next: onNext, complete: onComplete});

    return subject.asObservable();
  }
}

