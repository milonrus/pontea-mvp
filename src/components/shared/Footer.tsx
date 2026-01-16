'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#01278b] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  PONTEA
                </span>
                <span className="block text-[10px] uppercase tracking-[0.15em] -mt-0.5 text-gray-500">
                  School
                </span>
              </div>
            </Link>
            <p className="mt-6 text-gray-600 leading-relaxed max-w-md">
              The definitive preparation program for international students
              pursuing architecture education at Italy&apos;s finest universities.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://instagram.com/pontea.school"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#f8f9fc] rounded-full flex items-center justify-center hover:bg-[#ebe4f7] transition-colors group"
              >
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-[#01278b] transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="mailto:pontea.school@gmail.com"
                className="w-10 h-10 bg-[#f8f9fc] rounded-full flex items-center justify-center hover:bg-[#ebe4f7] transition-colors group"
              >
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-[#01278b] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-sm font-semibold text-gray-900 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: '#program', label: 'Our Program' },
                { href: '#universities', label: 'Universities' },
                { href: '#pricing', label: 'Pricing' },
                { href: '#team', label: 'Our Team' },
                { href: '#faq', label: 'FAQ' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-[#01278b] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:pontea.school@gmail.com"
                  className="text-gray-600 hover:text-[#01278b] transition-colors"
                >
                  pontea.school@gmail.com
                </a>
              </li>
            </ul>

            <h4 className="text-sm font-semibold text-gray-900 mt-8 mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-[#01278b] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-[#01278b] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} PONTEA School. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Designed for aspiring architects</span>
              <span className="w-1.5 h-1.5 bg-[#01278b] rounded-full" />
              <span>Milan, Italy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
