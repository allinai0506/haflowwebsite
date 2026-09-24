"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { label: "首页", href: "/" },
    { label: "HAFlow", href: "/haflow" },
    { label: "解决方案", href: "/problems" },
    { label: "客户案例", href: "/cases" },
    { label: "方法论", href: "/methodology" },
    { label: "观点", href: "/insights" },
    { label: "诊断", href: "/diagnose" },
    { label: "关于我们", href: "/about" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Identity matching reference image */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-hidden"
          aria-label="共事智能首页"
        >
          <div className="relative h-9 w-auto flex items-center justify-center">
            <Image
              src="/logo-icon.png"
              alt="共事 Logo"
              width={65}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 font-sans">
              共事
            </span>
            <span className="text-slate-300 font-normal text-xl">|</span>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-blue-600 font-sans">
              HAFlow
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation matching reference image */}
        <nav className="hidden md:flex items-center gap-8" aria-label="主要导航">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors px-2 py-1 rounded-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-slate-700 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Blue pill button matching reference image */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-xs hover:shadow-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            联系我们
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-center text-sm font-semibold text-white bg-blue-600 rounded-full shadow-xs"
            >
              <span>联系我们</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
