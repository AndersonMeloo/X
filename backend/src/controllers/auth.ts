import { RequestHandler } from "express";
import { signupSchema } from "../schemas/signup";
import { createUser, findUserByEmail, findUserBySlug } from "../services/user";
import slug from "slug";
import { compare, hash } from "bcrypt-ts";
import { createJWT } from "../utils/jwt";
import { signinSchema } from "../schemas/signin";

export const signup: RequestHandler = async (req, res) => {

    // Validar os Dados Recebidos
    const safeData = signupSchema.safeParse(req.body) || {}
    if (!safeData.success) {
        return res.json({ error: safeData.error.flatten().fieldErrors })
    }

    // Verificar Email
    const hasEmail = await findUserByEmail(safeData.data.email)
    if (hasEmail) {
        return res.json({ error: 'E-mail já existe' })
    }

    // Verificar Slug
    let genSlug = true;
    let userSlug = slug(safeData.data.name)
    while (genSlug) {
        const hasSlug = await findUserBySlug(userSlug)
        if (hasSlug) {
            let slugSuffix = Math.floor(Math.random() * 999999).toString()
            userSlug = slug(safeData.data.name + slugSuffix)
        } else {
            genSlug = false
        }
    }

    // Gerar Hash de Senha
    const hashPassoword = await hash(safeData.data.password, 10) // Salva no banco de Dados uma Senha 'HASH' Diferente da que o USUARIO criou BCRYPT

    // Criar o Usuario
    const newUser = await createUser({

        slug: userSlug,
        name: safeData.data.name,
        email: safeData.data.email,
        password: hashPassoword
    })

    // Cria o Token de Acesso
    const token = createJWT(userSlug)

    // Retorna o Resultado (Token, User)
    res.status(201).json({

        token,
        user: {
            name: newUser.name,
            slug: newUser.slug,
            avatar: newUser.avatar
        }
    })
}

// Login
export const signin: RequestHandler = async (req, res) => {

    const safeData = signinSchema.safeParse(req.body)
    if (!safeData.success) {
        return res.json({ error: safeData.error.flatten().fieldErrors })
    }

    const user = await findUserByEmail(safeData.data.email)
    if (!user) return res.status(401).json({ error: 'Acesso negado' })

    const verifyPass = await compare(safeData.data.password, user.password)
    if (!verifyPass) return res.status(401).json({ error: 'Acesso negado' })

    const token = createJWT(user.slug)

    res.json({
        
        token,
        user: {
            name: user.name,
            slug: user.slug,
            avatar: user.avatar
        }
    })
}