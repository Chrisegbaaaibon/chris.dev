"use client";
import { Playfair_Display } from "next/font/google";
import React from "react";
import { cn } from "@/lib/utils";
import ColoredLink from "@/app/components/link";
import gsap from "gsap";
import Seo from "@/app/components/seo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const playFairDisplay = Playfair_Display({
  weight: "500",
  subsets: ["latin"],
});

const Home = () => {
  React.useEffect(() => {
    gsap.fromTo(
      ".content-section",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="my-4">
      <Seo
        title="Home"
        description="Building Scalable Backend Systems, Managing Cloud Infrastructure."
      />
      <br />

      <div className="content-section">
        <h1
          className={cn(playFairDisplay.className, "lg:text-[50px] text-3xl")}
        >
          Christopher Egbaaibon
        </h1>
        <br />
        <br />

        <div className="lg:text-[20px] text-[15px]">
          <p>
            I build Scalable Backend Systems, manage Cloud Infrastructures, and more...{" "}
            <br />
            <span className="flex items-center gap-x-3 flex-wrap">
            Creator of: {" "}
              <ColoredLink href="https://dolphjs.com">
                DolphJs
              </ColoredLink>
            </span>
          </p>
          <br />
          <p>
            Software | DevOps Engineer - Building scalable Backend Systems, managing Cloud Infrastructures.
          </p>

          <br />
          <p>Just keep building.</p>

          <br />


          <Link href={"/christopher_devops.pdf"} target="_self">
            <button className="rounded-[30px] my-4 border hover:bg-black transition-all duration-400 ease-in hover:text-white border-black p-2 w-40 flex items-center justify-center">
              Resume <ArrowUpRight strokeWidth={1.5} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
