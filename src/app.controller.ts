import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserDTO } from './dto/userDTO';
import { UserSigninDTO } from './dto/userSigninDTO';
import { CustomValidationPipe } from './pipe/validation.pipe';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern({ role: 'user', cmd: 'signin' })
    @UsePipes(new CustomValidationPipe())
    signin({ username, password }: UserSigninDTO) {
        return this.appService.signin(username, password);
    }

    @MessagePattern({ role: 'user', cmd: 'signup' })
    @UsePipes(new CustomValidationPipe())
    signup(user: UserDTO) {
        return this.appService.signup(user);
    }
}
