"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { ArrowRight, Loader2 } from 'lucide-react' 
import axios from 'axios'
import DoctorAgentCard, { doctorAgent } from './DoctorAgentCard'
import { index } from 'drizzle-orm/gel-core'
import SuggestedDoctorCard from './SuggestedDoctorCard'
import { SessionChatTable } from '@/config/schema'

// Component for adding a new session dialog
function AddNewSessionDialog() {
  const [note, setNote] = useState<string>();
  const[loading, setLoading] = useState(false);
  const[suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const onClickNext = async () => {
    setLoading(true);
    const result = await axios.post('/api/suggest-doctors', {
      notes: note,
    });
    console.log(result.data);
    setSuggestedDoctors(result.data);
    setLoading(false);
  }

  const onStartConsultation = async() => {
    setLoading(true);
      const result = await axios.post('/api/session-chat', {
        notes: note,
        selectedDoctor: selectedDoctor,
      });
      console.log(result.data);
      if(result.data?.sessionID) {
         console.log('Session ID:', result.data.sessionID);
      }
      setLoading(false);
  }

  return (
    <Dialog>
  <DialogTrigger asChild>
        <Button className='mt-4'>+ Start a Consultation</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basic Details</DialogTitle>
      <DialogDescription asChild>
        {!suggestedDoctors ?<div>
            <h2>Add Symptoms and Medical History</h2>
            <Textarea placeholder='Add your details here...' className='h-[250px] mt-3' onChange={(e)=>setNote(e.target.value)} />
        </div>: 
        <div>
          <h2>Select the Doctor</h2>
        <div className='grid grid-cols-3 gap-5'>
         {/* {Suggested Doctors} */}
         {suggestedDoctors.map((doctor, index) => (
          <SuggestedDoctorCard doctorAgent={doctor} key={index}
           setSelectedDoctor={() => setSelectedDoctor(doctor)}
           //@ts-ignore
           selectedDoctor={selectedDoctor}    />
         ))}
         </div>
        </div>}
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose asChild>
          <Button variant={'outline'}>Close</Button>
        </DialogClose>
     {!suggestedDoctors ? 
        <Button disabled={!note || loading} onClick={() => onClickNext()}>
          Next {loading ? <Loader2 className='animate-spin mr-2' /> : <ArrowRight />}
        </Button>
       : 
        <Button disabled={loading || !selectedDoctor} onClick={() => onStartConsultation()}> Start Consultation
        {loading ? <Loader2 className='animate-spin mr-2' /> : <ArrowRight />}
        </Button>
}
      
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default AddNewSessionDialog
