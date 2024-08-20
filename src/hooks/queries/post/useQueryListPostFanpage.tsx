import { useQuery } from '@tanstack/react-query'
import postApi from '~/apis/post.api'

function useQueryListPostFanpage(fanpage_id: string) {
  return useQuery({
    queryKey: ['fanpage_posts', { fanpage_id }],
    queryFn: () => postApi.getAllFanpagePosts(fanpage_id)
  })
}

export default useQueryListPostFanpage
