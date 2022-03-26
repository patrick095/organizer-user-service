/* eslint-disable @typescript-eslint/indent */
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { IAddress, IUser } from '../interfaces/user.interface';

export class UserDTO implements IUser {
    @IsNotEmpty()
    @MaxLength(14)
    name: string;

    @IsNotEmpty()
    @MaxLength(14)
    lastname: string;

    @IsNotEmpty()
    @MaxLength(17)
    username: string;

    @IsNotEmpty()
    @MaxLength(16)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    email: string;

    @IsNotEmpty()
    @MaxLength(16)
    phone: string;

    @IsNotEmpty()
    address: IAddress;
}
