"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import {
  LayoutDashboard,
  HelpCircle,
  FileQuestion,
  Rocket,
} from "lucide-react";

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Questions", href: "/dashboard/questions", icon: FileQuestion },
    { label: "Upgrade", href: "/dashboard/upgrade", icon: Rocket },
    { label: "How it Works?", href: "/dashboard/how", icon: HelpCircle },
  ];

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src={"/logo.svg"} width={160} height={100} alt="logo" />

      <ul className="hidden md:flex gap-6 items-center">
        {navItems.map(({ label, href, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex items-center gap-2 px-2 py-1 rounded transition-all
                hover:text-blue-600 hover:font-bold
                ${path === href ? "text-blue-600 font-bold" : "text-gray-700"}`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <UserButton />
    </div>
  );
}

export default Header;
