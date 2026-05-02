import { sampleCandidates, partyList } from "@/data/candidates";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CandidateDetailClient from "@/components/candidates/CandidateDetailClient";

export function generateStaticParams() {
  return sampleCandidates.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const candidate = sampleCandidates.find((c) => c.id === params.id);
  if (!candidate) return {};
  return {
    title: `${candidate.name} — ${candidate.constituency}`,
    description: `${candidate.name} (${candidate.partyShort}) — ${candidate.constituency}, ${candidate.state}. ${candidate.result} with ${candidate.votes?.toLocaleString()} votes.`,
  };
}

export default function CandidateDetailPage({ params }: { params: { id: string } }) {
  const candidate = sampleCandidates.find((c) => c.id === params.id);
  if (!candidate) notFound();

  const partyData = partyList.find((p) => p.short === candidate.partyShort);
  const opponent = sampleCandidates.find(
    (c) => c.constituency === candidate.constituency && c.id !== candidate.id && c.electionYear === candidate.electionYear
  );

  return (
    <CandidateDetailClient 
      candidate={candidate} 
      partyData={partyData} 
      opponent={opponent} 
      partyList={partyList} 
    />
  );
}
