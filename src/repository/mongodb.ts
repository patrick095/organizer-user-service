import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { Connection, createConnection } from 'typeorm';
import { Env } from '../config/env';

export class MongoDB {
    private connection: Observable<Connection>;
    private config = new Env();

    constructor() {}

    public getInstance(): Observable<Connection> {
        if (!this.connection) {
            this.connection = new Observable((observer) => {
                createConnection({
                    type: 'mongodb',
                    url: this.config.MongoUri,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    entities: [`${__dirname}/../entity/*.{ts,js}`],
                    database: this.config.MongoDBName,
                })
                    .then(async (connection) => {
                        // eslint-disable-next-line no-console
                        console.log('MongoDB connected');
                        observer.next(connection);
                        observer.complete();
                    })
                    .catch(() => {
                        throw new RpcException('MongoDB connection error');
                    });
            });
        }
        return this.connection;
    }
}
