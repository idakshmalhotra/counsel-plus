import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiClock, FiShield, FiUsers, FiTrendingUp } from "react-icons/fi";

function Hero() {
  const user = useSelector((state) => state.user);

  const features = [
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Quick Application",
      description: "Complete your application in under 30 minutes"
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Secure Process",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Expert Support",
      description: "Get help from our admission specialists"
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Higher Success Rate",
      description: "Increase your chances with our optimized process"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Tackle The Problem Of Complex
              <br />
              <span className="text-orange-500">Admission Process</span>{" "}
              Seamlessly
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Transform your admission journey with our intuitive platform. 
              Apply to multiple institutions, track your progress, and manage 
              all your documents in one secure place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              {user?.isAuthenticated ? (
                <Link
                  to="/admission"
                  className="btn btn-primary px-8 py-4 text-lg"
                >
                  Continue Application
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="btn btn-primary px-8 py-4 text-lg"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/about"
                    className="btn btn-secondary px-8 py-4 text-lg"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">10K+</div>
                <div className="text-sm text-gray-600">Applications Submitted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">200+</div>
                <div className="text-sm text-gray-600">Partner Institutions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of admission applications with our innovative features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully navigated their admission process with us.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Start Your Application Today
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
