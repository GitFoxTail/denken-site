export function mathToPlain(text: string): string {
  return text
    .replace(/\$([^$]+)\$/g, (_, math) => katexToPlain(math))
    .replace(/\\,/g, " ")                          // $外の \,
    .replace(/\\mathrm\{([^}]+)\}/g, "$1")         // $外の \mathrm{}
    .replace(/\\[a-zA-Z]+/g, "")                   // $外の残ったコマンド
}

function katexToPlain(math: string): string {
  return math
    .replace(/\\times/g, "×")                      // ← 追加
    .replace(/\\cdot/g,  "·")                      // ← あると便利
    .replace(/\\dfrac\{([^}]+)\}\{([^}]+)\}/g, "($1)/($2)")
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g,  "($1)/($2)")
    .replace(/\\sqrt\{([^}]+)\}/g,              "√($1)")
    .replace(/\\sqrt(\w)/g,                     "√$1")
    .replace(/\\omega/g,   "ω")
    .replace(/\\alpha/g,   "α")
    .replace(/\\beta/g,    "β")
    .replace(/\\theta/g,   "θ")
    .replace(/\\phi/g,     "φ")
    .replace(/\\pi/g,      "π")
    .replace(/\\varepsilon_0/g, "ε₀")
    .replace(/\\mu_0/g,    "μ₀")
    .replace(/\\sin/g,     "sin")
    .replace(/\\cos/g,     "cos")
    .replace(/\\tan/g,     "tan")
    .replace(/\\,/g,       " ")                    // ← 追加
    .replace(/\^{([^}]+)}/g, "^($1)")
    .replace(/\^(\w)/g,      "^$1")
    .replace(/_\{([^}]+)\}/g, "_($1)")
    .replace(/_(\w)/g,       "_$1")
    .replace(/\\mathrm\{([^}]+)\}/g, "$1")
    .replace(/\\[a-zA-Z]+/g, "")
    .replace(/[{}]/g, "")
    .trim()
}