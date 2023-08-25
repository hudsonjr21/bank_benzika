import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors';
import path from 'path'
import { PrismaClient } from '@prisma/client'; // Importe o Prisma Client
import { router } from './routes'

const prisma = new PrismaClient(); // Inicialize o Prisma Client

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    //Se for uma instancia do tipo error
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })

})

export default app; 

// app.listen(3333, () => console.log('Servidor online!!!!'));