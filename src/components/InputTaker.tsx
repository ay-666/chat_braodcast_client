import React from 'react'

const InputTaker = ({text,ref} : {text:string,ref:any}) => {
  return (
    <input ref={ref} placeholder={text} className='rounded p-3 border-2 border-[#D4C9BE] focus:outline-2 focus:outline-white ' >
        
    </input>
  )
}

export default InputTaker