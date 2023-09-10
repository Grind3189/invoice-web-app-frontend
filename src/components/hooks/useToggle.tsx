import {useState} from 'react'

const useToggle = (initialVal: boolean): [boolean, () => void] => {

const [isToggle, setIsToggle] = useState<boolean>(initialVal)

function toggle() {
    setIsToggle(prev => !prev)
}

  return [isToggle, toggle]
}

export default useToggle