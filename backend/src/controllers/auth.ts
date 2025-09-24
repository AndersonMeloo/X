import { RequestHandler } from "express";
import { signupSchema } from "../schemas/signup";
import { findUserByEmail, findUserBySlug } from "../services/user";
import slug from "slug";

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
    // Criar o Usuario
    // Cria o Token de Acesso
    // Retorna o Resultado (Token, User)

    res.json({})
}