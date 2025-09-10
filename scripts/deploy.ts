import { ethers } from "hardhat";

async function main() {
  console.log("Deploying NeonSphereWeave contract...");

  // Get the contract factory
  const NeonSphereWeave = await ethers.getContractFactory("NeonSphereWeave");

  // Deploy the contract with a verifier address (you can change this to any address)
  const verifierAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual verifier address
  
  const neonSphereWeave = await NeonSphereWeave.deploy(verifierAddress);

  await neonSphereWeave.waitForDeployment();

  const contractAddress = await neonSphereWeave.getAddress();
  
  console.log("NeonSphereWeave deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifierAddress,
    network: "sepolia",
    timestamp: new Date().toISOString(),
  };
  
  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
