const ITEMS = [
  "Enterprise Security",
  "PAdES Compatible",
  "Local PDF Processing",
  "Class 3 DSC",
  "mToken USB Signing",
  "Visible Signature Placement",
  "Bulk Folder Signing",
  "Private Key Stays on Token",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      data-testid="editorial-marquee"
      className="relative overflow-hidden border-y border-white/5 bg-[#0D0D0F] py-6"
    >
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-heading px-8 text-2xl font-light uppercase tracking-[0.2em] text-white/25">
              {item}
            </span>
            <span className="text-emerald-500/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
