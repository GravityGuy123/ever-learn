"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaGithub,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    { Icon: FaFacebookF, href: "https://web.facebook.com/billy.rex.7334", label: "Facebook" },
    { Icon: FaTwitter, href: "https://x.com/Galaxies_Grafx", label: "Twitter" },
    { Icon: FaWhatsapp, href: "https://wa.link/k9dm3u", label: "WhatsApp" },
    { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/ifeanyi-ejidike-310029357", label: "LinkedIn" },
    { Icon: FaGithub, href: "https://github.com/gravityguy123", label: "GitHub" },
  ];

  return (
    <footer className="w-full bg-gradient-to-r from-violet-400 to-purple-400 dark:from-violet-800 dark:to-purple-900 text-white py-12 border-t border-white/10">
      {/* GRID STRATEGY: 
        - Mobile: grid-cols-2 (Allows side-by-side links)
        - Desktop: grid-cols-4
      */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
        
        {/* Branding Section 
           - Mobile: col-span-2 (Takes full width at the top)
           - Desktop: col-span-1
        */}
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="font-bold text-2xl uppercase tracking-wide">
              EverLearn
            </span>
            <span className="text-sm text-white/80 mt-1">
              Empowering Minds, Shaping Futures
            </span>
          </div>
          
          <div className="flex gap-3 mt-2">
            {socialLinks.map(({ Icon, href, label }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* About Links 
           - Mobile: col-span-1 (Sits on the left)
        */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg text-white/90 relative inline-block">
            About
            {/* Optional decorative underline */}
            <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-indigo-200 rounded-full opacity-50"></span>
          </h3>
          <ul className="space-y-3 text-sm text-white/80">
            {['About Us', 'Courses', 'Mentorship', 'Contact'].map((item, i) => (
              <li key={i}>
                <Link 
                  href={`/${item.toLowerCase().replace(' ', '-')}`} 
                  className="hover:text-white hover:pl-1 transition-all duration-300 flex items-center"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links 
           - Mobile: col-span-1 (Sits on the right, next to About)
        */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg text-white/90 relative inline-block">
            Legal
            <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-indigo-200 rounded-full opacity-50"></span>
          </h3>
          <ul className="space-y-3 text-sm text-white/80">
             {[
               { name: 'Privacy Policy', path: '/privacy' },
               { name: 'Terms of Service', path: '/terms' },
               { name: 'Cookie Policy', path: '/cookies' },
               { name: 'Security', path: '/security' }
             ].map((item, i) => (
              <li key={i}>
                <Link 
                  href={item.path}
                  className="hover:text-white hover:pl-1 transition-all duration-300 flex items-center"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info 
           - Mobile: col-span-2 (Takes full width at the bottom for better readability)
           - Desktop: col-span-1
        */}
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
          <h3 className="font-semibold text-lg text-white/90 relative inline-block">
            Get in Touch
            <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-indigo-200 rounded-full opacity-50"></span>
          </h3>
          <div className="flex flex-col gap-3 text-sm text-white/80">
            <p className="leading-relaxed">
              Have questions? We are here to help you achieve your learning goals.
            </p>
            <div className="flex items-center gap-3 mt-2 group">
              <div className="p-2 bg-white/10 rounded-full shrink-0 group-hover:bg-white/20 transition-colors">
                 <FaEnvelope className="text-indigo-100" size={14} />
              </div>
              <Link
                href="mailto:info@ever-learn.com"
                className="hover:text-white transition-colors"
              >
                info@ever-learn.com
              </Link>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="p-2 bg-white/10 rounded-full shrink-0 group-hover:bg-white/20 transition-colors">
                <FaPhone className="text-indigo-100" size={14} />
              </div>
              <Link
                href="tel:+2349032192949"
                className="hover:text-white transition-colors"
              >
                +234 903 219 2949
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Divider & Copyright */}
      <div className="mt-16 pt-8 border-t border-white/20 text-center">
        <p className="text-xs text-white/60">
          &copy; {new Date().getFullYear()} EverLearn. All rights reserved.
        </p>
      </div>
    </footer>
  );
}