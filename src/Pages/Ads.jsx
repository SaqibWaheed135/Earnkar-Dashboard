import { useState } from 'react';
import axios from 'axios';

export default function AddAdForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [category, setCategory] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const adData = {
            title,
            description,
            adLink: link,
            category,
            photoUrl,
        };

        try {
            const token = localStorage.getItem('adminToken');
            const res = await axios.post(
                'https://backend-earnkar.vercel.app/api/admin/auth/ad',
                adData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setMessage('Ad added successfully!');
            setTitle('');
            setDescription('');
            setLink('');
            setCategory('');
            setPhotoUrl('');
        } catch (err) {
            console.error(err);
            setMessage('Failed to add ad.');
        }
    };

    return (
        <div className="withdraw-container">
            <h1 className="withdraw-heading">Add New Ad</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
                <div className="form-group">
                    <label className="withdraw-th">Ad Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="withdraw-input"
                    />
                </div>

                <div className="form-group">
                    <label className="withdraw-th">Ad Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="withdraw-input"
                        rows={4}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label className="withdraw-th">Ad Link</label>
                    <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                        className="withdraw-input"
                    />
                </div>

                <div className="form-group">
                    <label className="withdraw-th">Ad Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="withdraw-input"
                    />
                </div>

                <div className="form-group">
                    <label className="withdraw-th">Ad Photo URL</label>
                    <input
                        type="url"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        required
                        className="withdraw-input"
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#2ecc71',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '15px',
                    }}
                >
                    Add Ad
                </button>

                {message && <p style={{ marginTop: '10px' }}>{message}</p>}
            </form>
        </div>
    );
}
