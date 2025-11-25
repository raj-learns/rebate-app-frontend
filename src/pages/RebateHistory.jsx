import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  Chip,
  Stack,
} from "@mui/material";

export default function RebateHistory() {
  const googleId = localStorage.getItem("googleId");
  const [rebates, setRebates] = useState([]);
  const [loading, setLoading] = useState(true);

  const STATUS_COLORS = {
    pending: { bg: "rgba(234,179,8,0.15)", color: "#facc15" },
    approved: { bg: "rgba(22,163,74,0.15)", color: "#4ade80" },
    rejected: { bg: "rgba(220,38,38,0.15)", color: "#f87171" },
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `https://rebate-app-core.onrender.com/api/rebates/${googleId}`
        );

        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setRebates(sorted);
      } catch (err) {
        console.error("Failed fetching history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [googleId]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          background: "radial-gradient(circle at top, #0f172a, #020617)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0f172a, #020617)",
        p: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#f3f4f6",
          fontWeight: 700,
          mb: 3,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        Your Rebate History
      </Typography>

      <Stack spacing={2}>
        {rebates.map((r) => {
          const statusStyle = STATUS_COLORS[r.status] || STATUS_COLORS.pending;

          return (
            <Card
              key={r.id}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(51,65,85,0.8)",
                backdropFilter: "blur(6px)",
              }}
            >
              <Stack spacing={1}>
                {/* Header row */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#e5e7eb", fontWeight: 600 }}
                  >
                    {r.startDate} → {r.endDate}
                  </Typography>

                  <Chip
                    label={r.status.toUpperCase()}
                    size="small"
                    sx={{
                      bgcolor: statusStyle.bg,
                      color: statusStyle.color,
                      borderRadius: "999px",
                      fontWeight: 600,
                      px: 1,
                    }}
                  />
                </Stack>

                {/* Reason */}
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(148,163,184,0.9)", lineHeight: 1.4 }}
                >
                  {r.reason}
                </Typography>

                {/* Footer info */}
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(148,163,184,0.9)" }}
                  >
                    Days: <b>{r.totalDays}</b>
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(148,163,184,0.9)" }}
                  >
                    Applied on:{" "}
                    <b>{new Date(r.createdAt).toLocaleDateString()}</b>
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Stack>

      {rebates.length === 0 && (
        <Typography
          sx={{
            mt: 4,
            color: "rgba(148,163,184,0.8)",
            textAlign: "center",
          }}
        >
          No rebate applications submitted yet.
        </Typography>
      )}
    </Box>
  );
}
