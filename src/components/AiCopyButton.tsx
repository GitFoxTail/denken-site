// components/AiCopyButton.tsx
"use client";

import { useState } from "react";
import type { Question } from "../lib/questions";
import { mathToPlain } from "../lib/mathToPlain";

type Props = {
    question: Question;
    subject: string;
};

const SUBJECT_LABELS: Record<string, string> = {
    rikron: "理論",
    denryoku: "電力",
    kikai: "機械",
    hoki: "法規",
};

const PROMPTS = [
    {
        label: "解説して",
        template: (body: string) => `${body}\n\nこの問題を丁寧に解説してください。`,
    },
    {
        label: "かみ砕いて説明して",
        template: (body: string) => `${body}\n\nこの問題を数式をなるべく使わず、初心者にもわかるように説明してください。`,
    },
    {
        label: "類似問題を出して",
        template: (body: string) => `${body}\n\nこの問題と同じ分野の類似問題を1問作成し、解説も付けてください。`,
    },
];

function buildQuestionBody(question: Question, subjectLabel: string): string {
    const choices = (["1", "2", "3", "4", "5"] as const)
        .map((key) => `(${key}) ${mathToPlain(question.choices[key] ?? "")}`)
        .join("\n");

    return `【電験三種 ${subjectLabel} ${question.year}年 第${question.round}回 問${question.number}】

${mathToPlain(question.question)}

${choices}`;
}

export function AiCopyButton({ question, subject }: Props) {
    const [copied, setCopied] = useState<number | null>(null);
    const subjectLabel = SUBJECT_LABELS[subject] ?? subject;
    const body = buildQuestionBody(question, subjectLabel);

    const handleCopy = async (index: number) => {
        const text = PROMPTS[index].template(body);
        await navigator.clipboard.writeText(text);
        setCopied(index);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-bold text-blue-800 pb-2">
                🤖 AIに質問する
            </p>
            <p className="text-xs text-blue-600 pb-2">
                ボタンを押してコピー → ChatGPT・Claude等に貼り付け
            </p>
            <div className="grid grid-cols-3 gap-2">
                {PROMPTS.map((prompt, i) => (
                    <button
                        key={i}
                        onClick={() => handleCopy(i)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer
                            ${copied === i
                                ? "bg-green-500 text-white"
                                : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                            }`}
                    >
                        {copied === i ? "✓ コピーしました" : prompt.label}
                    </button>
                ))}
            </div>
        </div>
    );
}