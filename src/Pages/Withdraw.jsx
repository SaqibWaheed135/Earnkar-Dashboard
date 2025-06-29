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
    if (!window.confirm("Mark this withdrawal as complete?")) return;

    try {
        // Changed from POST to PUT and updated the route structure
        const response = await axios.post(`https://backend-earnkar.vercel.app/api/auth/withdrawals/${id}/complete`);

        // Access withdrawal data from the nested response structure
        const updatedWithdrawal = response.data.data.withdrawal;

        setWithdrawals((prev) =>
            prev.map((w) =>
                w._id === id ? { ...w, ...updatedWithdrawal } : w
            )
        );

        // Show success message
        alert(response.data.message || 'Withdrawal marked as complete.');
        
        // Optional: You can also access the nested message
        // alert(response.data.data.message || 'Withdrawal marked as complete.');
        
    } catch (err) {
        console.error('Failed to mark as complete:', err.response?.data || err.message);
        
        // Show more detailed error message if available
        const errorMessage = err.response?.data?.message || 'Failed to complete withdrawal';
        alert(`❌ ${errorMessage}`);
    }
};

    const renderPaymentDetails = (withdrawal) => {
        if (withdrawal.method === 'BANK') {
            return (
                <div className="text-sm">
                    <div><strong>Account:</strong> {withdrawal.accountNumber}</div>
                    <div><strong>Holder:</strong> {withdrawal.accountHolderName}</div>
                    <div><strong>Bank:</strong> {withdrawal.bankName}</div>
                    <div><strong>Branch:</strong> {withdrawal.branchName}</div>
                    <div><strong>IFSC:</strong> {withdrawal.ifscCode}</div>
                </div>
            );
        } else if (withdrawal.method === 'WALLET' || withdrawal.walletAddress) {
            return (
                <div className="text-sm">
                    <div><strong>Address:</strong></div>
                    <div className="break-all">{withdrawal.walletAddress}</div>
                    {withdrawal.walletType && (
                        <div><strong>Type:</strong> {withdrawal.walletType}</div>
                    )}
                </div>
            );
        }
        return <span className="text-gray-400">N/A</span>;
    };

    const renderAmount = (withdrawal) => {
        if (withdrawal.method === 'BANK' && withdrawal.amountINR) {
            return `₹${withdrawal.amountINR.toFixed(2)}`;
        } else if (withdrawal.points) {
            return `${(withdrawal.points / 100).toFixed(2)} USDT`;
        }
        return 'N/A';
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
                                <th className="withdraw-th">Payment Details</th>
                                <th className="withdraw-th">Method</th>
                                <th className="withdraw-th">Points</th>
                                <th className="withdraw-th">Amount</th>
                                <th className="withdraw-th">Status</th>
                                <th className="withdraw-th">Date</th>
                                <th className="withdraw-th">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawals.map((w) => (
                                <tr key={w._id}>
                                    <td className="withdraw2-td">
                                        {w.userId?.firstName} {w.userId?.lastName} <br />
                                        <small className="text-gray-600">{w.userId?.email}</small>
                                    </td>
                                    <td className="withdraw2-td">
                                        {renderPaymentDetails(w)}
                                    </td>
                                    <td className="withdraw2-td">
                                        <span className={`px-2 py-1 rounded text-xs ${w.method === 'BANK'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {w.method || (w.walletAddress ? 'WALLET' : 'UNKNOWN')}
                                        </span>
                                    </td>
                                    <td className="withdraw2-td">{w.points}</td>
                                    <td className="withdraw2-td">{renderAmount(w)}</td>
                                    <td className="withdraw2-td">
                                        {w.status === 'completed' ? (
                                            <span className="withdraw-status-completed">Completed</span>
                                        ) : (
                                            <span className="withdraw-status-pending">Pending</span>
                                        )}
                                    </td>
                                    <td className="withdraw2-td">
                                        <small className="text-gray-600">
                                            {w.createdAt ? new Date(w.createdAt).toLocaleDateString('en-IN', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            }) : 'N/A'}
                                        </small>
                                    </td>
                                    <td className="withdraw2-td">
                                        {w.status === 'pending' && (
                                            <button
                                                onClick={() => handleComplete(w._id)}
                                                className="complete-btn"
                                                style={{ fontFamily: 'poppins' }}
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

