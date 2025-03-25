import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import './Results.css';
import './App.css'

function Results({ results, setResults, lifetimeStats, setLifetimeStats }) {
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState("");

    const fetchData = async () => {

        let date_to_use = "";
        if (!date) {
            const today = new Date();
            date_to_use = today.toISOString().split("T")[0]; // Formats to YYYY-MM-DD
        } else {
            date_to_use = date;
        }

        setLoading(true);
        try {
            const response = await fetch(`https://nba-player-props.fly.dev/get-results?date=${date_to_use}`);
            const result = await response.json();
            console.log(result);

            if ('error' in result) {
                alert(`${result["error"]}`);
            }
            else {
                setResults(result);
            }
        } catch (error) {
            console.error("Error fetching bets:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLifetimeData = async () => {
        try {
            const response = await fetch(`https://nba-player-props.fly.dev/get-lifetime-stats`);
            const result = await response.json();
            console.log(result);
            setLifetimeStats(result);

        } catch (error) {
            console.error("Error fetching lifetime data:", error);
        }
    };

    // useEffect hooked to nothing means it just runs once on mount to populate the data for the initial load
    useEffect(() => {
        fetchData();
        fetchLifetimeData();
    }, []);

    const rows = results.map((result, index) => ({
        ...result,
        id: index + 1,
    }));

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "player", headerName: "Player", width: 180 },
        { field: "date", headerName: "Date", width: 100 },
        { field: "bet_type", headerName: "Bet Type", width: 100 },
        { field: "line", headerName: "Line", width: 100 },
        {
            field: "result",
            headerName: "Result",
            width: 80,
            valueGetter: (params) => {
                return params.value === 1 ? "Won" : "Lost";
            },
        }
    ];

    return (
        <div className="main-tab-content">
            <h1>Model Results and Statistics</h1>
            <div className="controls">
                <button onClick={fetchData} disabled={loading} className="fetch-button">
                    {loading ? "Fetching Data..." : "Fetch Data"}
                </button>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="date-input"
                />
            </div>
            <div className="datagrid-container">
                <DataGrid
                    rows={rows}
                    columns={columns.filter(col => col.field !== "id")}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    loading={loading}
                    disableColumnResize
                    rowHeight={40}
                    getRowClassName={(params) => {
                        const resultValue = params.row.result;
                        if (resultValue === 1) {
                            return 'bet-correct';
                        } else if (resultValue === 0) {
                            return 'bet-incorrect';
                        }
                    }}
                    sortModel={[
                        {
                            field: 'date',
                            sort: 'desc',
                        },
                    ]}
                />
            </div>

            <div className="lifetime-results">
                <h2>Lifetime Results</h2>
                <div className="stats-container">
                    <div className="stats-item">
                        <p>Total Picks</p>
                        <p>{lifetimeStats["total_picks"]}</p>
                    </div>
                    <div className="stats-item">
                        <p>Correct Picks</p>
                        <p>{lifetimeStats["total_correct"]}</p>
                    </div>
                    <div className="stats-item">
                        <p>Win Rate</p>
                        <p>{lifetimeStats["percentage"]}%</p>
                    </div>
                    <div className="stats-item">
                        <p>Unit +/-</p>
                        <p>{lifetimeStats["unit_plus_minus"]}</p>
                    </div>
                </div>
            </div>


        </div >
    );
}

export default Results;
