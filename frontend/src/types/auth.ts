// types/auth.ts
import { User } from "./user"

// Reflete o retorno do backend
export type AuthUserData = {
    user: User      
    followersCount: number
    followingCount: number
    tweetCount: number
}
