import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import storyApi from '~/apis/story.api'
function useQueryStory() {
  const [searchParams] = useSearchParams()
  const storyId = searchParams.get('id')
  return useQuery({
    queryKey: ['stories', storyId],
    queryFn: () => storyApi.fetchAllStory(),
    staleTime: 30 * 60 * 1000
  })
}

export default useQueryStory
