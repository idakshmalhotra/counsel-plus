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
      isPopular: false
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
      isPopular: true
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
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan that fits your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.isPopular ? 'ring-2 ring-orange-500 relative' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.isPopular ? 'pt-12' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.priceSubtext && (
                    <span className="text-gray-600 ml-2">{plan.priceSubtext}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.isPopular
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {plan.name === 'Institution' ? 'Contact Sales' : 'Get Started'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change my plan later?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time from your dashboard.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
                <p className="text-gray-600">Our Basic plan is completely free and includes all essential features for single applications.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for institutional plans.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data secure?</h3>
                <p className="text-gray-600">Absolutely. We use enterprise-grade encryption and comply with all data protection regulations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plan;
