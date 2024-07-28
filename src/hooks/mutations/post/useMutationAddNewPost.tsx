import { useMutation } from '@tanstack/react-query'
import postApi from '~/apis/post.api'

function useMutationAddNewPost() {
  return useMutation({
    mutationFn: (formData: FormData) => postApi.addNewPost(formData)
  })
}

export default useMutationAddNewPost
