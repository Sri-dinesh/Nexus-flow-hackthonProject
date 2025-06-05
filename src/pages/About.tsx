import React from "react";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-100 via-white to-slate-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 drop-shadow-md mb-4">
            About EstateNexus
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner in finding the perfect property across the United States.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg mb-4 text-gray-700">
              At EstateNexus, we believe finding your dream home should be an exciting journey, not a stressful process.
              Founded in 2020, our platform connects buyers, sellers, and real estate professionals through an intuitive,
              transparent marketplace.
            </p>
            <p className="text-lg text-gray-700">
              We're committed to leveraging technology to simplify real estate transactions while providing the
              personalized service and local expertise that such important decisions deserve.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Estate Nexus team working"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1 rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b"
              alt="Modern building architecture"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6">What Sets Us Apart</h2>
            <ul className="space-y-4">
              {[
                {
                  title: "Curated Listings",
                  description: "We carefully vet all properties to ensure quality, accuracy, and fair value.",
                },
                {
                  title: "Expert Agents",
                  description: "Our network includes only licensed professionals with proven track records.",
                },
                {
                  title: "Transparent Process",
                  description: "No hidden fees or surprises—just clear, honest information every step of the way.",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                title: "CEO & Founder",
                bio: "Former real estate broker with 15+ years of experience in luxury properties.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&h=300&auto=format&fit=crop",
              },
              {
                name: "Michael Chen",
                title: "Chief Technology Officer",
                bio: "Tech innovator with a passion for creating intuitive digital experiences.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=300&auto=format&fit=crop",
              },
              {
                name: "Alisha Patel",
                title: "Head of Operations",
                bio: "Expert in scaling real estate platforms with a focus on client satisfaction.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&auto=format&fit=crop",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
              >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                  <p className="text-primary mb-2">{member.title}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">EstateNexus</h3>
              <p className="text-gray-400 mb-4">
                Your trusted partner in finding the perfect property across the United States.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-400 hover:text-white flex items-center gap-2">🏠 Home</a>
                </li>
                <li>
                  <a href="/properties" className="text-gray-400 hover:text-white flex items-center gap-2">📍 Properties</a>
                </li>
                <li>
                  <a href="/agents" className="text-gray-400 hover:text-white flex items-center gap-2">🧑‍💼 Agents</a>
                </li>
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white flex items-center gap-2">ℹ️ About Us</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">📖 Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">📊 Market Trends</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">🏡 Buying Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">💡 Selling Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Contact</h4>
              <address className="text-gray-400 not-italic">
                123 Real Estate Blvd<br />
                New York, NY 10001<br />
                <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a><br />
                <a href="mailto:info@estatenexus.com" className="hover:text-white">info@estatenexus.com</a>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EstateNexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
