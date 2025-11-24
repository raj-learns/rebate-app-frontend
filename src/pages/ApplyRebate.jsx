import React, { useState } from "react";
import {
    Box,
    Card,
    Stack,
    TextField,
    Typography,
    Button,
    Divider,
    Grid,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const textFieldStyles = {
    fullWidth: true,
    variant: "outlined",
    InputLabelProps: {
        sx: { color: "rgba(148,163,184,0.9)", fontSize: 13 },
    },
    InputProps: {
        sx: { color: "#e5e7eb", fontSize: 14 },
    },
    sx: {
        "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "& fieldset": {
                borderColor: "rgba(51, 65, 85, 0.9)",
            },
            "&:hover fieldset": {
                borderColor: "rgba(148, 163, 184, 1)",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#6366f1",
            },
        },
    },
};

export default function ApplyRebate() {
    const { state } = useLocation();   // coming from previous navigation
    const navigate = useNavigate();

    const user = state; // user: { name, google_id, hostel, mess, entry_no }

    const [reason, setReason] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const submitRebate = async (e) => {
        e.preventDefault();

        if (!reason || !startDate || !endDate) {
            alert("Please fill all fields.");
            return;
        }

        try {
            const res = await axios.post(
                "https://rebate-app-core.onrender.com/api/rebates/apply",
                {
                    googleId: user.google_id,
                    reason,
                    startDate,
                    endDate,
                    status: "PENDING",
                }
            );

            if (res.status === 200) {
                alert("Rebate Applied Successfully!");
                navigate("/");
            } else {
                alert("Something went wrong.");
            }
        } catch (err) {
            console.error(err);
            alert("Error applying rebate.");
        }
    };

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                background:
                    "radial-gradient(circle at top, #0f172a 0, #020617 45%, #020617 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 2, sm: 3, md: 8 },
                overflowY: "auto",
            }}
        >
            <Grid container spacing={5} alignItems="center" maxWidth={1100}>
                {/* LEFT SECTION */}
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="overline"
                        sx={{ color: "rgba(148,163,184,0.8)", letterSpacing: 1 }}
                    >
                        IIT ROPAR • MESS REBATE
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: "#f9fafb",
                            mt: 1,
                            mb: 2,
                            lineHeight: 1.1,
                        }}
                    >
                        Apply for Mess Rebate 🍽️
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{ color: "rgba(148,163,184,0.95)", maxWidth: 450 }}
                    >
                        Fill your leave details and submit your rebate request.
                        Hostel & mess details are automatically fetched from your profile.
                    </Typography>
                    <Box
                        sx={{
                            mt: 1,
                            mb: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(15,23,42,0.85)",
                            border: "1px solid rgba(51,65,85,0.6)",
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{ color: "#e5e7eb", fontWeight: 600, mb: 1 }}
                        >
                            Note:
                        </Typography>

                        <Stack spacing={1.2}>
                            {[
                                "You won't be allowed to have food during the mess rebate period.",
                                "You can take up to 20 rebates as per the institute rebate policy.",
                                "Your rebate status will remain pending until approved by both the mess manager and the hostel caretaker.",
                                "Your profile photo will be visible on the admin portal during your leave, and you won't be allowed to enter the mess."
                            ].map((text, idx) => (
                                <Stack key={idx} direction="row" spacing={1} alignItems="flex-start">
                                    <Box
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            mt: "6px",
                                            borderRadius: "50%",
                                            bgcolor: "#22c55e",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ color: "rgba(203,213,225,0.9)" }}>
                                        {text}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Box>

                </Grid>

                {/* RIGHT SECTION */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            width: "100%",
                            maxWidth: 600,
                            p: 4,
                            borderRadius: 3,
                            bgcolor: "rgba(15,23,42,0.98)",
                            border: "1px solid rgba(51,65,85,1)",
                        }}
                    >
                        {/* Prefilled Info */}
                        <Box
                            sx={{
                                mb: 3,
                                p: 1.5,
                                borderRadius: 2,
                                border: "1px dashed rgba(55,65,81,1)",
                                bgcolor: "rgba(15,23,42,0.9)",
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: "rgba(148,163,184,0.9)" }}
                            >
                                Student details (auto-filled)
                            </Typography>

                            <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
                                <b>{user?.name}</b>
                            </Typography>

                            <Typography
                                variant="caption"
                                sx={{ color: "rgba(148,163,184,0.9)" }}
                            >
                                Entry No. — {user?.entry_no}
                            </Typography>
                            <br />
                            <Typography
                                variant="caption"
                                sx={{ color: "rgba(148,163,184,0.9)" }}
                            >
                                Hostel — {user?.hostel}
                            </Typography>
                            <br />
                            <Typography
                                variant="caption"
                                sx={{ color: "rgba(148,163,184,0.9)" }}
                            >
                                Mess — {user?.mess}
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 3, borderColor: "rgba(30,41,59,1)" }} />

                        {/* FORM */}
                        <form onSubmit={submitRebate}>
                            <Stack spacing={2.2}>
                                <TextField
                                    label="Reason for Rebate"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    multiline
                                    rows={3}
                                    {...textFieldStyles}
                                />

                                <TextField
                                    label="From Date"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                        sx: { fontSize: 13, color: "rgba(148,163,184,0.9)" }
                                    }}
                                    inputProps={{
                                        placeholder: "",
                                        sx: {
                                            height: "42px",
                                            padding: "10px 12px",
                                            fontSize: "14px",
                                            color: "#e5e7eb"
                                        }
                                    }}
                                    {...textFieldStyles}
                                />

                                <TextField
                                    label="To Date"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                        sx: { fontSize: 13, color: "rgba(148,163,184,0.9)" }
                                    }}
                                    inputProps={{
                                        placeholder: "",
                                        sx: {
                                            height: "42px",
                                            padding: "10px 12px",
                                            fontSize: "14px",
                                            color: "#e5e7eb"
                                        }
                                    }}
                                    {...textFieldStyles}
                                />


                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        mt: 1,
                                        py: 1.2,
                                        borderRadius: 999,
                                        backgroundImage:
                                            "linear-gradient(135deg, #4f46e5 0%, #22c55e 50%, #0ea5e9 100%)",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        "&:hover": { filter: "brightness(1.05)" },
                                    }}
                                >
                                    Submit Rebate
                                </Button>
                            </Stack>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
