import { useParams, Link, useNavigate } from "react-router-dom";
import { getQuestion, getQuestions } from "../lib/questions";
import { MathText } from "../components/MathText";
import { AiCopyButton } from "../components/AiCopyButton";
import { useState } from "react";

const SUBJECT_LABELS: Record<string, string> = {
    riron: "理論",
    denryoku: "電力",
    kikai: "機械",
    hoki: "法規",
};

export default function SubjectDetail() {
    const { subject, id } = useParams<{ subject: string; id: string }>();
    const navigate = useNavigate();
    
    if (!subject || !id) {
        navigate("/");
        return null;
    }
    
    const question = getQuestion(subject, id);

    if (!question) {
        return (
            <main className="p-5 max-w-2xl mx-auto text-center">
                <p className="text-gray-500 mb-4">問題が見つかりません</p>
                <Link to="/" className="text-blue-600 hover:underline">トップに戻る</Link>
            </main>
        );
    }

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showingAnswer, setShowingAnswer] = useState(false);
    const [copiedImage, setCopiedImage] = useState<string | null>(null);
    const label = SUBJECT_LABELS[subject] ?? subject;

    const handleSelectAnswer = (key: number) => {
        if (selectedAnswer === null && !showingAnswer) {
            setSelectedAnswer(key);
        }
    };

    const handleToggleAnswer = () => {
        if (selectedAnswer !== null || showingAnswer) {
            // 「回答を隠す」状態なら初期化
            setSelectedAnswer(null);
            setShowingAnswer(false);
        } else {
            // 「正答を見る」状態なら正答を表示
            setShowingAnswer(true);
        }
    };

    const handleCopyImage = async (img: string) => {
        try {
            const imageUrl = `${window.location.origin}/images/questions/${img}`;
            await navigator.clipboard.writeText(imageUrl);
            setCopiedImage(img);
            setTimeout(() => setCopiedImage(null), 2000);
        } catch (err) {
            console.error("Failed to copy image URL:", err);
        }
    };

    const getChoiceClasses = (key: number) => {
        // 正答を表示中でユーザーがまだ選択していない状態
        if (showingAnswer && selectedAnswer === null) {
            const isCorrect = question.answer === key;
            return isCorrect
                ? "border-green-400 bg-green-50"
                : "border-gray-200 bg-white opacity-50";
        }

        // ユーザーが選択済みの状態
        if (selectedAnswer !== null) {
            const isSelected = selectedAnswer === key;
            const isCorrect = question.answer === key;

            if (isCorrect) {
                return "border-green-400 bg-green-50";
            } else if (isSelected) {
                return "border-red-400 bg-red-50";
            } else {
                return "border-gray-200 bg-white opacity-50";
            }
        }

        // 未選択かつ正答も表示していない状態
        return "border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 cursor-pointer";
    };

    const getTextClasses = (key: number) => {
        // 正答を表示中でユーザーがまだ選択していない状態
        if (showingAnswer && selectedAnswer === null) {
            const isCorrect = question.answer === key;
            return isCorrect ? "text-green-600 font-bold" : "text-gray-400";
        }

        // ユーザーが選択済みの状態
        if (selectedAnswer !== null) {
            const isSelected = selectedAnswer === key;
            const isCorrect = question.answer === key;

            if (isCorrect) {
                return "text-green-600 font-bold";
            } else if (isSelected) {
                return "text-red-600 font-bold";
            } else {
                return "text-gray-400";
            }
        }

        // 未選択かつ正答も表示していない状態
        return "text-gray-400";
    };

    return (
        <main className="p-5 max-w-2xl mx-auto">

            {/* パンくず */}
            <nav className="text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:underline">トップ</Link>
                <span className="mx-2">›</span>
                <Link to={`/subjects/${subject}`} className="hover:underline">{label}</Link>
                <span className="mx-2">›</span>
                <span>{question.year}年 第{question.round}回 問{question.number}</span>
            </nav>

            {/* タイトル */}
            <h1 className="text-xl font-bold mb-6">
                {label}｜{question.year}年度 {question.round === 1 ? "上期" : "下期"} 問{question.number}
            </h1>

            {/* AIコピーボタン */}
            <AiCopyButton question={question} subject={subject} />

            {/* 問題文 */}
            <section className="my-6 p-4 bg-gray-50 rounded-lg leading-relaxed">
                <MathText text={question.question} />
            </section>

            {/* 図 */}
            {question.hasImage && question.images && (
                <div className="flex flex-wrap gap-4 mb-6">
                    {question.images.map((img) => (
                        <div key={img} className="relative inline-block">
                            <img
                                src={`/images/questions/${img}`}
                                alt={img}
                                className="max-w-full rounded border"
                            />
                            <button
                                onClick={() => handleCopyImage(img)}
                                className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded transition cursor-pointer
                                    ${copiedImage === img
                                        ? "bg-green-500 text-white"
                                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 shadow"
                                    }`}
                            >
                                {copiedImage === img ? "✓ コピーしました" : "コピー"}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* 選択肢 */}
            <section className="mb-6">
                <div className="flex justify-end mb-3">
                    <button
                        onClick={handleToggleAnswer}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                    >
                        {selectedAnswer !== null || showingAnswer ? "回答を隠す" : "正答を見る"}
                    </button>
                </div>
                <div className="space-y-3">
                    {([1, 2, 3, 4, 5] as const).map((key) => {
                        return (
                            <div
                                key={key}
                                onClick={() => handleSelectAnswer(key)}
                                className={`flex gap-3 p-3 rounded-lg border transition ${getChoiceClasses(key)}`}
                            >
                                <span className={`font-bold shrink-0 ${getTextClasses(key)}`}>
                                    ({key})
                                </span>
                                <MathText text={question.choices[key]} />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 前後ナビ */}
            <QuestionNav subject={subject} currentId={id} />

        </main>
    );
}

// 前後の問題ナビゲーション
function QuestionNav({ subject, currentId }: { subject: string; currentId: string }) {
    const questions = getQuestions(subject);
    const currentIndex = questions.findIndex((q) => q.id === currentId);
    const prev = questions[currentIndex - 1];
    const next = questions[currentIndex + 1];

    return (
        <nav className="flex justify-between mt-10 pt-6 border-t text-sm">
            {prev ? (
                <Link to={`/subjects/${subject}/${prev.id}`} className="text-blue-600 hover:underline">
                    ← 問{prev.number}
                </Link>
            ) : <span />}
            {next ? (
                <Link to={`/subjects/${subject}/${next.id}`} className="text-blue-600 hover:underline">
                    問{next.number} →
                </Link>
            ) : <span />}
        </nav>
    );
}