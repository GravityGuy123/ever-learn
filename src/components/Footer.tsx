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
  return (
    <footer className="w-full bg-gradient-to-r from-violet-400 to-purple-400 dark:from-violet-900 dark:to-violet-950 text-white py-10 border-t border-white/10">
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

        {/* Navigation */}
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 items-center justify-center">
            {["Inbox", "Lesson", "Task", "Group"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="hover:text-[#26A69A] transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 mt-2">
            {[FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn, FaGithub].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#26A69A] hover:shadow-[0_0_15px_#26A69A] p-2 rounded-full transition-all"
                >
                  <Icon size={18} />
                </a>
              )
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-end text-sm text-white/80 gap-2">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-[#26A69A]" />
            <Link
              href="mailto:info@gravityconcepts.com"
              className="text-white block break-all hover:text-[#26A69A] transition-all duration-300"
            >
              info@gravityconcepts.com
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-[#26A69A]" />
            <Link
              href="tel:+2349032192949"
              className="text-white block hover:text-[#26A69A] transition-all duration-300"
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