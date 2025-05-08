import React, { useState } from "react";
import { useContract } from "../utils/contract";

const PostJob = () => {
    const { getContract } = useContract();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const postJob = async () => {
        if (!title || !desc) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const contract = await getContract();
            const tx = await contract.postJob(title, desc);
            await tx.wait();

            alert("Job posted successfully.");

            // Store in sessionStorage
            const existing = JSON.parse(sessionStorage.getItem("postedJobs")) || [];
            const newJob = { title, description: desc };
            sessionStorage.setItem("postedJobs", JSON.stringify([...existing, newJob]));

            setTitle("");
            setDesc("");
        } catch (err) {
            console.error("Failed to post job:", err);
            alert("Failed to post job. Please try again.");
        }
    };

    return (
        <div className="card shadow-sm p-4 mb-4">
            <h4 className="card-title text-primary mb-3">Post a Job (Admin)</h4>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Job Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <textarea
                    className="form-control"
                    placeholder="Job Description"
                    rows="3"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                ></textarea>
            </div>
            <button className="btn btn-primary" onClick={postJob}>
                Post Job
            </button>
        </div>
    );
};

export default PostJob;








// import React, { useState } from "react";
// import { useContract } from "../utils/contract";

// const PostJob = () => {
//     const { getContract } = useContract();
//     const [title, setTitle] = useState("");
//     const [desc, setDesc] = useState("");

//     const postJob = async () => {
//         if (!title || !desc) {
//             alert("Please fill in all fields.");
//             return;
//         }

//         try {
//             const contract = await getContract();
//             const tx = await contract.postJob(title, desc);
//             await tx.wait();
//             alert("Job posted successfully.");
//             setTitle("");
//             setDesc("");
//         } catch (err) {
//             console.error(err);
//             alert("Failed to post job. Please try again.");
//         }
//     };

//     return (
//         <div className="card shadow-sm p-4 mb-4">
//             <h4 className="card-title text-primary mb-3">Post a Job (Admin)</h4>
//             <div className="mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Job Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//             </div>
//             <div className="mb-3">
//                 <textarea
//                     className="form-control"
//                     placeholder="Job Description"
//                     rows="3"
//                     value={desc}
//                     onChange={(e) => setDesc(e.target.value)}
//                 ></textarea>
//             </div>
//             <button className="btn btn-primary" onClick={postJob}>
//                 Post Job
//             </button>
//         </div>
//     );
// };

// export default PostJob;
