/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Users {
    @ObjectIdColumn()
    @Index({ unique: true })
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    @Index({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column()
    @Index({ unique: true })
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

    $or: Array<any>;
}
