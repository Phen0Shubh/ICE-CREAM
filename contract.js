// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0xa307378e19478aFF160b0D7B0f84A1805E8970DF";

// Updated ABI (includes holderName + enrollmentNo)
const ABI = [
  "function registerDocument(bytes32 hash, address holder, string title, string holderName, string enrollmentNo, string ipfsCid) public",
  "function getDocument(bytes32 hash) external view returns (address issuer, address holder, string title, string holderName, string enrollmentNo, string ipfsCid, uint256 timestamp, bool revoked)",
  "function getDocsByHolder(address) external view returns (bytes32[])",
  "function issuers(address) external view returns (bool)",
  "function revokeDocument(bytes32 hash) public"
];

// ---- Utility functions ----

// Hash file with SHA-256
async function fileHash(file) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return "0x" + Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2,"0"))
    .join("");
}

// Upload to Pinata (needs your JWT)
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
