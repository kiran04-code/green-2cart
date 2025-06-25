import React from 'react';
import { assets,footerLinks } from '../assets/assets';

const Footer = () => {
  return (
    <div className="w-screen bg-[#b6f0d5] overflow-hidden mt-20">
      <div className=" mx-auto px-5 md:px-12 lg:px-14 xl:px-22">
        {/* Main footer layout */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-600">
          {/* Logo & Description */}
          <div className="flex-1 min-w-[250px]">
            <img className="w-32 md:w-40" src={assets.logo} alt="Logo" />
            <p className="max-w-sm mt-4 text-sm">
              We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
            </p>
          </div>

          {/* Link Sections */}
          <div className="flex flex-wrap gap-8 w-full md:w-[55%] justify-between">
            {footerLinks.map((section, index) => (
              <div key={index} className="min-w-[140px]">
                <h3 className="font-semibold text-base text-gray-900 mb-3">{section.title}</h3>
                <ul className="text-sm space-y-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="hover:underline transition">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="py-5 text-center text-sm md:text-base text-gray-500/80">
          © {new Date().getFullYear()} Kiran.dev — All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
