import React from 'react'
import Dialog from '../Dialog'

interface props {
  showDiaLogFeatureNotAllow: boolean
  setShowDiaLogFeatureNotAllow: (value: boolean) => void
}
function FeatureNotAllow({ showDiaLogFeatureNotAllow, setShowDiaLogFeatureNotAllow }: props) {
  return (
    <Dialog
      isVisible={showDiaLogFeatureNotAllow}
      onClose={() => setShowDiaLogFeatureNotAllow(false)}
      type='notification'
      title='Chức năng chưa sẳn có!'
      description='Chức năng sẽ được chúng tôi phát triển trong tương lai!'
      // callback={() => handleFeatureNotAllow()}
    />
  )
}

export default FeatureNotAllow
