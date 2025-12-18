"use client";

import { useRouter } from "next/navigation";
import { MdOutlineAddBox } from "react-icons/md";

type PostButtonProps = {
  text: string;
  returnView: "Map" | "Community";
};

function PostButton({ text, returnView }: PostButtonProps) {
  const router = useRouter();

  const updateQuery = () => {
    const params = new URLSearchParams({
      returnView: returnView,
    });

    router.push(`/community/submit?${params}`);
  };
  return (
    <button
      className="flex items-center gap-2 hover:bg-gray-100 rounded-xl p-2 cursor-pointer"
      onClick={updateQuery}
    >
      <MdOutlineAddBox size={24} />

      <span className="text-sm">{text}</span>
    </button>
  );
}

export default PostButton;
