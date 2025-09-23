import { Request, RequestHandler, Response } from "express";

export const ping = (req: Request, resp: Response) => {

    resp.json({ pong: true })
}