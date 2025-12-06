'use client'
import { AllPropertyAction } from '@/Actions/PropertyAction'
import { property } from '@/db/schema'
import { useCurrentUser } from '@/hook/hook'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [showallProperties, setShowallProperties] = useState<property[]|null>(null)

    useEffect(() => {
        allProperties()
    }, [])

    const {email} = useCurrentUser()
    const {id} = useParams()

    const allProperties = async () => {
       const all:property[] =  await AllPropertyAction()
        setShowallProperties(all)
    }
  return (
    <div>
      {showallProperties && showallProperties.map((p)=>
    <a key={p.id}  href={`/single/${p.id}`}>
        <img src={p.image}/>
        <p>{p.pname}</p>
        <p>By:{p.email}</p>
    </a>
    )}
    </div>
  )
}

export default page
