"use client";
import React, { useState } from "react";

import { navLinks } from "@/lib/constants";
import { GiPortal } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  const [activeLink, setActiveLink] = useState({
    name: "",
  });

  return (
    <header className={`navbar`}>
      <div className="inner">
        <a className="logo" href="#hero">
          <GiPortal className="inline-block mr-2" />
          SR Portal
        </a>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li
                key={name}
                className="group"
                onMouseEnter={() => {
                  setActiveLink((prev) => ({
                    ...prev,
                    name: name,
                  }));
                }}
              >
                <a href={link}>
                  <div className="flex items-center gap-2">
                    <span>{name}</span>
                    {activeLink.name === name ? (
                      <SlArrowUp size={12} />
                    ) : (
                      <SlArrowDown size={12} />
                    )}
                  </div>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <a
            className="contact-btn group"
            onClick={() => router.push("/login")}
          >
            <div className="inner">
              <span>Login</span>
            </div>
          </a>
        </div>
      </div>

      <AnimatePresence>
        {activeLink.name === "About" && (
          <motion.div
            key="fadeBox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full text-black mt-10"
            onMouseLeave={() =>
              setActiveLink((prev) => ({ ...prev, name: "" }))
            }
          >
            <hr className="border-t-1 border-gray-400" />
            <div className="px-20 py-4">
              {`Contrary to popular belief, Lorem Ipsum is not simply random text...1`}
            </div>
          </motion.div>
        )}

        {activeLink.name === "Resources" && (
          <motion.div
            key="fadeBox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full text-black mt-10"
            onMouseLeave={() =>
              setActiveLink((prev) => ({ ...prev, name: "" }))
            }
          >
            <hr className="border-t-1 border-gray-400" />
            <div className="px-20 py-4">
              {`Contrary to popular belief, Lorem Ipsum is not simply random text...2`}
            </div>
          </motion.div>
        )}

        {activeLink.name === "Developer" && (
          <motion.div
            key="fadeBox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full text-black mt-10"
            onMouseLeave={() =>
              setActiveLink((prev) => ({ ...prev, name: "" }))
            }
          >
            <hr className="border-t-1 border-gray-400" />
            <div className="px-20 py-4">
              {`Contrary to popular belief, Lorem Ipsum is not simply random text...3`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
