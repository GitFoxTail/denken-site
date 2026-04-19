import riron from "../data/questions/riron.json";
// import denryoku from "../data/questions/denryoku.json";
// import kikai from "../data/questions/kikai.json";
// import hoki from "../data/questions/hoki.json";

export type Question = {
  id: string;
  year: number;
  round: number;
  number: number;
  question: string;
  choices: Record<string, string>;
  answer: number;
  hasImage: boolean;
  images: string[];
  tags: string[];
};

const ALL_QUESTIONS: Record<string, Question[]> = {
  riron,
//   denryoku,
//   kikai,
//   hoki,
};

export function getQuestions(subject: string): Question[] {
  return ALL_QUESTIONS[subject] ?? [];
}

export function getQuestion(subject: string, id: string): Question | undefined {
  return getQuestions(subject).find((q) => q.id === id);
}