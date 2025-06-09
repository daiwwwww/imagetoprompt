"use client";

import { FC } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const HeroSection: FC = () => {
  return (
    <section className="mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
      <div className="text-center space-y-4">
        <h1 className="text-gray-800 font-bold text-4xl md:text-5xl">
          AI-Powered
          <span className="text-indigo-600"> Image to Prompt</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          将图片转换为专业的AI绘画提示词，支持 Midjourney、Stable Diffusion 和 FLUX 等主流AI绘画工具
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <div className="flex items-center space-x-2 px-4 py-2 bg-purple-100 rounded-full">
            <span className="text-purple-600 font-medium">🎨 Midjourney</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-blue-600 font-medium">⚡ Stable Diffusion</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-full">
            <span className="text-green-600 font-medium">🌟 FLUX</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;