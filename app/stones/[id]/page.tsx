import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/sections/SiteHeader";
import StoneInspector from "@/components/sections/StoneInspector";
import { stones, type Stone } from "@/data/stones";

type StonePageProps = {
  params: Promise<{
    id: Stone["id"];
  }>;
};

export function generateStaticParams() {
  return stones.map((stone) => ({
    id: stone.id
  }));
}

export async function generateMetadata({ params }: StonePageProps) {
  const { id } = await params;
  const stone = stones.find((item) => item.id === id);

  if (!stone) {
    return {
      title: "Taş Bulunamadı"
    };
  }

  return {
    title: `${stone.name} | Mantom`,
    description: stone.description
  };
}

export default async function StonePage({ params }: StonePageProps) {
  const { id } = await params;
  const stone = stones.find((item) => item.id === id);

  if (!stone) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="stone-detail-page">
        <section className="stone-detail-hero">
          <div className="stone-detail-copy">
            <Link className="back-link" href="/#collection">
              <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.6} />
              Koleksiyon
            </Link>
            <p className="eyebrow">{stone.origin}</p>
            <h1>{stone.name}</h1>
            <p>{stone.description}</p>

            <div className="stone-detail-specs">
              <div>
                <span>Yüzey</span>
                <strong>{stone.surface}</strong>
              </div>
              <div>
                <span>Kullanım</span>
                <strong>{stone.use}</strong>
              </div>
            </div>

            <ul className="stone-detail-list">
              {stone.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>

            <div className="stone-detail-actions">
              <a href="mailto:info@mantom.com">
                Teklif al <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.6} />
              </a>
              <a href={stone.sourceUrl} rel="noreferrer" target="_blank">
                Görsel kaynağı <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.6} />
              </a>
            </div>
          </div>

          <div className="stone-detail-media">
            <StoneInspector stone={stone} />
            <p>{stone.source}</p>
          </div>
        </section>
      </main>
    </>
  );
}
