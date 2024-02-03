import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function Header() {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="https://i.imgur.com/jsu0fLN.png"
              width={50}
              height={50}
              alt="GitHelp logo"
            />
            <Link href="/index" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              GitHelp
            </Link>
          </div>
          <nav>
            <ul className="flex justify-center space-x-4">
              <li>
                <Link href="/quickstart" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Quick Start
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
