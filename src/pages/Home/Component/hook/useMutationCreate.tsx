import { useMutation } from '@tanstack/react-query'
import storyApi from '~/apis/story.api'
function useMutationLogin() {
  return useMutation({
    mutationFn: (data: any) => storyApi.addNewStory(data)
  })
}

export default useMutationLogin
