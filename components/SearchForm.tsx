
import React from 'react'

import Form from 'next/form'
import SearchFormButtonCross from './SearchFormButtonCross'
import { SearchIcon } from 'lucide-react'

const SearchForm = ({query}  : {query?: string}) => {

  return (
    <Form action='/' scroll={false} id='search_form' className=' max-w-3xl w-full min-h-[80px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8  px-5 flex flex-row items-center gap-5;'>
        <input name='query' defaultValue={query} className='flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none' placeholder='Search Startups Here'/>

        <div className='flex gap-2'>
            {query && <SearchFormButtonCross/>}
            <button type='submit' className='size-[50px] rounded-full bg-black flex justify-center items-center text-white'> <SearchIcon className='size-5'/> </button>
        </div>
    </Form>
  )
}

export default SearchForm
