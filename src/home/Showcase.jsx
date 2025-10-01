import React from 'react';

const PartnersShowcase = () => {
  // Sample partner/brand data - replace with your actual logos and company names
  const partners = [
  { id: 1, name: 'Acko General Insurance', logo: 'https://res.cloudinary.com/dz10btkpg/image/upload/v1758963976/acko_m5jl8m.png' },
  { id: 2, name: 'Furlenco', logo: 'https://res.cloudinary.com/dz10btkpg/image/upload/v1758964140/furlenco_chotth.png' },
  { id: 3, name: 'Zoomcar', logo: 'https://res.cloudinary.com/dz10btkpg/image/upload/v1758964277/zoom_car_ljmvtn.png' },
  { id: 4, name: 'ABC Consultants', logo: 'https://res.cloudinary.com/dz10btkpg/image/upload/v1758964025/abc_consultant_iywii7.png' },
  { id: 5, name: 'Stanza Living', logo: 'https://res.cloudinary.com/dz10btkpg/image/upload/v1758964221/stanza_living_vrtjfx.png' },
  { id: 6, name: 'Classplus', logo: 'https://res.cloudinary.com/dz10btkpg/image/upload/v1758964111/classplus_oyl3zy.png' },
  { id: 7, name: 'Capital Float', logo: 'https://res.cloudinary.com/dz10btkpg/image/upload/v1758964071/capital_float_kopyzb.png' },
  { id: 8, name: 'WinZO Games', logo: 'https://res.cloudinary.com/dz10btkpg/image/upload/v1758964249/winzo_e9suft.png' },
  { id: 9, name: 'Porter', logo: 'https://res.cloudinary.com/dz10btkpg/image/upload/v1758964194/poter_an1h1m.png' },
  { id: 10, name: 'mfine', logo: 'https://res.cloudinary.com/dz10btkpg/image/upload/v1758964170/mfine_lnn5jz.png' }
];

  // Duplicate the partners array to create seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">


        {/* Infinite Scroll Container */}
        <div className="relative overflow-hidden py-4">
          {/* Enhanced gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 via-slate-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-50 via-blue-50 to-transparent z-10"></div>
          
          {/* Main scrolling container */}
          <div className="flex">
            <div className="flex animate-scroll gap-4">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border border-gray-100 overflow-hidden group w-48 h-32 sm:w-56 sm:h-36 lg:w-64 lg:h-40">
                    <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-white to-gray-50 group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500">
                      {/* Decorative background pattern */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-xl"></div>
                      </div>
                      
                      <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
                        <div className="flex items-center justify-center">
                          <img
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            className="max-h-12 sm:max-h-14 lg:max-h-16 max-w-full object-contain filter group-hover:brightness-110 transition-all duration-500 transform group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                            {partner.name}
                          </p>
                          <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-1 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                        </div>
                      </div>
                      
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transition-transform duration-1000 ease-out skew-x-12"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Section */}
     <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
  {/* India Partners */}
  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-blue-100 group">
    <div className="text-4xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">50+</div>
    <div className="text-gray-700 text-sm font-medium">India Partners</div>
    <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-3 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
  </div>

  {/* Cities Covered */}
  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-green-100 group">
    <div className="text-4xl font-bold text-green-600 mb-3 group-hover:scale-110 transition-transform duration-300">15+</div>
    <div className="text-gray-700 text-sm font-medium">Cities Covered</div>
    <div className="w-full h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mt-3 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
  </div>

  {/* Users in India */}
  <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-purple-100 group">
    <div className="text-4xl font-bold text-purple-600 mb-3 group-hover:scale-110 transition-transform duration-300">20k+</div>
    <div className="text-gray-700 text-sm font-medium">Users in India</div>
    <div className="w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mt-3 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
  </div>

  {/* Platform Availability */}
  <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-orange-100 group">
    <div className="text-4xl font-bold text-orange-600 mb-3 group-hover:scale-110 transition-transform duration-300">99.8%</div>
    <div className="text-gray-700 text-sm font-medium">Platform Availability</div>
    <div className="w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-3 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
  </div>
</div>


        {/* Enhanced Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-400/20 to-blue-500/20 rounded-full blur-3xl transform -translate-x-24 translate-y-24"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Ready to Join Our Network?
              </h3>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Discover how our partnership program can help accelerate your business growth and reach new markets with cutting-edge solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
                  <span>Become a Partner</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button className="border-2 border-white/30 hover:border-white/50 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        @media (max-width: 640px) {
          .animate-scroll {
            animation-duration: 20s;
          }
        }
        
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 25s;
          }
        }
      `}</style>
    </div>
  );
};

export default PartnersShowcase;