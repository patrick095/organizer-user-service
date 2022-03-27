export class Env {
    private isProd: boolean;

    constructor() {
        this.isProd = process.env.NODE_ENV === 'production';
    }

    public get Secret(): string {
        return this.isProd ? process.env?.SECRET.toString() : 'secret';
    }

    public get MongoUri(): string {
        return (
            process.env?.TYPEORM_URL.toString() ??
            'mongodb://root:123456@localhost:27017/Organizer-user?authSource=admin'
        );
    }

    public get MongoDBName(): string {
        return this.isProd ? process.env?.DB_NAME.toString() : 'Organizer-user';
    }

    public get Port(): number {
        return this.isProd ? Number(process.env?.PORT) : 3001;
    }

    public get bcryptSalt(): number {
        return this.isProd ? Number(process.env?.BCRYPT_SALT) : 10;
    }

    public get CorsOrigin(): string {
        return this.isProd ? process.env?.CORS_ORIGIN.toString() : '*';
    }
}
