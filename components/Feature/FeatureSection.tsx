"use client";

import { FC } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";

const FeatureSection: FC = () => {
  const features = [
    {
      icon: "🎨",
      title: "多模型支持",
      desc: "支持Midjourney、Stable Diffusion、FLUX等主流AI绘画工具的提示词格式"
    },
    {
      icon: "⚡",
      title: "智能优化",
      desc: "根据不同AI模型特点，自动优化提示词结构和参数设置"
    },
    {
      icon: "🔍",
      title: "精准识别",
      desc: "先进的AI视觉识别技术，准确分析图片内容、风格和细节"
    },
    {
      icon: "📋",
      title: "一键复制",
      desc: "生成的提示词可一键复制，直接粘贴到AI绘画工具中使用"
    },
    {
      icon: "🌟",
      title: "专业级质量",
      desc: "生成的提示词包含专业摄影术语和艺术风格描述"
    },
    {
      icon: "🚀",
      title: "快速生成",
      desc: "秒级响应，快速将图片转换为高质量的AI绘画提示词"
    }
  ];

  return (
    <section className="py-14">
      <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl mb-4">
            为什么选择我们的图片转提示词工具
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            专为AI绘画爱好者和专业设计师打造，让创意转换更简单高效
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">
              支持的AI绘画工具
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-purple-600 mb-2">🎨 Midjourney</h4>
                <p className="text-sm text-gray-600">自动添加版本参数、宽高比设置和风格控制</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-blue-600 mb-2">⚡ Stable Diffusion</h4>
                <p className="text-sm text-gray-600">优化关键词密度，增强细节描述和质量标签</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-green-600 mb-2">🌟 FLUX</h4>
                <p className="text-sm text-gray-600">专业级描述，强调光影效果和构图细节</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;