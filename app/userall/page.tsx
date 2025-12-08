'use client'
import { deletePropertyAcion, UserAllPropertyAction } from '@/Actions/PropertyAction'
import { property } from '@/db/schema'
import { useCurrentUser } from '@/hook/hook'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"

const page = () => {

  const { email } = useCurrentUser()

  const { id } = useParams()

  const [showuserproperties, setShowuserproperties] = useState<property[] | null>(null)

  useEffect(() => {
    if (email) userallProperties(email)
  }, [email])

  const userallProperties = async (email: string) => {
    const userall: property[] = await UserAllPropertyAction(email)
    setShowuserproperties(userall || null)
  }
  

  return (
    <div>
      {showuserproperties && showuserproperties.map((u) =>
        <div key={u.id}>
          <a key={u.id} href={`/single/${u.id}`}>
            <img src={u.image} alt="Property Image" />
            <p>{u.pname}</p>
            <p>By : {u.email}</p>
          </a>
        </div>
      )}
    </div>
  )
}

export default page
