"use client";
import { useState } from "react";

import { LogoMark } from "@/components/logo-mark";
import { navLinks } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMap,
} from "react-icons/hi2";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import UnderlineButton from "../ui/underline-button";

export function Navbar() {
  const [activeLink, setActiveLink] = useState({
    name: "",
  });

  const plans = [
    {
      type: "free",
      price: 0,
      description: [
        "50 incident posts per hour",
        "unlimited access to form builder",
        "access to 10 map filters",
        "50 incident notifications per month",
      ],
    },
    {
      type: "basic",
      price: 4.99,
      description: [
        "100 incident posts per hour",
        "unlimited access to form builder",
        "access to over 20 different filters",
        "100 incident notifications per month",
      ],
    },
    {
      type: "pro",
      price: 9.99,
      description: [
        "unlimited incident posts",
        "unlimited access to form builder",
        "access to all map filters",
        "unlimited incident notifications per month",
      ],
    },
  ];

  return (
    <header className="navbar bg-white dark:bg-neutral-950 border-b border-gray-100/80 dark:border-neutral-800/80">
      <div className="inner">
        <LogoMark href="#hero" showLabel size={40} className="logo text-md" />

        <nav className="desktop">
          <ul>
            {navLinks.map(({ name }) => (
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
                <UnderlineButton path={""}>
                  {
                    <div className="flex items-center gap-2 text-sm">
                      <span>{name}</span>
                      {activeLink.name === name ? (
                        <SlArrowUp size={12} />
                      ) : (
                        <SlArrowDown size={12} />
                      )}
                    </div>
                  }
                </UnderlineButton>
              </li>
            ))}
          </ul>
        </nav>

        <UnderlineButton path="/login">
          <span className="fond-medium text-sm">Login / Register</span>
        </UnderlineButton>
      </div>

      <AnimatePresence>
        {activeLink.name === "About" && (
          <motion.div
            key="fadeBox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fadebox"
            onMouseLeave={() =>
              setActiveLink((prev) => ({ ...prev, name: "" }))
            }
          >
            <hr className="fadebox-border" />
            <div className="fadebox-content">
              <h3 className="text-subheading text-gray-900 dark:text-white mb-3">
                About SR Portal
              </h3>
              <p className="text-body-sm text-gray-700 dark:text-gray-300 mb-6">
                A community-focused platform that brings public police data to
                life for Santa Rosa, CA. We built it to give residents clear,
                actionable insights into what's happening in their
                neighborhoods.
              </p>
              <p className="text-label text-gray-500 dark:text-gray-400 mb-3">
                What you can do
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex gap-3 p-4 rounded-xl bg-white dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                    <HiOutlineMap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <span className="text-body-sm font-semibold text-gray-900 dark:text-white block">
                      Interactive map
                    </span>
                    <span className="text-caption text-gray-600 dark:text-gray-400">
                      See where incidents occurred.
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                    <HiOutlineChatBubbleLeftRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-body-sm font-semibold text-gray-900 dark:text-white block">
                      Discussion threads
                    </span>
                    <span className="text-caption text-gray-600 dark:text-gray-400">
                      Discuss incidents, share photos & context.
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
                    <HiOutlineChartBar className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <span className="text-body-sm font-semibold text-gray-900 dark:text-white block">
                      Data charts
                    </span>
                    <span className="text-caption text-gray-600 dark:text-gray-400">
                      Trends and patterns in local activity.
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-body-sm text-gray-600 dark:text-gray-400 mt-5">
                Official data, community discussion, and clear visuals—all in
                one place to keep you informed and engaged.
              </p>
            </div>

            <hr className="fadebox-border" />
          </motion.div>
        )}

        {activeLink.name === "Resources" && (
          <motion.div
            key="fadeBox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fadebox"
            onMouseLeave={() =>
              setActiveLink((prev) => ({ ...prev, name: "" }))
            }
          >
            <hr className="fadebox-border" />
            <div className="fadebox-content">
              <h3 className="text-subheading text-gray-900 dark:text-white mb-3">
                Data source
              </h3>
              <p className="text-body-sm text-gray-700 dark:text-gray-300 mb-4">
                SR Portal uses public police data from the City of Santa Rosa's
                official open data platform (ArcGIS Open Data). The dataset is
                detailed, regularly updated, and covers public safety incidents
                across Santa Rosa, CA.
              </p>
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 shadow-sm">
                <p className="text-label text-gray-500 dark:text-gray-400 mb-2">
                  Official open data
                </p>
                <a
                  href="https://data-santarosa.opendata.arcgis.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-body-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors break-all"
                >
                  data-santarosa.opendata.arcgis.com
                  <HiOutlineExternalLink className="w-4 h-4 flex-shrink-0" />
                </a>
              </div>
              <p className="text-body-sm text-gray-600 dark:text-gray-400 mt-4">
                Using this source keeps our maps, charts, and threads accurate
                and transparent. Geographic details in the data power our
                interactive map and trend views.
              </p>
            </div>
            <hr className="fadebox-border" />
          </motion.div>
        )}

        {activeLink.name === "Developer" && (
          <motion.div
            key="fadeBox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fadebox"
            onMouseLeave={() =>
              setActiveLink((prev) => ({ ...prev, name: "" }))
            }
          >
            <hr className="fadebox-border" />
            <div className="fadebox-content">
              <h3 className="text-subheading text-gray-900 dark:text-white mb-3">
                Built by Christian Esperon
              </h3>
              <p className="text-body-sm text-gray-700 dark:text-gray-300 mb-4">
                Software engineer with 4 years of experience building modern,
                user-focused apps. Based in Santa Rosa, CA—combining technical
                skills with a focus on tools that make a real impact in the
                community.
              </p>
              <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-6">
                Background includes a startup and environmental consulting,
                developing data management systems for Bay Area water agencies.
                Full-stack focus: clean, scalable, and intuitive solutions.
              </p>
              <a
                href="https://portfolio-topaz-chi-49.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-body-sm font-semibold shadow-sm hover:shadow transition-all duration-200"
              >
                View portfolio
                <HiOutlineExternalLink className="w-4 h-4" />
              </a>
            </div>
            <hr className="fadebox-border" />
          </motion.div>
        )}
        {/* {activeLink.name === "Plans" && (
          <motion.div
            key="fadeBox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fadebox"
            onMouseLeave={() =>
              setActiveLink((prev) => ({ ...prev, name: "" }))
            }
          >
            <hr className="fadebox-border" />
            <div className="fadebox-content">
              <h3 className="text-subheading text-gray-900 dark:text-white mb-6 text-center">
                Choose a plan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    className="flex flex-col rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/80 shadow-sm overflow-hidden"
                    key={plan.type}
                  >
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-neutral-700">
                      <h4 className="text-body font-semibold text-gray-900 dark:text-white capitalize">
                        {plan.type}
                      </h4>
                      <p className="text-heading text-blue-600 dark:text-blue-400 mt-1">
                        ${plan.price}
                        <span className="text-body-sm font-normal text-gray-500 dark:text-gray-400">/mo</span>
                      </p>
                    </div>
                    <ul className="flex-1 px-5 py-4 space-y-2">
                      {plan.description.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-body-sm text-gray-600 dark:text-gray-400">
                          <HiCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 pt-0">
                      <button
                        type="button"
                        className="w-full py-2.5 rounded-lg text-body-sm font-semibold transition-all duration-200 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white"
                      >
                        Select plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className="fadebox-border" />
          </motion.div>
        )} */}
      </AnimatePresence>
    </header>
  );
}
