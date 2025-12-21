"use client";

import LocationSearch from "@/components/map/location-search";
import { useUserContext } from "@/context/UserContext";
import imageCompression from "browser-image-compression";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreatePostMutation,
  useGetPostsQuery,
} from "../../../../generated/graphql";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar"; // Shadcn calendar
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { getPostType, postKey } from "@/utils/convertPostTypes";

type PostType = "post" | "image" | "link";

interface PostImage {
  imageName: string;
  imageBase64: string;
}

type Coordinates = {
  lat: string;
  lon: string;
};

type PostData = {
  title: string;
  content: string;
  images: PostImage[];
  category: string;
  linkUrl?: string;
  coordinates: Coordinates;
  locationName: string;
  date: Date | undefined;
};

const postType = [
  "Violence & Assault",
  "Sexual Safety",
  "Children & Elderly Safety",
  "Theft & Burglary",
  "Fraud & Scams",
  "DUI / Drunk Driving",
  "Traffic Incidents",
  "Public Disturbance",
  "Environmental Hazards",
  "Probation & Legal Alerts",
  "Court Orders & Legal Notices",
] as const;

export default function Submit() {
  const searchParams = useSearchParams();
  const returnView = searchParams.get("returnView") ?? "Map";

  const { refetch } = useGetPostsQuery({
    variables: { data: { limit: 5, cursor: null } },
  });
  const router = useRouter();
  const [createPost] = useCreatePostMutation();
  const { loggedUser } = useUserContext();

  const [activeTab, setActiveTab] = useState<PostType>("post");

  const [formData, setFormData] = useState<PostData>({
    title: "",
    content: "",
    images: [],
    linkUrl: "",
    category: "",
    coordinates: { lat: "", lon: "" },
    locationName: "",
    date: new Date(Date.now()), // optional fields can be undefined
  });

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

    if (formData.locationName.split(",").length < 6) {
      toast("Location must include street name and number", {
        type: "warning",
        autoClose: 2000,
        position: "top-right",
      });
      return;
    }

    const data = {
      title: formData.title,
      body: formData.content,
      imageBase64: formData.images.map((img) => img.imageBase64),
      imageName: formData.images.map((img) => img.imageName),
      lat: formData.coordinates.lat,
      lon: formData.coordinates.lon,
      locationName: formData.locationName,
      date_occurred: formData.date,
      category: getPostType(formData.category as postKey),
    };

    await createPost({
      variables: {
        data: {
          ...data,
          userId: loggedUser.id,
        },
      },
      onCompleted: (data) => {
        console.log("complete create post: ", data);
        refetch();
        router.push(`/dashboard?view=Community${returnView}`);
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
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };

    try {
      const compressedImages = await Promise.all(
        Array.from(files).map(async (file) => {
          const compressedFile = await imageCompression(file, options);

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

      //   setImages((prev) => [...prev, ...compressedImages]);

      setFormData((prev) => ({ ...prev, images: compressedImages }));
    } catch (error) {
      console.error("Image compression failed:", error);
    }
  };

  const removeImage = (index: number) => {
    // setImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold">Create a Post</h1>
        <Link
          href={{ pathname: "/dashboard", query: { view: returnView } }}
          className="text-blue-400 hover:underline text-sm"
        >
          {`← Back to ${returnView}`}
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
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Title"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* POST TAB */}
        {activeTab === "post" && (
          <>
            <textarea
              rows={6}
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="Write your post..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-neutral-800 dark:text-gray-100 text-left text-gray-500">
                  {formData.date ? formData.date.toDateString() : "Select date"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[320px] p-4 bg-white rounded-xl">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => {
                    setFormData((prev) => ({
                      ...prev,
                      date: date ?? undefined,
                    }));
                  }}
                  className="w-full h-auto [&_button]:rounded-full [&_button]:transition-colors [&_button]:duration-200 [&_button:hover]:bg-blue-500 [&_button:hover]:text-white [&_button:focus]:outline-none"
                />
              </PopoverContent>
            </Popover>

            {/* Category Select */}
            <Select
              onValueChange={(category) => {
                setFormData((prev) => ({ ...prev, category }));
              }}
              value={formData.category}
            >
              <SelectTrigger className="w-full border border-gray-300 text-gray-500">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {postType.map((type) => (
                  <SelectItem
                    value={type.toLowerCase()}
                    key={type}
                    className="data-[highlighted]:bg-blue-200 data-[highlighted]:text-blue-900"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location */}
            <LocationSearch
              onSelect={(loc) => {
                setFormData((prev) => ({
                  ...prev,
                  locationName: loc.display,
                  coordinates: { lat: loc.lat, lon: loc.lon },
                }));
              }}
              value={formData.locationName}
            />
          </>
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

            {formData.images.length === 0 ? (
              <div
                className="cursor-pointer"
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                <p className="text-gray-500">Click or drag to upload images</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {formData.images.map((img, i) => (
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
          <input
            type="url"
            value={formData.linkUrl}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, linkUrl: e.target.value }))
            }
            placeholder="Enter a link (https://...)"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
