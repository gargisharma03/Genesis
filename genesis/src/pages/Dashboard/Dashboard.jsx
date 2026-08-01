import Sidebar from "./Sidebar.jsx"
import Workspace from "./Workspace.jsx";
import Currentcard from "../../components/Dashboard/Currentcard.jsx";
export default function Dashboard() {
    return (
        <div>

            <Workspace />
            <Currentcard />
        </div>
    );
}