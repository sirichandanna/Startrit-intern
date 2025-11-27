import Job from "../models/job.js";

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.json({ msg: "Job created successfully", job });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {
      title: { $regex: search, $options: "i" },
    };

    const jobs = await Job.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: "Job not found" });

    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: "Job not found" });

    // Only the creator can update
    if (job.createdBy.toString() !== req.user.id)
      return res.status(403).json({ msg: "Unauthorized" });

    job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ msg: "Job updated", job });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ msg: "Job not found" });

    if (job.createdBy.toString() !== req.user.id)
      return res.status(403).json({ msg: "Unauthorized" });

    await job.deleteOne();
    res.json({ msg: "Job deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
