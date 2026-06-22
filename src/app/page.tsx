"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Rocket, Upload, Settings, GraduationCap, School,
  Shield, Heart, Info, AlertTriangle, Flag, Search,
  ArrowRight, ExternalLink, MessageSquare, Bug, HelpCircle,
  Clock, FileText, CornerDownRight, Check
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

export default function Home() {
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
    );
  }, [query]);

  const getIcon = (iconName: string, className = "h-5 w-5 text-coral shrink-0") => {
    const IconComponent = iconMap[iconName] || FileText;
    return <IconComponent className={className} />;
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      {/* Premium Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 px-4 sm:px-8 py-3.5 backdrop-blur-xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
            ClassHost <span className="text-coral">Docs</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="https://classhost.vercel.app" // Fallback or main app
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition flex items-center gap-1"
          >
            Go to App <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-12">

        {/* Hero Section */}
        <section className="text-center max-w-2xl mx-auto space-y-6 py-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-3 py-1 text-[11px] font-bold text-coral">
            ClassHost Support Hub
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-foreground">
            ClassHost Docs
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Every answer, guide, and policy regarding publishing and hosting classroom web projects directly under your own GitHub account.
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all documentation... Try: 'ZIP', 'privacy', 'remix'"
              className="w-full rounded-xl border border-border bg-background/60 hover:bg-background focus:bg-background pl-11 pr-10 py-3 text-sm sm:text-base outline-none focus:border-coral focus:ring-1 focus:ring-coral/20 transition shadow-soft"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-coral hover:underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </section>

        {/* Conditional Search Results Render */}
        {query ? (
          <section className="space-y-4 max-w-lg mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Search Results ({searchResults.length})
            </h2>
            {searchResults.length > 0 ? (
              <div className="divide-y divide-border border border-border rounded-xl bg-card shadow-soft overflow-hidden">
                {searchResults.map((art) => (
                  <Link
                    key={art.slug}
                    href={`/docs/${art.slug}`}
                    className="block p-4 hover:bg-secondary/40 transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm sm:text-base text-foreground group-hover:text-coral transition font-display">
                        {art.title}
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-secondary px-2 py-0.5 rounded-md">
                        {art.category}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {art.description}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-border rounded-xl bg-card">
                <HelpCircle className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
                <p className="font-semibold text-sm text-foreground">No matches found</p>
                <p className="text-xs text-muted-foreground mt-1">Try another search query.</p>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Quick Links Row */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {[
                { label: "📤 Deploy Guide", url: "/docs/guides/deploying/upload-zip" },
                { label: "📋 Submit Assignment", url: "/docs/guides/classrooms/join-classroom" },
                { label: "🔒 Privacy Policy", url: "/docs/legal/privacy-policy" },
                { label: "❓ Limitations", url: "/docs/limitations/what-classhost-cant-do" }
              ].map((lnk) => (
                <Link
                  key={lnk.label}
                  href={lnk.url}
                  className="rounded-xl border border-border bg-card p-4 text-center shadow-soft hover:border-coral/50 hover:bg-secondary/30 transition group"
                >
                  <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-coral transition">
                    {lnk.label}
                  </span>
                </Link>
              ))}
            </section>

            {/* Categories Grid */}
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-display">
                📚 Browse by Category
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CATEGORIES.map((cat) => {
                  const items = ARTICLES.filter((a) => a.categorySlug === cat.slug);
                  if (items.length === 0) return null;

                  return (
                    <div
                      key={cat.slug}
                      className="rounded-xl border border-border bg-card p-6 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary border border-border text-coral">
                            {getIcon(cat.icon, "h-5 w-5")}
                          </div>
                          <div>
                            <h3 className="font-display font-extrabold text-base tracking-tight text-foreground">
                              {cat.title}
                            </h3>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                              {cat.section}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-border/60 pt-4 space-y-2">
                        {items.slice(0, 3).map((a) => (
                          <Link
                            key={a.slug}
                            href={`/docs/${a.slug}`}
                            className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 hover:text-coral transition font-display"
                          >
                            <CornerDownRight className="h-3 w-3 text-coral/60 shrink-0" />
                            {a.title}
                          </Link>
                        ))}
                        {items.length > 3 && (
                          <Link
                            href={`/docs/${items[0].slug}`}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-coral hover:underline pt-2"
                          >
                            View all {items.length} articles <ArrowRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Filipino Translation Prompt */}
            <section className="rounded-xl bg-gradient-to-br from-violet/5 to-coral/5 dark:from-violet/10 dark:to-coral/10 border border-border hover:border-coral/20 hover:shadow-soft transition-all duration-300 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
              <div className="flex items-center gap-3.5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary border border-border text-coral shrink-0">
                  <Flag className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-foreground">
                    🇵🇭 Available in Filipino (Tagalog)
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Ang mga gabay, patakaran, at tulong ay isinalin din sa wikang Filipino para sa mga estudyante.
                  </p>
                </div>
              </div>
              <Link
                href="/docs/filipino/mga-gabay/ano-ang-classhost"
                className="rounded-full bg-coral px-5 py-2.5 text-xs font-bold text-white shadow-soft hover:opacity-90 hover:shadow-pop transition shrink-0"
              >
                Tingnan sa Filipino →
              </Link>
            </section>

            {/* Still Need Help Footer */}
            <section className="border-t border-border pt-8 mt-12 text-center space-y-4">
              <h3 className="font-display font-bold text-base text-foreground">Still need help?</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "Contact Support", icon: HelpCircle, url: "mailto:eldrexdelosreyesbula@gmail.com" },
                  { label: "Community Forum", icon: MessageSquare, url: "https://github.com/EldrexDelosReyesBula/ClassHost-Docs/discussions" },
                  { label: "Report Issue", icon: Bug, url: "https://github.com/EldrexDelosReyesBula/ClassHost-Docs/issues" }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground/80 hover:border-coral/60 hover:text-coral transition shadow-soft cursor-pointer"
                    >
                      <Icon className="h-4 w-4 text-coral" />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
