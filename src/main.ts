import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Env } from './config/env';

const env = new Env();

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            port: env.Port,
        },
    });
    await app.listen().then(() => {
        console.log('user-service is listening on port ' + env.Port);
    });
}
bootstrap();
