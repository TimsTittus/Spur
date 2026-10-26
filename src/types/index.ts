export type Category = {
  slug: string
  title: string
  description: string
  emoji: string
  color: ColorKey
  topicCount: number
  topics: string[]
}

export type ColorKey =
  | 'amber' | 'purple' | 'teal' | 'coral'
  | 'blue' | 'green' | 'pink' | 'indigo'
