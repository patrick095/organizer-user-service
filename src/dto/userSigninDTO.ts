/* eslint-disable @typescript-eslint/indent */
import { IsNotEmpty, MaxLength } from 'class-validator';
import { ISigninUser } from '../interfaces/user.interface';

export class UserSigninDTO implements ISigninUser {
    @IsNotEmpty()
    @MaxLength(17)
    username: string;

    @IsNotEmpty()
    @MaxLength(16)
    password: string;
}
