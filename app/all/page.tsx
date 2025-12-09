'use client'
import { AllPropertyAction } from '@/Actions/PropertyAction'
import BackgroundElements from '@/components/ui/background-elements'
import Footer from '@/components/ui/footer'
import Navigation from '@/components/ui/navigation'
import { property } from '@/db/schema'
import { useCurrentUser } from '@/hook/hook'
import { Bed, DollarSign, IndianRupee, MapPin, Maximize2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [showallProperties, setShowallProperties] = useState<property[] | null>(null)

  const { email } = useCurrentUser()
  const { id } = useParams()

  useEffect(() => {
    allProperties()
  }, [])

  const allProperties = async () => {
    const all: property[] = await AllPropertyAction()
    setShowallProperties(all)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#041021] via-[#061729] to-[#020b18] text-white">
      <BackgroundElements />
      <Navigation />

      <div className="max-w-7xl mx-auto px-6 pt-36 space-y-10">
        
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-black tracking-tighter text-6xl">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Explore
              </span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                &nbsp;Properties
              </span>
            </div>
          </div>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-10">
          {showallProperties &&
            showallProperties.map((p, index) => (
              <a
                key={p.id}
                href={`/single/${p.id}`}
                className="group cursor-pointer slide-in"
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <div className="
                  bg-[#0e1b2d]/70 
                  backdrop-blur-xl 
                  rounded-2xl 
                  border border-white/10 
                  shadow-lg shadow-cyan-500/10 
                  overflow-hidden 
                  transition-all duration-500 
                  hover:shadow-cyan-400/30 
                  hover:-translate-y-2
                ">

                  {/* Image */}
                  <div className="relative overflow-hidden bg-slate-700 aspect-video">
                    <img
                      src={p.image || "/placeholder.svg"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full">
                      <span className="text-cyan-400 font-bold text-sm flex">
                        <DollarSign className='h-4 w-4 mt-0.5' />{p.price}
                      </span>
                    </div>
                  </div>

                  {/* Content Section (Improved Spacing) */}
                  <div className="p-5 flex flex-col gap-5">

                    {/* Location */}
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      {p.city}
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 pb-4 border-b border-slate-700">
                      <div className="flex items-center gap-1.5 ">
                        <Bed className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-300 font-semibold text-sm">{p.bhk}</span>
                      </div>

                      <div className="flex items-center gap-1.5 ">
                        <Maximize2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-300 font-semibold text-sm">{p.sqft}</span>
                      </div>
                    </div>

                    {/* Button */}
                    <button className="
                      w-full py-2 px-4 
                      bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                      border border-cyan-500/40 
                      text-cyan-300 rounded-lg font-semibold 
                      hover:bg-cyan-500/30 hover:border-cyan-500/60 
                      transition-all duration-300 group-hover:text-cyan-200
                    ">
                      View Details
                    </button>

                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Page
