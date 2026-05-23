import { FastifyRequest, FastifyReply } from 'fastify';
import { ErrorBadRequest, ErrorForbidden, ErrorNotAuth } from './errors';
import { logger } from '../logger/logger.service';

export default async function errorMiddleware(
  err: any,
  _: FastifyRequest,
  reply: FastifyReply
) {
  if (err instanceof ErrorNotAuth) {
    logger.error(`[ERROR] 401: ${err.message}`);
    return reply
      .status(401)
      .send({ errorMsg: 'NOT AUTH', error: { message: err.message } });
  }

  if (err instanceof ErrorBadRequest) {
    logger.error(`[ERROR] 400: ${err.message}`);
    return reply
      .status(400)
      .send({ errorMsg: 'Validate error', error: { message: err.message } });
  }

  if (err instanceof ErrorForbidden) {
    logger.error(`[ERROR] 403: ${err.message}`);
    return reply
      .status(403)
      .send({ errorMsg: 'Forbidden', error: { message: err.message } });
  }

  logger.error(`[ERROR] 500: ${err.message || 'Server error'}`);
  return reply
    .status(500)
    .send({ state: 'Some error', error: { message: 'Server error' } });
}