/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Icons } from "@/components/Icons";
import "@/styles/upload.css";
import { usePrediction } from "@/hooks/usePrediction";
import { Spinner } from "@/components/Spinner";

const UploadSection = () => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("midjourney");
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 5242880,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: Blob) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      handleFile(acceptedFiles);
    },
  });
  const { prediction, error, handleSubmit } = usePrediction();

  const styleOptions = [
    {
      id: "midjourney",
      name: "Midjourney",
      description: "艺术性强，适合创意和概念设计",
      icon: "🎨"
    },
    {
      id: "stable-diffusion",
      name: "Stable Diffusion",
      description: "平衡性好，适合写实和细节丰富的图像",
      icon: "⚡"
    },
    {
      id: "flux",
      name: "FLUX",
      description: "高质量，适合专业级图像生成",
      icon: "🌟"
    }
  ];

  // upload image
  const handleFile = async (acceptedFiles: any[]) => {
    setUploading(true);
    const formData = new FormData();
    acceptedFiles.map((file: Blob) => {
      console.info("file", file);
      formData.append("file", file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const body = await response.json();

      if (body.success) {
        handleImageToPrompt(body.imageUrl);
      } else {
        toast.error(body.message);
      }

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  //   image to prompt
  const handleImageToPrompt = async (imageUrl: string) => {
    await handleSubmit({ image: imageUrl, style: selectedStyle });
  };

  const copyPrompt = async (content: string = "") => {
    await navigator.clipboard.writeText(content.trim());
    toast.success("Copied!");
  };

  const formatPromptForStyle = (basePrompt: string, style: string) => {
    if (!basePrompt) return "";
    
    switch (style) {
      case "midjourney":
        return `${basePrompt} --ar 16:9 --v 6 --style raw --quality 2`;
      case "stable-diffusion":
        return `${basePrompt}, highly detailed, 8k resolution, professional photography, sharp focus, vibrant colors`;
      case "flux":
        return `${basePrompt}, ultra high quality, photorealistic, professional lighting, cinematic composition`;
      default:
        return basePrompt;
    }
  };

  return (
    <section className="w-full bg-white dark:bg-gray-900" id="image_to_prompt">
      <div className="container flex flex-col items-center py-12 mx-auto">
        {/* Style Selection */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            选择AI模型风格
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {styleOptions.map((style) => (
              <div
                key={style.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedStyle === style.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedStyle(style.id)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{style.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-800">{style.name}</h4>
                    <p className="text-sm text-gray-600">{style.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        <div
          {...getRootProps({ className: "dropzone" })}
          className="flex w-full max-w-lg mx-auto justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-12 pb-12"
        >
          <div className="space-y-1 text-center">
            <input {...getInputProps()} />
            <Icons.ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
            <p className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md bg-white font-medium text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500">
                Upload a photo{" "}
              </label>
              <span className="pl-1">or drag and drop</span>
            </p>
            <p className="text-xs text-gray-500">Only jpeg or PNG up to 5MB</p>
          </div>
        </div>

        {/* Results */}
        {files.length > 0 && (
          <aside className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 min-h-32 rounded-lg bg-gray-50 p-6">
            {/* Preview Image */}
            <div className="preview-img-wrapper">
              <h3 className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 mb-4">
                上传的图片
              </h3>
              {files.map((file: any) => (
                <div className="rounded-md mb-2" key={file.name}>
                  <div className="relative flex justify-center items-center overflow-hidden rounded-lg">
                    <img
                      src={file.preview}
                      className="block h-full w-auto max-h-80 rounded-lg shadow-md"
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                      }}
                    />
                    {uploading ? (
                      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full z-10 bg-opacity-50 bg-white rounded-lg">
                        <Spinner />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            {/* Generated Prompts */}
            <div className="preview-prompt-wrapper">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200">
                  生成的提示词
                </h3>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                    {styleOptions.find(s => s.id === selectedStyle)?.name}
                  </span>
                  <button 
                    onClick={() => copyPrompt(formatPromptForStyle(prediction?.output, selectedStyle))}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <Icons.Copy className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Base Prompt */}
              {prediction?.output ? (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <h4 className="font-medium text-gray-800 mb-2">基础描述</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {prediction?.output}
                    </p>
                  </div>

                  {/* Styled Prompt */}
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                    <h4 className="font-medium text-indigo-800 mb-2">
                      {styleOptions.find(s => s.id === selectedStyle)?.name} 优化版本
                    </h4>
                    <p className="text-sm text-indigo-700 leading-relaxed font-mono">
                      {formatPromptForStyle(prediction?.output, selectedStyle)}
                    </p>
                  </div>

                  {/* Style Tips */}
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h5 className="font-medium text-yellow-800 mb-1">使用提示</h5>
                    <p className="text-xs text-yellow-700">
                      {selectedStyle === "midjourney" && "复制优化版本到Midjourney，参数已包含宽高比和版本设置"}
                      {selectedStyle === "stable-diffusion" && "适用于Automatic1111、ComfyUI等SD界面，已添加质量关键词"}
                      {selectedStyle === "flux" && "适用于FLUX模型，强调高质量和专业效果"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center h-32">
                  <Spinner />
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};

export default UploadSection;