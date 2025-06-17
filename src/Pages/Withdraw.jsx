import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Withdraw() {
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const fetchWithdrawals = async () => {
        try {
            const res = await axios.get('https://backend-earnkar.vercel.app/api/auth/withdrawals');
            setWithdrawals(res.data.data); // Adjust this based on your backend response structure
        } catch (err) {
            console.error('Failed to fetch withdrawals:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async (id) => {
        if (!confirm("Mark this withdrawal as complete?")) return;
        try {
            await axios.post(`https://backend-earnkar.vercel.app/api/auth/withdrawals/${id}/complete`);
            setWithdrawals((prev) =>
                prev.map((w) =>
                    w._id === id ? { ...w, status: 'completed' } : w
                )
            );
        } catch (err) {
            console.error('Failed to mark as complete:', err);
            alert('Failed to complete withdrawal');
        }
    };

    return (
        <div className="withdraw-container">
            <h1 className="withdraw-heading">Withdrawal Requests</h1>

            {loading ? (
                <p>Loading...</p>
            ) : withdrawals.length === 0 ? (
                <p>No withdrawal requests.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="withdraw-table">
                        <thead>
                            <tr>
                                <th className="withdraw-th">User (Name & Email)</th>
                                <th className="withdraw-th">Wallet Address</th>
                                <th className="withdraw-th">Wallet Type</th>
                                <th className="withdraw-th">Points</th>
                                <th className="withdraw-th">USDT</th>
                                <th className="withdraw-th">Status</th>
                                <th className="withdraw-th">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawals.map((w) => (
                                <tr key={w._id}>
                                    <td className="withdraw-td">
                                        {/* Showing full name or email, since no mobile */}
                                        {w.userId?.firstName} {w.userId?.lastName} <br />
                                        <small className="text-gray-600">{w.userId?.email}</small>
                                    </td>
                                    <td className="withdraw-td">{w.walletAddress}</td>
                                    <td className="withdraw-td">{w.walletType}</td>
                                    <td className="withdraw-td">{w.points}</td>
                                    <td className="withdraw-td">{(w.points / 100).toFixed(2)} USDT</td>
                                    <td className="withdraw-td">
                                        {w.status === 'completed' ? (
                                            <span className="withdraw-status-completed">Completed</span>
                                        ) : (
                                            <span className="withdraw-status-pending">Pending</span>
                                        )}
                                    </td>
                                    <td className="withdraw-td">
                                        {w.status === 'pending' && (
                                            <button
                                                onClick={() => handleComplete(w._id)}
                                                className="complete-btn"
                                            >
                                                Mark Complete
                                            </button>
                                        )}
                                        {w.status === 'completed' && <span className="text-gray-400">—</span>}
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
