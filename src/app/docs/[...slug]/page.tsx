import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { MarkdownRenderer } from "@/components/Markdown";
import { ARTICLES, DocArticle } from "@/data/docs";
import { Clock, Edit3, Globe, ArrowLeft, ArrowRight, CornerDownRight } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const targetSlug = slug.join("/");

  const article = ARTICLES.find((a) => a.slug === targetSlug);

  if (!article) {
    return notFound();
  }

  // Find previous and next articles in the same category/section
  const categoryArticles = ARTICLES.filter((a) => a.category === article.category);
  const curIdx = categoryArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = curIdx > 0 ? categoryArticles[curIdx - 1] : null;
  const nextArticle = curIdx < categoryArticles.length - 1 ? categoryArticles[curIdx + 1] : null;

  return (
    <div className="flex min-h-screen flex-col bg-transparent lg:flex-row">
      <Sidebar />

      {/* Main Container */}
      <main className="flex-1 px-4 py-8 sm:px-8 lg:px-12 xl:px-16 w-full max-w-4xl lg:max-w-3xl xl:max-w-4xl">
        <div className="space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-display">
            <Link href="/" className="hover:text-foreground transition">Home</Link>
            <ChevronRightIcon />
            <span className="hover:text-foreground transition">{article.category}</span>
            <ChevronRightIcon />
            <span className="text-foreground font-bold">{article.title}</span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-border/60 pb-6">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {article.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground pt-2">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-coral/80" />
                Last updated: {article.lastUpdated}
              </span>

              {article.translation && (
                <Link
                  href={`/docs/${article.translation}`}
                  className="flex items-center gap-1 rounded-full bg-coral/10 hover:bg-coral/20 px-2.5 py-1 text-[11px] font-bold text-coral transition"
                >
                  <Globe className="h-3.5 w-3.5" />
                  Basahin sa Filipino 🇵🇭
                </Link>
              )}
            </div>
          </div>

          {/* MDX/Markdown Content */}
          <article className="py-2">
            <MarkdownRenderer content={article.content} />
          </article>

          {/* Footer Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/60 pt-8 mt-12">
            {prevArticle ? (
              <Link
                href={`/docs/${prevArticle.slug}`}
                className="group flex flex-col gap-1.5 rounded-xl border border-border bg-card p-4 hover:border-coral/50 hover:bg-secondary/20 transition text-left"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 font-display">
                  <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" /> Previous
                </span>
                <span className="text-sm font-semibold text-foreground group-hover:text-coral transition truncate">
                  {prevArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <Link
                href={`/docs/${nextArticle.slug}`}
                className="group flex flex-col gap-1.5 rounded-xl border border-border bg-card p-4 hover:border-coral/50 hover:bg-secondary/20 transition text-right"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-end gap-1 font-display">
                  Next <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-sm font-semibold text-foreground group-hover:text-coral transition truncate">
                  {nextArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* GitHub edit metadata */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-muted-foreground border-t border-border/40 pt-6 mt-8">
            <a
              href={`https://github.com/EldrexDelosReyesBula/ClassHost-Docs/edit/main/content/${article.slug}.mdx`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition hover:underline cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Edit this page on GitHub
            </a>
            <span>ClassHost Docs v1.0.0</span>
          </div>
        </div>
      </main>
    </div>

  );
}

function ChevronRightIcon() {
  return <ChevronRight className="h-3 w-3 text-muted-foreground" />;
}

import { ChevronRight } from "lucide-react";
