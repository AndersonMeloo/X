import { sl } from "zod/v4/locales"
import { prisma } from "../utils/prisma"
import { getPublicURL } from "../utils/url"

export const findTweet = async (id: number) => {

    const tweet = await prisma.tweet.findFirst({

        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                    slug: true
                }
            },

            likes: {
                select: {
                    userSlug: true
                }
            }
        },

        where: { id }
    })

    if (tweet) {
        tweet.user.avatar = getPublicURL(tweet.user.avatar)
        return tweet
    }

    return null
}

export const createTweet = async (slug: string, body: string, answer?: number) => {

    const newTweet = await prisma.tweet.create({

        data: {
            body,
            userSlug: slug,
            answerOf: answer ?? 0
        }
    })

    return newTweet
}

export const findAnswersFromTweet = async (id: number) => {

    const tweets = await prisma.tweet.findMany({

        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                    slug: true
                }
            },
            likes: {
                select: {
                    userSlug: true
                }
            }
        },

        where: { answerOf: id }
    })

    for (let tweetIndex in tweets) {
        tweets[tweetIndex].user.avatar = getPublicURL(tweets[tweetIndex].user.avatar)
    }

    return tweets
}

export const checkIfTweetIsLikedByUser = async (slug: string, id: number) => {

    const isLiked = await prisma.tweetLike.findFirst({

        where: {
            userSlug: slug,
            tweeId: id
        }
    })

    return isLiked ? true : false
}

export const unLikeTweet = async (slug: string, id: number) => {

    await prisma.tweetLike.deleteMany({

        where: {
            userSlug: slug,
            tweeId: id
        }
    })
}

export const likeTweet = async (slug: string, id: number) => {

    await prisma.tweetLike.create({

        data: {
            userSlug: slug,
            tweeId: id  
        }
    })
}