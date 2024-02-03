import logo from '../images/GitHelp.png';
import dashboard from '../pages/dashboard';
import Link from 'next/link'

export default function Header() {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/index" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
            <img className="h-8 w-auto" src={logo} alt="Git-Help" />
          </Link>
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
                  href="/login" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
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
