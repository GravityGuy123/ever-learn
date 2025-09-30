"use client";

import React from "react";
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
    <footer className="w-full bg-gradient-to-r from-violet-400 to-purple-400 dark:from-violet-800 dark:to-purple-900 text-white py-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-bold text-lg uppercase tracking-wide">
            EverLearn
          </span>
          <span className="text-sm text-white/80 mt-1">
            Empowering Minds, Shaping Futures
          </span>
        </div>

        {/* Navigation + Social */}
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 items-center justify-center">
            {["Inbox", "Lessons", "Tasks", "Groups"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="hover:text-violet-700 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="flex gap-5 mt-2">
            {socialLinks.map(({ Icon, href, label }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="text-white hover:text-violet-700 p-2 rounded-full transition-colors duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-end text-sm text-white/80 gap-2">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-violet-700 dark:text-violet-300" />
            <Link
              href="mailto:info@gravityconcepts.com"
              className="text-white block break-all hover:text-violet-700 transition-all duration-300"
            >
              info@ever-learn.com
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-violet-700 dark:text-violet-300" />
            <Link
              href="tel:+2349032192949"
              className="text-white block hover:text-violet-700 transition-all duration-300"
            >
              +234 903 219 2949
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-white/60 mt-6">
        &copy; {new Date().getFullYear()} EverLearn. All rights reserved.
      </div>
    </footer>
  );
}