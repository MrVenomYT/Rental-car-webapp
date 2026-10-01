import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@constants";

const Footer = () => (
  <footer className='flex flex-col text-slate-700 bg-slate-900 text-slate-300 mt-20 border-t border-slate-800'>
    <div className='max-w-[1440px] mx-auto w-full flex max-md:flex-col flex-wrap justify-between gap-10 sm:px-16 px-6 py-16'>
      <div className='flex flex-col justify-start items-start gap-6 max-w-sm'>
        <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl inline-block">
          <Image src='/logo.svg' alt='Car Hub Logo' width={118} height={18} className='object-contain invert brightness-200' />
        </div>
        <p className='text-xs text-slate-400 leading-relaxed'>
          Discover world&apos;s best car showcase and rental application. Instant AI matching, verified vehicles, transparent pricing.
        </p>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>San Francisco, CA</span>
          <span aria-hidden="true">·</span>
          <span>Support 24/7</span>
        </div>
      </div>

      <div className="flex-1 w-full flex md:justify-end flex-wrap max-md:mt-10 gap-12">
        {footerLinks.map((item) => (
          <div key={item.title} className="flex flex-col gap-4 min-w-[160px]">
            <h3 className="font-bold text-white text-sm tracking-wide">{item.title}</h3>
            <div className="flex flex-col gap-2.5">
              {item.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.url}
                  className="text-xs text-slate-400 hover:text-primary-blue transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className='max-w-[1440px] mx-auto w-full flex justify-between items-center flex-wrap border-t border-slate-800/80 sm:px-16 px-6 py-8 text-xs text-slate-500'>
      <p>© 2026 CarHub. All rights reserved.</p>

      <div className="flex gap-8 max-sm:mt-4">
        <Link href="/" className="hover:text-slate-300 transition-colors">
          Privacy Policy
        </Link>
        <Link href="/" className="hover:text-slate-300 transition-colors">
          Terms of Service
        </Link>
        <Link href="/" className="hover:text-slate-300 transition-colors">
          Cookie Settings
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
