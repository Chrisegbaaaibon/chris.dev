"use client";
import React, { useState } from "react";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import gsap from "gsap";
import Seo from "@/app/components/seo";

const playFairDisplay = Playfair_Display({
  weight: "500",
  subsets: ["latin"],
});

const HallOfFame = () => {
  React.useEffect(() => {
    gsap.fromTo(
      ".content-section",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
    );
  }, []);

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="my-8 content-section">
      <Seo
        title="Hall Of Fame"
        description="Hall Of Fame Christopher Egbaaibon - Math, Software | DevOps Engineer"
      />
      <h1
        className={cn(
          playFairDisplay.className,
          "lg:text-[50px] text-3xl text-center"
        )}
      >
        Hall Of Fame
      </h1>
      <div className="text-center mt-4 text-gray-600">
        Milestones, achievements, and key contributions.
      </div>

      <Separator className="my-6" />
      {/* Experiences */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold">
            <Link
              href="https://mbagmfbank.com"
              className="underline text-blue-500"
              target="_blank"
            >
              Mbag Microfinance Bank
            </Link>
          </h3>
          <p className="italic">
            DevOps Engineer | Oct 2024 - Present | Lagos, Nigeria
          </p>
          <ul className="list-disc list-inside">
            <li>
              Managing the company’s software infrastructure, internal tools,
              and asset storage with Amazon Web Services (AWS) such as ECR, ECS,
              and EC2.
            </li>
            <li>
              Automated the deployment of microservices with GitHub Actions and tools
              like Terraform.
            </li>
          </ul>
        </div>

        <br />

        <div className="mb-4">
          <h3 className="text-xl font-semibold">
            <Link
              href="https://savecircle.app"
              className="underline text-blue-500"
              target="_blank"
            >
              SaveCircle
            </Link>
          </h3>
          <p className="italic">
            Software | DevOps Engineer | June 2024 - Present | United States
          </p>
          <ul className="list-disc list-inside">
            <li>
              Building the Minimum Viable Product for the team with Typescript
              and NestJs.
            </li>
            <li>
              Managed the company’s infrastructure and storage with Amazon Web
              Services (AWS).
            </li>
          </ul>
        </div>

        <br />

        <div className="mb-4">
          <h3 className="text-xl font-semibold">
            <Link href="#" className="underline text-blue-500" target="_blank">
              Daolity
            </Link>
          </h3>
          <p className="italic">
            Software Developer | January 2024 - March 2024 | Lagos, Nigeria
          </p>
          <ul className="list-disc list-inside">
            <li>
              Created a robust API structure, using NestJs and Postgresql.
            </li>
            <li>
              Revamped the existing base codes and microservices, enhancing the
              server’s runtime.
            </li>
          </ul>
        </div>

        <br />

        <div className={`mb-4 ${showMore ? "" : "hidden"}`}>
          <h3 className="text-xl font-semibold">
            <Link
              href="https://magicpitch.ai"
              className="underline text-blue-500"
              target="_blank"
            >
              Magicpitch
            </Link>
          </h3>
          <p className="italic">
            Software Developer | June 2023 - December 2023 | UK, UAE
          </p>
          <ul className="list-disc list-inside">
            <li>
              Created a robust internal productivity tool using Python and
              OpenAI, streamlining cross-departmental collaboration and
              accelerating project delivery by 40% using Python and NextJs.
            </li>
            <li>
              Incorporated OpenAI's advanced natural language processing
              capabilities into the company's internal tool, resulting in a 40%
              reduction in response time and a 25% improvement in customer
              satisfaction.
            </li>
            <li>
              Built and implemented an automated email generation tool utilizing
              Python and HTML; accelerated marketing campaign execution by 50%
              and increased email open rates by 20%.
            </li>
            <li>
              Managed the company’s software infrastructure on Azure and AWS.
            </li>
          </ul>
        </div>

        <br />

        <div className={`mb-4 ${showMore ? "" : "hidden"}`}>
          <h3 className="text-xl font-semibold">
            <Link
              href="https://mogroupltd.com"
              className="underline text-blue-500"
              target="_blank"
            >
              MO Group LTD
            </Link>
          </h3>
          <p className="italic">
            Lead Developer & Ambassador | January 2023 - June 2023 | Lagos,
            Nigeria
          </p>
          <ul className="list-disc list-inside">
            <li>
              Orchestrated and guided a cross-functional team of developers in
              executing a comprehensive rebuild of the company's platform with
              Express, React, React Native, and AWS, resulting in a remarkable
              30% surge in user satisfaction and a notable 20% enhancement in
              overall system performance, measured through rigorous user testing
              and performance benchmarking.
            </li>
            <li>
              Optimized the platform's payment system, resulting in a 30%
              reduction in payment errors and a 20% increase in successful
              transactions; streamlined user experience, improving customer
              satisfaction and retention rates.
            </li>
            <li>
              Enhanced the search engine optimization for both the new landing
              page and the platform.
            </li>
          </ul>
        </div>
        <br />

        <div className={`mb-4 ${showMore ? "" : "hidden"}`}>
          <h3 className="text-xl font-semibold">
            <Link href="#" className="underline text-blue-500" target="_blank">
              Frolancer
            </Link>
          </h3>
          <p className="italic">
            Backend Developer | October 2021 - December 2022 | Plymouth, UK
          </p>
          <ul className="list-disc list-inside">
            <li>
              Developed with a team of developers to build one of the prominent
              freelance platforms in Africa. FroWork using Typescript and
              NestJs.
            </li>
            <li>
              Engineered the backend infrastructure for Yeve, a subdivision of
              the company, and developed a highly scalable event management
              platform in the United Kingdom, handling ticket sales, attendee
              management, and seamless integrations; increased ticket sales by
              40% within the first year.
            </li>
            <li>
              Publicized Frowork to freelancers in West Africa which made the
              platform transact over $30,000 in the first 3 months of launch.
            </li>
          </ul>
        </div>

        <button
          onClick={toggleShowMore}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
        >
          {showMore ? "See Less" : "See More"}
        </button>
      </section>

      <Separator className="my-6" />

      {/* Experience */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Academic Milestones</h2>
        <div className="flex mb-4">
          <span className="text-gray-600 mr-1">Mathematics Major </span> @{" "}
          <Link
            href={"https://uopeople.edu "}
            className="underline flex items-end text-center mx-1"
          >
            {" "}
            University Of Lagos (In View) <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Separator className="my-6" />

      {/* Testimonials */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <blockquote className="italic text-gray-600 border-l-4 pl-4">
          {" "}
          <Link
            href="https://dolphjs.com"
            className="underline text-blue-500"
            target="_blank"
          >
            {" "}
            Dolph JS CLI
          </Link>{" "}
          <span className="block mt-2 font-bold"></span>
        </blockquote>
        <p className="text-gray-600 mt-4">...and many more.</p>
      </section>

      <Separator className="my-6" />
    </div>
  );
};

export default HallOfFame;
