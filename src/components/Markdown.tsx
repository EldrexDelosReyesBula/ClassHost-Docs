import React from "react";
import { AlertTriangle, Info, ShieldAlert, CheckCircle2 } from "lucide-react";

interface Props {
  content: string;
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
            <pre key={idx} className="overflow-x-auto rounded-2xl bg-secondary border border-border p-4 font-mono text-xs sm:text-sm text-foreground my-4">
              <code>{block.content.trim()}</code>
            </pre>
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
                    <li key={i}>{parseInline(item)}</li>
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
                <div key={`table-${key}`} className="overflow-x-auto my-6 border border-border rounded-2xl bg-card shadow-soft">
                  <table className="w-full border-collapse text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/60">
                        {headers.map((h, i) => (
                          <th key={i} className="p-3 font-semibold text-foreground/80">{h.trim()}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {bodyRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-secondary/20 transition">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 font-medium">{parseInline(cell.trim())}</td>
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
                <h1 key={i} className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-8 mb-4 border-b border-border/40 pb-2">
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
                  <div className="flex-1">{parseInline(trimmed.substring(trimmed.indexOf(" ") + 1))}</div>
                </div>
              );
            }
            // Handle Callouts / Blockquotes
            else if (trimmed.startsWith("> ")) {
              flushList(i);
              const quoteContent = trimmed.substring(2).trim();
              if (quoteContent.startsWith("[!WARNING]")) {
                renderedElements.push(
                  <div key={i} className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-900 flex gap-3 my-4">
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>{parseInline(quoteContent.replace("[!WARNING]", "").trim())}</div>
                  </div>
                );
              } else if (quoteContent.startsWith("[!NOTE]")) {
                renderedElements.push(
                  <div key={i} className="rounded-2xl border border-violet-300 bg-violet-50/70 p-4 text-xs sm:text-sm text-violet-900 flex gap-3 my-4">
                    <Info className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
                    <div>{parseInline(quoteContent.replace("[!NOTE]", "").trim())}</div>
                  </div>
                );
              } else if (quoteContent.startsWith("[!TIP]")) {
                renderedElements.push(
                  <div key={i} className="rounded-2xl border border-lime-300 bg-lime-50/70 p-4 text-xs sm:text-sm text-emerald-900 flex gap-3 my-4">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
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
