// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Web3Provider } from "./context/Web3Context";

// // Main Dashboard
// import Dashboard from "./pages/Dashboard";

// // Pages for each functionality
// import RegisterCandidatePage from "./pages/RegisterCandidatePage";
// import PostJobPage from "./pages/PostJobPage";
// import VerifyCandidatePage from "./pages/VerifyCandidatePage";
// import SendOfferPage from "./pages/SendOfferPage";
// import AcceptOfferPage from "./pages/AcceptOfferPage";
// import ViewCandidatesPage from "./pages/ViewCandidatesPage";
// import ViewJobsPage from "./pages/ViewJobsPage";
// import ViewOffersPage from "./pages/ViewOffersPage";
// import ViewVerifiedApplicantsPage from "./pages/ViewVerifiedApplicantsPage";
// import ViewAcceptedOffersPage from "./pages/ViewAcceptedOffersPage"; // ✅ Newly added

// function AppRoutes() {
//     return (
//         <Routes>
//             {/* Main Dashboard Route */}
//             <Route path="/" element={<Dashboard />} />

//             {/* Pages for each functionality */}
//             <Route path="/register" element={<RegisterCandidatePage />} />
//             <Route path="/post-job" element={<PostJobPage />} />
//             <Route path="/verify" element={<VerifyCandidatePage />} />
//             <Route path="/send-offer" element={<SendOfferPage />} />
//             <Route path="/accept-offer" element={<AcceptOfferPage />} />
//             <Route path="/view-candidates" element={<ViewCandidatesPage />} />
//             <Route path="/view-jobs" element={<ViewJobsPage />} />
//             <Route path="/view-offers" element={<ViewOffersPage />} />
//             <Route path="/view-verified" element={<ViewVerifiedApplicantsPage />} />
//             <Route path="/view-accepted-offers" element={<ViewAcceptedOffersPage />} /> {/* ✅ New route */}
//         </Routes>
//     );
// }

// function App() {
//     return (
//         <Web3Provider>
//             <Router>
//                 <AppRoutes />
//             </Router>
//         </Web3Provider>
//     );
// }

// export default App;



// working one

// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Web3Provider } from "./context/Web3Context";
// import Dashboard from "./pages/Dashboard";
// // Import your pages here
// import RegisterCandidatePage from "./pages/RegisterCandidatePage";
// import PostJobPage from "./pages/PostJobPage";
// import VerifyCandidatePage from "./pages/VerifyCandidatePage";
// import SendOfferPage from "./pages/SendOfferPage";
// import AcceptOfferPage from "./pages/AcceptOfferPage";
// import ViewCandidatesPage from "./pages/ViewCandidatesPage";
// import ViewJobsPage from "./pages/ViewJobsPage";
// import ViewOffersPage from "./pages/ViewOffersPage";
// import ViewVerifiedApplicantsPage from "./pages/ViewVerifiedApplicantsPage";

// function AppRoutes() {
//     return (
//         <Routes>
//             {/* Main Dashboard Route */}
//             <Route path="/" element={<Dashboard />} />

//             {/* Pages for each functionality */}
//             <Route path="/register" element={<RegisterCandidatePage />} />
//             <Route path="/post-job" element={<PostJobPage />} />
//             <Route path="/verify" element={<VerifyCandidatePage />} />
//             <Route path="/send-offer" element={<SendOfferPage />} />
//             <Route path="/accept-offer" element={<AcceptOfferPage />} />
//             <Route path="/view-candidates" element={<ViewCandidatesPage />} />
//             <Route path="/view-jobs" element={<ViewJobsPage />} />
//             <Route path="/view-offers" element={<ViewOffersPage />} />
//             <Route path="/view-verified" element={<ViewVerifiedApplicantsPage />} />
//         </Routes>
//     );
// }

// function App() {
//     return (
//         <Web3Provider>
//             <Router>
//                 <AppRoutes />
//             </Router>
//         </Web3Provider>
//     );
// }

// export default App;





import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Web3Provider } from "./context/Web3Context";

// Pages
import Dashboard from "./pages/Dashboard";
import RegisterCandidatePage from "./pages/RegisterCandidatePage";
import PostJobPage from "./pages/PostJobPage";
import VerifyCandidatePage from "./pages/VerifyCandidatePage";
import SendOfferPage from "./pages/SendOfferPage";
import AcceptOfferPage from "./pages/AcceptOfferPage";
import ViewCandidatesPage from "./pages/ViewCandidatesPage";
import ViewJobsPage from "./pages/ViewJobsPage";
import ViewOffersPage from "./pages/ViewOffersPage";
import ViewVerifiedApplicantsPage from "./pages/ViewVerifiedApplicantsPage";
import ViewAcceptedOffersPage from "./pages/ViewAcceptedOffersPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<RegisterCandidatePage />} />
            <Route path="/post-job" element={<PostJobPage />} />
            <Route path="/verify" element={<VerifyCandidatePage />} />
            <Route path="/send-offer" element={<SendOfferPage />} />
            <Route path="/accept-offer" element={<AcceptOfferPage />} />
            <Route path="/view-candidates" element={<ViewCandidatesPage />} />
            <Route path="/view-jobs" element={<ViewJobsPage />} />
            <Route path="/view-offers" element={<ViewOffersPage />} />
            <Route path="/view-verified" element={<ViewVerifiedApplicantsPage />} />
            <Route path="/view-accepted-offers" element={<ViewAcceptedOffersPage />} />
        </Routes>
    );
}

function App() {
    return (
        <Web3Provider>
            <Router>
                <AppRoutes />
            </Router>
        </Web3Provider>
    );
}

export default App;
