"use client"
import dynamic from "next/dynamic"
import { useMemo } from "react"
import 'react-quill/dist/quill.snow.css'

const Editor = ({value}:{value:string}) => {
  const ReactQuill = useMemo(
    ()=> dynamic(()=> import ("react-quill"),
{ssr:false}),
[]
  )
    return (
    <ReactQuill
    theme="snow"
    value={value}
    className="h-[380px] pb-10 bg-white  whitespace-pre-wrap"
    
    >
      
    </ReactQuill>
  )
}

export default Editor
