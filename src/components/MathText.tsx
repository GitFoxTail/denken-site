// components/MathText.tsx
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

export function MathText({ text }: { text: string }) {
    // $...$ をInlineMathに変換、それ以外はそのままテキストで出力
    const parts = text.split(/(\$[^$]+\$)/g);
    return (
        <>
            {parts.map((part, i) =>
                part.startsWith("$") && part.endsWith("$") ? (
                    <InlineMath key={i} math={part.slice(1, -1)} />
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    );
}