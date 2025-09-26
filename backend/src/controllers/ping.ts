import { Request, RequestHandler, Response } from "express";
import { ExtendedRequest } from "../types/extended-request";

export const ping = (req: Request, resp: Response) => {

    resp.json({ pong: true })
}

export const privatePing = (req: ExtendedRequest, resp: Response) => {

    resp.json({ pong: true, slug: req.userSlug })
}