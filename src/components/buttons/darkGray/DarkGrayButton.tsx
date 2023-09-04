import React from 'react'
import { ButtonProp } from '../../../types/buttonType'
import './darkGraybutton.scss'

const DarkGrayButton = ({children, theme} : ButtonProp) => {
  return (
    <button className={`dark-gray-btn ${theme} btn-general`}>{children}</button>
  )
}

export default DarkGrayButton