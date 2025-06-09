/* eslint-disable react/no-unescaped-entities */
"use client";

import { FC } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const HowToUse = () => {
  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full py-16 md:py-24 lg:py-32">
        {/* Text */}
        <h2 className="text-center text-3xl font-bold md:text-5xl">
          如何使用AI图片转提示词工具
        </h2>
        <p className="mx-auto mb-12 mt-4 max-w-lg text-center text-[#647084]">
          三步轻松生成专业AI绘画提示词
        </p>
        {/* Content */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-4 rounded-md border border-solid border-[#dfdfdf] bg-white p-8 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#276ef1]">
              <p className="text-xl font-bold text-white">1</p>
            </div>
            <p className="text-xl font-semibold">选择风格</p>
            <p className="text-sm text-[#647084]">
              选择目标AI模型：Midjourney、Stable Diffusion 或 FLUX
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-md border border-solid border-[#dfdfdf] bg-white p-8 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#276ef1]">
              <p className="text-xl font-bold text-white">2</p>
            </div>
            <p className="text-xl font-semibold">上传图片</p>
            <p className="text-sm text-[#647084]">
              点击上传或拖拽图片到指定区域
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-md border border-solid border-[#dfdfdf] bg-white p-8 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#276ef1]">
              <p className="text-xl font-bold text-white">3</p>
            </div>
            <p className="text-xl font-semibold">AI分析</p>
            <p className="text-sm text-[#647084]">
              AI自动分析图片内容并生成基础描述
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-md border border-solid border-[#dfdfdf] bg-white p-8 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#276ef1]">
              <p className="text-xl font-bold text-white">4</p>
            </div>
            <p className="text-xl font-semibold">获取提示词</p>
            <p className="text-sm text-[#647084]">
              获得针对所选AI模型优化的专业提示词
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;