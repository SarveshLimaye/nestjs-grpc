/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface Empty {
}

export interface PaginationDto {
  page: number;
  limit: number;
}

export interface Users {
  users: User[];
}

export interface UpdateUserDto {
  id: string;
  socialMedia: SocialMedia | undefined;
}

export interface FindUserByIdDto {
  id: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
  age: number;
}

export interface User {
  id: string;
  username: string;
  password: string;
  age: number;
  subscribed: boolean;
  socialMedia: SocialMedia | undefined;
}

export interface SocialMedia {
  twitterUri?: string | undefined;
  facebookUri?: string | undefined;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface UserServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  findAllUsers(request: Empty): Observable<Users>;

  findOneUser(request: FindUserByIdDto): Observable<User>;

  updateUser(request: UpdateUserDto): Observable<User>;

  deleteUser(request: FindUserByIdDto): Observable<Empty>;

  queryUser(request: PaginationDto): Observable<Users>;
}

export interface UserServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindUserByIdDto): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserDto): Promise<User> | Observable<User> | User;

  deleteUser(request: FindUserByIdDto): Promise<Empty> | Observable<Empty> | Empty;

  queryUser(request: PaginationDto): Observable<Users>;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createUser",
      "findAllUsers",
      "findOneUser",
      "updateUser",
      "deleteUser",
      "queryUser",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
