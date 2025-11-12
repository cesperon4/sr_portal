"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserContext } from "@/context/UserContext";
import {
  useCreatePostMutation,
  useGetPostsQuery,
} from "../../../../generated/graphql";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";

type PostType = "post" | "image" | "link";

interface PostImage {
  imageName: string;
  imageBase64: string;
}

export default function Submit() {
  const { refetch } = useGetPostsQuery({
    variables: { data: { limit: 5, cursor: null } },
  });
  const router = useRouter();
  const [createPost] = useCreatePostMutation();
  const { loggedUser } = useUserContext();

  const [activeTab, setActiveTab] = useState<PostType>("post");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<PostImage[]>([]);
  const [linkUrl, setLinkUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedUser.id) {
      toast("You must be logged in to submit a post", {
        type: "warning",
        autoClose: 2000,
        position: "top-right",
      });
      return;
    }

    const data = {
      title,
      body: content,
      imageBase64: images.map((img) => img.imageBase64),
      imageName: images.map((img) => img.imageName),
    };

    await createPost({
      variables: {
        data: {
          ...data,
          userId: loggedUser.id,
        },
      },
      onCompleted: () => {
        console.log("completed");
        refetch();
        router.push("/dashboard?view=Community");
      },
      onError: (error) => {
        console.error("Error creating post:", error);
      },
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const options = {
      maxSizeMB: 1, // compress images to around 1MB
      maxWidthOrHeight: 1280, // resize large images (keeps aspect ratio)
      useWebWorker: true,
    };

    try {
      const compressedImages = await Promise.all(
        Array.from(files).map(async (file) => {
          // Compress each file
          const compressedFile = await imageCompression(file, options);

          // Convert to Base64
          return new Promise<{ imageName: string; imageBase64: string }>(
            (resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({
                  imageName: compressedFile.name,
                  imageBase64: reader.result as string,
                });
              };
              reader.readAsDataURL(compressedFile);
            }
          );
        })
      );

      setImages((prev) => [...prev, ...compressedImages]);
    } catch (error) {
      console.error("Image compression failed:", error);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create a Post</h1>
        <Link
          href={{ pathname: "/dashboard", query: { view: "Community" } }}
          className="text-blue-400 hover:underline text-sm"
        >
          ← Back to Community
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {["post", "image", "link"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as PostType)}
            className={clsx(
              "flex-1 py-2 text-center font-medium border-b-2 capitalize cursor-pointer",
              {
                "border-blue-600 text-blue-400": activeTab === tab,
                "border-transparent text-gray-500": activeTab !== tab,
              }
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* POST TAB */}
        {activeTab === "post" && (
          <textarea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        )}

        {/* IMAGE TAB */}
        {activeTab === "image" && (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center transition hover:bg-gray-50 dark:hover:bg-neutral-800">
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            {images.length === 0 ? (
              <div
                className="cursor-pointer"
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                <p className="text-gray-500">Click or drag to upload images</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Preview grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((img, i) => (
                    <div key={i} className="relative group">
                      <Image
                        src={img.imageBase64 || ""}
                        alt={`Image ${i + 1}`}
                        width={300}
                        height={200}
                        className="object-cover rounded-lg w-full h-40"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Upload more button */}
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("imageUpload")?.click()
                  }
                  className="inline-flex items-center px-4 py-2 text-sm text-blue-600 border border-blue-400 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                >
                  ➕ Upload more
                </button>
              </div>
            )}
          </div>
        )}

        {/* LINK TAB */}
        {activeTab === "link" && (
          <div>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter a link (https://...)"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {linkUrl && (
              <div className="mt-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-neutral-800">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  🔗 Preview:{" "}
                  <a
                    href={linkUrl}
                    target="_blank"
                    className="text-blue-400 hover:underline break-all"
                  >
                    {linkUrl}
                  </a>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={clsx(
            "w-full text-white py-2 px-4 rounded font-medium transition-colors cursor-pointer",
            { "bg-gray-400 cursor-not-allowed": !loggedUser.id },
            { "bg-blue-600 hover:bg-blue-700": loggedUser.id }
          )}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
