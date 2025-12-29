import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#49C991] border-black">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo Section */}
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-8 md:mb-0">
              <div className="flex gap-1">
                <div className="w-8 h-8 bg-black rounded-full"></div>
                <div className="w-8 h-8 bg-black rounded-full"></div>
              </div>
              <span className="text-black text-2xl font-bold tracking-tight">
                KaizenFit
              </span>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-black text-sm font-bold mb-4 tracking-wider">
              CONTACT
            </h3>
            <div className="space-y-2 text-black text-sm">
              <p>hello@kaizenfit.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>

          {/* Opening Hours Section */}
          <div>
            <h3 className="text-black text-sm font-bold mb-4 tracking-wider">
              OPENING HOURS
            </h3>
            <div className="space-y-1 text-black text-sm">
              <div className="flex justify-between">
                <span>MON - FRI</span>
                <span>6:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span>SATURDAY</span>
                <span>8:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span>SUNDAY</span>
                <span>9:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links - Bottom Row */}
        <div className="mt-12 pt-8 border-t-2 border-black">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h3 className="text-black text-sm font-bold tracking-wider">
              SOCIAL
            </h3>
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 text-black text-sm font-medium">
              <a href="#" className="hover:opacity-70 transition-opacity">
                X (Twitter)
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                Facebook
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}