'use client'
import { UserAllPropertyAction } from '@/Actions/PropertyAction'
import { property } from '@/db/schema'
import { useCurrentUser } from '@/hook/hook'
import React, { useEffect, useState } from 'react'

const page = () => {

    const {email} = useCurrentUser()

    const [showuserproperties, setShowuserproperties] = useState<property[]|null>(null)

    useEffect(() => {
        if(email) userallProperties(email)
    }, [email])
    

    const userallProperties = async (email:string) => {
        const userall:property[] = await UserAllPropertyAction(email)
        setShowuserproperties(userall)
    }
  return (
    <div>
      {showuserproperties && showuserproperties.map((u)=>
    <a>
        <img src={u.image} alt="Property Image" />
        <p>{u.pname}</p>
        <p>By : {u.email}</p>
    </a>
    )}
    </div>
  )
}

export default page
