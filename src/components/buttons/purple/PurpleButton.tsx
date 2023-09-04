import React from 'react'
import { ButtonProp } from '../../../types/buttonType'

const PurpleButton = ({children} : ButtonProp) => {
  return (
    <button>{children}</button>
  )
}

export default PurpleButton