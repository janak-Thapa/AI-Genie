import Auth from '@/components/Auth'
import { SearchIcon } from 'lucide-react'
import React from 'react'

const Searchbar = ({onSearchInput}:{onSearchInput:React.Dispatch<React.SetStateAction<string | undefined>>}) => {
  return (
    <div className='mx-5 py-2 '>
        <div className='flex  md:flex-row  gap-2 mt-5 py-6 px-4 bg-white rounded '>

        <div className='flex gap-2 items-center p-2 border rounded-full bg-white w-full md:w-[20%] shadow-sm'>
            <SearchIcon/>
            <input type="text" placeholder='Search...' className='outline-none bg-transparent' 
            onChange={(e)=>onSearchInput(e.target.value)}/>
        </div>
        <div className='ml-auto'>
            <Auth/>
        </div>
        </div>

       
    </div>
  )
}

export default Searchbar