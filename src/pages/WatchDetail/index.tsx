import React from 'react'
import ChatBox from './component/ChatBox'
import Content from './component/Content'
// import PreviewModal from './component/PreviewModal'

function WatchDetail() {
  return (
    <React.Fragment>
      <Content />
      {/* open chat box */}
      <ChatBox />
      {/* post preview modal */}
      {/* <PreviewModal /> */}
    </React.Fragment>
  )
}

export default WatchDetail
