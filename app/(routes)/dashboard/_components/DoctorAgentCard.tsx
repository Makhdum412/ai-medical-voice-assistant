'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import AddNewSessionDialog from './AddNewSessionDialog'

export type doctorAgent={
    id: number,
    specialist: string,
    description: string,
    image: string,
    agentPrompt: string,
    voiceId: string,
    subscriptionRequired: boolean,
}
type props={
    doctorAgent: doctorAgent
}
function DoctorAgentCard(doctorAgent: props) {
  return (
    <div className=''>
        <Image src={doctorAgent.doctorAgent.image} alt={doctorAgent.doctorAgent.specialist} width={200} height={300} className='w-full h-[250px] object-cover rounded-xl' />
    <h2 className='font-bold mt-1'>{doctorAgent.doctorAgent.specialist}</h2>
    <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent.doctorAgent.description}</p>
    <Button className='w-full mt-2' > Stat Consultation <IconArrowRight /></Button>
    
    </div>

  )
}

export default DoctorAgentCard