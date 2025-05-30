import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    localStorage.setItem('adminToken', res.data.token);


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('adminToken');

            const res = await axios.get('https://earnkarbackend.onrender.com/api/auth/getUsers'); // Replace with your actual API
            setUsers(res.data.data); // Adjust if needed based on your response format
            console.log(res)
        } catch (err) {
            console.error('Failed to fetch users:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="withdraw-container">
            <h1 className="withdraw-heading">Users List</h1>

            {loading ? (
                <p>Loading...</p>
            ) : users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="withdraw-table">
                        <thead>
                            <tr>
                                <th className="withdraw-th">Avatar</th>
                                <th className="withdraw-th">First Name</th>
                                <th className="withdraw-th">Last Name</th>
                                <th className="withdraw-th">Email</th>
                                <th className="withdraw-th">Clerk User ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.clerkUserId}>
                                    <td className="withdraw-td">
                                        <img
                                            src={user.avatar}
                                            alt="avatar"
                                            style={{
                                                height: '40px',
                                                width: '40px',
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </td>
                                    <td className="withdraw-td">{user.firstName}</td>
                                    <td className="withdraw-td">{user.lastName}</td>
                                    <td className="withdraw-td">{user.email}</td>
                                    <td className="withdraw-td">{user.clerkUserId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
