import { useMutation } from '@tanstack/react-query'
import storyApi from '~/apis/story.api'

function useMutationArchive() {
  return useMutation({
    mutationFn: (storyId: string) => storyApi.moveToArchive(storyId)
  })
}

export default useMutationArchive
