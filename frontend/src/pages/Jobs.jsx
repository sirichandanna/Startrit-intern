// import { useEffect, useState } from "react";
// import API fro../api/axiosfig";

// export default function Jobs() {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     API.get("/api/jobs")
//       .then(res => setJobs(res.data))
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <div>
//       <h1>Jobs</h1>
//       {jobs.map(j => (
//         <div key={j._id}>
//           <h3>{j.title}</h3>
//           <p>{j.company}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
