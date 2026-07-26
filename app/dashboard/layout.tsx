import type { Metadata } from "next";
import "./dashboard.css";

export const metadata: Metadata = {
  title: "Runbook / Site admin",
  description: "Private site admin for chris.egbaaibon.com.",
  robots: { index: false, follow: false, nocache: true },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
