import { ClientProxy } from '@nestjs/microservices';
import { ExecutionContext, Inject, Logger } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { lastValueFrom, timeout } from 'rxjs';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const checkAuth = await this.client
        .send(
          { role: 'auth', cmd: 'check' },
          { jwt: req.headers['authorization']?.split(' ')[1] },
        )
        .pipe(timeout(5000));

      const res = await lastValueFrom(checkAuth);

      return res;
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
}
