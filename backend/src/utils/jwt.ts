import jwt from "jsonwebtoken"

// JSON WEB TOKEN
export const createJWT = (slug: string) => {

    return jwt.sign({ slug }, process.env.JWT_SECRET as string)
}