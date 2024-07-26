"use client";
import Logo from '@/components/Logo';
import { WandSparkles, History, X, Menu, MenuIcon } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const menuList = [
  {
    name: 'Magic Tools',
    icon: WandSparkles,
    path: '/dashboard',
  },
  {
    name: 'Output History',
    icon: History,
    path: '/dashboard/history',
  },
];

const Sidebar = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    {/* Mobile menu button */}
    <div className="p-4 flex justify-between items-center bg-white md:hidden fixed top-0 inset-x-0 z-40">
      <Logo />
      <button onClick={toggleSidebar} className="text-primary focus:outline-none">
        {isOpen ? <X size={24} /> : <MenuIcon size={64} style={{ color: 'black' }} />} {/* Ensure MenuIcon is visible */}
      </button>
    </div>

      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 p-5 bg-white h-full flex flex-col transition-transform transform',
        isOpen ? 'translate-x-0' : '-translate-x-full', // For mobile toggle effect
        'md:relative md:translate-x-0 md:flex md:w-60'
      )}>
        <Logo />
        <div className="mt-10 flex flex-col justify-between">
          {menuList.map((menu) => {
            const Icon = menu.icon; // Ensure we are rendering the icon properly
            return (
              <Link href={menu.path} key={menu.name} className={cn(
                'flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white cursor-pointer rounded-lg items-center',
                path === menu.path && "bg-primary text-white"
              )}>
                <Icon className="w-5 h-5" />
                <h2 className="text-lg">{menu.name}</h2>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 md:hidden z-30"></div>
      )}
    </div>
  );
};

export default Sidebar;
