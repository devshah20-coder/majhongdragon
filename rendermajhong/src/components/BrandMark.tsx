import Image from "next/image";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-12 place-items-center rounded-full border border-gold/40 bg-navy shadow-glow">
        <Image src="/icons/icon.svg" alt="" width={40} height={40} priority />
      </div>
      {!compact && (
        <div>
          <p className="text-base font-black leading-none text-pearl">DragonMind</p>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-jade">Mahjong</p>
        </div>
      )}
    </div>
  );
}
