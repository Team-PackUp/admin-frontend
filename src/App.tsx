import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="p-10 space-x-4 bg-white">
      <Button>기본</Button>
      <Button variant="outline">아웃라인</Button>
      <Button variant="destructive">위험</Button>
      <div className="bg-red-500 text-white p-4">Tailwind 됨?</div>
    </div>
  );
}
