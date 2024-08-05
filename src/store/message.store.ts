import { create } from 'zustand'
import callingAudioMessage from '../assets/sound/Calling.mp3'
import endCallAudio from '../assets/sound/end-call.mp3'
import inComingCallAudio from '../assets/sound/IncomingCall.mp3'
import connectingCallAudio from '../assets/sound/Connecting.mp3'

interface State {
  goToOldMessage: string
  loadingMessage: boolean
  errorMessage: boolean
  acceptCall: boolean
  inCommingVideoCall:
    | {
        [key: string]: any
      }
    | undefined
  videoCall:
    | {
        [key: string]: any
      }
    | undefined
  voiceCall:
    | {
        [key: string]: any
      }
    | undefined
  dataCall:
    | {
        [key: string]: any
      }
    | undefined
  callingMessageCallAudio: HTMLAudioElement
  connectingMessageCallAudio: HTMLAudioElement
  endCallAudio: HTMLAudioElement
  inComingCallAudio: HTMLAudioElement
}

interface Action {
  setGoToOldMessage: (goToOldMessage: string) => void
  setLoadingMessage: (loadingMessage: boolean) => void
  setErrorMessage: (errorMessage: boolean) => void
  setAcceptCall: (acceptCall: boolean) => void
  setInCommingVideoCall: (inCommingVideoCall: []) => void
  setVideoCall: (videoCall: {}) => void
  setVoiceCall: (voiceCall: {}) => void
  setCallingMessageCallAudio: (callingMessageCallAudio: HTMLAudioElement) => void
  setConnectingMessageCallAudio: (connectingMessageCallAudio: HTMLAudioElement) => void
  setEndCallAudio: (endCallAudio: HTMLAudioElement) => void
  setInComingCallAudio: (inComingCallAudio: HTMLAudioElement) => void
  setDataCall: (dataCall: {}) => void
}

export const useMessageStore = create<State & Action>((set: any) => ({
  goToOldMessage: '',
  loadingMessage: false,
  errorMessage: false,
  acceptCall: false,
  inCommingVideoCall: undefined,
  videoCall: undefined,
  voiceCall: undefined,
  callingMessageCallAudio: new Audio(callingAudioMessage),
  endCallAudio: new Audio(endCallAudio),
  inComingCallAudio: new Audio(inComingCallAudio),
  connectingMessageCallAudio: new Audio(connectingCallAudio),
  dataCall: undefined,

  setDataCall: (dataCall) => set({ dataCall }),
  setAcceptCall: (acceptCall) => set({ acceptCall }),
  setConnectingMessageCallAudio: (connectingMessageCallAudio) => set({ connectingMessageCallAudio }),
  setInComingCallAudio: (inComingCallAudio) => set({ inComingCallAudio }),
  setEndCallAudio: (endCall) => set({ endCall }),
  setCallingMessageCallAudio: (ringMessageAudio) => set({ ringMessageAudio }),
  setLoadingMessage: (loadingMessage) => set({ loadingMessage }),
  setGoToOldMessage: (goToOldMessage) => set({ goToOldMessage }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setInCommingVideoCall: (inCommingVideoCall) => set({ inCommingVideoCall }),
  setVideoCall: (videoCall) => set({ videoCall }),
  setVoiceCall: (voiceCall) => set({ voiceCall })
}))

export default useMessageStore
