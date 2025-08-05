import React from 'react'
import { AIDoctorAgents } from '@/shared/list'
import DoctorAgentCard from './DoctorAgentCard'

function DoctorsAgentList() {
  return (
    <div className='mt-10'>
        <h2 className='text-xl font-bold'>AI Specialists Doctors Agents</h2>
        <div className='grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-8 mt-5'>
            {Array.isArray(AIDoctorAgents) && AIDoctorAgents.map((doctor, index) => (
                <div key={doctor.id ?? index}>
                    <DoctorAgentCard doctorAgent={doctor} />
                </div>
            ))}
        </div>
    
           
        </div>
       
  )
}

export default DoctorsAgentList
