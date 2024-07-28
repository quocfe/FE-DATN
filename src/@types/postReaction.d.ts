type PostReaction = {
  post_reaction_id: string
  post_id: string
  user_id: string
  type: string
  user_reaction: {
    user_id: string
    first_name: string
    last_name: string
    Profile: BaseProfile
  }
}

type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'
