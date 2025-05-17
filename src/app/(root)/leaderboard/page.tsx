import { Leaderboard } from "../_components/leaderboard";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-24">
      <div className="max-w-4xl mx-auto">
        <Leaderboard />
      </div>
    </main>
  );
}
