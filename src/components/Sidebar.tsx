"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Rocket, Upload, Settings, GraduationCap, School,
  Shield, Heart, Info, AlertTriangle, Flag, ChevronRight,
  Menu, X, BookOpen, Search, Moon, Sun, Home
} from "lucide-react";
import { CATEGORIES, ARTICLES, DocCategory, DocArticle } from "@/data/docs";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  rocket: Rocket,
  upload: Upload,
  settings: Settings,
  graduation: GraduationCap,
  school: School,
  shield: Shield,
  heart: Heart,
  info: Info,
  alert: AlertTriangle,
  flag: Flag
};

interface Props {
  onSearchQuery?: (q: string) => void;
}

export function Sidebar({ onSearchQuery }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearch(q);
    if (onSearchQuery) {
      onSearchQuery(q);
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || BookOpen;
    return <IconComponent className="h-4 w-4 shrink-0" />;
  };

  // Group categories by section
  const guidesCategories = CATEGORIES.filter((c) => c.section === "guides");
  const legalCategories = CATEGORIES.filter((c) => c.section === "legal" || c.section === "safety");
  const metaCategories = CATEGORIES.filter((c) => c.section === "transparency" || c.section === "limitations");
  const filipinoCategories = CATEGORIES.filter((c) => c.section === "filipino");

  const renderCategory = (category: DocCategory) => {
    const catArticles = ARTICLES.filter((a) => a.categorySlug === category.slug);
    if (catArticles.length === 0) return null;

    return (
      <div key={category.slug} className="space-y-1">
        <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {getIcon(category.icon)}
          <span>{category.title}</span>
        </div>
        <div className="pl-6 space-y-0.5 border-l border-border/40 ml-5">
          {catArticles.map((art) => {
            const artUrl = `/docs/${art.slug}`;
            const active = pathname === artUrl;
            return (
              <Link
                key={art.slug}
                href={artUrl}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-coral/10 text-coral font-semibold"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                }`}
              >
                {art.title}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-base font-extrabold tracking-tight text-foreground">
            ClassHost <span className="text-coral">Docs</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-2 hover:bg-secondary transition text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r border-border/60 bg-card p-5 pt-16 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:pt-5 lg:translate-x-0 ${
          isOpen ? "translate-x-0 pt-20" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="mb-6 hidden lg:flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg font-black tracking-tight text-foreground">
              ClassHost <span className="text-coral">Docs</span>
            </span>
          </Link>
          <Link href="/" className="rounded-xl border border-border p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground transition">
            <Home className="h-4 w-4" />
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-5 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={handleSearchChange}
            placeholder="Search documentation..."
            className="w-full rounded-xl border border-border bg-secondary pl-9 pr-4 py-2 text-xs sm:text-sm outline-none focus:border-coral transition"
          />
        </div>

        {/* Scrollable nav items */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 no-scrollbar pb-8">
          <div className="space-y-4">
            <div className="text-[10px] font-bold text-muted-foreground/60 tracking-widest uppercase">How-To Guides</div>
            {guidesCategories.map(renderCategory)}
          </div>

          <div className="space-y-4">
            <div className="text-[10px] font-bold text-muted-foreground/60 tracking-widest uppercase">Legal & Safety</div>
            {legalCategories.map(renderCategory)}
          </div>

          <div className="space-y-4">
            <div className="text-[10px] font-bold text-muted-foreground/60 tracking-widest uppercase">Platform Specs</div>
            {metaCategories.map(renderCategory)}
          </div>

          <div className="space-y-4">
            <div className="text-[10px] font-bold text-muted-foreground/60 tracking-widest uppercase">Filipino (Tagalog)</div>
            {filipinoCategories.map(renderCategory)}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  );
}
