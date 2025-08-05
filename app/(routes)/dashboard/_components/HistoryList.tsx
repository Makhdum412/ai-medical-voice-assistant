'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import AddNewSessionDialog from './AddNewSessionDialog';

function HistoryList() {
    const [historyList, setHistoryList] = useState([]);
  return (
    <div className='mt-10'>
      {historyList.length === 0 ?
        <div className='flex flex-col items-center p-7 border border-dashed rounded-2xl border-2'>
          <Image src={'/medical-assistance.png'} alt="empty" width={150} height={150} />
          <h2 className='text-xl font-bold mt-4'>No Recent Consultations</h2>
          <p className='text-gray-600 mt-2'>It looks like you haven't consulted with any doctors yet.</p>
           <AddNewSessionDialog />
        </div>
      :
        <div>List </div>
      }
    </div>
  )
}

export default HistoryList