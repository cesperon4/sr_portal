import { notFound } from "next/navigation";
import { FiShield } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import PostFooter from "../../../components/community/post-footer";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import CommentBox from "@/components/community/comment-box";

// Define the params type
type PostPageParams = {
  id: string;
};

export default async function PostPage({ params }: { params: PostPageParams }) {
  // Example: fetch the post using params.id
  // const post = await fetchPost(params.id);
  // if (!post) return notFound();

  if (false) return notFound(); // placeholder

  return (
    <article className="flex flex-col gap-4 w-11/12 md:w-6/12 mx-auto my-8">
      <Link href={{ pathname: "/dashboard", query: { view: "Community" } }}>
        <div className="flex items-center gap-2">
          <IoIosArrowBack />
          <span>Back</span>
        </div>
      </Link>

      <h1 className="text-2xl font-bold">Post {params.id}</h1>

      <div className="shadow w-full cursor-pointer px-8 py-2 border border-gray-300 rounded-xl">
        <div className="post-header flex gap-2 items-center">
          <FiShield size={18} />
          <span>sr/dui</span>
          <span>2 days ago</span>
          <HiDotsHorizontal size={18} className="ml-auto" />
        </div>

        <h2 className="font-medium text-lg">Dui on college avenue</h2>

        <Image
          aria-hidden
          src={"/police_img.jpg"}
          alt="Window icon"
          width={500}
          height={200}
          className="w-full my-4 rounded-3xl mx-auto shadow-md border border-gray-300"
        />

        <PostFooter />
      </div>

      <CommentBox />
    </article>
  );
}
