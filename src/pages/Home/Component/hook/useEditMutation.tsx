import { useMutation } from '@tanstack/react-query'
import storyApi from '~/apis/story.api'

function useMutationEdit() {
  return useMutation({
    mutationFn: ({ id, data }: { id: any, data: any }) => storyApi.updateStory(id, data)
  })
}

export default useMutationEdit
