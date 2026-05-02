import { states } from "@/data/states";
import { upDeepDive } from "@/data/elections";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import StateDetailClient from "@/components/states/StateDetailClient";

// Generate static params for all states
export function generateStaticParams() {
  return states.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const state = states.find((s) => s.slug === params.slug);
  if (!state) return {};
  return {
    title: `${state.name} — Election Data`,
    description: `Complete election data for ${state.name}: ${state.loksabha} Lok Sabha seats, ${state.vidhansabha} Vidhan Sabha seats, ${state.districts} districts, ${state.approxVoters} voters.`,
  };
}

export default function StateDetailPage({ params }: { params: { slug: string } }) {
  const state = states.find((s) => s.slug === params.slug);
  if (!state) notFound();

  const isUP = state.slug === "uttar-pradesh";
  const up = isUP ? upDeepDive : null;

  return (
    <StateDetailClient state={state} up={up} />
  );
}
