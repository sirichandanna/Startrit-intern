import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await jobsAPI.getAllJobs();
      setJobs(data.jobs || data);
    } catch (err) {
      setError('Failed to load jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    return job.category === filter;
  });

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Find Your Next Project</h1>
          <p>Browse thousands of freelance opportunities</p>
        </div>

        <div className="filter-section">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Jobs
          </button>
          <button 
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
          >
            Web Development
          </button>
          <button 
            className={`filter-btn ${filter === 'mobile' ? 'active' : ''}`}
            onClick={() => setFilter('mobile')}
          >
            Mobile Development
          </button>
          <button 
            className={`filter-btn ${filter === 'design' ? 'active' : ''}`}
            onClick={() => setFilter('design')}
          >
            Design
          </button>
        </div>

        {loading ? (
          <div className="loading-state">Loading jobs...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.length === 0 ? (
              <div className="empty-state">No jobs found</div>
            ) : (
              filteredJobs.map((job) => (
                <div 
                  key={job._id || job.id} 
                  className="job-card"
                  onClick={() => navigate(`/jobs/${job._id || job.id}`)}
                >
                  <div className="job-header">
                    <h3>{job.title}</h3>
                    <span className="job-budget">${job.budget}</span>
                  </div>
                  <p className="job-description">{job.description}</p>
                  <div className="job-footer">
                    <div className="job-tags">
                      {job.skills?.slice(0, 3).map((skill, index) => (
                        <span key={index} className="job-tag">{skill}</span>
                      ))}
                    </div>
                    <span className="job-duration">{job.duration}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
