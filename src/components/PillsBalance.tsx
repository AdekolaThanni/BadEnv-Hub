interface PillsBalanceProps {
  bluePills: number;
  redPills: number;
  goldPills: number;
  loadingData: boolean;
  charachterNum: number;
}

export default function PillsBalance({
  bluePills,
  redPills,
  goldPills,
  loadingData,
  charachterNum,
}: PillsBalanceProps) {
  return (
    <div
      className={`  text-black gap-1 w-[250px]  font-bold px-2 flex items-center justify-center py-2 bg-white/10 rounded-full mt-5 shadow-lg bottom-5  ${
        loadingData ? "opacity-30 animate-pulse" : ""
      }`}
    >
      <span className="flex items-center gap-2 ml-2 text-[#DDDDDD]">
        {charachterNum}{" "}
        <img
          className="rounded-full w-7 h-7"
          src="https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https%3A%2F%2Fbafybeievkric77776cyjactnzkqemuec6nvewm53b2fe4k2msomvdoyvmy.ipfs.nftstorage.link%2F1780.png%3Fext%3Dpng"
        />
      </span>
      <span className="flex items-center gap-2 ml-2 text-red-500">
        {redPills}{" "}
        <img className="w-7 h-7" src="../assets/images/redPill.png" />
      </span>
      <span className="flex items-center gap-2 ml-2 text-blue-500">
        {bluePills}{" "}
        <img className="w-7 h-7" src="../assets/images/bluePill.png" />
      </span>
      <span className="flex items-center gap-2 ml-2 text-amber-600">
        {goldPills}{" "}
        <img className="w-7 h-7" src="../assets/images/goldPill.png" />
      </span>
    </div>
  );
}
