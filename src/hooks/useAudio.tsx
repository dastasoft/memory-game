/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from 'react'

import { Howl } from 'howler'

const defaultHowlConfig = {
  autoplay: false,
  loop: false,
  volume: 0.2,
}

const useAudio = (soundName: string) => {
  const [sound] = useState(
    new Howl({
      src: [`/sounds/${soundName}.mp3`],
      ...defaultHowlConfig,
    })
  )

  const play = () => {
    sound.play()
  }

  return [play]
}

export default useAudio
