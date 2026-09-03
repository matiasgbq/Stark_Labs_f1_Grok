import { createFileRoute } from "@tanstack/react-router";
import { Game } from "@/game/Game";

export const Route = createFileRoute("/")({
  ssr: false,
  component: Home,
});

function Home() {
  return <Game />;
}
