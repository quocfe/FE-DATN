import { useMutation } from '@tanstack/react-query'
import storyApi from '~/apis/story.api'
function useMutationRemove() {
  return useMutation({
    mutationFn: (data: number | string) => storyApi.deleteStory(data)
  })
}

export default useMutationRemove
