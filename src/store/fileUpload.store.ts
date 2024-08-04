import { NumericDictionaryIterateeCustom } from 'lodash'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface FileUploadState {
  file: {
    progress: number
    fileSize: string
    originalName: string
    url: string
    resourceType: string
    width: number
    height: number
  }
}

interface FileUploadActions {
  setFile: (file: FileUploadState['file']) => void
}

const useFileUploadStore = create<FileUploadState & FileUploadActions>()((set) => ({
  file: {} as FileUploadState['file'],
  setFile: (file: FileUploadState['file']) => set({ file })
}))

export default useFileUploadStore