import { Tweet } from "@/types/tweet";
import { user } from "./user";

export const tweet: Tweet = {

    id: 123,
    user: user,
    body: 'Conquista do meu Golf GTI',
    image: 'https://i.pinimg.com/originals/9d/5b/e9/9d5be9ed21e8ae76d00069b65717bea3.jpg',
    likeCount: 523,
    commentCount: 61,
    retweetCount: 0,
    liked: true,
    retweetd: false,
    dataPost: new Date()
}