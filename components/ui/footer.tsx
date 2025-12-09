"use client"

import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-10 py-16 px-4 border-t border-cyan-500/20 backdrop-blur-md bg-gradient-to-r from-slate-950/80 via-slate-900/70 to-slate-950/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Dream</span>
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Homes</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium real estate marketplace connecting you with your dream property. Discover luxury homes and modern
              living.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 pt-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h3 className="text-slate-200 font-bold text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Browse Properties
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Featured Listings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Advanced Search
                </a>
              </li>
            </ul>
          </div>

          {/* Manage */}
          <div className="space-y-4">
            <h3 className="text-slate-200 font-bold text-sm uppercase tracking-wider">Manage</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  My Properties
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Post Property
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Saved Listings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  My Account
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-slate-200 font-bold text-sm uppercase tracking-wider">Support</h3>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400">
                Email:{" "}
                <a
                  href="mailto:support@dreamhomes.com"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                >
                  support@dreamhomes.com
                </a>
              </p>
              <p className="text-slate-400">
                Phone:{" "}
                <a
                  href="tel:+18005551234"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                >
                  1-800-555-1234
                </a>
              </p>
              <p className="text-slate-400 text-xs mt-3">Available 24/7 for your inquiries</p>
            </div>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-cyan-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2025 DreamHomes – Find Your Perfect Property</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
