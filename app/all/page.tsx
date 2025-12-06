'use client'
import { AllPropertyAction } from '@/Actions/PropertyAction'
import { property } from '@/db/schema'
import { useCurrentUser } from '@/hook/hook'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [showallProperties, setShowallProperties] = useState<property[]|null>(null)

    useEffect(() => {
        allProperties()
    }, [])

    const {email} = useCurrentUser()

    const allProperties = async () => {
       const all:property[] =  await AllPropertyAction()
        setShowallProperties(all)
    }
  return (
    <div>
      {showallProperties && showallProperties.map((p)=>
    <div key={p.id}>
        <img src={p.image}/>
        <p>{p.pname}</p>
        <p>By:{p.email}</p>
    </div>
    )}
    </div>
  )
}

export default page
