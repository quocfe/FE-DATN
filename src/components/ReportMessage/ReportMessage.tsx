import { toast } from 'react-toastify'
import useMutationDeleteMessage from '~/pages/Message/hooks/useMutaion/useMutationDeleteGroup'
import { useQueryInfinifyConversation } from '~/pages/Message/hooks/useQuery/useQueryInfinifyConversation'
import useMessageFixStore from '~/store/messageFix.store'
import Dialog from '../Dialog'
import useMutationReportMessage from '~/pages/Message/hooks/useMutaion/useMutationReportMessage'

interface props {
  showDiaLogReportMessage: boolean
  setShowDiaLogReportMessage: (value: boolean) => void
  message_id: string
}

function ReportMessage({ showDiaLogReportMessage, setShowDiaLogReportMessage, message_id }: props) {
  const mutationReport = useMutationReportMessage()

  const handleReportMessage = () => {
    mutationReport.mutate(message_id, {
      onSuccess: () => {
        setShowDiaLogReportMessage(false)
        toast.success('Báo cáo thành công!')
      },
      onError: () => {
        toast.error('Báo cáo thất bại!')
      }
    })
  }
  return (
    <Dialog
      isVisible={showDiaLogReportMessage}
      onClose={() => setShowDiaLogReportMessage(false)}
      type='warning'
      title='Báo cáo tin nhắn'
      description='Chúng tôi sẽ không cho người đó biết là bạn đã báo cáo họ.'
      textBtn='Báo cáo'
      callback={() => handleReportMessage()}
    />
  )
}

export default ReportMessage
