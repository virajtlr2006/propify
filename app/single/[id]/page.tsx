'use client'

import { SinglePropertyAction } from '@/Actions/PropertyAction'
import { property } from '@/db/schema'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [showSingleProperty, setshowSingleProperty] = useState<property | null>(null)

    const { id } = useParams()

    useEffect(() => {
        if (id) getSingleProp(Number(id))
    }, [id])


    const getSingleProp = async (id: number) => {
        const single:property = await SinglePropertyAction(id)
        setshowSingleProperty(single)
    }

    return (
        <div>
            {showSingleProperty && 
            <div>
                <img src={showSingleProperty.image || "Propert Image"}/>
                <p>{showSingleProperty.pname}</p>
                <p>{showSingleProperty.ptype}</p>
                <p>{showSingleProperty.pdesc}</p>
                <p>{showSingleProperty.paddress}</p>
                <p>{showSingleProperty.city}</p>
                <p>{showSingleProperty.sqft}</p>
                <p>{showSingleProperty.bhk}</p>
                <p>{showSingleProperty.price}</p>
            </div>
            }
        </div>
    )
}

export default page
