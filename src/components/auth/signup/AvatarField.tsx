"use client";

import React, { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegisterSchema } from "@/lib/schema";
import Image from "next/image";

interface AvatarFieldProps {
  register: UseFormRegister<RegisterSchema>;
  errors: FieldErrors<RegisterSchema>;
  isSubmitting: boolean;
}

export default function AvatarField({ register, errors }: AvatarFieldProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  return (
    <div className="mb-4">
      <span className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
        Upload an Avatar (JPEG, PNG, or WEBP, max size 2MB)

      </span>

      <div className="flex items-center gap-4">
        {/* File Input Button */}
        <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          Choose file
          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...register("avatar", { onChange: handleFileChange })}
          />
        </label>

        {/* Preview */}
        {preview && (
          <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm">
            <Image
              src={preview}
              alt="Avatar Preview"
              width={96}
              height={96}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
        )}
      </div>

      {errors.avatar && (
        <p className="text-sm text-red-600 mt-1">
          {errors.avatar.message as string}
        </p>
      )}
    </div>
  );
}