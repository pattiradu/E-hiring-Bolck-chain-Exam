import React from 'react';
import { ethers } from "ethers";
import contractABI from "./EHiringSystem.json";
import { useWeb3 } from "../context/Web3Context";

const contractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

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