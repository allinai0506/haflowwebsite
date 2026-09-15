"use client";

import React from "react";
import { Sparkles, User, Bot, ArrowRight, Zap, Target, Brain, Users, RefreshCw } from "lucide-react";

export function InfinityHeroVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[580px] mx-auto flex items-center justify-center p-4 select-none">
      {/* Outer subtle glow circle */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-100/40 via-cyan-100/30 to-blue-200/40 blur-2xl -z-10 pointer-events-none" />

      {/* Main SVG Canvas */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 600 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
        >
          <defs>
            {/* Main Gradient for the ribbon */}
            <linearGradient id="flowRibbonGrad" x1="50" y1="100" x2="550" y2="320" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="30%" stopColor="#00d2ff" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="70%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            <linearGradient id="humanSphereGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="60%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            <linearGradient id="agentSphereGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>

            {/* Shadow filter for 3D depth */}
            <filter id="ribbonShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0284c7" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background orbital faint dashed paths */}
          <path
            d="M 120 210 C 120 100, 240 100, 300 210 C 360 320, 480 320, 480 210 C 480 100, 360 100, 300 210 C 240 320, 120 320, 120 210 Z"
            stroke="#93c5fd"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.45"
            fill="none"
          />

          {/* The Glorious 3D Infinity Ribbon (Outer Loop) */}
          <path
            d="M 175 210 C 175 115, 255 115, 300 210 C 345 305, 425 305, 425 210 C 425 115, 345 115, 300 210 C 255 305, 175 305, 175 210 Z"
            stroke="url(#flowRibbonGrad)"
            strokeWidth="38"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ribbonShadow)"
          />

          {/* Highlight inner flow core for glowing 3D tubular effect */}
          <path
            d="M 175 210 C 175 115, 255 115, 300 210 C 345 305, 425 305, 425 210 C 425 115, 345 115, 300 210 C 255 305, 175 305, 175 210 Z"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />

          {/* Left Node: Human / 人 Sphere */}
          <g transform="translate(175, 210)">
            <circle r="46" fill="url(#humanSphereGrad)" filter="drop-shadow(0 6px 16px rgba(37,99,235,0.4))" />
            <circle r="43" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
            <text textAnchor="middle" y="-4" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              Human
            </text>
            <text textAnchor="middle" y="16" fill="#e0f2fe" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
              人
            </text>
          </g>

          {/* Right Node: Agent / 智能体 Sphere */}
          <g transform="translate(425, 210)">
            <circle r="46" fill="url(#agentSphereGrad)" filter="drop-shadow(0 6px 16px rgba(2,132,199,0.4))" />
            <circle r="43" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
            <text textAnchor="middle" y="-4" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              Agent
            </text>
            <text textAnchor="middle" y="16" fill="#e0f2fe" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
              智能体
            </text>
          </g>

          {/* Center Intersection: In Flow / 共事 */}
          <g transform="translate(300, 210)">
            <rect x="-42" y="-24" width="84" height="48" rx="24" fill="#ffffff" filter="drop-shadow(0 4px 12px rgba(15,23,42,0.08))" />
            <rect x="-40" y="-22" width="80" height="44" rx="22" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <text textAnchor="middle" y="-2" fill="#0f172a" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
              In Flow
            </text>
            <text textAnchor="middle" y="14" fill="#2563eb" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
              共事
            </text>
          </g>

          {/* Connected Peripheral Words with dotted lines */}
          {/* Top Left: 目标 */}
          <line x1="175" y1="160" x2="210" y2="90" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="210" cy="90" r="3" fill="#2563eb" />
          <text x="220" y="94" fill="#1e293b" fontSize="13" fontWeight="600">目标</text>

          {/* Bottom Left: 思考 */}
          <line x1="140" y1="235" x2="90" y2="280" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="90" cy="280" r="3" fill="#2563eb" />
          <text x="60" y="284" fill="#1e293b" fontSize="13" fontWeight="600">思考</text>

          {/* Top Right: 协作 */}
          <line x1="425" y1="160" x2="455" y2="90" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="455" cy="90" r="3" fill="#0284c7" />
          <text x="465" y="94" fill="#1e293b" fontSize="13" fontWeight="600">协作</text>

          {/* Mid Right: 创造 */}
          <line x1="475" y1="210" x2="525" y2="230" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="525" cy="230" r="3" fill="#0284c7" />
          <text x="535" y="234" fill="#1e293b" fontSize="13" fontWeight="600">创造</text>

          {/* Bottom Center: 执行 */}
          <line x1="385" y1="240" x2="330" y2="330" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="330" cy="330" r="3" fill="#0284c7" />
          <text x="320" y="350" fill="#1e293b" fontSize="13" fontWeight="600">执行</text>
        </svg>

        {/* Bottom Right Floating Badge: 更高效的组织 源于更好的共事方式 */}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-blue-100 shadow-xs text-[11px] font-medium text-slate-600 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>更高效的组织 · 源于更好的共事方式</span>
        </div>
      </div>
    </div>
  );
}
