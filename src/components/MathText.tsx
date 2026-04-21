import katex from "katex";
import "katex/dist/katex.min.css";

export function MathText({ text }: { text: string }) {
    // $...$ をInlineMathに変換、それ以外はそのままテキストで出力
    const parts = text.split(/(\$[^$]+\$)/g);
    return (
        <>
            {parts.map((part, i) =>
                part.startsWith("$") && part.endsWith("$") ? (
                    <span
                        key={i}
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString(part.slice(1, -1), {
                                throwOnError: false,
                            }),
                        }}
                    />
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    );
}