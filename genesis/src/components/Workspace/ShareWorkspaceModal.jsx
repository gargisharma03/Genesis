import React, { useState } from 'react';
import { Share2, Copy, Check, Users, X } from 'lucide-react';

export default function ShareWorkspaceModal({ workspaceId, isOpen, onClose }) {
  const [inviteUrl, setInviteUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleGenerateLink = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
        const token = localStorage.getItem('token'); // 👈 Retrieve JWT token

        const res = await fetch(`http://localhost:5000/api/workspaces/${workspaceId}/invite`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }), // 👈 Attach token if exists
        },
        credentials: 'include',
        });

        if (!res.ok) {
        if (res.status === 401) {
            throw new Error('Authentication required. Please log in again.');
        }
        throw new Error(`Server returned status ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
        setInviteUrl(data.inviteUrl);
        } else {
        setErrorMessage(data.message || 'Failed to generate link');
        }
    } catch (err) {
        console.error('Failed to generate invite link:', err);
        setErrorMessage(err.message || 'Could not connect to server on port 5000.');
    } finally {
        setLoading(false);
    }
    };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-900/30 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md border border-fuchsia-100 rounded-2xl shadow-2xl shadow-fuchsia-950/5 p-6 relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 p-1 rounded-lg hover:bg-zinc-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-fuchsia-50 border border-fuchsia-200/60 rounded-xl text-fuchsia-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-800">Invite Collaborators</h3>
            <p className="text-xs text-zinc-500">Share this link to give live editor access to your board.</p>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-600 font-medium">
            {errorMessage}
          </div>
        )}

        {/* Action Content */}
        {!inviteUrl ? (
          <button
            onClick={handleGenerateLink}
            disabled={loading}
            className="w-full py-2.5 bg-fuchsia-600 hover:bg-fuchsia-700 active:scale-[0.99] disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{loading ? 'Generating Link...' : 'Create Invite Link'}</span>
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-zinc-200 rounded-xl">
              <input
                type="text"
                readOnly
                value={inviteUrl}
                className="flex-1 bg-transparent px-2 text-xs text-zinc-700 outline-none select-all"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-fuchsia-600 font-medium text-center">
              Anyone with this link can join and collaborate in real time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}