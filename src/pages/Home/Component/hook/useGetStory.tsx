import { useQuery } from '@tanstack/react-query'
import storyApi from '~/apis/story.api'
function useQueryStory() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: storyApi.fetchAllStory,
    staleTime: 30 * 60 * 1000
  })
}

export default useQueryStory
