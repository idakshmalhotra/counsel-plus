import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are dedicated to simplifying the admission process for students and institutions alike.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We believe that the admission process should be simple, transparent, and accessible to everyone. 
              Our platform is designed to eliminate the complexity and stress traditionally associated with applications.
            </p>
            <p className="text-gray-600 mb-6">
              With our streamlined approach, students can focus on what matters most - their future - 
              while we handle the administrative complexities behind the scenes.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700">Simplified application process</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700">Real-time application tracking</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700">Secure document management</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Fast & Efficient</h4>
                <p className="text-gray-600">Complete your application in under 30 minutes with our intuitive interface.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure & Reliable</h4>
                <p className="text-gray-600">Your data is protected with enterprise-grade security measures.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h4>
                <p className="text-gray-600">Our support team is available around the clock to assist you.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">John Doe</h3>
              <p className="text-gray-600 mb-2">CEO & Founder</p>
              <p className="text-sm text-gray-500">Leading the vision for accessible education technology.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Jane Smith</h3>
              <p className="text-gray-600 mb-2">CTO</p>
              <p className="text-sm text-gray-500">Building robust and scalable platform architecture.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Johnson</h3>
              <p className="text-gray-600 mb-2">Head of Design</p>
              <p className="text-sm text-gray-500">Creating intuitive and user-friendly experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
