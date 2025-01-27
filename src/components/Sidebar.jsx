// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DataUsageIcon from '@mui/icons-material/DataUsage';

function Sidebar() {
    return (
        <aside className="w-64 bg-gray-100 h-screen p-4 flex flex-col">
            <nav className="flex flex-col gap-4">
                <Link to="/" className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
                    <HomeIcon />
                    <span>Home</span>
                </Link>
                <Link to="/indicadores" className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
                    <DashboardIcon />
                    <span>Indicadores</span>
                </Link>
                <Link to="/inconsistencies" className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
                    <ListAltIcon />
                    <span>Inconsistências</span>
                </Link>
                <Link to="/pysus-query" className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
                    <DataUsageIcon />
                    <span>Consulta DataSUS</span>
                </Link>
            </nav>
        </aside>
    );
}

export default Sidebar;
