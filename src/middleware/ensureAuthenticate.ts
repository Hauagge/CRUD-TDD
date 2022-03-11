import AppError from "@shared/errors/AppErrors";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
  }
export default async function ensureAuthenticate(request: Request, response:Response, next: NextFunction){
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('Token missing', 401);
    }
    const [, token] = authHeader.split(' ');
  
    try {
      const decoded = verify(token, process.env.APP_SECRET);
  
      const { sub } = decoded as TokenPayLoad;
  
      request.user = {
        id: sub,
      };
  
      return next();
    } catch {
      throw new AppError('Erro de Autenticação1', 401);
    }
}