import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  prisma: PrismaClient;
};

const prisma = new PrismaClient();

const prismaMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  req.prisma = prisma;
  next();
};

export default prismaMiddleware;