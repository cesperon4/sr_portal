import React from "react";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";

interface PostFooterProps {
  commentCount?: number;
}
function PostFooter({ commentCount }: PostFooterProps) {
  return (
    <div className="footer-container flex gap-2">
      <div className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl">
        <FaRegComment />
        <span className="text-sm">{commentCount || 0}</span>
      </div>
      <div className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl">
        <AiOutlineLike />
      </div>
      <div className="flex items-center px-4 py-2 gap-1 bg-gray-100 hover:bg-gray-200 rounded-xl">
        <PiShareFat />
        <span className="text-sm">Share</span>
      </div>
    </div>
  );
}

export default PostFooter;
