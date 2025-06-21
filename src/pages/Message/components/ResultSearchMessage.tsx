import useConversationStore from '~/store/conversation.store'
import useMutationSearchMessage from '../hooks/useQuery/useSearchMessage'
import { useEffect, useRef, useState } from 'react'
import ResultSearchMessageSkelaton from './Skelaton/ResultSearchMessageSkelaton'
import { highlightMatchedText } from '../utils/highlightMatchedText'
import { handleToOldMessage } from '../utils/handleToOldMessage'
import BoxSearchMessage from './BoxSearchMessage'
import { useQueryInfinifyMessage } from '../hooks/useQuery/useQueryInfinifyMessage'
import { useQueryMessage } from '../hooks/useQuery/useQueryMessage'

function ResultSearchMessage() {
  const boxSearchRef = useRef<HTMLDivElement>(null)
  const [searchMessages, setSearchMessages] = useState<TypeMessage[]>([])
  const { searchParam: query, selectedConversation, toggleBoxSearchMessage } = useConversationStore()
  const searchMutation = useMutationSearchMessage()
  const { hasNextPage, fetchNextPage } = useQueryInfinifyMessage()
  const { data: temp, refetch } = useQueryMessage(1, 30)

  useEffect(() => {
    searchMutation.mutate(
      {
        query,
        conversationId: selectedConversation?.group_id ? selectedConversation?.group_id : ''
      },
      {
        onSuccess: (data: any) => {
          const message = data?.data.data
          setSearchMessages(message)
        },
        onError: () => {
          setSearchMessages([])
        }
      }
    )
  }, [query])

  useEffect(() => {
    refetch()
  }, [])

  const handleClickToOldMessage = async (message_id: string) => {
    let checkEl = document.getElementById(message_id)

    while (!checkEl) {
      // Gọi hàm loadMoreMessages để tải thêm dữ liệu
      const fetch = await fetchNextPage()

      setTimeout(() => {
        const element = document.getElementById(message_id)
        if (element) {
          handleToOldMessage(message_id)
        } else {
          console.log(' không tìm thấy tin nhắn cần tìm trong setTimeout')
          return
        }
      }, 300)

      if (!fetch.hasNextPage) {
        console.log('Đã tải hết tin nhắn, không tìm thấy tin nhắn cần tìm.')
        return
      }
    }

    if (checkEl) {
      setTimeout(() => {
        const element = document.getElementById(message_id)
        if (element) {
          handleToOldMessage(message_id)
        }
      }, 300)
      console.log('Đã di chuyển tới tin nhắn.')
    } else {
      console.log('Không tìm thấy tin nhắn.')
    }
  }

  return (
    <div className='relative hidden border-r md:block md:w-[360px] dark:border-slate-700'>
      <div
        id='side-chat'
        className='dark:bg-dark2 left-0 top-0 z-50 bg-white max-md:fixed max-md:h-screen max-md:w-5/6 max-md:-translate-x-full max-md:shadow'
      >
        <div className='flex flex-col gap-2 border-b p-4 dark:border-slate-700'>
          <h3 className='text-[16px] font-semibold'>Kết quả tìm kiếm</h3>
          <p className='text-[14px] '>Nhập nội dung cần tìm trong đoạn hội thoại</p>
          {toggleBoxSearchMessage && <BoxSearchMessage boxSearchRef={boxSearchRef} />}
        </div>
        {searchMutation.status === 'success' ? (
          <>
            <div className='h-[calc(100vh-130px)] space-y-2 overflow-y-auto p-2 md:h-[calc(100vh-204px)]'>
              <p className='p-2 text-[16px] font-bold text-[#000]'>Tin nhắn</p>
              {searchMessages.length > 0 ? (
                searchMessages.map((message) => (
                  <div
                    onClick={() => handleClickToOldMessage(message.message_id)}
                    key={message.message_id}
                    className='relative flex cursor-pointer items-center gap-4 rounded-xl p-2 duration-200 hover:bg-secondery'
                  >
                    <div className='relative h-14 w-14 shrink-0'>
                      <img src={message.thumbnail} className='h-full w-full rounded-full object-cover' />
                      <div className='absolute bottom-0 right-0 h-4 w-4 rounded-full border border-white bg-green-500 dark:border-slate-800' />
                    </div>
                    <div className='flex h-full min-w-0 flex-1 flex-col justify-evenly gap-1'>
                      <div className='mr-auto truncate text-sm font-medium text-black dark:text-white '>
                        {message.user_name}
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium text-gray-800'>
                          <div dangerouslySetInnerHTML={{ __html: highlightMatchedText(message.body, query) }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className='p-2 text-[14px]  text-[#000]'>Không tìm thấy tin nhắn</p>
              )}
            </div>
          </>
        ) : searchMutation.status === 'pending' ? (
          <ResultSearchMessageSkelaton />
        ) : (
          <div className='mt-[100px] px-4 py-8'>
            <img
              className='m-auto w-[160px]'
              src='https://chat.zalo.me/assets/search-empty.a19dba60677c95d6539d26d2dc363e4e.png'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultSearchMessage
