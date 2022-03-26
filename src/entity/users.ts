/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Users {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    address: {
        rua: string;
        numero: number;
        bairro: string;
        cidade: string;
        cep: string;
    };

    @Column()
    sessions: Array<string>;
}
