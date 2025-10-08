'use client'

import { user } from "@/data/user"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "../ui/button"
import { useState } from "react"
import { apiFetch } from "@/utils/api"
import { Tweet } from "@/types/tweet"

type Props = {
  onTweetSent?: (tweet: Tweet) => void
}

export const TweetPost = ({ onTweetSent }: Props) => {
  const [tweetBody, setTweetBody] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageUpload = () => {}

  const handlePostClick = async () => {
    if (!tweetBody.trim()) {
      setMessage('Digite algo para postar')
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const data = await apiFetch('/tweet', {
        method: 'POST',
        body: JSON.stringify({ body: tweetBody })
      })

      console.log('Novo Tweet', data)
      setMessage('Tweet enviado com sucesso!')
      setTweetBody('')

      // Adiciona o tweet no feed
      if (onTweetSent && data.tweet) onTweetSent(data.tweet)
    } catch (err: any) {
      console.log(err)
      setMessage('Erro ao enviar o Tweet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-6 px-8 py-6 border-b-2 border-gray-900">
      <div>
        <img src={user.avatar} alt={user.name} className="size-12 rounded-full" />
      </div>

      <div className="flex-1">
        <textarea
          value={tweetBody}
          onChange={(e) => setTweetBody(e.target.value)}
          placeholder="O que está acontecendo?"
          className="w-full min-h-14 bg-transparent outline-none text-lg text-white placeholder-gray-500 resize-none"
        />

        <div className="flex justify-between items-center mt-2">
          <div onClick={handleImageUpload} className="cursor-pointer">
            <FontAwesomeIcon icon={faImage} className="size-6" />
          </div>

          <div className="w-28">
            <Button
              label={loading ? 'Postando tweet...' : 'Postar'}
              size={2}
              onClick={handlePostClick}
              disable={loading}
            />
          </div>
        </div>

        {message && <p className="text-sm text-gray-400 mt-2">{message}</p>}
      </div>
    </div>
  )
}
