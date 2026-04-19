import { useParams, Link } from "react-router-dom";
import { getQuestions } from "../lib/questions";
import { mathToPlain } from "../lib/mathToPlain";

const SUBJECT_LABELS: Record<string, string> = {
    riron: "理論",
    denryoku: "電力",
    kikai: "機械",
    hoki: "法規",
};

export default function Subjects() {
    const { subject } = useParams<{ subject: string }>();
    
    if (!subject) {
        return (
            <main className="p-5 max-w-2xl mx-auto text-center">
                <p className="text-gray-500 mb-4">科目が見つかりません</p>
                <Link to="/" className="text-blue-600 hover:underline">トップに戻る</Link>
            </main>
        );
    }
    
    const questions = getQuestions(subject);
    const label = SUBJECT_LABELS[subject] ?? subject;

    return (
        <main className="p-5 max-w-2xl mx-auto">

            {/* パンくず */}
            <nav className="text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:underline">トップ</Link>
                <span className="mx-2">›</span>
                <span>{label}</span>
            </nav>

            <h1 className="text-3xl font-bold mb-6">{label} 過去問一覧</h1>

            {questions.length === 0 ? (
                <p className="text-gray-500">問題データがまだありません。</p>
            ) : (
                <div className="space-y-3">
                    {questions.map((q) => (
                        <Link
                            key={q.id}
                            to={`/subjects/${subject}/${q.id}`}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                        >
                            <div>
                                <span className="font-semibold">
                                    {q.year}年度 {q.round === 1 ? "上期" : "下期"} 問{q.number}
                                </span>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                    {mathToPlain(q.question)}
                                </p>
                            </div>
                            <span className="text-gray-400">›</span>
                        </Link>
                    ))}
                </div>
            )}

        </main>
    );
}