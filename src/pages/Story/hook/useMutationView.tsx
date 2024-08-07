import { useMutation } from '@tanstack/react-query'
import storyApi from '~/apis/story.api'
function useMutationView() {
  return useMutation({
    mutationFn: (data: any ) => storyApi.CountViewStory(data)
  })
}

export default useMutationView
