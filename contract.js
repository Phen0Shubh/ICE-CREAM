// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0xb3FD9B44Ff0c5d2D93C7463D15e10e737704D4b0";

const ABI = [
  "function registerDocument(bytes32 docHash, address holder, string title, string ipfsCid) external",
  "function revokeDocument(bytes32 docHash) external",
  "function getDocument(bytes32 docHash) external view returns (address issuer, address holder, string title, string ipfsCid, uint256 timestamp, bool revoked)",
  "function getDocsByHolder(address holder) external view returns (bytes32[] memory)",
  "function issuers(address) external view returns (bool)"
];