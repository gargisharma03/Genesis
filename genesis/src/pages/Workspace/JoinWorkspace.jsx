// pages/Workspace/JoinWorkspace.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import api from '../../api/axios.js'; // adjust path to your axios instance

export default function JoinWorkspace() {
    const { inviteCode } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        async function handleJoin() {
            try {
                const res = await api.post(`/workspaces/join/${inviteCode}`);
                
                if (res.status === 200 || res.data?.success) {
                    const workspaceId = res.data?.workspaceId || res.data?.data?.workspaceId || res.data?.data?._id;
                    
                    // Redirect directly to the workspace board
                    if (workspaceId) {
                        navigate(`/workspaces/${workspaceId}`, { replace: true });
                    } else {
                        navigate('/dashboard', { replace: true });
                    }
                } else {
                    setError(res.data?.message || 'Failed to join workspace');
                }
            } catch (err) {
                console.error('Error joining workspace:', err);
                const msg = err.response?.status === 401 
                    ? 'Please log in to accept this workspace invite.' 
                    : err.response?.data?.message || 'Invalid or expired invite link.';
                setError(msg);
            }
        }

        if (inviteCode) {
            handleJoin();
        }
    }, [inviteCode, navigate]);

    if (error) {
        return (
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50/80 p-4 text-red-600 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-xs font-medium">{error}</span>
                </div>
                <button
                    onClick={() => navigate('/dashboard', { replace: true })}
                    className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm border border-zinc-200 hover:bg-zinc-50"
                >
                    Dismiss
                </button>
            </div>
        );
    }

    return (
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-fuchsia-200 bg-fuchsia-50/80 p-4 text-zinc-800 shadow-sm backdrop-blur-md">
            <Loader2 className="h-5 w-5 animate-spin text-fuchsia-600" />
            <div>
                <h3 className="text-xs font-semibold text-zinc-800">Joining workspace...</h3>
                <p className="text-[11px] text-zinc-500">Connecting you to the live team workspace.</p>
            </div>
        </div>
    );
}