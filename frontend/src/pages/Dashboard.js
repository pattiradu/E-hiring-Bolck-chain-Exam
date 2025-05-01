
// import { Button, Card } from 'react-bootstrap';
import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import ConnectWallet from "../components/ConnectWallet";
import { Button, Card, Collapse } from "react-bootstrap";
import RegisterCandidatePage from "../pages/RegisterCandidatePage";
import PostJobPage from "../pages/PostJobPage";
import VerifyCandidatePage from "../pages/VerifyCandidatePage";
import SendOfferPage from "../pages/SendOfferPage";
import AcceptOfferPage from "../pages/AcceptOfferPage";
import ViewCandidatesPage from "../pages/ViewCandidatesPage";
import ViewJobsPage from "../pages/ViewJobsPage";
import ViewOffersPage from "../pages/ViewOffersPage";
import ViewVerifiedApplicantsPage from "../pages/ViewVerifiedApplicantsPage";

function Dashboard() {
    const { isConnected } = useWeb3();
    const [open, setOpen] = useState({
        candidates: false,
        jobs: false,
        offers: false,
        verified: false,
    });
    const [currentPage, setCurrentPage] = useState(null);

    const handleToggle = (section) => {
        setOpen((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const handlePageRender = (page) => {
        setCurrentPage(page);
    };

    const defaultContent = (
        <div>
            <h3>Welcome to the E-Hiring DApp System</h3>
            <p>
                This decentralized application is designed to streamline the hiring process using blockchain technology. 
                It enables companies and organizations to:
            </p>
            <ul>
                <li>Register and manage job candidates securely.</li>
                <li>Post available jobs and track applicants.</li>
                <li>Verify candidate credentials on-chain.</li>
                <li>Send and manage job offers through smart contracts.</li>
                <li>View all hiring-related data in a transparent and tamper-proof way.</li>
            </ul>
            <p>
                Use the sidebar to access different functionalities such as candidate registration, job posting, 
                verification, and offer management.
            </p>
        </div>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 p-4 bg-light">
                    <h2 className="mb-4 text-center">E-Hiring DApp</h2>
                    <div>
                        {!isConnected ? (
                            <div className="text-center">
                                <ConnectWallet />
                            </div>
                        ) : (
                            <div className="list-group">
                                <Button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handlePageRender(<RegisterCandidatePage />)}
                                >
                                    Register Candidate
                                </Button>
                                <Button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handlePageRender(<PostJobPage />)}
                                >
                                    Post Job
                                </Button>
                                <Button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handlePageRender(<VerifyCandidatePage />)}
                                >
                                    Verify Candidate
                                </Button>
                                <Button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handlePageRender(<SendOfferPage />)}
                                >
                                    Send Offer
                                </Button>
                                <Button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handlePageRender(<AcceptOfferPage />)}
                                >
                                    Accept Offer
                                </Button>
                                <Button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handlePageRender(<ViewCandidatesPage />)}
                                >
                                    View Registered Candidates
                                </Button>
                                <Button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handlePageRender(<ViewJobsPage />)}
                                >
                                    View Jobs
                                </Button>
                                <Button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handlePageRender(<ViewOffersPage />)}
                                >
                                    View Offers
                                </Button>
                                <Button
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handlePageRender(<ViewVerifiedApplicantsPage />)}
                                >
                                    View Verified Applicants
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="col-md-9 p-4">
                    <h1 className="mb-4">E-Hiring DApp Dashboard</h1>

                    {/* Optional collapsible section if needed */}
                    {/* Remove or customize as needed */}
                    <Card className="mb-3">
                        <Card.Header>
                            <Button
                                variant="link"
                                onClick={() => handleToggle("candidates")}
                                aria-expanded={open.candidates}
                                aria-controls="candidates-section"
                            >
                                {open.candidates ? "Hide" : "View"} Registered Candidates (Quick Access)
                            </Button>
                        </Card.Header>
                        <Collapse in={open.candidates}>
                            <div id="candidates-section">
                                <Card.Body>
                                    <Button
                                        variant="outline-primary"
                                        className="w-100 mb-2"
                                        onClick={() => handlePageRender(<RegisterCandidatePage />)}
                                    >
                                        Register Candidate
                                    </Button>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>

                    {/* Content Display */}
                    <div className="mt-4">
                        {currentPage ? currentPage : defaultContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;







// import React from "react";
// import { Link } from "react-router-dom";
// import { useWeb3 } from "../context/Web3Context";
// import ConnectWallet from "../components/ConnectWallet";

// function Dashboard() {
//     const { isConnected } = useWeb3();

//     return (
//         <div className="container py-4">
//             <h1 className="mb-4 text-center">E-Hiring DApp Dashboard</h1>

//             {!isConnected ? (
//                 <div className="text-center">
//                     <ConnectWallet />
//                 </div>
//             ) : (
//                 <div className="list-group">
//                     <Link to="/register" className="list-group-item">
//                         Register Candidate
//                     </Link>
//                     <Link to="/post-job" className="list-group-item">
//                         Post Job
//                     </Link>
//                     <Link to="/verify" className="list-group-item">
//                         Verify Candidate
//                     </Link>
//                     <Link to="/send-offer" className="list-group-item">
//                         Send Offer
//                     </Link>
//                     <Link to="/accept-offer" className="list-group-item">
//                         Accept Offer
//                     </Link>
//                     <Link to="/view-candidates" className="list-group-item">
//                         View Registered Candidates
//                     </Link>
//                     <Link to="/view-jobs" className="list-group-item">
//                         View Jobs
//                     </Link>
//                     <Link to="/view-offers" className="list-group-item">
//                         View Offers
//                     </Link>
//                     <Link to="/view-verified" className="list-group-item">
//                         View Verified Applicants
//                     </Link>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Dashboard;
