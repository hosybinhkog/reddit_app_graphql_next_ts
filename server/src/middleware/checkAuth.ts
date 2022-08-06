import { Context } from './../types/Context';
import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from 'apollo-server-core';


export const checkAuth: MiddlewareFn<Context> = ({ context: { req } }, next) => {
  if(req.session.userId) return next()

  throw new AuthenticationError('Not authenticated GRAPHQL')
}