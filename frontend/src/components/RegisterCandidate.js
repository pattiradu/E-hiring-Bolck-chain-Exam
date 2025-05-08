import React, { useState } from "react";
import { useContract } from "../utils/contract";

const RegisterCandidate = () => {
    const { getContract } = useContract();
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        education: "",
        experience: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const saveToSession = (candidate) => {
        const existing = JSON.parse(sessionStorage.getItem("candidates")) || [];
        existing.push(candidate);
        sessionStorage.setItem("candidates", JSON.stringify(existing));
    };

    const register = async () => {
        const { fullName, email, education, experience } = form;

        if (!fullName || !email || !education || !experience) {
            alert("Please fill out all fields.");
            return;
        }

        setLoading(true);

        try {
            const contract = await getContract();
            const tx = await contract.registerCandidate(fullName, email, education, experience);
            await tx.wait();

            const localCandidate = {
                name: fullName,
                email,
                education,
                experience
            };
            saveToSession(localCandidate);

            alert("✅ Candidate registered successfully.");
            setForm({ fullName: "", email: "", education: "", experience: "" });
        } catch (err) {
            console.error(err);
            alert("❌ Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shadow-sm p-4 mb-4">
            <h4 className="card-title text-primary mb-3">Register Candidate</h4>

            <input
                type="text"
                className="form-control mb-3"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
            />
            <input
                type="email"
                className="form-control mb-3"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />
            <input
                type="text"
                className="form-control mb-3"
                name="education"
                placeholder="Education"
                value={form.education}
                onChange={handleChange}
            />
            <input
                type="text"
                className="form-control mb-3"
                name="experience"
                placeholder="Experience"
                value={form.experience}
                onChange={handleChange}
            />

            <button className="btn btn-success w-100" onClick={register} disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>
        </div>
    );
};

export default RegisterCandidate;







// import React, { useState } from "react";
// import { useContract } from "../utils/contract";

// const RegisterCandidate = () => {
//     const { getContract } = useContract();
//     const [form, setForm] = useState({
//         fullName: "",
//         email: "",
//         education: "",
//         experience: ""
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const saveToSession = (candidate) => {
//         const existing = JSON.parse(sessionStorage.getItem("candidates")) || [];
//         existing.push(candidate);
//         sessionStorage.setItem("candidates", JSON.stringify(existing));
//     };

//     const register = async () => {
//         const { fullName, email, education, experience } = form;

//         if (!fullName || !email || !education || !experience) {
//             alert("Please fill out all fields.");
//             return;
//         }

//         try {
//             const contract = await getContract();
//             const tx = await contract.registerCandidate(fullName, email, education, experience);
//             await tx.wait();

//             // Save locally for session persistence
//             const localCandidate = {
//                 name: fullName,
//                 email,
//                 education,
//                 experience
//             };
//             saveToSession(localCandidate);

//             alert("Candidate registered successfully.");
//             setForm({ fullName: "", email: "", education: "", experience: "" });
//         } catch (err) {
//             console.error(err);
//             alert("Registration failed.");
//         }
//     };

//     return (
//         <div className="card shadow-sm p-4 mb-4">
//             <h4 className="card-title text-primary mb-3">Register Candidate</h4>

//             <div className="mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="fullName"
//                     placeholder="Full Name"
//                     value={form.fullName}
//                     onChange={handleChange}
//                 />
//             </div>

//             <div className="mb-3">
//                 <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     placeholder="Email"
//                     value={form.email}
//                     onChange={handleChange}
//                 />
//             </div>

//             <div className="mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="education"
//                     placeholder="Education"
//                     value={form.education}
//                     onChange={handleChange}
//                 />
//             </div>

//             <div className="mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="experience"
//                     placeholder="Experience"
//                     value={form.experience}
//                     onChange={handleChange}
//                 />
//             </div>

//             <button className="btn btn-success" onClick={register}>
//                 Register
//             </button>
//         </div>
//     );
// };

// export default RegisterCandidate;




// import React, { useState } from "react";
// import { useContract } from "../utils/contract";

// const RegisterCandidate = () => {
//     const { getContract } = useContract();
//     const [form, setForm] = useState({
//         fullName: "",
//         email: "",
//         education: "",
//         experience: ""
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const register = async () => {
//         const { fullName, email, education, experience } = form;

//         if (!fullName || !email || !education || !experience) {
//             alert("Please fill out all fields.");
//             return;
//         }

//         try {
//             const contract = await getContract();
//             const tx = await contract.registerCandidate(fullName, email, education, experience);
//             await tx.wait();
//             alert("Candidate registered successfully.");
//             setForm({ fullName: "", email: "", education: "", experience: "" });
//         } catch (err) {
//             console.error(err);
//             alert("Registration failed.");
//         }
//     };

//     return (
//         <div className="card shadow-sm p-4 mb-4">
//             <h4 className="card-title text-primary mb-3">Register Candidate</h4>

//             <div className="mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="fullName"
//                     placeholder="Full Name"
//                     value={form.fullName}
//                     onChange={handleChange}
//                 />
//             </div>

//             <div className="mb-3">
//                 <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     placeholder="Email"
//                     value={form.email}
//                     onChange={handleChange}
//                 />
//             </div>

//             <div className="mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="education"
//                     placeholder="Education"
//                     value={form.education}
//                     onChange={handleChange}
//                 />
//             </div>

//             <div className="mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="experience"
//                     placeholder="Experience"
//                     value={form.experience}
//                     onChange={handleChange}
//                 />
//             </div>

//             <button className="btn btn-success" onClick={register}>
//                 Register
//             </button>
//         </div>
//     );
// };

// export default RegisterCandidate;
