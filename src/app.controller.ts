import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern({ role: 'user', cmd: 'signin' })
    signin({ username, password }) {
        try {
            return this.appService.signin(username, password);
        } catch (e) {
            return e;
        }
    }
}
