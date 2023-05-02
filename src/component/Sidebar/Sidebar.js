import React from 'react'
import "./Sidebar.css"
import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,

} from "@mui/icons-material";
import ArticleIcon from '@mui/icons-material/Article';
import { NavLink } from 'react-router-dom';
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <NavLink target="_blank" style={{ textDecoration: "none", color: "#000000" }} to="https://www.newhaven.edu/news/releases/2023/index.php">
                            <ArticleIcon className="sidebarIcon" />
                            <span className="sidebarListItemText">News</span>
                        </NavLink>
                    </li>


                    <li className="sidebarListItem">
                        <NavLink target="_blank" style={{ textDecoration: "none", color: "#000000" }} to="https://www.newhaven.edu/research/labs-groups/">
                            <Group className="sidebarIcon" />
                            <span className="sidebarListItemText">Research Labs</span>
                        </NavLink>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>

                    <NavLink target="_blank" style={{ textDecoration: "none", color: "#000000" }} to="https://www.newhaven.edu/events/">
                        <li className="sidebarListItem">
                            <Event className="sidebarIcon" />
                            <span className="sidebarListItemText">Events</span>
                        </li>
                    </NavLink>

                    <NavLink target="_blank" style={{ textDecoration: "none", color: "#000000" }} to="https://www.newhaven.edu/admissions/graduate/programs.php">
                        <li className="sidebarListItem">
                            <School className="sidebarIcon" />
                            <span className="sidebarListItemText">Courses</span>
                        </li>
                    </NavLink>
                </ul>

                <hr className="sidebarHr" />

            </div>
        </div>
    )
}

export default Sidebar