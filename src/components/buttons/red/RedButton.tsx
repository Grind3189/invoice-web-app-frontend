import React from 'react'
import { ButtonProp } from '../../../types/buttonType'


const RedButton = ({children} : ButtonProp) => {
  return (
    <button>{children}</button>
  )
}

export default RedButton