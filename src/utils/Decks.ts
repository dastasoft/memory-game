import { Card } from '@/types'

const DB_CARDS: Card[] = [
  { imageURL: '/images/dragon-ball/freezer.png' },
  { imageURL: '/images/dragon-ball/gohan.png' },
  { imageURL: '/images/dragon-ball/goku-black.png' },
  { imageURL: '/images/dragon-ball/goku.png' },
  { imageURL: '/images/dragon-ball/jiren.png' },
  { imageURL: '/images/dragon-ball/vegeta.png' },
]

const DS_CARDS: Card[] = [
  { imageURL: '/images/demonslayer/inosuke.png' },
  { imageURL: '/images/demonslayer/masked-sabito.png' },
  { imageURL: '/images/demonslayer/muzan.png' },
  { imageURL: '/images/demonslayer/rengoku.jpg' },
  { imageURL: '/images/demonslayer/tanjirou.png' },
  { imageURL: '/images/demonslayer/zenitsu.png' },
]

const AOT_CARDS: Card[] = [
  { imageURL: '/images/attack-on-titan/armored-titan.png' },
  { imageURL: '/images/attack-on-titan/attack-titan.jpg' },
  { imageURL: '/images/attack-on-titan/eren.png' },
  { imageURL: '/images/attack-on-titan/female-titan.png' },
  { imageURL: '/images/attack-on-titan/levi.png' },
  { imageURL: '/images/attack-on-titan/mikasa.png' },
]

const DECKS = {
  'Dragon Ball': DB_CARDS,
  Demonslayer: DS_CARDS,
  'Attack on Titan': AOT_CARDS,
}

export { DECKS }
