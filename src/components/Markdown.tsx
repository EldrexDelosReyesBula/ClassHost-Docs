import React from "react";
import { AlertTriangle, Info, ShieldAlert, CheckCircle2, Copy, Check } from "lucide-react";

interface Props {
  content: string;
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group my-5">
      <pre className="overflow-x-auto rounded-xl bg-secondary/50 dark:bg-secondary/20 border border-border p-4 pr-12 font-mono text-xs sm:text-sm text-foreground">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 focus:opacity-100 rounded-md border border-border bg-background p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition shadow-sm cursor-pointer"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      {lang && (
        <span className="absolute right-3 bottom-3 text-[10px] font-bold text-muted-foreground/45 uppercase tracking-widest pointer-events-none opacity-60 group-hover:opacity-0 transition">
          {lang}
        </span>
      )}
    </div>
  );
}

export function MarkdownRenderer({ content }: Props) {
  if (!content) return null;

  // Split content into blocks: code blocks are isolated
  const blocks: { type: "code" | "md"; content: string; lang?: string }[] = [];
  const parts = content.split("```");

  parts.forEach((part, index) => {
    if (index % 2 === 1) {
      // Inside a code block
      const firstNewline = part.indexOf("\n");
      const lang = part.substring(0, firstNewline).trim();
      const code = part.substring(firstNewline + 1);
      blocks.push({ type: "code", content: code, lang });
    } else {
      // Markdown text
      blocks.push({ type: "md", content: part });
    }
  });

  return (
    <div className="space-y-6 text-foreground/90 leading-relaxed text-sm sm:text-base">
      {blocks.map((block, idx) => {
        if (block.type === "code") {
          return (
            <CodeBlock key={idx} code={block.content.trim()} lang={block.lang} />
          );
        } else {
          // Parse lines in markdown block
          const lines = block.content.split("\n");
          let inList = false;
          let listItems: string[] = [];
          let inTable = false;
          let tableRows: string[][] = [];

          const renderedElements: React.ReactNode[] = [];

          const flushList = (key: string | number) => {
            if (listItems.length > 0) {
              renderedElements.push(
                <ul key={`list-${key}`} className="list-disc pl-6 space-y-2 my-4">
                  {listItems.map((item, i) => (
                    <li key={i} className="text-sm sm:text-base">{parseInline(item)}</li>
                  ))}
                </ul>
              );
              listItems = [];
              inList = false;
            }
          };

          const flushTable = (key: string | number) => {
            if (tableRows.length > 0) {
              const headers = tableRows[0];
              const bodyRows = tableRows.slice(2); // Skip separator row
              renderedElements.push(
                <div key={`table-${key}`} className="overflow-x-auto my-6 border border-border rounded-xl bg-card shadow-soft">
                  <table className="w-full border-collapse text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/40">
                        {headers.map((h, i) => (
                          <th key={i} className="p-3.5 font-bold uppercase tracking-wider text-muted-foreground/85 text-[10px] font-display">{h.trim()}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {bodyRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-secondary/30 transition">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3.5 font-medium">{parseInline(cell.trim())}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
              tableRows = [];
              inTable = false;
            }
          };

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();

            // Handle tables
            if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
              flushList(i);
              inTable = true;
              const cells = trimmed.split("|").slice(1, -1);
              tableRows.push(cells);
              continue;
            } else if (inTable) {
              flushTable(i);
            }

            // Handle horizontal rule
            if (trimmed === "---" || trimmed === "***") {
              flushList(i);
              renderedElements.push(<hr key={i} className="my-8 border-border" />);
              continue;
            }

            // Handle headings
            if (trimmed.startsWith("# ")) {
              flushList(i);
              renderedElements.push(
                <h1 key={i} className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-8 mb-4 border-b border-border pb-2">
                  {parseInline(trimmed.substring(2))}
                </h1>
              );
            } else if (trimmed.startsWith("## ")) {
              flushList(i);
              renderedElements.push(
                <h2 key={i} className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-8 mb-3">
                  {parseInline(trimmed.substring(3))}
                </h2>
              );
            } else if (trimmed.startsWith("### ")) {
              flushList(i);
              renderedElements.push(
                <h3 key={i} className="font-display text-lg sm:text-xl font-bold text-foreground mt-6 mb-2">
                  {parseInline(trimmed.substring(4))}
                </h3>
              );
            }
            // Handle lists
            else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
              inList = true;
              listItems.push(trimmed.substring(2));
            } else if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ") || trimmed.startsWith("4. ") || trimmed.startsWith("5. ")) {
              flushList(i);
              renderedElements.push(
                <div key={i} className="flex gap-3 my-2 pl-2">
                  <span className="font-bold text-coral shrink-0">{trimmed.substring(0, trimmed.indexOf(" ") + 1)}</span>
                  <div className="flex-1 text-sm sm:text-base">{parseInline(trimmed.substring(trimmed.indexOf(" ") + 1))}</div>
                </div>
              );
            }
            // Handle Callouts / Blockquotes
            else if (trimmed.startsWith("> ")) {
              flushList(i);
              const quoteContent = trimmed.substring(2).trim();
              if (quoteContent.startsWith("[!WARNING]")) {
                renderedElements.push(
                  <div key={i} className="rounded-xl border border-amber-500/25 bg-amber-500/5 dark:bg-amber-500/10 p-4 text-xs sm:text-sm text-amber-800 dark:text-amber-300 flex gap-3 my-5">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>{parseInline(quoteContent.replace("[!WARNING]", "").trim())}</div>
                  </div>
                );
              } else if (quoteContent.startsWith("[!NOTE]")) {
                renderedElements.push(
                  <div key={i} className="rounded-xl border border-violet/25 bg-violet/5 dark:bg-violet/10 p-4 text-xs sm:text-sm text-violet-800 dark:text-violet-300 flex gap-3 my-5">
                    <Info className="h-5 w-5 text-violet shrink-0 mt-0.5" />
                    <div>{parseInline(quoteContent.replace("[!NOTE]", "").trim())}</div>
                  </div>
                );
              } else if (quoteContent.startsWith("[!TIP]")) {
                renderedElements.push(
                  <div key={i} className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/10 p-4 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 flex gap-3 my-5">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>{parseInline(quoteContent.replace("[!TIP]", "").trim())}</div>
                  </div>
                );
              } else {
                renderedElements.push(
                  <blockquote key={i} className="border-l-4 border-coral bg-secondary/40 rounded-r-xl px-4 py-3 my-4 text-xs sm:text-sm text-muted-foreground italic">
                    {parseInline(quoteContent)}
                  </blockquote>
                );
              }
            }
            // Paragraphs & Empty Lines
            else {
              if (trimmed === "") {
                flushList(i);
              } else {
                if (inList) {
                  // Multiline list item support
                  listItems[listItems.length - 1] += " " + trimmed;
                } else {
                  renderedElements.push(
                    <p key={i} className="my-3 leading-relaxed">
                      {parseInline(trimmed)}
                    </p>
                  );
                }
              }
            }
          }

          // Flush any remaining active blocks
          flushList("end");
          flushTable("end");

          return <React.Fragment key={idx}>{renderedElements}</React.Fragment>;
        }
      })}
    </div>
  );
}

// Simple parser for inline elements: **bold**, `code`, [link](url)
function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];

  let currentText = text;

  // Regex patterns
  const boldPattern = /\*\*([^*]+)\*\*/g;
  const codePattern = /`([^`]+)`/g;
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

  // Parse token stream
  const tokens: { type: "text" | "bold" | "code" | "link"; text: string; url?: string; index: number }[] = [];

  let match;

  // Find all bold
  while ((match = boldPattern.exec(text)) !== null) {
    tokens.push({ type: "bold", text: match[1], index: match.index });
  }

  // Find all code
  codePattern.lastIndex = 0;
  while ((match = codePattern.exec(text)) !== null) {
    tokens.push({ type: "code", text: match[1], index: match.index });
  }

  // Find all links
  linkPattern.lastIndex = 0;
  while ((match = linkPattern.exec(text)) !== null) {
    tokens.push({ type: "link", text: match[1], url: match[2], index: match.index });
  }

  // Sort tokens by index
  tokens.sort((a, b) => a.index - b.index);

  let lastIndex = 0;
  for (const token of tokens) {
    if (token.index < lastIndex) continue; // Skip overlapping matches

    // Add plain text preceding the match
    if (token.index > lastIndex) {
      parts.push(text.substring(lastIndex, token.index));
    }

    // Add matched token
    if (token.type === "bold") {
      parts.push(
        <strong key={token.index} className="font-bold text-foreground">
          {token.text}
        </strong>
      );
      lastIndex = token.index + token.text.length + 4; // length of "**" + text + "**"
    } else if (token.type === "code") {
      parts.push(
        <code key={token.index} className="px-1.5 py-0.5 rounded bg-secondary text-coral border border-border font-mono text-xs sm:text-sm">
          {token.text}
        </code>
      );
      lastIndex = token.index + token.text.length + 2; // length of "`" + text + "`"
    } else if (token.type === "link") {
      const isExternal = token.url?.startsWith("http");
      parts.push(
        <a
          key={token.index}
          href={token.url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-coral font-semibold hover:underline"
        >
          {token.text}
        </a>
      );
      lastIndex = token.index + token.text.length + (token.url || "").length + 4; // length of "[" + text + "](" + url + ")"
    }
  }

  // Add any remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  // If no tokens found, return raw text
  return parts.length > 0 ? parts : [text];
}
