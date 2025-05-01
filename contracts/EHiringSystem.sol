
// pragma solidity ^0.8.0;

// contract EHiringSystem {
    
//     address public owner;

//     constructor() {
//         owner = msg.sender;
//     }

//     // Candidate structure
//     struct Candidate {
//         string fullName;
//         string email;
//         string education;
//         string experience;
//         bool isVerified;
//         bool isEmployee; // <-- New field to check if candidate became employee
//     }

//     // Job structure
//     struct Job {
//         uint jobId;
//         string title;
//         string description;
//         address postedBy;
//         bool isActive;
//     }

//     // Offer structure
//     struct Offer {
//         uint jobId;
//         address candidateAddress;
//         bool isOffered;
//         bool isAccepted;
//     }

//     mapping(address => Candidate) public candidates;
//     mapping(uint => Job) public jobs;
//     mapping(address => Offer) public offers;

//     uint public nextJobId = 1;

//     event CandidateRegistered(address candidateAddress, string fullName);
//     event CandidateVerified(address candidateAddress);
//     event JobPosted(uint jobId, string title);
//     event JobApplied(uint jobId, address candidateAddress);
//     event OfferMade(uint jobId, address candidateAddress);
//     event OfferAccepted(uint jobId, address candidateAddress);
    
//     modifier onlyOwner() {
//         require(msg.sender == owner, "Only admin can perform this action");
//         _;
//     }

//     modifier onlyVerified() {
//         require(candidates[msg.sender].isVerified, "Only verified candidates can perform this action");
//         _;
//     }

//     // Candidate Registration
//     function registerCandidate(

//         string memory _fullName,

//         string memory _email,

//         string memory _education,

//         string memory _experience

//     ) public {

//         require(bytes(candidates[msg.sender].fullName).length == 0, "Already registered");

//         candidates[msg.sender] = Candidate({

//             fullName: _fullName,

//             email: _email,
            
//             education: _education,
//             experience: _experience,
//             isVerified: false,
//             isEmployee: false

//         });


//         emit CandidateRegistered(msg.sender, _fullName);

//     }

//     // Admin Verifies Candidate
//     function verifyCandidate(address _candidateAddress) public onlyOwner {

//         require(bytes(candidates[_candidateAddress].fullName).length != 0, "Candidate not found");

//         candidates[_candidateAddress].isVerified = true;

//         emit CandidateVerified(_candidateAddress);
//     }

//     // Employer posts a job
//     function postJob(string memory _title, string memory _description) public onlyOwner {

//         jobs[nextJobId] = Job({

//             jobId: nextJobId,
//             title: _title,
//             description: _description,
//             postedBy: msg.sender,
//             isActive: true
//         });

//         emit JobPosted(nextJobId, _title);

//         nextJobId++;
//     }

//     // Candidate applies to a job
//     function applyForJob(uint _jobId) public onlyVerified {

//         require(jobs[_jobId].isActive, "Job not active");
        
//         emit JobApplied(_jobId, msg.sender);
//     }

//     // Admin sends offer to candidate
//     function sendOffer(uint _jobId, address _candidateAddress) public onlyOwner {

//         require(jobs[_jobId].isActive, "Job not active");

//         require(candidates[_candidateAddress].isVerified, "Candidate not verified");

//         offers[_candidateAddress] = Offer({

//             jobId: _jobId,

//             candidateAddress: _candidateAddress,
//             isOffered: true,
//             isAccepted: false
//         });

//         emit OfferMade(_jobId, _candidateAddress);
//     }

//     // Candidate accepts offer
//     function acceptOffer() public onlyVerified {
//         require(offers[msg.sender].isOffered, "No offer made to you");
//         require(!offers[msg.sender].isAccepted, "Offer already accepted");

//         offers[msg.sender].isAccepted = true;
//         candidates[msg.sender].isEmployee = true; // Candidate becomes employee

//         emit OfferAccepted(offers[msg.sender].jobId, msg.sender);
//     }

//     // View candidate details
//     function viewCandidate(address _candidateAddress) public view returns (
//         string memory, 
//         string memory, 
//         string memory, 
//         string memory, 
//         bool, 
//         bool
//     ) {
//         Candidate memory candidate = candidates[_candidateAddress];
//         return (
//             candidate.fullName,
//             candidate.email,
//             candidate.education,
//             candidate.experience,
//             candidate.isVerified,
//             candidate.isEmployee
//         );
//     }
// }



// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EHiringSystem {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Candidate {
        string fullName;
        string email;
        string education;
        string experience;
        bool isVerified;
        bool isEmployee;
    }

    struct Job {
        uint jobId;
        string title;
        string description;
        address postedBy;
        bool isActive;
    }

    struct Offer {
        uint jobId;
        address candidateAddress;
        bool isOffered;
        bool isAccepted;
    }

    mapping(address => Candidate) public candidates;
    mapping(uint => Job) public jobs;
    mapping(address => Offer) public offers;

    address[] public candidateAddresses;
    uint[] public jobIds;
    address[] public offerAddresses;

    uint public nextJobId = 1;

    event CandidateRegistered(address candidateAddress, string fullName);
    event CandidateVerified(address candidateAddress);
    event JobPosted(uint jobId, string title);
    event JobApplied(uint jobId, address candidateAddress);
    event OfferMade(uint jobId, address candidateAddress);
    event OfferAccepted(uint jobId, address candidateAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only admin can perform this action");
        _;
    }

    modifier onlyVerified() {
        require(candidates[msg.sender].isVerified, "Only verified candidates can perform this action");
        _;
    }

    function registerCandidate(
        string memory _fullName,
        string memory _email,
        string memory _education,
        string memory _experience
    ) public {
        require(bytes(candidates[msg.sender].fullName).length == 0, "Already registered");

        candidates[msg.sender] = Candidate({
            fullName: _fullName,
            email: _email,
            education: _education,
            experience: _experience,
            isVerified: false,
            isEmployee: false
        });

        candidateAddresses.push(msg.sender);

        emit CandidateRegistered(msg.sender, _fullName);
    }

    function verifyCandidate(address _candidateAddress) public onlyOwner {
        require(bytes(candidates[_candidateAddress].fullName).length != 0, "Candidate not found");

        candidates[_candidateAddress].isVerified = true;

        emit CandidateVerified(_candidateAddress);
    }

    function postJob(string memory _title, string memory _description) public onlyOwner {
        jobs[nextJobId] = Job({
            jobId: nextJobId,
            title: _title,
            description: _description,
            postedBy: msg.sender,
            isActive: true
        });

        jobIds.push(nextJobId);

        emit JobPosted(nextJobId, _title);

        nextJobId++;
    }

    function applyForJob(uint _jobId) public onlyVerified {
        require(jobs[_jobId].isActive, "Job not active");

        emit JobApplied(_jobId, msg.sender);
    }

    function sendOffer(uint _jobId, address _candidateAddress) public onlyOwner {
        require(jobs[_jobId].isActive, "Job not active");
        require(candidates[_candidateAddress].isVerified, "Candidate not verified");

        offers[_candidateAddress] = Offer({
            jobId: _jobId,
            candidateAddress: _candidateAddress,
            isOffered: true,
            isAccepted: false
        });

        offerAddresses.push(_candidateAddress);

        emit OfferMade(_jobId, _candidateAddress);
    }

    function acceptOffer() public onlyVerified {
        require(offers[msg.sender].isOffered, "No offer made to you");
        require(!offers[msg.sender].isAccepted, "Offer already accepted");

        offers[msg.sender].isAccepted = true;
        candidates[msg.sender].isEmployee = true;

        emit OfferAccepted(offers[msg.sender].jobId, msg.sender);
    }

    function viewCandidate(address _candidateAddress) public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        bool,
        bool
    ) {
        Candidate memory c = candidates[_candidateAddress];
        return (
            c.fullName,
            c.email,
            c.education,
            c.experience,
            c.isVerified,
            c.isEmployee
        );
    }

    function getAllCandidates() public view returns (address[] memory) {
        return candidateAddresses;
    }

    function getAllJobs() public view returns (uint[] memory) {
        return jobIds;
    }

    function getAllOffers() public view returns (address[] memory) {
        return offerAddresses;
    }

    function getVerifiedCandidates() public view returns (address[] memory) {
        uint count = 0;
        for (uint i = 0; i < candidateAddresses.length; i++) {
            if (candidates[candidateAddresses[i]].isVerified) {
                count++;
            }
        }

        address[] memory verified = new address[](count);
        uint index = 0;
        for (uint i = 0; i < candidateAddresses.length; i++) {
            if (candidates[candidateAddresses[i]].isVerified) {
                verified[index++] = candidateAddresses[i];
            }
        }

        return verified;
    }
}
