// src/components/home/FeatureSection.jsx
import React from "react";
import {
  Briefcase,
  ShieldCheck,
  Filter,
  MonitorSmartphone,
  UploadCloud,
  Users,
  BellRing,
  BarChart2,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/* ---------------- Single Card ---------------- */
const FeatureCard = ({ title, description, Icon }) => (
  <div
    tabIndex={0}
    className="
      group relative flex flex-col items-center text-center
      backdrop-blur-md
      border bg-white/90 border-gray-200
      rounded-2xl pb-14 px-4
      md:px-6 md:py-8 md:min-w-80 md:min-h-60
      min-w-60 min-h-40
      transition-all duration-300 ease-out
      shadow-[0_3px_8px_rgb(0_0_0/0.06)]
      hover:shadow-[0_10px_25px_rgb(0_0_0/0.18)]
     
      hover:bg-gradient-to-br hover:from-gray-900 hover:via-gray-800 hover:to-black
     
      focus-visible:ring-2 focus-visible:ring-blue-500/70
    "
  >
    {/* Tooltip */}
    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold text-gray-100 bg-black/90 px-3 py-1 rounded-full shadow">
      {title}
    </div>

    {/* Glow behind icon */}
    <div className="absolute -top-6 inset-x-0 flex justify-center">
      <div className="w-24 h-24 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition" />
    </div>

    {/* Icon bubble */}
    <div className="relative z-10 mb-5 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
      <Icon size={28} strokeWidth={1.4} />
    </div>

    <h3 className="relative z-10 mb-2 text-[15px] md:text-lg font-semibold tracking-wide group-hover:text-yellow-500 transition">
      {title}
    </h3>
    <p className="relative z-10 md:text-sm text-[11px] leading-relaxed  text-gray-600 group-hover:text-gray-100 transition">
      {description}
    </p>
  </div>
);

/* ---------------- Section ---------------- */
const FeatureSection = () => {
  const features = [
    {
      title: "Hire the Right Talent",
      description:
        "Only skilled candidates can apply—thanks to our smart, exam-based resume short-listing system.",
      Icon: Briefcase,
    },
    {
      title: "Skill-First, Resume-Second",
      description:
        "Say goodbye to fake resumes. We prioritise verified skills through assessments before candidates can apply.",
      Icon: ShieldCheck,
    },
    {
      title: "Filter Once, Hire Smart",
      description:
        "Our intelligent qualification filter ensures only eligible candidates move forward, saving you time and effort.",
      Icon: Filter,
    },
    {
      title: "Built-in Online Interviewing",
      description:
        "No third-party tools needed. Conduct live interviews right on SkillVerify—streamlined, secure, integrated.",
      Icon: MonitorSmartphone,
    },
    {
      title: "Seamless Job Posting",
      description:
        "Post jobs in minutes with our intuitive interface, custom criteria and auto-suggested tags.",
      Icon: UploadCloud,
    },
    {
      title: "One Profile, Many Roles",
      description:
        "Candidates keep a single verified profile that works across multiple applications—no repetitive uploads.",
      Icon: Users,
    },
    {
      title: "Real-Time Status Tracking",
      description:
        "See where every application stands—live updates on short-listing, interviews and decisions.",
      Icon: MonitorSmartphone,
    },
    {
      title: "Automated Notifications",
      description:
        "Instant alerts for applications, short-listing and interview scheduling keep everyone aligned.",
      Icon: BellRing,
    },
    {
      title: "Data-Driven Insights",
      description:
        "Track hiring performance, engagement and skill trends with built-in analytics.",
      Icon: BarChart2,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
      <h2 className="mb-12 text-lg text-center md:text-3xl font-bold text-gray-800 tracking-tight">
        Why&nbsp;<span className="text-blue-600">SkillVerify?</span>
      </h2>

      {/* Swiper Slider */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-7xl mx-auto"
      >
        {features.map((f, i) => (
          <SwiperSlide key={i}>
            <FeatureCard {...f} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeatureSection;