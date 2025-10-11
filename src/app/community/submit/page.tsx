"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserContext } from "@/context/UserContext";
import { useCreatePostMutation } from "../../../../generated/graphql";
import { useGetPostsQuery } from "../../../../generated/graphql";
import { toast } from "react-toastify";
import clsx from "clsx";

import { useRouter } from "next/navigation";

type PostType = "post" | "image" | "link";

interface PostImage {
  imageName: string | null;
  imageBase64: string | null;
}

export default function Submit() {
  const { refetch } = useGetPostsQuery();
  const router = useRouter();
  const [createPost] = useCreatePostMutation();
  const { loggedUser } = useUserContext();
  const [activeTab, setActiveTab] = useState<PostType>("post");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<PostImage>({
    imageName: null,
    imageBase64: null,
  });
  const [linkUrl, setLinkUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
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
        imageBase64: image.imageBase64,
        imageName: image.imageName,
      };

      await createPost({
        variables: {
          data: {
            ...data,
            userId: loggedUser.id,
          },
        },
        onCompleted: () => {
          refetch();
          router.push("/dashboard?view=Community");
        },
        onError: (error) => {
          console.log("Error creating post: ", error);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage((prev) => ({
      ...prev,
      imageName: file?.name || "",
    }));

    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () =>
      setImage((prev) => ({ ...prev, imageBase64: reader.result as string })); //tell reader what to do after reading the file
    reader.readAsDataURL(file); //envoke reading the file
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
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

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
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
            onClick={() => document.getElementById("imageUpload")?.click()}
          >
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {!image.imageBase64 ? (
              <p className="text-gray-500">Click or drag to upload an image</p>
            ) : (
              <div className="relative flex justify-center">
                <div className="relative w-full max-w-md h-64">
                  <Image
                    src={image.imageBase64 || ""}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setImage(() => ({ imageBase64: null, imageName: null }))
                  }
                  className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md"
                >
                  Remove
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
