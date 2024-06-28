import messageApi from '~/apis/message.api'
import useConversationStore from '~/store/conversation.store'

export const fetchMessages = async ({ pageParam }: { pageParam: number }): Promise<TypeMessage[]> => {
  const data = await messageApi.getOneToOneMessage('jinbei-22c73-f703-4b16-847d-f61bae05-onepiece', pageParam, 30)
  return data?.data?.data?.messages
  // console.log(selectedConversation)
}
