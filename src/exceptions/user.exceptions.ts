import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class UserNotFoundException extends RpcException {
    constructor() {
        super({ message: 'User not found!', status: HttpStatus.NOT_FOUND });
    }
}

export class UserInvalidException extends RpcException {
    constructor() {
        super({ message: 'Invalid username or password!', status: HttpStatus.UNAUTHORIZED });
    }
}

export class UserRegisteredException extends RpcException {
    constructor() {
        super({ message: 'User already exists!', status: HttpStatus.BAD_REQUEST });
    }
}
