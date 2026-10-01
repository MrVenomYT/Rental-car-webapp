"use client";

import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";

const NavBar = () => (
  <header className='w-full absolute z-20 top-0 left-0 right-0 border-b border-gray-100/50 bg-white/80 backdrop-blur-md transition-all'>
    <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
      {/* Zone 1: Wordmark Logo */}
      <Link href='/' className='flex justify-center items-center gap-2 group'>
        <Image
          src='/logo.svg'
          alt='Car Hub Logo'
          width={118}
          height={18}
          className='object-contain transition-transform group-hover:scale-105'
        />
      </Link>

      {/* Zone 2: Navigation Links */}
      <div className='hidden md:flex items-center gap-8 text-sm font-medium text-slate-600'>
        <a href='#discover' className='hover:text-primary-blue transition-colors'>Catalogue</a>
        <a href='#ai-assistant' className='hover:text-primary-blue transition-colors flex items-center gap-1.5'>
          <span>AI Concierge</span>
          <span className='px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-primary-blue rounded-full'>NEW</span>
        </a>
        <a href='#how-it-works' className='hover:text-primary-blue transition-colors'>How it Works</a>
        <a href='#why-us' className='hover:text-primary-blue transition-colors'>Benefits</a>
      </div>

      {/* Zone 3: Primary Action */}
      <div className='flex items-center gap-3'>
        <CustomButton
          title='Sign In'
          btnType='button'
          containerStyles='text-primary-blue hover:text-white rounded-full bg-blue-50 hover:bg-primary-blue min-w-[120px] font-semibold text-sm transition-all shadow-xs'
        />
      </div>
    </nav>
  </header>
);

export default NavBar;
