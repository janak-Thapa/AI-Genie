"use client"
import { contentTemplates } from '@/lib/contentTemplate';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from "next/image"

const TemplateList = ({searchInput}:{searchInput:string}) => {
  const [templateList, setTemplateList] = useState(contentTemplates)
  useEffect(()=>{
    if(searchInput && searchInput.length>0){
      const filteredTemplates = contentTemplates.filter((item)=>item.name.toLowerCase().includes(searchInput.toLowerCase())
    
    )
    setTemplateList(filteredTemplates)
    } else{
      setTemplateList(contentTemplates)
    }
  },[searchInput])
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mx-5 mt-5 '>
      {templateList.map((template) => (
        <div key={template.slug} className='template-card'>
          <Link href={`/dashboard/${template.slug}`} className=' bg-white w-full rounded-lg h-[200px] py-4 px-4 text-center flex flex-col  shadow-md justify-center cursor-pointer hover:scale-105 transition-all '>
            <div>
              <Image src={template.icon} alt={`${template.name} icon`} className='w-12 h-12 ' width={50} height={50} />
              <h2 className='text-xl font-semibold mt-5'>{template.name}</h2>
              <p className='text-gray-600 line-clamp-3'>{template.desc}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default TemplateList;
