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

const Row = ({ hidden }) => (
  <div aria-hidden={hidden} className="flex shrink-0 items-center">
    {ITEMS.map((item) => (
      <span key={item} className="flex items-center">
        <span className="font-heading whitespace-nowrap px-10 text-2xl font-light uppercase tracking-[0.2em] text-white/25">
          {item}
        </span>
        <span className="shrink-0 text-sm text-emerald-500/50">◆</span>
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div
      data-testid="editorial-marquee"
      className="relative overflow-hidden border-y border-white/5 bg-[#0D0D0F] py-7"
    >
      <div className="animate-marquee flex w-max will-change-transform [transform:translateZ(0)]">
        <Row />
        <Row hidden />
      </div>
      <div className="marquee-fade marquee-fade-l" />
      <div className="marquee-fade marquee-fade-r" />
    </div>
  );
}
