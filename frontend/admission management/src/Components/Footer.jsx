import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-xl font-bold text-gray-900">AdmissionPro</span>
            </div>
            <p className="text-gray-600 text-sm mb-6 max-w-md">
              Simplifying the admission process for students worldwide. 
              Apply to your dream institutions with confidence and ease.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/plan" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600 text-sm">
                <span className="font-medium">Email:</span>
                <br />
                <a href="mailto:support@admissionpro.com" className="hover:text-orange-500 transition-colors">
                  support@admissionpro.com
                </a>
              </li>
              <li className="text-gray-600 text-sm">
                <span className="font-medium">Phone:</span>
                <br />
                <a href="tel:+1234567890" className="hover:text-orange-500 transition-colors">
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="text-gray-600 text-sm">
                <span className="font-medium">Address:</span>
                <br />
                123 Education Street
                <br />
                Learning City, LC 12345
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} AdmissionPro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
