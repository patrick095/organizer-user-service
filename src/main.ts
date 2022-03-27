import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Env } from './config/env';

const logger = new Logger('user-service');
const env = new Env();

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            port: env.Port,
        },
    });
    await app.listen().then(() => {
        logger.log('user-service is listening');
    });
}
bootstrap();
