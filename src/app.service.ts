/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Env } from './config/env';
import { Users } from './entity/users';
import { UserInvalidException, UserNotFoundException, UserRegisteredException } from './exceptions/user.exceptions';
import { IAddress, IUser } from './interfaces/user.interface';
import { MongoDB } from './repository/mongodb';

@Injectable()
export class AppService {
    private UsersRepo: Repository<Users>;
    private salt: number;
    private config = new Env();
    constructor(private repo: MongoDB, private jwt: JwtService) {
        repo.getInstance().subscribe(async (connection) => {
            this.UsersRepo = connection.getRepository(Users);
        });
        this.salt = this.config.bcryptSalt;
    }

    public async signin(username: string, password: string) {
        if (!username || !password) {
            throw new UserInvalidException();
        }

        const userDb = await this.UsersRepo.findOne({ where: { username } });

        if (!userDb) {
            throw new UserNotFoundException();
        }

        const isPasswordValid = await bcrypt.compare(password, userDb.password);
        if (!isPasswordValid) {
            throw new UserInvalidException();
        }

        return {
            user: this.clearPrivateFields(userDb),
            token: this.generateToken(userDb._id.toString()),
        };
    }

    public async signup(newUser: IUser) {
        const { username, email, password, phone, address, name, lastname } = newUser;
        if (!username || !email || !password || !phone || !address) {
            throw new UserInvalidException();
        }

        const userDb = await this.UsersRepo.findOne({ where: { username } });

        if (userDb) {
            throw new UserRegisteredException();
        }

        const hash = await bcrypt.hash(password, this.salt);

        const user = new Users();
        user.username = username;
        user.email = email;
        user.password = hash;
        user.phone = phone;
        user.address = address;
        user.name = name;
        user.lastname = lastname;

        const savedUser = await this.UsersRepo.save(user);

        return {
            user: this.clearPrivateFields(savedUser),
            token: this.generateToken(savedUser._id.toString()),
        };
    }

    public async update(username: string, email: string, password: string, phone: string, address: IAddress) {
        if (!username || !email || !password || !phone || !address) {
            throw new UserInvalidException();
        }

        const userDb = await this.UsersRepo.findOne({ where: { username } });

        if (!userDb) {
            throw new UserNotFoundException();
        }

        const isPasswordValid = await bcrypt.compare(password, userDb.password);
        if (!isPasswordValid) {
            throw new UserInvalidException();
        }

        userDb.phone = phone;
        userDb.address = address;

        const savedUser = await this.UsersRepo.save(userDb);

        return {
            user: this.clearPrivateFields(savedUser),
            token: this.generateToken(savedUser._id.toString()),
        };
    }

    private clearPrivateFields(user: Users): Users {
        const UserDB = user;
        UserDB.password = undefined;
        UserDB.sessions = undefined;
        return UserDB;
    }

    private generateToken(id: string) {
        return this.jwt.sign({ id });
    }
}
