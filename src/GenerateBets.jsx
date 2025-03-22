import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Snackbar, Alert, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./GenerateBets.css";
import "./App.css";

function GenerateBets() {
    const [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const progressDuration = 210000; // 3.5 minutes in milliseconds

    function decimalToAmericanOdds(decimalOdds) {
        if (decimalOdds >= 2.0) {
            return `+${Math.round((decimalOdds - 1) * 100)}`;
        } else {
            return Math.round(-100 / (decimalOdds - 1)).toString();
        }
    }

    const StyledGridOverlay = styled("div")(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "rgba(18, 18, 18, 0.9)",
        ...theme.applyStyles("light", {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
        }),
    }));

    function LinearProgressWithLabel({ value }) {
        return (
            <Box sx={{ width: "80%", textAlign: "center" }}>
                <LinearProgress variant="determinate" value={value} />
                <Typography variant="body2" sx={{ mt: 1, color: "white" }}>
                    {`${Math.round(value)}%`} - Generating Bets...
                </Typography>
            </Box>
        );
    }

    function CustomLoadingOverlay() {
        return (
            <StyledGridOverlay>
                <LinearProgressWithLabel value={progress} />
            </StyledGridOverlay>
        );
    }

    const fetchData = async () => {
        setLoading(true);
        setSnackbarOpen(true);
        setProgress(0);

        const startTime = Date.now();
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = (elapsed / progressDuration) * 100;
            setProgress(newProgress >= 100 ? 100 : newProgress);
        }, 1000); // Update every second

        try {
            const response = await fetch("https://nba-player-props.fly.dev/generate-recommendations");
            const result = await response.json();
            setBets(result);
        } catch (error) {
            console.error("Error fetching bets:", error);
        } finally {
            clearInterval(progressInterval);
            setProgress(100);
            setTimeout(() => {
                setProgress(0);
                setLoading(false);
            }, 500);
        }
    };

    useEffect(() => {
        console.log("Bets updated:", bets);
    }, [bets]);

    const rows = Array.isArray(bets)
        ? bets.map((bet, index) => ({
              ...bet,
              id: index + 1,
              best_odds: decimalToAmericanOdds(bet.best_odds),
          }))
        : [];

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "player", headerName: "Player", width: 180 },
        { field: "bet_type", headerName: "Bet Type", width: 100 },
        { field: "best_line", headerName: "Best Line", width: 100 },
        { field: "best_book", headerName: "Best Book", width: 130 },
        { field: "best_odds", headerName: "Best Odds", width: 100 },
        { field: "margin", headerName: "Margin", width: 100 },
    ];

    return (
        <div className="main-tab-content">
            <h1>Recommended Bets</h1>
            <div className="datagrid-container">
                <DataGrid
                    rows={rows}
                    columns={columns.filter((col) => col.field !== "id")}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    loading={loading}
                    slots={{
                        loadingOverlay: CustomLoadingOverlay,
                    }}
                    disableColumnResize
                />
            </div>

            <button onClick={fetchData} disabled={loading} className="fetch-button">
                {loading ? "Running Model..." : "Run Model"}
            </button>

            {/* Snackbar Component */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="warning" onClose={() => setSnackbarOpen(false)}>
                    The model may take a while to generate results. Please be patient.
                </Alert>
            </Snackbar>
        </div>
    );
}

export default GenerateBets;
