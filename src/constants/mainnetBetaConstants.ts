import { PublicKey } from "@solana/web3.js";

const mainnetBetaConstants = {
  network: "mainnet-beta",
  name: "LOOTBOXES",
  // SPL FOR SPIN COSTS
  splMint: new PublicKey("2rpuPy33zLEzAVgG4cHinSQe5SnucCw4mdkZpbjW2Hzs"),
  splAmount: 20 * Math.pow(10, 6), // exponent is the number of decimals of token
  splAmountDecimals: 20,
  splTreasury: new PublicKey("EFLWH4GeFhbLUqTjwBGhP1zUghY9kMLeK8ocEqTKcfeg"),
  // SOL FOR SPIN COSTS
  solAmount: 0.025 * Math.pow(10, 9),
  solAmountDecimals: 0.025, // exponent is the number of decimals of SOL
  solTreasury: new PublicKey("271xEFW1YPyT5aDEoXiD5SwQa4Ai3S9irQgZGDmg31C3"),
  prizeCategoryTotals: {
    noPrize: 0.2,
    Cashback: 0.598333333333333,
    Trait: 0.2,
    NFT: 0.001666666666667,
  },
  prizes: [
    {
      name: "No Prize",
      mint: "",
      amount: null,
      decimalAmount: null,
      prizeType: "noPrize",
      prizeCategory: "noPrize",
      winPct: 0.2,
      winPctPretty: "20.00%",
      imageUrl: "",
    },
    {
      name: "NFL23 Jaguars",
      mint: "3g3btFSYXcUgx4uKrZamvWA4MP3GkfCY9aGiNG9d2UnZ",
      amount: "1",
      decimalAmount: "1",
      prizeType: "trait",
      prizeCategory: "Trait",
      winPct: 0.0001654259719,
      winPctPretty: "0.01%",
      imageUrl:
        "https://shdw-drive.genesysgo.net/5YsNruvED9RKvgxTYu2Mgd4vRmWqNbN7xGQdDKCkck9v/NFL23%20Jaguars.png",
    },
    {
      name: "Royal Red",
      mint: "2yD78qaHszetBa3U1fnfbaCnq9XCRgWkAzPLcnXqUozf",
      amount: "1",
      decimalAmount: "1",
      prizeType: "trait",
      prizeCategory: "Trait",
      winPct: 0.0001654259719,
      winPctPretty: "0.01%",
      imageUrl:
        "https://shdw-drive.genesysgo.net/5YsNruvED9RKvgxTYu2Mgd4vRmWqNbN7xGQdDKCkck9v/Royal Red.png",
    },
  ],
};

export default mainnetBetaConstants;
