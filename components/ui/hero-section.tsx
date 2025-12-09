"use client"

import { MapPin, Bed, Bath, Maximize2 } from "lucide-react"
import BackgroundElements from "./background-elements"

export default function HeroSection() {
  const properties = [
    {
      id: 1,
      title: "Modern Downtown Luxury",
      price: "$2,450,000",
      beds: 4,
      baths: 3,
      sqft: "4,500",
      image: "https://cdn.carmel-apartments.com/system/uploads/fae/image/asset/31879/penthouse-balcony-terrace.jpg",
      location: "Downtown District",
    },
    {
      id: 2,
      title: "Beachfront Paradise",
      price: "$3,200,000",
      beds: 5,
      baths: 4,
      sqft: "5,200",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/407056873.jpg?k=998d9d66896fdb4249cb17268d8b71ac1de6461f3aa399bc476499729f494d8d&o=",
      location: "Coastal Haven",
    },
    {
      id: 3,
      title: "Suburban Dream Home",
      price: "$1,850,000",
      beds: 4,
      baths: 2.5,
      sqft: "3,800",
      image: "https://i.pinimg.com/736x/45/5b/9a/455b9aa0d9128e91a3ac3b286fba1bf0.jpg",
      location: "Green Valley",
    },
    {
      id: 4,
      title: "Urban Penthouse",
      price: "$4,100,000",
      beds: 3,
      baths: 3,
      sqft: "3,200",
      image: "https://media.cnn.com/api/v1/images/stellar/prod/111-west-57th-street-quadplex-80-2-credit-to-hayes-davidson.jpg?q=w_2000,c_fill",
      location: "City Center",
    },
  ]

  return (
    <section className="min-h-screen pt-32 pb-24 px-4">
      <BackgroundElements/>
      
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Hero Header */}
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-black text-slate-50 leading-tight">
            Discover Your
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mt-2">
              Dream Property
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Explore our exclusive collection of luxury properties. Find the perfect home that matches your lifestyle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a href="/all" className="px-8 py-4 rounded-lg font-bold text-base transition-all duration-300 transform bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 active:scale-95">
              Browse Properties
            </a>
            <a href="/all" className="px-8 py-4 rounded-lg font-bold text-base border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 transform hover:scale-105">
              Advanced Search
            </a>
          </div>
        </div>

        {/* Featured Properties Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50">Featured Properties</h2>
            <a href="/all" className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2">
              View All →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="slide-in group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/60 transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:shadow-cyan-500/20">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-slate-700 aspect-video">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full">
                      <span className="text-cyan-400 font-bold text-sm">{property.price}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-slate-50 text-lg mb-2 line-clamp-2">{property.title}</h3>

                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      {property.location}
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-300 font-semibold">{property.beds}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-300 font-semibold">{property.baths}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-300 font-semibold text-sm">{property.sqft}</span>
                      </div>
                    </div>

                    <button className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 group-hover:text-cyan-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
