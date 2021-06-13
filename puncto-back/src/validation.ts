import * as express from 'express';
import {deserialize} from 'json-typescript-mapper';
import {Validator} from "class-validator";
import {ValidationError} from 'class-validator';

type Constructor<T> = {new(): T};

// funcao de validacao, precisa ser manualmente chamada ao definir
// uma rota com que precisa de validacao de payload
// recebe o DTO da request
export function validate<T>(type: Constructor<T>): express.RequestHandler {
  const validator = new Validator();

  return (req, res, next) => {
    const input = deserialize(type, req.body);

    // @TODO corrigir tipagem pra nao precisar do tsignore =/
    // @ts-ignore
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