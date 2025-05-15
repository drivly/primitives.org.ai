import { codeToHtml } from "shiki"

export async function highlight(code: string, lang: string, showLineNumbers = true) {
  try {
    // Make sure to handle unsupported languages gracefully
    const supportedLang = getSupportedLanguage(lang)

    // Use the modern Shiki API which doesn't rely on vscode-textmate
    const html = await codeToHtml(code, {
      lang: supportedLang,
      theme: "github-dark",
      lineOptions: showLineNumbers
        ? Array.from({ length: code.split("\n").length }).map((_, i) => ({
            line: i + 1,
            classes: ["line-number"],
          }))
        : [],
    })

    return html
  } catch (error) {
    console.warn(`Error highlighting code: ${error}`)

    // Fallback to a simple HTML escape
    return `<pre class="shiki" style="background-color: #0d1117; padding: 16px; margin: 0; border-radius: 6px; overflow: auto;"><code>${escapeHtml(code)}</code></pre>`
  }
}

// Map common language aliases to supported languages
function getSupportedLanguage(lang: string): string {
  const langMap: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    jsx: "tsx",
    sh: "bash",
    shell: "bash",
    zsh: "bash",
    py: "python",
  }

  return langMap[lang.toLowerCase()] || lang || "text"
}

// Helper function to escape HTML special characters
function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
