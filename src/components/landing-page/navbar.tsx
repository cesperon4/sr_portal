"use client";
import React, { useState } from "react";

import { navLinks } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FiShield } from "react-icons/fi";

import UnderlineButton from "../ui/underline-button";

export function Navbar() {
  const [activeLink, setActiveLink] = useState({
    name: "",
  });

  return (
    <header className={`navbar`}>
      <div className="inner">
        <a className="logo" href="#hero">
          <FiShield className="inline-block mr-2 text-blue-500" size={28} />
          SR Portal
        </a>

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
                    <div className="flex items-center gap-2">
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
          <span className="fond-medium">Login / Register</span>
        </UnderlineButton>
      </div>

      <AnimatePresence>
        {activeLink.name === "About" && (
          <motion.div
            key="fadeBox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fadebox"
            onMouseLeave={() =>
              setActiveLink((prev) => ({ ...prev, name: "" }))
            }
          >
            <hr className="fadebox-border" />
            <div className="fadebox-content">
              <p className="text-lg text-gray-800 mb-4">
                Santa Rosa Portal is a community-focused platform that brings
                public police data to life for Santa Rosa, CA residents. As a
                longtime California resident, I wanted to create a tool that
                empowers citizens with clear insights into what’s happening in
                their neighborhoods.
              </p>

              <p className="text-lg text-gray-800 font-semibold mb-2">
                The portal features:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>
                  <span className="font-medium">Interactive Map:</span> See
                  exactly where incidents have occurred.
                </li>
                <li>
                  <span className="font-medium">Discussion Threads:</span>{" "}
                  Reddit-style threads let users talk about incidents, share
                  photos, and provide context.
                </li>
                <li>
                  <span className="font-medium">Data Charts:</span> Visualize
                  trends and patterns in local police activity.
                </li>
              </ul>

              <p className="text-lg text-gray-800">
                Santa Rosa Portal combines official data, community discussion,
                and intuitive visuals to keep residents informed and engaged.
              </p>
            </div>

            <hr className="fadebox-border" />
          </motion.div>
        )}

        {activeLink.name === "Resources" && (
          <motion.div
            key="fadeBox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fadebox"
            onMouseLeave={() =>
              setActiveLink((prev) => ({ ...prev, name: "" }))
            }
          >
            <hr className="fadebox-border" />
            <div className="fadebox-content">
              <p className="text-lg leading-relaxed text-gray-800">
                Santa Rosa Portal sources its public police data directly from
                the City of Santa Rosa’s official open data platform:&nbsp;
                <a
                  href="https://data-santarosa.opendata.arcgis.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  https://data-santarosa.opendata.arcgis.com/
                </a>
                . This platform, powered by ArcGIS Open Data, provides detailed
                and regularly updated information on public safety incidents
                across Santa Rosa, CA.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-800">
                By leveraging this official resource, we ensure that the
                information displayed in our maps, charts, and discussion
                threads is accurate, trustworthy, and transparent. The dataset
                includes geographic details of incidents, which allows us to
                plot events on our interactive map and highlight trends over
                time. Using this open data helps make our platform a reliable
                and community-centered resource for residents.
              </p>
            </div>
            <hr className="fadebox-border" />
          </motion.div>
        )}

        {activeLink.name === "Developer" && (
          <motion.div
            key="fadeBox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fadebox"
            onMouseLeave={() =>
              setActiveLink((prev) => ({ ...prev, name: "" }))
            }
          >
            <hr className="fadebox-border" />
            <div className="fadebox-content">
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                I’m <span className="font-semibold">Christian Esperon</span>, a
                software engineer with 4 years of experience building modern,
                user-focused applications. Based in{" "}
                <span className="font-semibold">Santa Rosa, CA</span>, I bring a
                community-centered perspective to my work, combining technical
                expertise with a passion for creating tools that make a real
                impact.
              </p>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                I’ve worked professionally for both a startup and an
                environmental consulting firm, where I developed robust data
                management systems for water agencies across the Bay Area. My
                experience spans front-end and back-end development, with a
                focus on clean, scalable, and intuitive solutions that solve
                real-world problems.
              </p>
              <div className="mt-6">
                <a
                  href="https://portfolio-topaz-chi-49.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-300"
                >
                  View My Portfolio
                </a>
              </div>
            </div>
            <hr className="fadebox-border" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
