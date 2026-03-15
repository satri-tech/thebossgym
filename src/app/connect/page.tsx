'use client';

import Image from "next/image";
import { Mail, MapPin, Phone, Globe, Facebook, Instagram } from "lucide-react";
import dynamic from "next/dynamic";

const ContactMap = dynamic(() => import('@/core/components/contact-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
      <p className="text-zinc-600">Loading map...</p>
    </div>
  ),
});

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-64 h-64 relative">
              <Image
                src="/logo.png"
                alt="theBossGym Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              THE<span className="gold-text">BOSS</span>GYM
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-semibold">
              Power Built Daily
            </p>
          </div>

          {/* Description */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-gray-300 leading-relaxed">
              Reach the team for memberships, coaching plans, and gym visits.
              Fast replies, clear guidance, and no guesswork.
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Visit Section */}
      <section className="py-16 px-4 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Contact & <span className="gold-text">Visit</span>
          </h2>
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            Find us in Pokhara-8, Prithvi Chowk, Kaski. Whether you are a
            beginner or advanced athlete, we can help you plan your next
            training step.
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mb-12">
            <a
              href="https://www.facebook.com/Thebossgymofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-[#d4af37] p-5 rounded-lg transition-all transform hover:scale-110 group"
              aria-label="Facebook"
            >
              <Facebook className="w-10 h-10 text-white group-hover:text-black transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/thebossgymoffical/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-[#d4af37] p-5 rounded-lg transition-all transform hover:scale-110 group"
              aria-label="Instagram"
            >
              <Instagram className="w-10 h-10 text-white group-hover:text-black transition-colors" />
            </a>
            <a
              href="https://www.tiktok.com/@thebossgymofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-[#d4af37] p-5 rounded-lg transition-all transform hover:scale-110 group"
              aria-label="TikTok"
            >
              <div className="text-white group-hover:text-black transition-colors w-10 h-10">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
            </a>
            <a
              href="https://www.pinterest.com/thebossgymofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-[#d4af37] p-5 rounded-lg transition-all transform hover:scale-110 group"
              aria-label="Pinterest"
            >
              <div className="text-white group-hover:text-black transition-colors w-10 h-10">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.92-.19-2.31 0-3.31l1.44-6.09s-.37-.73-.37-1.81c0-1.7 1-3 2.21-3 1 0 1.53.78 1.53 1.71 0 1-.7 2.61-1.06 4.06-.3 1.27.64 2.31 1.89 2.31 2.27 0 4-2.39 4-5.84 0-3.05-2.19-5.18-5.32-5.18-3.63 0-5.76 2.72-5.76 5.53 0 1.1.42 2.27.95 2.91a.36.36 0 0 1 .08.35c-.09.38-.31 1.23-.35 1.4-.05.23-.17.28-.4.17-1.59-.74-2.59-3.06-2.59-4.92 0-4 2.91-7.68 8.39-7.68 4.4 0 7.82 3.14 7.82 7.33 0 4.37-2.75 7.88-6.57 7.88-1.28 0-2.49-.67-2.9-1.45l-.79 3c-.29 1.1-1.06 2.48-1.58 3.32A12 12 0 1 0 12 0z"/>
                </svg>
              </div>
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              {/* Address */}
              <div className="bg-black p-6 rounded-lg border border-zinc-800 hover:border-[#d4af37] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-[#d4af37] p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Address</h3>
                    <p className="text-gray-400">
                      Pokhara-8, Prithvi Chowk, Kaski
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-black p-6 rounded-lg border border-zinc-800 hover:border-[#d4af37] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-[#d4af37] p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Phone</h3>
                    <p className="text-gray-400">+977 985-6085556</p>
                    <p className="text-gray-400">+977 061579999</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-black p-6 rounded-lg border border-zinc-800 hover:border-[#d4af37] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-[#d4af37] p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <a
                      href="mailto:thebossgymofficial@gmail.com"
                      className="text-gray-400 hover:text-[#d4af37] transition-colors"
                    >
                      thebossgymofficial@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Website */}
              <div className="bg-black p-6 rounded-lg border border-zinc-800 hover:border-[#d4af37] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-[#d4af37] p-3 rounded-lg">
                    <Globe className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Website</h3>
                    <a
                      href="https://thebossgymofficial.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#d4af37] transition-colors"
                    >
                      thebossgymofficial.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-black p-6 rounded-lg border border-zinc-800">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                <ContactMap
                  latitude={28.2086342}
                  longitude={83.9858103}
                  zoom={17}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-400 mb-3">
                  The Boss Gym, Pokhara
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=28.2086342,83.9858103"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#d4af37] hover:bg-[#c9a227] text-black px-6 py-3 rounded-lg transition-colors font-semibold"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your <span className="gold-text">Journey?</span>
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Visit us today or get in touch to learn more about our memberships
            and training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+9779856085556"
              className="bg-[#d4af37] hover:bg-[#c9a227] text-black px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Call Now
            </a>
            <a
              href="mailto:thebossgymofficial@gmail.com"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
