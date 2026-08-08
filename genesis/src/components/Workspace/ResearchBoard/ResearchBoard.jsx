import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";

import {
  getKnowledgeBlocks,
  createKnowledgeBlock,
  updateBlock,
  deleteBlock as deleteBlockApi,
  getOrCreatePaperBoard,
} from "../../../api/knowledgeblockApi";

import BoardHeader from "./BoardHeader";
import BlockEditor from "./BlockEditor";
import EmptyBoard from "./EmptyBoard";
import useAutosave from "../../../hooks/useAutoSave.js";
import ResearchBoardToolbar from "./ResearchToolbar.jsx";

export default function ResearchBoard({ noteId, selectedPaper, currentPage = 1 }) {
  const { workspaceId } = useParams();

  const [activeNoteId, setActiveNoteId] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [dirtyBlock, setDirtyBlock] = useState(null);
  const [loading, setLoading] = useState(true);

  const paperId = selectedPaper?._id;

  const blocksRef = useRef(blocks);
  useEffect(() => {
    blocksRef.current = blocks;
  }, [blocks]);

  const activeNoteIdRef = useRef(activeNoteId);
  useEffect(() => {
    activeNoteIdRef.current = activeNoteId;
  }, [activeNoteId]);

  const loadBoardData = useCallback(async () => {
    setLoading(true);
    setBlocks([]);

    try {
      if (noteId) {
        setActiveNoteId(noteId);
        const res = await getKnowledgeBlocks(workspaceId, noteId);
        setBlocks(res.data.blocks || []);
      } else if (paperId) {
        const res = await getOrCreatePaperBoard(workspaceId, paperId);
        const board = res.data.board || res.data.note;
        const fetchedBlocks = res.data.blocks || [];

        if (board?._id) {
          setActiveNoteId(board._id);
          setBlocks(fetchedBlocks);
        }
      } else {
        setActiveNoteId(null);
        setBlocks([]);
      }
    } catch (err) {
      console.error("Failed to fetch board data:", err);
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  }, [workspaceId, paperId, noteId]);

  useEffect(() => {
    loadBoardData();
  }, [loadBoardData]);

  const handleBlockChange = (blockId, newContent) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block._id === blockId ? { ...block, content: newContent } : block
      )
    );
    setDirtyBlock(blockId);
  };

const createBlock = async (type = "paragraph", afterBlockId = null) => {
  const blockType = typeof type === "string" ? type : "paragraph";

  if (!activeNoteId) {
    console.error("Cannot create block: activeNoteId is null.");
    return;
  }

  try {
    const payload = {
      type: blockType,
      title: "",
      content: {
        text: "",
        code: "",
        language: "javascript",
        latex: "",
        url: "",
        caption: "",
      },
      position: { x: 100, y: 100, z: 1 },
      linkedPaper: paperId || null,
      linkedPage: currentPage || 1,
    };

    const res = await createKnowledgeBlock(workspaceId, activeNoteId, payload);
    const newBlock = res.data?.block || res.block;

    if (newBlock) {
      setBlocks((prev) => {
        if (!afterBlockId) {
          // If no specific block ID was passed, append to the end
          return [...prev, newBlock];
        }

        // Find index of the block where the '+' button was clicked
        const index = prev.findIndex((b) => b._id === afterBlockId);
        if (index === -1) return [...prev, newBlock];

        // Insert new block directly after target index
        const updated = [...prev];
        updated.splice(index + 1, 0, newBlock);
        return updated;
      });
    }
  } catch (err) {
    console.error("Failed to create knowledge block:", err);
  }
};
  const handleDeleteBlock = async (blockId) => {
    if (!activeNoteId) return;

    setBlocks((prev) => prev.filter((b) => b._id !== blockId));

    try {
      await deleteBlockApi(workspaceId, activeNoteId, blockId);
    } catch (err) {
      console.error("Failed to delete block:", err);
      loadBoardData();
    }
  };

  const saveDirtyBlock = useCallback(async () => {
    if (!dirtyBlock || !activeNoteIdRef.current) return;

    const blockToSave = blocksRef.current.find((b) => b._id === dirtyBlock);
    if (!blockToSave) return;

    try {
      await updateBlock(workspaceId, activeNoteIdRef.current, dirtyBlock, {
        content: blockToSave.content,
      });
      setDirtyBlock(null);
    } catch (err) {
      console.error("Failed to save dirty block:", err);
    }
  }, [dirtyBlock, workspaceId]);

  useAutosave(dirtyBlock, saveDirtyBlock);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-500">
        Loading research board...
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white">
      <div className="shrink-0">
        <BoardHeader />
        <ResearchBoardToolbar onCreateBlock={createBlock} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {blocks.length === 0 ? (
          <EmptyBoard createBlock={createBlock} />
        ) : (
          <BlockEditor
            blocks={blocks}
            createBlock={createBlock}
            onBlockChange={handleBlockChange}
            onDeleteBlock={handleDeleteBlock}
          />
        )}
      </div>
    </div>
  );
}