import React from 'react';
import { ethers } from "ethers";
import contractABI from "./EHiringSystem.json";
import { useWeb3 } from "../context/Web3Context";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export function useContract() {
    const { provider, isConnected } = useWeb3();

    const getContract = async() => {
        if (!isConnected || !provider) {
            throw new Error("Please connect to MetaMask first");
        }

        try {
            const signer = await provider.getSigner();
            return new ethers.Contract(contractAddress, contractABI.abi, signer);
        } catch (error) {
            console.error("Error initializing contract:", error);
            throw error;
        }
    };

    return { getContract };
}