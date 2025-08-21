import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Withdraw() {
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const fetchWithdrawals = async () => {
        try {
            const res = await axios.get('https://earnkar-backend-code.vercel.app/api/auth/withdrawals');
            
            if (res.data.success) {
                setWithdrawals(res.data.data);
                setPagination(res.data.pagination || {});
            } else {
                console.error('API returned success: false');
                setWithdrawals([]);
            }
        } catch (err) {
            console.error('Failed to fetch withdrawals:', err);
            setWithdrawals([]);
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async (id) => {
        if (!window.confirm("Mark this withdrawal as complete?")) return;

        try {
            // Update to use the correct backend URL
            const response = await axios.post(`https://earnkar-backend-code.vercel.app/api/auth/withdrawals/${id}/complete`);

            if (response.data.success) {
                // Update the withdrawal in the state
                setWithdrawals((prev) =>
                    prev.map((w) =>
                        w._id === id ? { ...w, status: 'COMPLETED', processedAt: new Date().toISOString() } : w
                    )
                );

                alert(response.data.message || 'Withdrawal marked as complete.');
            } else {
                alert('❌ Failed to complete withdrawal');
            }
        } catch (err) {
            console.error('Failed to mark as complete:', err.response?.data || err.message);
            
            const errorMessage = err.response?.data?.message || 'Failed to complete withdrawal';
            alert(`❌ ${errorMessage}`);
        }
    };

    const renderPaymentDetails = (withdrawal) => {
        if (withdrawal.method === 'BANK') {
            return (
                <div className="text-sm">
                    <div><strong>Account:</strong> {withdrawal.accountNumber || 'N/A'}</div>
                    <div><strong>Holder:</strong> {withdrawal.accountHolderName || 'N/A'}</div>
                    <div><strong>Bank:</strong> {withdrawal.bankName || 'N/A'}</div>
                    <div><strong>Branch:</strong> {withdrawal.branchName || 'N/A'}</div>
                    <div><strong>IFSC:</strong> {withdrawal.ifscCode || 'N/A'}</div>
                </div>
            );
        } else if (withdrawal.method === 'CRYPTO' || withdrawal.walletAddress) {
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
        // Handle CRYPTO method with USDT amount
        if (withdrawal.method === 'CRYPTO' && withdrawal.usdtAmount) {
            return `${withdrawal.usdtAmount.toFixed(2)} USDT`;
        }
        // Handle BANK method with INR amount
        else if (withdrawal.method === 'BANK' && withdrawal.inrAmount) {
            return `₹${withdrawal.inrAmount.toFixed(2)}`;
        }
        // Fallback to points conversion (assuming 100 points = 1 USDT)
        else if (withdrawal.points) {
            return `${(withdrawal.points / 100).toFixed(2)} USDT`;
        }
        return 'N/A';
    };

    const formatStatus = (status) => {
        return status.charAt(0) + status.slice(1).toLowerCase();
    };

    return (
        <div className="withdraw-container">
            <h1 className="withdraw-heading">Withdrawal Requests</h1>

            {loading ? (
                <p>Loading...</p>
            ) : withdrawals.length === 0 ? (
                <p>No withdrawal requests.</p>
            ) : (
                <>
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
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                w.method === 'BANK'
                                                    ? 'bg-green-100 text-green-800'
                                                    : w.method === 'CRYPTO'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {w.method || 'UNKNOWN'}
                                            </span>
                                        </td>
                                        <td className="withdraw2-td">{w.points}</td>
                                        <td className="withdraw2-td">{renderAmount(w)}</td>
                                        <td className="withdraw2-td">
                                            {w.status.toLowerCase() === 'completed' ? (
                                                <span className="withdraw-status-completed">
                                                    {formatStatus(w.status)}
                                                </span>
                                            ) : (
                                                <span className="withdraw-status-pending">
                                                    {formatStatus(w.status)}
                                                </span>
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
                                            {w.status.toLowerCase() === 'pending' && (
                                                <button
                                                    onClick={() => handleComplete(w._id)}
                                                    className="complete-btn"
                                                    style={{ fontFamily: 'poppins' }}
                                                >
                                                    Mark Complete
                                                </button>
                                            )}
                                            {w.status.toLowerCase() === 'completed' && (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination Info */}
                    {pagination && (
                        <div className="mt-4 text-sm text-gray-600">
                            Showing {withdrawals.length} of {pagination.totalItems || 0} withdrawals
                            {pagination.totalPages > 1 && (
                                <span> (Page {pagination.currentPage} of {pagination.totalPages})</span>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
