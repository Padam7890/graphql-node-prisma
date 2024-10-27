import { NextFunction, Request, Response } from "express";

import { Express } from "express";

export function errorHandler(app: Express) {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`[Express Error]: ${err.message}`);
    res.status(err.status || 500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  });
}
