import React from "react";
import { Link } from "react-router-dom";

function Plan() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for individual students",
      features: [
        "Single application submission",
        "Basic document upload",
        "Email support",
        "Application tracking"
      ],
      isPopular: false,
      gradient: "from-gray-500 to-gray-600",
      bgGradient: "from-gray-50 to-gray-100",
      icon: "🎓"
    },
    {
      name: "Premium",
      price: "$29",
      priceSubtext: "per application",
      description: "Ideal for students applying to multiple institutions",
      features: [
        "Unlimited applications",
        "Priority support",
        "Advanced document management",
        "Application analytics",
        "Application templates",
        "Deadline reminders"
      ],
      isPopular: true,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      icon: "🚀"
    },
    {
      name: "Institution",
      price: "Custom",
      description: "For educational institutions",
      features: [
        "Bulk application management",
        "Custom branding",
        "API access",
        "Advanced analytics",
        "Dedicated support",
        "Custom integrations"
      ],
      isPopular: false,
      gradient: "from-blue-500 to-purple-500",
      bgGradient: "from-blue-50 to-purple-50",
      icon: "🏛️"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-lg">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select the perfect plan that fits your needs. <span className="text-orange-500 font-semibold">Upgrade or downgrade</span> at any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl ${
                plan.isPopular ? 'border-orange-500 scale-105' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-3 text-sm font-bold shadow-md">
                  🌟 Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.isPopular ? 'pt-16' : 'pt-8'}`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-block p-4 bg-gradient-to-r ${plan.gradient} rounded-2xl shadow-lg mb-4`}>
                    <span className="text-3xl">{plan.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{plan.description}</p>
                </div>
                
                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                    {plan.priceSubtext && (
                      <span className="text-gray-600 ml-2 text-lg">{plan.priceSubtext}</span>
                    )}
                  </div>
                  {plan.name === 'Premium' && (
                    <p className="text-sm text-gray-500 mt-2">Save 20% with annual billing</p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to="/signup"
                  className={`block w-full text-center py-4 px-6 rounded-xl font-bold text-lg transition-transform duration-300 transform hover:scale-105 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 border-2 border-gray-300'
                  }`}
                >
                  {plan.name === 'Institution' ? 'Contact Sales' : 'Get Started'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6 shadow-md">
              <span className="text-purple-600 font-semibold text-sm">FAQ</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Everything you need to know about our plans</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time from your dashboard.",
                icon: "🔄"
              },
              {
                question: "Is there a free trial?",
                answer: "Our Basic plan is completely free and includes all essential features for single applications.",
                icon: "🎁"
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for institutional plans.",
                icon: "💳"
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. We use enterprise-grade encryption and comply with all data protection regulations.",
                icon: "🔒"
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-transform duration-300">
                <div className="flex items-start">
                  <div className="text-2xl mr-4 mt-1">{faq.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6 shadow-md">
            <span className="text-green-600 font-semibold text-sm">TRUSTED BY THOUSANDS</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Join 10,000+ Students Worldwide</h3>
          <p className="text-gray-600 mb-8">Students from over 50 countries trust our platform for their applications</p>
          
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-sm font-medium text-gray-500">🎓 Universities</div>
            <div className="text-sm font-medium text-gray-500">✅ Applications</div>
            <div className="text-sm font-medium text-gray-500">🌍 Countries</div>
            <div className="text-sm font-medium text-gray-500">⭐ Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plan;