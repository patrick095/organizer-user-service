export class Env {
    public get Secret(): string {
        return process.env?.SECRET.toString() || 'secret';
    }

    public get MongoUri(): string {
        return process.env?.TYPEORM_URL.toString() || 'mongodb://localhost:27017/test';
    }

    public get MongoDBName(): string {
        return process.env?.DB_NAME.toString() || 'Organizer';
    }

    public get Port(): number {
        return Number(process.env?.PORT) || 3000;
    }

    public get bcryptSalt(): number {
        return Number(process.env?.BCRYPT_SALT) || 10;
    }

    public get CorsOrigin(): string {
        return process.env?.CORS_ORIGIN.toString() || '*';
    }
}
