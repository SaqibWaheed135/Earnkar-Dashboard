import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('https://earnkar-backend-code.vercel.app/api/auth/getVideos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(res.data.data || res.data);
    } catch (err) {
      console.error('Failed to fetch videos:', err);
      setMessage('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`https://earnkar-backend-code.vercel.app/api/auth/getVideos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos((prev) => prev.filter((video) => video._id !== id));
      setMessage('Video deleted');
    } catch (err) {
      console.error('Failed to delete video:', err);
      setMessage('Failed to delete video');
    }
  };

  const approveVideo = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`https://earnkar-backend-code.vercel.app/api/auth/approveVideo`, 
        { videoId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVideos((prev) => 
        prev.map((video) => 
          video._id === id ? { ...video, isApproved: true } : video
        )
      );
      setMessage('Video approved successfully');
    } catch (err) {
      console.error('Failed to approve video:', err);
      setMessage('Failed to approve video');
    }
  };

  const editVideo = (id) => {
    navigate(`/videos/edit/${id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="withdraw-container">
      <h1 className="withdraw-heading">Videos List</h1>

      {message && <p>{message}</p>}
      {loading ? (
        <p>Loading videos...</p>
      ) : videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="withdraw-table">
            <thead>
              <tr>
                <th className="withdraw-th">Video</th>
                <th className="withdraw-th">User</th>
                <th className="withdraw-th">Description</th>
                <th className="withdraw-th">Stats</th>
                <th className="withdraw-th">Status</th>
                <th className="withdraw-th">Created</th>
                <th className="withdraw-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video._id}>
                  <td className="withdraw-td">
                    <video
                      src={video.uri}
                      style={{
                        width: '120px',
                        height: '80px',
                        borderRadius: '4px',
                        objectFit: 'cover',
                      }}
                      controls
                      preload="metadata"
                    />
                  </td>
                  <td className="withdraw-td">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {video.avatar && (
                        <img
                          src={video.avatar}
                          alt="User avatar"
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      )}
                      <span>{video.user}</span>
                    </div>
                  </td>
                  <td className="withdraw-td">
                    <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {video.description}
                    </div>
                  </td>
                  <td className="withdraw-td">
                    <div style={{ fontSize: '12px' }}>
                      <div>👍 {video.likes}</div>
                      <div>💬 {video.comments.length}</div>
                      <div>📤 {video.shares}</div>
                    </div>
                  </td>
                  <td className="withdraw-td">
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backgroundColor: video.isApproved ? '#d4edda' : '#f8d7da',
                        color: video.isApproved ? '#155724' : '#721c24',
                      }}
                    >
                      {video.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="withdraw-td" style={{ fontSize: '12px' }}>
                    {formatDate(video.createdAt)}
                  </td>
                  <td className="withdraw-td">
                    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                      <button
                        onClick={() => approveVideo(video._id)}
                        disabled={video.isApproved}
                        style={{
                          backgroundColor: video.isApproved ? '#6c757d' : '#28a745',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '5px',
                          cursor: video.isApproved ? 'not-allowed' : 'pointer',
                          fontSize: '12px',
                          opacity: video.isApproved ? 0.6 : 1,
                        }}
                      >
                        {video.isApproved ? 'Approved' : 'Approve'}
                      </button>
                      {/* <button
                        onClick={() => editVideo(video._id)}
                        style={{
                          backgroundColor: '#3498db',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '12px',
                        }}
                      >
                        Edit
                      </button> */}
                      <button
                        onClick={() => deleteVideo(video._id)}
                        style={{
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '12px',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}