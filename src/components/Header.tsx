"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
          aria-label="共事智能首页"
        >
          <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
            {/* Real Logo image with fallback */}
            <Image
              src="/logo-transparent.png"
              alt="共事智能 Logo"
              width={36}
              height={36}
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                共事
              </span>
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600 border border-slate-200 tracking-wider">
                GONGSHI AI
              </span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:block tracking-tight">
              让人和 Agent 共同把事情做完
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="主要导航">
          {COMPANY_INFO.navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive
                    ? "text-slate-900 font-semibold bg-slate-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-slate-900 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Primary Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-950 hover:bg-slate-800 rounded-lg shadow-xs hover:shadow-sm transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            <span>带着一个问题来</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/diagnose"
            className="text-xs px-3 py-1.5 font-medium text-white bg-slate-950 rounded-md"
          >
            提一个问题
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100 focus:outline-hidden"
            aria-expanded={mobileMenuOpen}
            aria-label="打开导航菜单"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="py-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>上海共事智能科技有限公司</span>
            <span className="text-emerald-700 font-medium">Human + Agent, in Flow.</span>
          </div>
          <div className="flex flex-col space-y-1">
            {COMPANY_INFO.navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? "text-slate-950 bg-slate-100 font-semibold"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge ? (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {link.badge}
                    </span>
                  ) : (
                    isActive && <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/diagnose"
              className="w-full flex items-center justify-center gap-2 py-3 text-center text-sm font-semibold text-white bg-slate-950 rounded-lg shadow-xs"
            >
              <span>带着一个问题来诊断</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
            <Link
              href="/training"
              className="w-full py-2.5 text-center text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              了解每周日免费培训
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
