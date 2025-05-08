// components/OffersAccepted.js
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import contractFile from "../utils/EHiringSystem.json";

const contractABI = contractFile.abi;
const contractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

const OffersAccepted = () => {
  const [acceptedOffers, setAcceptedOffers] = useState([]);

  useEffect(() => {
    const loadAcceptedOffers = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const offerAddresses = await contract.methods.getAllOffers().call();

        const accepted = await Promise.all(
          offerAddresses.map(async (address) => {
            const offer = await contract.methods.offers(address).call();
            if (offer.isAccepted) {
              const candidate = await contract.methods.viewCandidate(address).call();
              return {
                candidateAddress: address,
                fullName: candidate[0],
                jobId: offer.jobId,
              };
            } else {
              return null;
            }
          })
        );

        setAcceptedOffers(accepted.filter(o => o !== null));
      }
    };

    loadAcceptedOffers();
  }, []);

  return (
    <div>
      <h2>Accepted Offers</h2>
      <ul>
        {acceptedOffers.map((offer, index) => (
          <li key={index}>
            <strong>{offer.fullName}</strong> ({offer.candidateAddress})<br />
            Job ID: {offer.jobId}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OffersAccepted;
