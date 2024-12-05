"use client";
import React from "react";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import gsap from "gsap";
import Seo from "@/app/components/seo";

const playFairDisplay = Playfair_Display({
  weight: "500",
  subsets: ["latin"],
});

const Projects = () => {
  const [selectedTag, setSelectedTag] = React.useState<string | null>("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const projects = [
    {
      name: "Notch For Windows",
      tag: "Desktop App",
      description:
        "Notch is a simpe overlay desktop app that works like ios dynamic island. Control your music, check dates and time, and more.",
      languages: ["Python"],
      url: "",
    },
    {
      name: "Dolphjs",
      tag: "CLI",
      description:
        "Dolphjs is a backend javascript/TypeScript framework that helps developers build scalable and maintainable backend applications with ease.",
      languages: ["TypeScript", "JavaScript"],
      url: "https://dolphjs.com",
    },
    {
      name: "Vottex AI",
      tag: "Web App",
      description:
        "Vottex AI is a web application that helps users generate forms and survery questions.",
      languages: ["TypeScript", "Python", "LangChain"],
      url: "",
    }
  ];

  const tags = [
    "All",
    ...Array.from(new Set(projects.map((project) => project.tag))),
  ];

  React.useEffect(() => {
    gsap.fromTo(
      ".content-section",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
    );
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesTag = selectedTag === "All" || project.tag === selectedTag;
    const matchesSearch = searchQuery
      ? project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTag && matchesSearch;
  });

  return (
    <div className="my-4 content-section">
      <Seo title="My Projects" description="Projects I've built overtime" />
      <h1
        className={cn(
          playFairDisplay.className,
          "lg:text-[50px] text-3xl text-center"
        )}
      >
        My Projects
      </h1>

      <div className="mx-auto flex items-center justify-center md:w-[600px] mb-4">
        <span className="text-gray-600 mx-1 my-10">
          "... Just keep building..." —{" "}
          <Link href={"/projects"} className="underline inline text-black">
            Christopher Egbaaibon
          </Link>
        </span>
      </div>

      <Input
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 w-full max-w-md mx-auto"
      />

      <div className="flex flex-wrap justify-center mb-4">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 m-2 text-sm rounded-full ${
              selectedTag === tag ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mx-auto p-2">
        {filteredProjects.map((project) => (
          <div key={project.name} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{project.name}</h2>
            <p className="text-sm text-gray-600">{project.description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.languages.map((language) => (
                <span
                  key={language}
                  className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-full"
                >
                  {language}
                </span>
              ))}
            </div>

            <div className="mt-3">
              <Link
                href={project.url}
                className="text-black underline flex items-center"
              >
                Visit Project{" "}
                <ArrowUpRight strokeWidth={1.5} width={20} height={20} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
