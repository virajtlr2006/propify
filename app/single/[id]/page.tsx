'use client'

import { deletePropertyAcion, SinglePropertyAction } from '@/Actions/PropertyAction'
import { property } from '@/db/schema'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hook/hook'
import { log } from 'console'

const page = () => {

    const [showSingleProperty, setshowSingleProperty] = useState<property | null>(null)
    const [isdelete, setIsdelete] = useState(false)

    const router = useRouter()
    const { id } = useParams()
    const { email } = useCurrentUser()
    // console.log(email);
    
    useEffect(() => {
        if (id && email) getSingleProp(Number(id))
    }, [id,email])


    const getSingleProp = async (id: number) => {
        console.log(isdelete);
        const single: property = await SinglePropertyAction(id)
        if(email){
            if(email == single.email){
                setIsdelete(true)
            }
            // console.log(email)
            // console.log(single.email)
        }
        setshowSingleProperty(single)
        
    }

    const deleteProperty = async (id: Number) => {
        if (email == showSingleProperty?.email) {
            await deletePropertyAcion(Number(id))
            router.push("/all")
        }
    }

    return (
        <div>
            {showSingleProperty &&
                <div>
                    <img src={showSingleProperty.image || "Property Image"} />
                    <p>{showSingleProperty.pname}</p>
                    <p>{showSingleProperty.ptype}</p>
                    <p>{showSingleProperty.pdesc}</p>
                    <p>{showSingleProperty.paddress}</p>
                    <p>{showSingleProperty.city}</p>
                    <p>{showSingleProperty.sqft}</p>
                    <p>{showSingleProperty.bhk}</p>
                    <p>{showSingleProperty.price}</p>
                    <p>{showSingleProperty.email}</p>

                    <Dialog>
                        {isdelete && <DialogTrigger>Delete</DialogTrigger>}
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your property
                                    and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader>

                            {isdelete &&
                                <Button onClick={() => deleteProperty(showSingleProperty.id)} variant="outline">
                                    <p>Delete</p>
                                </Button>
                            }
                        </DialogContent>
                    </Dialog>
                </div>
            }
        </div>
    )
}

export default page