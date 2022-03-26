import { ArgumentMetadata, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        if (this.isEmpty(value)) {
            throw new RpcException({
                message: 'Validation failed: No payload submitted',
                status: HttpStatus.BAD_REQUEST,
            });
        }

        const object = plainToClass(metatype, value);

        const errors = await validate(object);

        if (errors.length > 0) {
            throw new RpcException({
                message: `Validation failed: ${this.formatErrors(errors)}`,
                status: HttpStatus.BAD_REQUEST,
            });
        }

        return value;
    }

    private isEmpty(value: any) {
        if (Object.keys(value).length === 0) {
            return true;
        }
        return false;
    }

    private formatErrors(errors: any[]) {
        return errors
            .map((err) => {
                for (const property in err.constraints) {
                    return err.constraints[property];
                }
            })
            .join(', ');
    }
}
