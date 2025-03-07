import { NextFunction, Request, Response } from "express";

export interface RequestCustom extends Request {
  loggedinUser?: any;
}

export interface ResponseCustom extends Response {}

export interface NextFunctionCustom extends NextFunction {}

// Added because the default JavaScript Error class does not have statusCode property
export interface IHTTPError extends Error {
  statusCode: number;
}
