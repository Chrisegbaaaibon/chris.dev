"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminProvider, useAdmin, uid } from "@/lib/admin-store";
import { record } from "@/lib/data";
import { VIEW_TITLES, type ViewId } from "./views";
import { Overview } from "./views/overview";
import { SystemsView } from "./views/systems";
import { CaseStudiesView } from "./views/case-studies";
import { EnquiriesView } from "./views/enquiries";
import { ExperienceView, NotesView, ServicesView, StackView } from "./views/content";
import { DeploysView, RedirectsView, SettingsView, TrafficView } from "./views/site";

function Clock() {
  const [now, setNow] = useState<string>("");

  // Rendered after mount so the server and the first client paint agree.
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const date = d.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
      setNow(`${date}, ${time}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="when m" suppressHydrationWarning>
      {now || " "}
    </div>
  );
}

function Shell() {
  const { state, add } = useAdmin();
  const [view, setView] = useState<ViewId>("overview");
  const [freshCaseStudy, setFreshCaseStudy] = useState<string | null>(null);

  const openEnquiries = state.enquiries.filter((e) =>
    state.settings.showArchived ? true : !e.archived
  );
  const unread = openEnquiries.filter((e) => !e.read).length;

  const go = (next: ViewId) => {
    setView(next);
    if (next !== "case-studies") setFreshCaseStudy(null);
    window.scrollTo({ top: 0 });
  };

  const newCaseStudy = () => {
    const id = uid();
    add("caseStudies", {
      id,
      title: "Untitled case study",
      system: state.systems[0]?.title ?? "",
      status: "todo",
      words: 0,
      note: "",
    });
    setFreshCaseStudy(id);
    setView("case-studies");
    window.scrollTo({ top: 0 });
  };

  const item = (id: ViewId, count?: number, alert?: boolean) => (
    <button
      key={id}
      className={view === id ? "on" : undefined}
      aria-current={view === id ? "page" : undefined}
      onClick={() => go(id)}
    >
      {VIEW_TITLES[id]}
      {count !== undefined && <span className={alert ? "c num alert" : "c num"}>{count}</span>}
    </button>
  );

  return (
    <div className="app">
      <aside className="side">
        <div className="brand">
          Christopher Egbaaibon<span>SITE ADMIN / RUNBOOK</span>
        </div>

        <nav>
          {item("overview")}
          {item("systems", state.systems.length)}
          {item("case-studies", state.caseStudies.length)}
          {item("experience", record.length)}
          {item("enquiries", openEnquiries.length, unread > 0)}
          <div className="grp">Content</div>
          {item("stack")}
          {item("services")}
          {item("notes")}
          <div className="grp">Site</div>
          {item("traffic")}
          {item("redirects")}
          {item("deploys")}
          {item("settings")}
        </nav>

        <div className="foot">
          Signed in as chris
          <br />
          Last deploy 2h ago
          <br />
          <Link href="/">View public site &rsaquo;</Link>
        </div>
      </aside>

      <main className="main">
        <div className="bar">
          <div>
            <h1>{VIEW_TITLES[view]}</h1>
            <Clock />
          </div>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            <Link className="btn" href="/" target="_blank" rel="noreferrer">
              Preview
            </Link>
            <button className="btn fill" onClick={newCaseStudy}>
              New case study
            </button>
          </div>
        </div>

        {view === "overview" && <Overview go={go} />}
        {view === "systems" && <SystemsView />}
        {view === "case-studies" && <CaseStudiesView openId={freshCaseStudy} />}
        {view === "experience" && <ExperienceView />}
        {view === "enquiries" && <EnquiriesView />}
        {view === "stack" && <StackView />}
        {view === "services" && <ServicesView />}
        {view === "notes" && <NotesView />}
        {view === "traffic" && <TrafficView />}
        {view === "redirects" && <RedirectsView />}
        {view === "deploys" && <DeploysView />}
        {view === "settings" && <SettingsView />}
      </main>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="admin">
      <AdminProvider>
        <Shell />
      </AdminProvider>
    </div>
  );
}
