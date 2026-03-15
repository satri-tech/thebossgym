'use client';

import Image from "next/image";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
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
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Find us in Pokhara-8, Prithvi Chowk, Kaski. Whether you are a
            beginner or advanced athlete, we can help you plan your next
            training step.
          </p>

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
