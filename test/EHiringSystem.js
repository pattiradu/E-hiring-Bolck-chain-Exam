const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EHiringSystem", function () {
  let EHiringSystem, eHiringSystem;
  let owner, candidate1, candidate2;

  beforeEach(async function () {
    [owner, candidate1, candidate2] = await ethers.getSigners();

    EHiringSystem = await ethers.getContractFactory("EHiringSystem");
    eHiringSystem = await EHiringSystem.deploy();
  });

  it("Should set the correct owner", async function () {
    expect(await eHiringSystem.owner()).to.equal(owner.address);
  });

  it("Should allow a candidate to register", async function () {
    await eHiringSystem.connect(candidate1).registerCandidate(
      "John Doe",
      "john@example.com",
      "Bachelor's Degree",
      "3 years experience"
    );

    const candidate = await eHiringSystem.candidates(candidate1.address);
    expect(candidate.fullName).to.equal("John Doe");
    expect(candidate.isVerified).to.equal(false);
  });

  it("Should allow the owner to verify a candidate", async function () {
    await eHiringSystem.connect(candidate1).registerCandidate(
      "Jane Smith",
      "jane@example.com",
      "Master's Degree",
      "5 years experience"
    );

    await eHiringSystem.verifyCandidate(candidate1.address);

    const candidate = await eHiringSystem.candidates(candidate1.address);
    expect(candidate.isVerified).to.equal(true);
  });

  it("Should allow the owner to post a job", async function () {
    await eHiringSystem.postJob(
      "Blockchain Developer",
      "Develop smart contracts and dApps"
    );

    const job = await eHiringSystem.jobs(1);
    expect(job.title).to.equal("Blockchain Developer");
    expect(job.isActive).to.equal(true);
  });

  it("Should allow a verified candidate to apply for a job", async function () {
    await eHiringSystem.postJob(
      "Frontend Developer",
      "Build user interfaces"
    );

    await eHiringSystem.connect(candidate1).registerCandidate(
      "Alice Johnson",
      "alice@example.com",
      "Bachelor's Degree",
      "2 years experience"
    );

    await eHiringSystem.verifyCandidate(candidate1.address);

    await expect(
      eHiringSystem.connect(candidate1).applyForJob(1)
    ).to.emit(eHiringSystem, "JobApplied").withArgs(1, candidate1.address);
  });

  it("Should allow the owner to send an offer", async function () {
    await eHiringSystem.postJob(
      "Backend Developer",
      "Work on server-side logic"
    );

    await eHiringSystem.connect(candidate1).registerCandidate(
      "Bob Williams",
      "bob@example.com",
      "Master's Degree",
      "6 years experience"
    );

    await eHiringSystem.verifyCandidate(candidate1.address);

    await eHiringSystem.sendOffer(1, candidate1.address);

    const offer = await eHiringSystem.offers(candidate1.address);
    expect(offer.isOffered).to.equal(true);
    expect(offer.isAccepted).to.equal(false);
  });

  it("Should allow a candidate to accept an offer", async function () {
    await eHiringSystem.postJob(
      "Full Stack Developer",
      "End-to-end development"
    );

    await eHiringSystem.connect(candidate1).registerCandidate(
      "Charlie Brown",
      "charlie@example.com",
      "Bachelor's Degree",
      "4 years experience"
    );

    await eHiringSystem.verifyCandidate(candidate1.address);

    await eHiringSystem.sendOffer(1, candidate1.address);

    await eHiringSystem.connect(candidate1).acceptOffer();

    const offer = await eHiringSystem.offers(candidate1.address);
    expect(offer.isAccepted).to.equal(true);

    const candidate = await eHiringSystem.candidates(candidate1.address);
    expect(candidate.isEmployee).to.equal(true);
  });

  it("Should return candidate details correctly", async function () {
    await eHiringSystem.connect(candidate1).registerCandidate(
      "Diana Prince",
      "diana@example.com",
      "PhD",
      "10 years experience"
    );

    const candidateDetails = await eHiringSystem.viewCandidate(candidate1.address);

    expect(candidateDetails[0]).to.equal("Diana Prince"); // fullName
    expect(candidateDetails[1]).to.equal("diana@example.com"); // email
    expect(candidateDetails[2]).to.equal("PhD"); // education
    expect(candidateDetails[3]).to.equal("10 years experience"); // experience
    expect(candidateDetails[4]).to.equal(false); // isVerified
    expect(candidateDetails[5]).to.equal(false); // isEmployee
  });
});
