import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import Link from "next/link";

export default function NavbarLinks() {
  return (
    <Menubar>
      {/* Solutions */}
      <MenubarMenu>
        <MenubarTrigger>Solutions</MenubarTrigger>
        <MenubarContent>
          <Link href="/solutions/websites-landings">
            <MenubarItem>Websites & Landings</MenubarItem>
          </Link>
          <Link href="/solutions/product-design">
            <MenubarItem>Product Design</MenubarItem>
          </Link>
          <Link href="/solutions/custom-software">
            <MenubarItem>Custom Software</MenubarItem>
          </Link>
          <Link href="/solutions/process-automation">
            <MenubarItem>Process Automation</MenubarItem>
          </Link>
          <Link href="/solutions/web-apps">
            <MenubarItem>Web Apps</MenubarItem>
          </Link>
          <Link href="/solutions/it-consulting">
            <MenubarItem>IT Consulting</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
      {/* Blog */}
      <Link href="/blog" className="flex items-center rounded-lg px-3 py-1 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 dark:hover:text-blue-400 transition-all">
        Blog
      </Link>
      {/* Team */}
      <MenubarMenu>
        <MenubarTrigger>Team</MenubarTrigger>
        <MenubarContent>
          <Link href="/team/managers">
            <MenubarItem>Managers</MenubarItem>
          </Link>
          <Link href="/team/developers">
            <MenubarItem>Developers</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
      {/* Reports */}
      <Link href="/reports" className="flex items-center rounded-lg px-3 py-1 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 dark:hover:text-blue-400 transition-all">
        Reports
      </Link>
      {/* Contact */}
      <Link href="/contact" className="flex items-center rounded-lg px-3 py-1 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 dark:hover:text-blue-400 transition-all">
        Contact
      </Link>
    </Menubar>
  );
}
