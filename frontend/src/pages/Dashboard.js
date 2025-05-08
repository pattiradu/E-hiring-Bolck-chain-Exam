import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import ConnectWallet from "../components/ConnectWallet";
import { Button, Card } from "react-bootstrap";
import "../styles/Dashboard.css";

// Icons
import {
  FaUserPlus,
  FaBriefcase,
  FaCheckCircle,
  FaEnvelope,
  FaHandshake,
  FaEye,
  FaListAlt,
  FaClipboardCheck,
  FaBars,
  FaTimes
} from "react-icons/fa";

// Pages
import RegisterCandidatePage from "./RegisterCandidatePage";
import PostJobPage from "./PostJobPage";
import VerifyCandidatePage from "./VerifyCandidatePage";
import SendOfferPage from "./SendOfferPage";
import AcceptOfferPage from "./AcceptOfferPage";
import ViewCandidatesPage from "./ViewCandidatesPage";
import ViewJobsPage from "./ViewJobsPage";
import ViewOffersPage from "./ViewOffersPage";
import ViewVerifiedApplicantsPage from "./ViewVerifiedApplicantsPage";

function Dashboard() {
  const { isConnected } = useWeb3();
  const [currentPage, setCurrentPage] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handlePageRender = (page) => setCurrentPage(page);
  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  const defaultContent = (
    <Card className="shadow welcome-card">
      <Card.Body>
        <h2 className="text-center mb-4"> Welcome to the E-Hiring DApp System</h2>
        <p className="lead text-center">
          Streamlining decentralized recruitment through the power of blockchain.
        </p>
        <hr />
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <FaUserPlus size={30} className="mb-2 text-primary" />
            <h5>Register Candidates</h5>
            <p>Seamlessly onboard new applicants.</p>
          </div>
          <div className="col-md-4 mb-3">
            <FaBriefcase size={30} className="mb-2 text-success" />
            <h5>Post Jobs</h5>
            <p>Create and manage job openings easily.</p>
          </div>
          <div className="col-md-4 mb-3">
            <FaCheckCircle size={30} className="mb-2 text-info" />
            <h5>Verify Credentials</h5>
            <p>Ensure transparency and trust.</p>
          </div>
          <div className="col-md-4 mb-3">
            <FaEnvelope size={30} className="mb-2 text-warning" />
            <h5>Send Offers</h5>
            <p>Deliver job offers directly to candidates.</p>
          </div>
          <div className="col-md-4 mb-3">
            <FaClipboardCheck size={30} className="mb-2 text-danger" />
            <h5>View Verified Applicants</h5>
            <p>Access verified talent instantly.</p>
          </div>
          <div className="col-md-4 mb-3">
            <FaListAlt size={30} className="mb-2 text-secondary" />
            <h5>Track Job Listings</h5>
            <p>Stay on top of all open positions.</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div className="container-fluid dashboard-bg">
      <div className="row">
        {/* Sidebar */}
        {sidebarVisible && (
          <div className="col-md-3 sidebar-custom">
            <h2 className="mb-4 text-center">E-Hiring DApp</h2>
            {!isConnected ? (
              <div className="text-center">
                <ConnectWallet />
              </div>
            ) : (
              <div className="list-group">
                <Button className="custom-btn mb-2" onClick={() => handlePageRender(<RegisterCandidatePage />)}>
                  <FaUserPlus /> Register Candidate
                </Button>
                <Button className="custom-btn mb-2" onClick={() => handlePageRender(<PostJobPage />)}>
                  <FaBriefcase /> Post Job
                </Button>
                <Button className="custom-btn mb-2" onClick={() => handlePageRender(<VerifyCandidatePage />)}>
                  <FaCheckCircle /> Verify Candidate
                </Button>
                <Button className="custom-btn mb-2" onClick={() => handlePageRender(<SendOfferPage />)}>
                  <FaEnvelope /> Send Offer
                </Button>
                <Button className="custom-btn mb-2" onClick={() => handlePageRender(<AcceptOfferPage />)}>
                  <FaHandshake /> Accept Offer
                </Button>
                <Button className="custom-btn mb-2" onClick={() => handlePageRender(<ViewCandidatesPage />)}>
                  <FaEye /> View Candidates
                </Button>
                <Button className="custom-btn mb-2" onClick={() => handlePageRender(<ViewJobsPage />)}>
                  <FaListAlt /> View Jobs
                </Button>
                <Button className="custom-btn mb-2" onClick={() => handlePageRender(<ViewOffersPage />)}>
                  <FaEnvelope /> View Offers
                </Button>
                <Button className="custom-btn mb-2" onClick={() => handlePageRender(<ViewVerifiedApplicantsPage />)}>
                  <FaClipboardCheck /> Verified Applicants
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className={`${sidebarVisible ? "col-md-9" : "col-md-12"} p-4 main-content-area`}>
          <div className="navbar-custom mb-4 d-flex align-items-center">
            <Button variant="outline-secondary" onClick={toggleSidebar} className="me-3">
              {sidebarVisible ? <FaTimes className="me-2" /> : <FaBars className="me-2" />}
            </Button>
            <h1 className="mb-0">E-Hiring DApp Dashboard</h1>
          </div>

          <div>{currentPage || defaultContent}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;







// // import { Button, Card } from 'react-bootstrap';
// import React, { useState } from "react";
// import { useWeb3 } from "../context/Web3Context";
// import ConnectWallet from "../components/ConnectWallet";
// import { Button, Card, Collapse } from "react-bootstrap";
// import RegisterCandidatePage from "../pages/RegisterCandidatePage";
// import PostJobPage from "../pages/PostJobPage";
// import VerifyCandidatePage from "../pages/VerifyCandidatePage";
// import SendOfferPage from "../pages/SendOfferPage";
// import AcceptOfferPage from "../pages/AcceptOfferPage";
// import ViewCandidatesPage from "../pages/ViewCandidatesPage";
// import ViewJobsPage from "../pages/ViewJobsPage";
// import ViewOffersPage from "../pages/ViewOffersPage";
// import ViewVerifiedApplicantsPage from "../pages/ViewVerifiedApplicantsPage";

// function Dashboard() {
//     const { isConnected } = useWeb3();
//     const [open, setOpen] = useState({
//         candidates: false,
//         jobs: false,
//         offers: false,
//         verified: false,
//     });
//     const [currentPage, setCurrentPage] = useState(null);

//     const handleToggle = (section) => {
//         setOpen((prevState) => ({
//             ...prevState,
//             [section]: !prevState[section],
//         }));
//     };

//     const handlePageRender = (page) => {
//         setCurrentPage(page);
//     };

//     const defaultContent = (
//         <div>
//             <h3>Welcome to the E-Hiring DApp System</h3>
//             <p>
//                 This decentralized application is designed to streamline the hiring process using blockchain technology. 
//                 It enables companies and organizations to:
//             </p>
//             <ul>
//                 <li>Register and manage job candidates securely.</li>
//                 <li>Post available jobs and track applicants.</li>
//                 <li>Verify candidate credentials on-chain.</li>
//                 <li>Send and manage job offers through smart contracts.</li>
//                 <li>View all hiring-related data in a transparent and tamper-proof way.</li>
//             </ul>
//             <p>
//                 Use the sidebar to access different functionalities such as candidate registration, job posting, 
//                 verification, and offer management.
//             </p>
//         </div>
//     );

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 {/* Sidebar */}
//                 <div className="col-md-3 p-4 bg-light">
//                     <h2 className="mb-4 text-center">E-Hiring DApp</h2>
//                     <div>
//                         {!isConnected ? (
//                             <div className="text-center">
//                                 <ConnectWallet />
//                             </div>
//                         ) : (
//                             <div className="list-group">
//                                 <Button
//                                     className="list-group-item list-group-item-action"
//                                     onClick={() => handlePageRender(<RegisterCandidatePage />)}
//                                 >
//                                     Register Candidate
//                                 </Button>
//                                 <Button
//                                     className="list-group-item list-group-item-action"
//                                     onClick={() => handlePageRender(<PostJobPage />)}
//                                 >
//                                     Post Job
//                                 </Button>
//                                 <Button
//                                     className="list-group-item list-group-item-action"
//                                     onClick={() => handlePageRender(<VerifyCandidatePage />)}
//                                 >
//                                     Verify Candidate
//                                 </Button>
//                                 <Button
//                                     className="list-group-item list-group-item-action"
//                                     onClick={() => handlePageRender(<SendOfferPage />)}
//                                 >
//                                     Send Offer
//                                 </Button>
//                                 <Button
//                                     className="list-group-item list-group-item-action"
//                                     onClick={() => handlePageRender(<AcceptOfferPage />)}
//                                 >
//                                     Accept Offer
//                                 </Button>
//                                 <Button
//                                     className="list-group-item list-group-item-action"
//                                     onClick={() => handlePageRender(<ViewCandidatesPage />)}
//                                 >
//                                     View Registered Candidates
//                                 </Button>
//                                 <Button
//                                     className="list-group-item list-group-item-action"
//                                     onClick={() => handlePageRender(<ViewJobsPage />)}
//                                 >
//                                     View Jobs
//                                 </Button>
//                                 <Button
//                                     className="list-group-item list-group-item-action"
//                                     onClick={() => handlePageRender(<ViewOffersPage />)}
//                                 >
//                                     View Offers
//                                 </Button>
//                                 <Button
//                                     className="list-group-item list-group-item-action"
//                                     onClick={() => handlePageRender(<ViewVerifiedApplicantsPage />)}
//                                 >
//                                     View Verified Applicants
//                                 </Button>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="col-md-9 p-4">
//                     <h1 className="mb-4">E-Hiring DApp Dashboard</h1>

//                     {/* Optional collapsible section if needed */}
//                     {/* Remove or customize as needed */}
//                     <Card className="mb-3">
//                         <Card.Header>
//                             <Button
//                                 variant="link"
//                                 onClick={() => handleToggle("candidates")}
//                                 aria-expanded={open.candidates}
//                                 aria-controls="candidates-section"
//                             >
//                                 {open.candidates ? "Hide" : "View"} Registered Candidates (Quick Access)
//                             </Button>
//                         </Card.Header>
//                         <Collapse in={open.candidates}>
//                             <div id="candidates-section">
//                                 <Card.Body>
//                                     <Button
//                                         variant="outline-primary"
//                                         className="w-100 mb-2"
//                                         onClick={() => handlePageRender(<RegisterCandidatePage />)}
//                                     >
//                                         Register Candidate
//                                     </Button>
//                                 </Card.Body>
//                             </div>
//                         </Collapse>
//                     </Card>

//                     {/* Content Display */}
//                     <div className="mt-4">
//                         {currentPage ? currentPage : defaultContent}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;















// import React, { useState } from "react";
// import { useWeb3 } from "../context/Web3Context";
// import ConnectWallet from "../components/ConnectWallet";
// import { Button, Card, Collapse } from "react-bootstrap";
// import "../styles/Dashboard.css";

// // Icons
// import {
//   FaUserPlus,
//   FaBriefcase,
//   FaCheckCircle,
//   FaEnvelope,
//   FaHandshake,
//   FaEye,
//   FaListAlt,
//   FaClipboardCheck,
//   FaBars,
//   FaTimes
// } from "react-icons/fa";

// // Pages
// import RegisterCandidatePage from "./RegisterCandidatePage";
// import PostJobPage from "./PostJobPage";
// import VerifyCandidatePage from "./VerifyCandidatePage";
// import SendOfferPage from "./SendOfferPage";
// import AcceptOfferPage from "./AcceptOfferPage";
// import ViewCandidatesPage from "./ViewCandidatesPage";
// import ViewJobsPage from "./ViewJobsPage";
// import ViewOffersPage from "./ViewOffersPage";
// import ViewVerifiedApplicantsPage from "./ViewVerifiedApplicantsPage";

// function Dashboard() {
//   const { isConnected } = useWeb3();
//   const [open, setOpen] = useState({ candidates: false });
//   const [currentPage, setCurrentPage] = useState(null);
//   const [sidebarVisible, setSidebarVisible] = useState(true);

//   const handleToggle = (section) => {
//     setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   const handlePageRender = (page) => setCurrentPage(page);
//   const toggleSidebar = () => setSidebarVisible((prev) => !prev);

//   const defaultContent = (
//     <div>
//       <h3>Welcome to the E-Hiring DApp System</h3>
//       <p>This decentralized app streamlines hiring with blockchain.</p>
//       <ul>
//         <li>Register candidates</li>
//         <li>Post jobs</li>
//         <li>Verify credentials</li>
//         <li>Manage offers</li>
//         <li>Transparent data access</li>
//       </ul>
//     </div>
//   );

//   return (
//     <div className="container-fluid dashboard-bg">
//       <div className="row">
//         {/* Sidebar */}
//         {sidebarVisible && (
//           <div className="col-md-3 sidebar-custom">
//             <h2 className="mb-4 text-center">E-Hiring DApp</h2>
//             {!isConnected ? (
//               <div className="text-center">
//                 <ConnectWallet />
//               </div>
//             ) : (
//               <div className="list-group">
//                 <Button className="custom-btn mb-2" onClick={() => handlePageRender(<RegisterCandidatePage />)}>
//                   <FaUserPlus /> Register Candidate
//                 </Button>
//                 <Button className="custom-btn mb-2" onClick={() => handlePageRender(<PostJobPage />)}>
//                   <FaBriefcase /> Post Job
//                 </Button>
//                 <Button className="custom-btn mb-2" onClick={() => handlePageRender(<VerifyCandidatePage />)}>
//                   <FaCheckCircle /> Verify Candidate
//                 </Button>
//                 <Button className="custom-btn mb-2" onClick={() => handlePageRender(<SendOfferPage />)}>
//                   <FaEnvelope /> Send Offer
//                 </Button>
//                 <Button className="custom-btn mb-2" onClick={() => handlePageRender(<AcceptOfferPage />)}>
//                   <FaHandshake /> Accept Offer
//                 </Button>
//                 <Button className="custom-btn mb-2" onClick={() => handlePageRender(<ViewCandidatesPage />)}>
//                   <FaEye /> View Candidates
//                 </Button>
//                 <Button className="custom-btn mb-2" onClick={() => handlePageRender(<ViewJobsPage />)}>
//                   <FaListAlt /> View Jobs
//                 </Button>
//                 <Button className="custom-btn mb-2" onClick={() => handlePageRender(<ViewOffersPage />)}>
//                   <FaEnvelope /> View Offers
//                 </Button>
//                 <Button className="custom-btn mb-2" onClick={() => handlePageRender(<ViewVerifiedApplicantsPage />)}>
//                   <FaClipboardCheck /> Verified Applicants
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Main Content */}
//         <div className={`${sidebarVisible ? "col-md-9" : "col-md-12"} p-4 main-content-area`}>
//           <div className="navbar-custom mb-4 d-flex align-items-center">
//             <Button variant="outline-secondary" onClick={toggleSidebar} className="me-3">
//               {sidebarVisible ? <FaTimes className="me-2" /> : <FaBars className="me-2" />}
//             </Button>
//             <h1 className="mb-0">E-Hiring DApp Dashboard</h1>
//           </div>

//           <Card className="mb-3 shadow-sm">
//             <Card.Header>
//               <Button
//                 variant="outline-primary"
//                 onClick={() => handleToggle("candidates")}
//                 aria-expanded={open.candidates}
//                 aria-controls="candidates-section"
//               >
//                 {open.candidates ? "Hide" : "View"} Registered Candidates
//               </Button>
//             </Card.Header>
//             <Collapse in={open.candidates}>
//               <div id="candidates-section">
//                 <Card.Body>
//                   <Button
//                     variant="primary"
//                     className="w-100"
//                     onClick={() => handlePageRender(<RegisterCandidatePage />)}
//                   >
//                     <FaUserPlus className="me-2" />
//                     Register Candidate
//                   </Button>
//                 </Card.Body>
//               </div>
//             </Collapse>
//           </Card>

//           <div>{currentPage || defaultContent}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
