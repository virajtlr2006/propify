'use client'

import { deletePropertyAcion, SinglePropertyAction } from '@/Actions/PropertyAction'
import BackgroundElements from '@/components/ui/background-elements'
import Navigation from '@/components/ui/navigation'
import Footer from '@/components/ui/footer'
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
import { Bed, MapPin, Maximize2, IndianRupee, Edit, Trash2, DollarSign } from "lucide-react"

const Page = () => {

  const [showSingleProperty, setShowSingleProperty] = useState<property | null>(null)
  const [isOwner, setIsOwner] = useState(false)

  const router = useRouter()
  const { id } = useParams()
  const { email } = useCurrentUser()

  useEffect(() => {
    if (id && email) getSingleProp(Number(id))
  }, [id, email])

  const getSingleProp = async (id: number) => {
    const single: property = await SinglePropertyAction(id)

    if (email && single) {
      setIsOwner(email === single.email)
    }

    setShowSingleProperty(single)
  }

  const deleteProperty = async (id: number) => {
    if (isOwner) {
      await deletePropertyAcion(Number(id))
      router.push("/all")
    }
  }

  const goToUpdate = (id: number) => {
    if (isOwner) {
      router.push(`/update/${id}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#040b16] via-[#071224] to-[#01070f] text-white">
      <BackgroundElements />
      <Navigation />

      <div className="max-w-7xl mx-auto px-6 pt-36 pb-24">
        {showSingleProperty && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT: Image */}
            <div className="
              rounded-2xl overflow-hidden border border-white/10 
              bg-[#0f1b2d]/70 backdrop-blur-lg shadow-xl shadow-cyan-500/10
            ">
              <img
                src={showSingleProperty.image || "/placeholder.svg"}
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* RIGHT: Property Details */}
            <div className="space-y-8">

              {/* Title + Price */}
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {showSingleProperty.pname}
                </h1>

                <div className="flex items-center mt-2 text-cyan-400 text-2xl font-bold">
                  <DollarSign className="w-6 h-6" /> {showSingleProperty.price}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 text-slate-300 text-lg">
                <MapPin className="w-5 h-5 text-cyan-400" />
                {showSingleProperty.city} — {showSingleProperty.paddress}
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-6 py-8 px-6 bg-[#0e1a2a]/60 rounded-xl border border-white/10 backdrop-blur">

                <div className="flex flex-col items-center">
                  <Bed className="w-6 h-6 text-cyan-400" />
                  <p className="text-lg font-semibold text-slate-300">{showSingleProperty.bhk} BHK</p>
                </div>

                <div className="flex flex-col items-center">
                  <Maximize2 className="w-6 h-6 text-cyan-400" />
                  <p className="text-lg font-semibold text-slate-300">{showSingleProperty.sqft} sqft</p>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-cyan-400 font-bold">Type</span>
                  <p className="text-lg font-semibold text-slate-300">{showSingleProperty.ptype}</p>
                </div>

              </div>

              {/* Description */}
              <p className="text-slate-300 text-lg leading-relaxed">
                {showSingleProperty.pdesc}
              </p>

              {/* Owner Email */}
              <p className="text-slate-400 text-sm">
                Listed By: <span className="text-cyan-300">{showSingleProperty.email}</span>
              </p>

              {/* Owner Only Buttons */}
              {isOwner && (
                <div className="flex gap-4 pt-6">

                  {/* Update Button */}
                  <Button
                    onClick={() => goToUpdate(showSingleProperty.id)}
                    className="
                      bg-gradient-to-r from-blue-500 to-cyan-500 
                      text-white px-6 py-3 rounded-xl font-semibold 
                      flex items-center gap-2 hover:opacity-90 transition-all
                    "
                  >
                    <Edit className="w-5 h-5" /> Update Property
                  </Button>

                  {/* Delete Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="
                          bg-gradient-to-r from-red-500 to-pink-500 
                          text-white px-6 py-3 rounded-xl font-semibold 
                          flex items-center gap-2 hover:opacity-90 transition-all
                        "
                      >
                        <Trash2 className="w-5 h-5" /> Delete
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-[#0e1a2a] border border-white/20 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-red-400">Are you absolutely sure?</DialogTitle>
                        <DialogDescription className="text-slate-400">
                          This action is permanent and cannot be undone.
                        </DialogDescription>
                      </DialogHeader>

                      <Button
                        onClick={() => deleteProperty(showSingleProperty.id)}
                        className="bg-red-600 hover:bg-red-700 text-white w-full mt-4"
                      >
                        Confirm Delete
                      </Button>
                    </DialogContent>
                  </Dialog>

                </div>
              )}

            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Page
