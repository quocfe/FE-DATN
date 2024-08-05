import messageApi from '~/apis/message.api'

export const fetchConversation = async ({ pageParam }: { pageParam: number }) => {
  const data = await messageApi.getConversation(pageParam, 10)
  return data.data.data.data
}
