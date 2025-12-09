"use client"

import { useState } from "react"
import { Search, Menu, X } from "lucide-react"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-gradient-to-b from-slate-950/90 via-slate-900/85 to-slate-950/80 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="text-2xl font-black tracking-tighter">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Dream
            </span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Homes
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <a
            href="/all"
            className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium text-sm"
          >
            Explore
          </a>
          <a
            href="/userall"
            className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium text-sm"
          >
            My Properties
          </a>
          <a
            href="/favourite"
            className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium text-sm"
          >
            Favourite
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs mr-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:bg-slate-800/80 transition-all duration-300 hover:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2 text-sm font-semibold text-cyan-400 border border-cyan-500/40 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/60 transition-all duration-300">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-5 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 border border-cyan-500/40 rounded-full hover:shadow-cyan-500/40 hover:shadow-lg transition-all duration-300",
                },
              }}
            />
          </SignedIn>

          <a
            href="/new"
            className="px-6 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Post Property
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-cyan-400" />
          ) : (
            <Menu className="w-5 h-5 text-cyan-400" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-cyan-500/20 p-4 space-y-3">
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
          <a
            href="/all"
            className="block text-slate-300 hover:text-cyan-400 font-medium py-2"
          >
            Explore
          </a>
          <a
            href="/userall"
            className="block text-slate-300 hover:text-cyan-400 font-medium py-2"
          >
            My Properties
          </a>
          <a
            href="/favourite"
            className="block text-slate-300 hover:text-cyan-400 font-medium py-2"
          >
            Favourite
          </a>

          {/* Mobile Auth Buttons */}
          <SignedOut>
            <div className="flex gap-3 mt-4">
              <SignInButton mode="modal">
                <button className="flex-1 px-4 py-2 text-sm font-semibold text-cyan-400 border border-cyan-500/40 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/60 transition-all duration-300">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="flex-1 px-4 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="mt-4">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      )}
    </nav>
  )
}