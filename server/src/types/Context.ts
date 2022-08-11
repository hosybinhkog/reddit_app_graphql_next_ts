import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Connection } from "typeorm";

export type Context = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number | string };
  };
  res: Response;
  connection: Connection;
};
