import { useState, useRef } from "react";
import { Upload, Link2, FileText, X, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { uploadPaper, addPaperViaUrl } from "../../api/paperApi";

export default function AddPaperButton({ collapsed, refreshPapers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("file"); // "file" | "url"
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    authors: "",
  });
  
  const fileInputRef = useRef();
  const { workspaceId } = useParams();

  // --- Direct File Upload Handler ---
  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      await uploadPaper(workspaceId, file);
      await refreshPapers();
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to upload paper:", err);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  // --- Link / URL Submit Handler ---
  async function handleUrlSubmit(e) {
    e.preventDefault();
    if (!formData.url) return;

    try {
      setLoading(true);
      await addPaperViaUrl(workspaceId, {
        url: formData.url,
        title: formData.title,
        authors: formData.authors ? formData.authors.split(",").map((a) => a.trim()) : [],
      });
      await refreshPapers();
      setIsOpen(false);
      setFormData({ url: "", title: "", authors: "" });
    } catch (err) {
      console.error("Failed to add paper via link:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center justify-center gap-2 rounded-xl transition ${
          collapsed
            ? "w-10 h-10 hover:bg-zinc-100"
            : "px-3 py-2 hover:bg-zinc-100"
        }`}
      >
        <Upload size={17} />
        {!collapsed && <span className="text-sm">Add Paper</span>}
      </button>

      {/* Dual Option Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-zinc-200 p-6 shadow-xl text-zinc-900">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Add Research Paper
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Toggles */}
            <div className="grid grid-cols-2 gap-1 my-4 p-1 bg-zinc-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab("file")}
                className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition ${
                  activeTab === "file"
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                Upload PDF
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("url")}
                className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition ${
                  activeTab === "url"
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                URL / arXiv / DOI
              </button>
            </div>

            {/* Tab 1: File Upload */}
            {activeTab === "file" ? (
              <div className="py-6 border-2 border-dashed border-zinc-200 hover:border-indigo-500 rounded-xl text-center bg-zinc-50/50 transition">
                <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-zinc-700">Select a PDF Document</p>
                <p className="text-xs text-zinc-400 mt-1 mb-4">PDF up to 25MB</p>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition inline-flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Browse Computer
                </button>
              </div>
            ) : (
              /* Tab 2: Add via Link */
              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1">
                    Paper URL / arXiv Link *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://arxiv.org/pdf/2301.12345.pdf"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1">
                    Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Attention Is All You Need"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-600 mb-1">
                    Authors (Optional, comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Vaswani et al."
                    value={formData.authors}
                    onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-800"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition inline-flex items-center gap-1.5"
                  >
                    {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    Add Paper
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}