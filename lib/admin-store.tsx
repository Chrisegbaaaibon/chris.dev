"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  seedCaseStudies,
  seedEnquiries,
  seedNotes,
  seedRedirects,
  seedSettings,
  seedSystems,
  seedTasks,
  type CaseStudy,
  type Enquiry,
  type Note,
  type Redirect,
  type Settings,
  type SystemRow,
  type Task,
} from "./admin-data";

const KEY = "runbook.admin.v1";

export type AdminState = {
  systems: SystemRow[];
  caseStudies: CaseStudy[];
  enquiries: Enquiry[];
  tasks: Task[];
  notes: Note[];
  redirects: Redirect[];
  settings: Settings;
  noticeResolved: boolean;
};

const initial: AdminState = {
  systems: seedSystems,
  caseStudies: seedCaseStudies,
  enquiries: seedEnquiries,
  tasks: seedTasks,
  notes: seedNotes,
  redirects: seedRedirects,
  settings: seedSettings,
  noticeResolved: false,
};

type WithId = { id: string };

type Ctx = {
  state: AdminState;
  /** false until localStorage has been read, so the first paint matches the server. */
  hydrated: boolean;
  set: <K extends keyof AdminState>(key: K, value: AdminState[K]) => void;
  patch: <K extends "systems" | "caseStudies" | "enquiries" | "tasks" | "notes" | "redirects">(
    key: K,
    id: string,
    changes: Partial<AdminState[K][number]>
  ) => void;
  add: <K extends "systems" | "caseStudies" | "enquiries" | "tasks" | "notes" | "redirects">(
    key: K,
    item: AdminState[K][number],
    atTop?: boolean
  ) => void;
  remove: (
    key: "systems" | "caseStudies" | "enquiries" | "tasks" | "notes" | "redirects",
    id: string
  ) => void;
  move: (key: "systems", id: string, delta: number) => void;
  reset: () => void;
  /** Honours the "confirm before destructive edits" setting. */
  confirmed: (question: string) => boolean;
};

const AdminContext = createContext<Ctx | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminState>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<AdminState>;
        setState((s) => ({ ...s, ...saved, settings: { ...s.settings, ...saved.settings } }));
      }
    } catch {
      // Corrupt or unavailable storage, carry on with the seeds.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // Storage full or blocked. Edits still work for this session.
    }
  }, [state, hydrated]);

  const set = useCallback<Ctx["set"]>((key, value) => {
    setState((s) => ({ ...s, [key]: value }));
  }, []);

  const patch = useCallback<Ctx["patch"]>((key, id, changes) => {
    setState((s) => ({
      ...s,
      [key]: (s[key] as WithId[]).map((item) =>
        item.id === id ? { ...item, ...changes } : item
      ),
    }));
  }, []);

  const add = useCallback<Ctx["add"]>((key, item, atTop = true) => {
    setState((s) => {
      const list = s[key] as WithId[];
      return { ...s, [key]: atTop ? [item as WithId, ...list] : [...list, item as WithId] };
    });
  }, []);

  const remove = useCallback<Ctx["remove"]>((key, id) => {
    setState((s) => ({ ...s, [key]: (s[key] as WithId[]).filter((item) => item.id !== id) }));
  }, []);

  const move = useCallback<Ctx["move"]>((key, id, delta) => {
    setState((s) => {
      const list = [...s[key]];
      const i = list.findIndex((item) => item.id === id);
      const j = i + delta;
      if (i < 0 || j < 0 || j >= list.length) return s;
      [list[i], list[j]] = [list[j], list[i]];
      return { ...s, [key]: list };
    });
  }, []);

  const reset = useCallback(() => setState(initial), []);

  const confirmed = useCallback(
    (question: string) => {
      if (!state.settings.confirmDestructive) return true;
      return window.confirm(question);
    },
    [state.settings.confirmDestructive]
  );

  const value = useMemo(
    () => ({ state, hydrated, set, patch, add, remove, move, reset, confirmed }),
    [state, hydrated, set, patch, add, remove, move, reset, confirmed]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}

export const uid = () => Math.random().toString(36).slice(2, 9);
