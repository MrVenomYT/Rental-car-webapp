import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { footerLinks } from "@constants";

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
    {/* Contact Strip with Lucide Icons */}
    <div className="max-w-[1440px] mx-auto padding-x py-8 border-b border-slate-800 flex flex-wrap justify-between items-center gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase">Call Us</p>
          <p className="text-sm font-bold text-white">(888) 123 4567</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase">Email Us</p>
          <p className="text-sm font-bold text-white">hello@drivenest.com</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase">Visit Us</p>
          <p className="text-sm font-bold text-white">123 Auto Drive Suite 100 New York NY 10001</p>
        </div>
      </div>
    </div>

    <div className="max-w-[1440px] mx-auto padding-x py-12 flex max-md:flex-col flex-wrap justify-between gap-10">
      <div className="flex flex-col gap-4 max-w-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-lg">
            D
          </div>
          <span className="text-lg font-extrabold text-white tracking-tight">
            Drive<span className="text-blue-500">Nest</span>
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-normal">
          Your trusted partner in finding the perfect car. Quality vehicles, best prices, and exceptional service.
        </p>
      </div>

      <div className="flex-1 w-full flex md:justify-end flex-wrap gap-12">
        {footerLinks.map((item) => (
          <div key={item.title} className="flex flex-col gap-3 min-w-[150px]">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">{item.title}</h4>
            <div className="flex flex-col gap-2">
              {item.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.url}
                  className="text-xs text-slate-400 hover:text-blue-400 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="max-w-[1440px] mx-auto padding-x py-6 border-t border-slate-800 flex justify-between items-center flex-wrap text-xs text-slate-500">
      <p>© 2026 DriveNest. All rights reserved.</p>
      <div className="flex gap-6">
        <Link href="/" className="hover:text-slate-300 transition-colors">
          Privacy Policy
        </Link>
        <Link href="/" className="hover:text-slate-300 transition-colors">
          Terms of Service
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
