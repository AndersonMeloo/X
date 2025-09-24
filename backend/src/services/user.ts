import { prisma } from "../utils/prisma"
import { getPublicURL } from "../utils/url"

export const findUserByEmail = async (email: string) => {

    const user = await prisma.findFirst({

        where: { email }
    })

    if (user) {
        return {
            ...user,
            avatar: getPublicURL(user.avatar),
            cover: getPublicURL(user.cover)
        }
    }

    return null
}

export const findUserBySlug = async (slug: string) => {

    const user = await prisma.url.findFirst({

        select: {
            avatar: true,
            cover: true,
            slug: true,
            name: true,
            bio: true,
            link: true
        },
        where: { slug }
    })

    if (user) {
        return {
            ...user,
            avatar: getPublicURL(user.avatar),
            cover: getPublicURL(user.cover)
        }
    }

    return null
}