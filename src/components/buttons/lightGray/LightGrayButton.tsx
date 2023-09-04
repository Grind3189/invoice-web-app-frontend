import React from 'react'
import { ButtonProp } from '../../../types/buttonType'


const LightGrayButton = ({children} : ButtonProp) => {
  return (
    <button>{children}</button>
  )
}

export default LightGrayButton