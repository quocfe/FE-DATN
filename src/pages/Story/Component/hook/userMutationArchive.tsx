import { useMutation } from '@tanstack/react-query'
import storyApi from '~/apis/story.api'

function useMutationRestore() {
  return useMutation({
    mutationFn: (storyId: string) => storyApi.unarchiveStory(storyId),
  })
}

export default useMutationRestore
