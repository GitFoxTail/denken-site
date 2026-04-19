import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/subjects/:subject" element={<Subjects />} />
      <Route path="/subjects/:subject/:id" element={<SubjectDetail />} />
    </Routes>
  )
}