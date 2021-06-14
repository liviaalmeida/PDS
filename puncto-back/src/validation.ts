import * as express from 'express';
import {Validator, ValidationError} from "class-validator";
import {plainToClass} from 'class-transformer';

type Constructor<T> = {new(): T};

// funcao de validacao, precisa ser manualmente chamada ao definir
// uma rota com que precisa de validacao de payload
// recebe o DTO da request
export function validate<T extends object>(type: Constructor<T>): express.RequestHandler {
  const validator = new Validator();

  return (req, res, next) => {
    const input = plainToClass(type, req.body);

    const errors = validator.validateSync(input);
    if (errors.length > 0) {
      next(errors);
    } else {
      req.body = input;
      next();
    }
  }
}

// handler dos erros de validacao, faz o parse
// do erro e retorna para o cliente informando 
// qual o problema
export function validationError(err: Error, req, res, next) {
  if (err instanceof Array && err[0] instanceof ValidationError) {
    res.status(400).json({errors: err}).end();
  } else {
    next(err);
  }
}