import { auth } from '@/auth'
import './CustomCard.css'
import { client } from '@/sanity/lib/client'
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import Image from 'next/image'
import UserStartups from '@/components/UserStartups'
import { StartupCardSkeleton } from '@/components/StartupCardType'

export const experimental_ppr = true

const page = async ({params} : {params: Promise<{id: string}>}) => {
    const id = (await params).id
    const session = await auth()

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id})

    if(!user) return notFound()
        
  return (
    
   <>
    <section className='w-full pb-10 pt-20 px-6 max-w-7xl mx-auto lg:flex-row flex-col flex gap-10'>
        <div className='w-80 px-6 pb-6 pt-20 flex flex-col justify-center items-center bg-primary border-[5px] border-black shadow-100 rounded-[30px] relative z-0 h-fit max-lg:w-full'>
            <div className='custom-card'>
                <h3 className='text-[24px] font-black text-black uppercase text-center line-clamp-1'>
                    {user.name}
                </h3>
            </div>
            <Image
                src={user.image} alt={user.name} width={220} height={220} className='rounded-full object-cover border-[3px] border-black'
            />
            <p className='text-[30px] font-extrabold text-white mt-7 text-center'>
                @{user?.username}
            </p>
            <p className='mt-1 text-center font-normal text-sm text-white'>
                {user?.bio}
            </p>
        </div>
        <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
            <p className=' text-[30px] font-bold text-black'>
                {session?.id == id ? 'Your' : 'All'} Startups
            </p>
            <ul className='grid sm:grid-cols-2 gap-5'>
                <Suspense fallback={<StartupCardSkeleton/>}>
                <UserStartups id= {id}/> 

                </Suspense>
            </ul>
        </div>
    </section>
   </>
  )
}

export default page
