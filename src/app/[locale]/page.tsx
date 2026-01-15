// import Image from "next/image";

import { getTranslations } from "next-intl/server";

const HomePage = async () => {
  const translateCompany = await getTranslations('Company');
    const translateHome = await getTranslations('Home');

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
            {translateHome('welcome')} <span className="text-red-600">{translateCompany('Name')}</span> 
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner in logistics solutions. We deliver excellence
            with every shipment.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/services"
              className="px-8 py-3 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-200"
            >
              Our Services
            </a>
            <a
              href="/contact"
              className="px-8 py-3 rounded-md border-2 border-red-600 text-red-600 font-medium hover:bg-red-50 transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Fast Delivery
            </h3>
            <p className="mt-2 text-gray-600">
              Quick and reliable shipping solutions for your business needs.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Secure Handling
            </h3>
            <p className="mt-2 text-gray-600">
              Your cargo is protected with our professional handling standards.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Global Reach
            </h3>
            <p className="mt-2 text-gray-600">
              Worldwide logistics network to serve you anywhere.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
