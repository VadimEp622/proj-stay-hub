import { NextFunction, Request, Response } from "express";

// INFO: current app flow is based on cookie auth.  an encrypted object is stored in the cookie as a token.
//    the enctrypted object should (WIP) contain only the user's id.

interface ILoggedinUser {
  _id: string;
  fullname: string;
  isAdmin?: boolean;
}

export interface RequestCustom extends Request {
  loggedinUser?: any;
}

export interface ResponseCustom extends Response {}

export interface NextFunctionCustom extends NextFunction {}

// Added because the default JavaScript Error class does not have statusCode property
export interface IHTTPError extends Error {
  statusCode: number;
}
