import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are dedicated to <span className="text-orange-500 font-semibold">simplifying the admission process</span> for students and institutions alike through innovative technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Mission Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full">
              <span className="text-orange-600 font-semibold text-sm">OUR MISSION</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Making Education <span className="text-orange-500">Accessible</span> for Everyone
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We believe that the admission process should be simple, transparent, and accessible to everyone. 
              Our platform is designed to eliminate the complexity and stress traditionally associated with applications.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              With our streamlined approach, students can focus on what matters most - their future - 
              while we handle the administrative complexities behind the scenes.
            </p>
            
            <div className="space-y-4 pt-4">
              {[
                { text: "Simplified application process", icon: "✨" },
                { text: "Real-time application tracking", icon: "📊" },
                { text: "Secure document management", icon: "🔒" }
              ].map((item, index) => (
                <div key={index} className="flex items-center group">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <span className="text-white text-lg">{item.icon}</span>
                  </div>
                  <span className="text-gray-700 text-lg font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Why Choose Us Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Why Choose Us?</h3>
            </div>
            
            <div className="space-y-6">
              {[
                { 
                  title: "Fast & Efficient", 
                  desc: "Complete your application in under 30 minutes with our intuitive interface.",
                  icon: "🚀",
                  color: "from-green-400 to-blue-500"
                },
                { 
                  title: "Secure & Reliable", 
                  desc: "Your data is protected with enterprise-grade security measures.",
                  icon: "🛡️",
                  color: "from-purple-400 to-pink-500"
                },
                { 
                  title: "24/7 Support", 
                  desc: "Our support team is available around the clock to assist you.",
                  icon: "💬",
                  color: "from-orange-400 to-red-500"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-lg">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-blue-600 font-semibold text-sm">OUR TEAM</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Innovators</h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Our passionate team is dedicated to transforming the educational landscape through technology
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "CEO & Founder",
                desc: "Leading the vision for accessible education technology.",
                gradient: "from-blue-400 to-purple-500",
                initials: "JD"
              },
              {
                name: "Jane Smith",
                role: "CTO",
                desc: "Building robust and scalable platform architecture.",
                gradient: "from-purple-400 to-pink-500",
                initials: "JS"
              },
              {
                name: "Mike Johnson",
                role: "Head of Design",
                desc: "Creating intuitive and user-friendly experiences.",
                gradient: "from-orange-400 to-red-500",
                initials: "MJ"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className={`w-20 h-20 bg-gradient-to-r ${member.gradient} rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg`}>
                  <span className="text-white text-xl font-bold">{member.initials}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-orange-500 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;