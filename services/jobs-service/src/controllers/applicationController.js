import Application from "../models/application.js";
import Job from "../models/job.js";

export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Check job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    const applied = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resume: req.body.resume,
    });

    return res.json({ msg: "Application submitted", applied });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const myApplications = async (req, res) => {
  try {
    const apps = await Application.find({ applicant: req.user.id })
      .populate("job")
      .sort({ createdAt: -1 });

    return res.json(apps);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
