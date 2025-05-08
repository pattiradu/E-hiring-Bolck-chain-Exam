
# E-Hiring System DApp

## Project Title
**E-Hiring System** – A Decentralized Application (DApp) for  E-Hiring System

## Clear Objective
To create a secure and decentralized hiring platform where candidates can register, get verified, apply for jobs, receive offers, and accept them—all on the Ethereum blockchain.

## Description of the Problem or Need
Traditional hiring systems suffer from lack of transparency, trust issues, and centralized control which can lead to biases or data breaches. This DApp aims to solve those issues using blockchain's decentralized and immutable nature.

## Proposed Solution
A DApp where:
- Candidates register with education and experience details.
- Admin verifies the candidates.
- Admin posts jobs.
- Verified candidates can apply for jobs.
- Admin sends job offers.
- Candidates can accept job offers, becoming employees on-chain.

## Key Features
- Candidate Registration and Verification
- Job Posting by Admin
- Job Application by Verified Candidates
- Job Offer Issuance and Acceptance
- All actions recorded on Ethereum for transparency

## Technical Stack
- **Blockchain Platform**: Ethereum (via Hardhat localhost)
- **Smart Contracts**: Solidity
- **Frontend Framework**: React.js
- **Backend**: Node.js
- **Wallet Integration**: MetaMask

## Security Measures
- Role-based access: only admin can post jobs or verify candidates.
- Input validations in smart contracts.
- Use of modifiers to enforce permissions.
- Tested using Hardhat to simulate transactions and detect bugs.

## Implementation Plan
1. Define smart contract logic in Solidity.
2. Deploy using Hardhat on local Ethereum network.
3. Integrate React frontend with smart contracts via Ethers.js.
4. Test using MetaMask wallet for user interactions.


## Project Deployment
- Smart Contract: `EHiringSystem.sol`
- Network: Localhost via Hardhat
- Wallet: MetaMask

