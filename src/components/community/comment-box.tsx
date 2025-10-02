"use client";
import { useState } from "react";

export default function CommentBox({
  onSubmit,
}: {
  onSubmit?: (text: string) => void;
}) {
  const [value, setValue] = useState("");
  const [active, setActive] = useState(false);

  const handleCancel = () => {
    setValue("");
    setActive(false);
  };

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit?.(value.trim());
      setValue("");
      setActive(false);
    }
  };

  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setActive(true)}
        rows={active ? 4 : 1}
        placeholder="What are your thoughts?"
        className="w-full resize-none rounded border-1 border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
      />

      {active && (
        <div className="mt-2 flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
          >
            Comment
          </button>
          <button
            onClick={handleCancel}
            className="rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
