import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin, FiMail, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                C
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Counsel</span>
                <div className="text-xs text-gray-400 -mt-1">Admission Portal</div>
              </div>
            </div>
            <p className="text-gray-300 text-base mb-8 max-w-lg leading-relaxed">
              Simplifying the admission process for students worldwide. 
              Apply to your dream institutions with confidence and ease through our innovative platform.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-white mb-3">Stay Updated</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center space-x-1">
                  <span>Subscribe</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 transition-all duration-200"
                aria-label="Facebook"
              >
                <FiFacebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 transition-all duration-200"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 transition-all duration-200"
                aria-label="Instagram"
              >
                <FiInstagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2 group">
                  <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2 group">
                  <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/plan" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2 group">
                  <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  <span>Pricing Plans</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2 group">
                  <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2 group">
                  <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FiMail className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-gray-300">Email</span>
                <br />
                  <a href="mailto:support@counsel.com" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                    support@counsel.com
                </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FiPhone className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-gray-300">Phone</span>
                <br />
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  +1 (234) 567-8900
                </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-gray-300">Address</span>
                <br />
                  <span className="text-gray-400 text-sm">
                    123 Education Street<br />
                Learning City, LC 12345
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Counsel. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
              Privacy Policy
            </Link>
              <Link to="/terms" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
              Terms of Service
            </Link>
              <Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
              Contact Us
            </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
