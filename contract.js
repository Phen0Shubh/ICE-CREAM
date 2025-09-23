// --------------------
// Config
// --------------------
const CONTRACT_ADDRESS = "0xa307378e19478aFF160b0D7B0f84A1805E8970DF";
const ABI = [
  "function registerDocument(bytes32,address,string,string,string,string) public",
  "function getDocument(bytes32) external view returns (address,address,string,string,string,string,uint256,bool)",
  "function getDocsByHolder(address) external view returns (bytes32[])",
  "function issuers(address) external view returns (bool)"
];

// --------------------
// Utility: Hash File
// --------------------
async function fileHash(file) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return "0x" + hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// --------------------
// Upload to Pinata
// --------------------
async function uploadToPinata(file, PINATA_JWT) {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append("file", file);

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${PINATA_JWT}` },
    body: data
  });
  if (!res.ok) throw new Error("Pinata upload failed");
  const result = await res.json();
  return result.IpfsHash;
}
