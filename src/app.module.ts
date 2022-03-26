import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Env } from './config/env';
import { MongoDB } from './repository/mongodb';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: new Env().Secret,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [AppController],
    providers: [AppService, MongoDB],
})
export class AppModule {}
