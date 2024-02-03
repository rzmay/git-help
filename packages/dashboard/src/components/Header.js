import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function Header() {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">

        <div className="flex items-center space-x-2 flex-shrink-0 pr-4">
          <Link href="../" passHref>
            <Image
              src="https://i.imgur.com/95PIqle.png"
              width={200}
              height={50}
              alt="GitHelp logo"
            />
          </Link>
        </div>



        <nav className="flex-shrink-0">
          <ul className="flex justify-end space-x-4">
            <li>
              <Link href="/quickstart" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                Quick Start
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Log in
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  );
}