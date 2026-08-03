import { useEffect, useState } from "react";
import Greeting from "../../components/Dashboard/Greeting";
import Currentcard from "../../components/Dashboard/Currentcard";
import { getRecentWorkspace } from "../../api/workspaceApi";
import WorkspaceGrid from "./WorkspaceGrid";

export default function Dashboard() {

    const [workspace, setWorkspace] = useState(null);

    useEffect(() => {
        fetchWorkspace();
    }, []);

    const fetchWorkspace = async () => {
        try {
            const res = await getRecentWorkspace();
            setWorkspace(res.data.workspace);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Greeting />
            <Currentcard workspace={workspace} />
            <WorkspaceGrid />
        </div>
    );
}