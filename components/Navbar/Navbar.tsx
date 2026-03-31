import Logo from "../Logo/Logo";
import NavbarCTA from "./NavbarCTA";
import NavbarLinks from "./NavbarLinks";
import ThemeToggle from "../Theme/ThemeToggle";
import Link from "next/link";

const mobileLinkClass =
  "text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-row justify-center items-center w-full py-4">
        <div className="max-w-[1500px] w-full">
          <nav className="grid grid-cols-2 sm:grid-cols-3 px-6 w-full">
            <div className="flex flex-row justify-start items-center">
              <Logo size="h-7 w-7" withText />
            </div>
            <div className="hidden sm:flex flex-row justify-center">
              <NavbarLinks />
            </div>
            <div className="flex flex-row justify-end items-center gap-3">
              <ThemeToggle />
              <NavbarCTA />
            </div>
          </nav>
          <div className="sm:hidden border-t border-neutral-200 dark:border-neutral-800 px-6 py-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href="/reports" className={mobileLinkClass}>
              Reports
            </Link>
            <Link href="/blog" className={mobileLinkClass}>
              Blog
            </Link>
            <Link href="/contact" className={mobileLinkClass}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
