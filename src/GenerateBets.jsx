import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import './GenerateBets.css';
import './App.css'

function GenerateBets() {
    const [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(false);

    function decimalToAmericanOdds(decimalOdds) {
        if (decimalOdds >= 2.0) {
            return `+${Math.round((decimalOdds - 1) * 100)}`;
        } else {
            return Math.round(-100 / (decimalOdds - 1)).toString();
        }
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://nba-player-props.fly.dev/generate-recommendations");
            const result = await response.json();
            setBets(result);
        } catch (error) {
            console.error("Error fetching bets:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('Bets updated:', bets);
    }, [bets]);

    // const mockBets = [
    //     {
    //         id: 1,
    //         player: "LeBron James",
    //         bet_type: "Over",
    //         best_line: 27.5,
    //         best_book: "FanDuel",
    //         best_odds: 1.87,
    //         margin: 5.2,
    //     },
    //     {
    //         id: 2,
    //         player: "Stephen Curry",
    //         bet_type: "Over",
    //         best_line: 4.5,
    //         best_book: "DraftKings",
    //         best_odds: 2.0,
    //         margin: 4.7,
    //     },
    //     {
    //         id: 3,
    //         player: "Kevin Durant",
    //         bet_type: "Under",
    //         best_line: 29.5,
    //         best_book: "BetMGM",
    //         best_odds: 2.1,
    //         margin: 3.9,
    //     },
    //     {
    //         id: 4,
    //         player: "Giannis Antetokounmpo",
    //         bet_type: "Over",
    //         best_line: 12.5,
    //         best_book: "FanDuel",
    //         best_odds: 1.8,
    //         margin: 6.3,
    //     },
    //     {
    //         id: 5,
    //         player: "Luka Doncic",
    //         bet_type: "Over",
    //         best_line: 9.5,
    //         best_book: "BetMGM",
    //         best_odds: 1.6,
    //         margin: 4.5,
    //     }
    // ];
    
    // const rows = mockBets.map((bet, index) => ({
    //     ...bet,
    //     id: index + 1,
    //     best_odds: decimalToAmericanOdds(bet.best_odds),
    //     margin: parseFloat(bet.margin) || 0
    // }));


    const rows = Array.isArray(bets) ? bets.map((bet, index) => ({
        ...bet,
        id: index + 1,
        best_odds: decimalToAmericanOdds(bet.best_odds)
    })) : [];


    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "player", headerName: "Player", width: 180 },
        { field: "bet_type", headerName: "Bet Type", width: 100 },
        { field: "best_line", headerName: "Best Line", width: 100 },
        { field: "best_book", headerName: "Best Book", width: 130 },
        { field: "best_odds", headerName: "Best Odds", width: 100 },
        { field: "margin", headerName: "Margin", width: 100 }
    ];

    return (
        <div className="main-tab-content">
            <h1>Recommended Bets</h1>
            <div className="datagrid-container">
                <DataGrid
                    rows={rows}
                    columns={columns.filter(col => col.field !== "id")}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    loading={loading}
                    disableColumnResize
                />
            </div>

            <button onClick={fetchData} disabled={loading} className="fetch-button">
                {loading ? "Running Model..." : "Run Model"}
            </button>
        </div>
    );
}

export default GenerateBets;