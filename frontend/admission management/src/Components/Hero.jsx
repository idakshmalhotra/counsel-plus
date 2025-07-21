import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiClock, FiShield, FiUsers, FiTrendingUp, FiArrowRight, FiCheckCircle, FiStar } from "react-icons/fi";

function Hero() {
  const user = useSelector((state) => state.user);

  const features = [
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Quick Application",
      description: "Complete your application in under 30 minutes",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Secure Process",
      description: "Your data is protected with enterprise-grade security",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Expert Support",
      description: "Get help from our admission specialists",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Higher Success Rate",
      description: "Increase your chances with our optimized process",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const stats = [
    { value: "10K+", label: "Applications Submitted", icon: <FiCheckCircle className="w-5 h-5" /> },
    { value: "95%", label: "Success Rate", icon: <FiTrendingUp className="w-5 h-5" /> },
    { value: "200+", label: "Partner Institutions", icon: <FiUsers className="w-5 h-5" /> },
    { value: "24/7", label: "Support Available", icon: <FiClock className="w-5 h-5" /> }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-8 animate-fade-in-up">
              <FiStar className="w-4 h-4 mr-2" />
              Trusted by 10,000+ students worldwide
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight animate-fade-in-up animation-delay-200">
              Tackle The Problem Of Complex
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Admission Process
              </span>{" "}
              Seamlessly
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              Transform your admission journey with our intuitive platform. 
              Apply to multiple institutions, track your progress, and manage 
              all your documents in one secure place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-600">
              {user?.isAuthenticated ? (
                <Link
                  to="/admission"
                  className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center space-x-2"
                >
                  <span>Continue Application</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center space-x-2"
                  >
                    <span>Get Started Free</span>
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/about"
                    className="group bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center space-x-2"
                  >
                    <span>Learn More</span>
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-800">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-orange-600">{stat.icon}</div>
              </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of admission applications with our innovative features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} text-white rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full opacity-10"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full opacity-10"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who have successfully navigated their admission process with us.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center space-x-2 bg-white text-orange-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            <span>Start Your Application Today</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
