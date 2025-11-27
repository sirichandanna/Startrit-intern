import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const { data } = await jobsAPI.getJobById(id);
      setJob(data.job || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    setApplying(true);
    try {
      await jobsAPI.applyToJob(id);
      alert('Application submitted successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div>
      <Navbar />
      <div className="loading-state">Loading job details...</div>
    </div>
  );

  if (!job) return (
    <div>
      <Navbar />
      <div className="error-state">Job not found</div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="job-details-container">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Jobs
        </button>

        <div className="job-details-card">
          <div className="job-details-header">
            <div>
              <h1>{job.title}</h1>
              <p className="job-posted">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="job-budget-large">${job.budget}</div>
          </div>

          <div className="job-details-content">
            <h3>Description</h3>
            <p>{job.description}</p>

            <h3>Project Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Duration</span>
                <span className="detail-value">{job.duration}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Category</span>
                <span className="detail-value">{job.category}</span>
              </div>
            </div>

            <h3>Required Skills</h3>
            <div className="skills-list">
              {job.skills?.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>

          <button 
            className="apply-btn" 
            onClick={handleApply}
            disabled={applying}
          >
            {applying ? 'Applying...' : 'Apply for this Job'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
