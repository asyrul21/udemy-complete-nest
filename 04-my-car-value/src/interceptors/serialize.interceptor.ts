import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';

// make sure argument is any class
interface ClassContructor {
  new (...args: any[]): {};
}

// custom wrapper decorator
export function Serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// custom interceptor
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run somethin before a request is handled
    // by the request handler
    console.log('Im running before the handler. Context:', context);
    return next.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        // console.log('I am running before response is sent out. Data:', data);

        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
