"use client";

import { useState } from "react";
// ভিডিও ডাটা এবং মাইলস্টোনস (যার ভেতরে ক্যাটাগরি অবজেক্ট আছে) ইম্পোর্ট করা হলো
import { videoLinks, milestones } from "@/constants/videoData";

export default function Home() {
  // মেইন স্টেট ম্যানেজমেন্ট (ডিফল্ট মাইলস্টোন ৩)
  const [activeMilestone, setActiveMilestone] = useState(3);

  // একটি নির্দিষ্ট মাইলস্টোন অবজেক্ট খুঁজে বের করা
  const currentMilestoneObj = milestones.find(
    (ms) => ms.id === activeMilestone,
  );

  // মাইলস্টোনের প্রথম ক্যাটাগরি আইডি ডাইনামিক্যালি সেট করার জন্য প্রথম স্টেট ভ্যালু তৈরি করা
  const defaultCategory = currentMilestoneObj?.categories?.[0]?.id || "";
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  // ১. মেইন milestones অ্যারে থেকেই বাটন জেনারেট হবে (সবগুলো শো করার জন্য)
  const filteredMilestones = milestones.sort((a, b) => a.id - b.id);

  // ২. সিলেক্টেড মাইলস্টোনের আন্ডারে ডাটাতে যে ক্যাটাগরি অ্যারে ডিফাইন করা আছে, সরাসরি সেটাই নেওয়া হচ্ছে
  const filteredCategories = currentMilestoneObj?.categories || [];

  // ৩. ফাইনাল ভিডিও ফিল্টারিং লজিক
  const filteredVideos = videoLinks.filter(
    (video) =>
      video.milestone === activeMilestone && video.category === activeCategory,
  );

  // মাইলস্টোন চেঞ্জ হ্যান্ডলার (মাইলস্টোন চেঞ্জের সাথে সাথে ক্যাটাগরিও যেন অটো প্রথম উপাদানে ব্যাক করে)
  const handleMilestoneChange = (milestoneId) => {
    setActiveMilestone(milestoneId);
    const targetMilestone = milestones.find((ms) => ms.id === milestoneId);
    if (targetMilestone && targetMilestone.categories?.length > 0) {
      setActiveCategory(targetMilestone.categories[0].id);
    } else {
      setActiveCategory("");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content font-sans antialiased selection:bg-primary selection:text-primary-content">
      {/* 🟢 TOP FIXED/STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300 shadow-sm animate__animated animate__fadeInDown">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
              ⚡ QuickHero{" "}
              <span className="badge badge-sm badge-outline font-normal">
                v1.1
              </span>
            </h1>
            <p className="text-xs text-base-content/60 mt-0.5">
              Your 2-click PH video shortcut directory.
            </p>
          </div>

          <div className="alert alert-warning p-2 px-4 text-xs max-w-md shadow-sm rounded-lg border border-warning/20">
            <span>
              ⚠️ <b>Note:</b> ভিডিও দেখতে ব্রাউজারে <b>Programming Hero</b> লগইন
              থাকতে হবে।
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-10">
        {/* 🟢 STEP 1: MILESTONE SELECTOR WITH NAMES */}
        <section className="space-y-4 animate__animated animate__fadeIn animate__delay-1s">
          <div className="flex items-center gap-2 text-sm font-bold text-base-content/70">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-content">
              ১
            </span>
            <h2>মাইলস্টোন সিলেক্ট করো:</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-base-100 p-3 rounded-xl border border-base-300 shadow-sm">
            {filteredMilestones.map((ms) => (
              <button
                key={ms.id}
                onClick={() => handleMilestoneChange(ms.id)}
                className={`btn btn-sm md:btn-md justify-start px-4 rounded-lg transition-all duration-200 normal-case ${
                  activeMilestone === ms.id
                    ? "btn-primary shadow-md font-bold text-left"
                    : "btn-ghost text-base-content/70 text-left hover:bg-base-200"
                }`}
              >
                <span className="truncate">{ms.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 🟢 STEP 2: CATEGORY BUTTONS CHIPS (DYNAMIC BASED ON SELECTED MILESTONE) */}
        <section className="space-y-4 animate__animated animate__fadeIn animate__delay-1s">
          <div className="flex items-center gap-2 text-sm font-bold text-base-content/70">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] text-secondary-content">
              ২
            </span>
            <h2>টপিক বা ক্যাটাগরি বেছে নাও:</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`btn rounded-full px-5 transition-all duration-300 normal-case ${
                    activeCategory === cat.id
                      ? "btn-neutral shadow-lg scale-105 border-transparent text-white"
                      : "btn-outline border-base-300 hover:border-base-content/40 bg-base-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))
            ) : (
              <div className="text-xs text-base-content/40 italic">
                এই মাইলস্টোনে কোনো ক্যাটাগরি খুঁজে পাওয়া যায়নি।
              </div>
            )}
          </div>
        </section>

        <hr className="border-base-300" />

        {/* 🟢 STEP 3: VIDEO LINKS GRID */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-sm font-bold text-base-content/70 mb-2">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] text-accent-content">
                ৩
              </span>
              <h2>সরাসরি মেইন ভিডিও ওপেন করো:</h2>
            </div>
            <div className="badge badge-sm badge-neutral">
              {filteredVideos.length} Videos Found
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="card bg-base-100 shadow-sm border border-base-300 hover:border-primary/40 hover:shadow-md transition-all duration-300 group rounded-xl animate__animated animate__fadeInUp animate__faster"
                >
                  <div className="card-body p-5 justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold text-primary tracking-wide uppercase">
                          M-{video.milestone} • Mod-{video.module} (V-
                          {video.videoNo})
                        </span>
                        {video.projectName !== "N/A" && (
                          <span className="badge badge-xs badge-neutral p-1.5 font-medium rounded text-[10px]">
                            📁 {video.projectName}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-base-content group-hover:text-primary transition-colors duration-200 leading-snug">
                        {video.title}
                      </h3>
                    </div>

                    <div className="card-actions pt-2">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-block btn-primary normal-case rounded-lg font-semibold gap-1 group-hover:scale-[1.01] transition-transform duration-200"
                      >
                        🚀 Open Video
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-base-100 rounded-xl border border-dashed border-base-300 p-6 animate__animated animate__fadeIn">
                <span className="text-3xl">🏜️</span>
                <p className="text-sm font-bold mt-2 text-base-content/60">
                  এই ক্যাটাগরিতে কোনো শর্টকাট ভিডিও লিংক নেই।
                </p>
                <p className="text-xs text-base-content/40 mt-0.5">
                  অনুগ্রহ করে অন্য কোনো ক্যাটাগরি বা মাইলস্টোন সিলেক্ট করুন।
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 🟢 FOOTER */}
      <footer className="footer footer-center p-4 bg-base-100 text-base-content/40 border-t border-base-300 text-xs font-mono mt-20">
        <div>
          <p>
            © {new Date().getFullYear()} - QuickHero • Built for PH Batch 13
            Students
          </p>
        </div>
      </footer>
    </div>
  );
}
