import { Link } from "react-router-dom";

const SUBJECTS = [
    { slug: "riron", label: "理論", description: "電気・電子回路、電磁気学" },
    { slug: "denryoku", label: "電力", description: "発電・送配電・変電" },
    { slug: "kikai", label: "機械", description: "変圧器・モーター・パワエレ" },
    { slug: "hoki", label: "法規", description: "電気事業法・技術基準" },
];

export default function Home() {
    return (
        <div>
            <main className="p-5 max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-5">電験三種 過去問</h1>

                <div className="mb-8 space-y-1 text-gray-600">
                    <p>電験の過去問に生成AIを活用しよう！</p>
                    <p>問題ページの<span className="font-semibold text-black">コピーボタン</span>を押してAIに貼り付けるだけで解説させることができます。</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {SUBJECTS.map((s) => (
                        <Link
                            key={s.slug}
                            to={`/subjects/${s.slug}`}
                            className="block p-4 border rounded-lg hover:bg-gray-50 transition"
                        >
                            <div className="text-xl font-bold mb-1">{s.label}</div>
                            <div className="text-sm text-gray-500">{s.description}</div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}