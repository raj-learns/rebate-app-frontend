import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Card,
    Grid,
    Stack,
    Typography,
    TextField,
    MenuItem,
    Button,
    Avatar,
    Chip,
    CircularProgress,
} from "@mui/material";

const BASE_URI = "http://localhost:3000";

const textFieldStyles = {
  fullWidth: true,
  variant: "outlined",

  InputLabelProps: {
    sx: { color: "rgba(148, 163, 184, 0.9)", fontSize: 13 },
  },

  InputProps: {
    sx: { fontSize: 14 },
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

    // 🔥 normal input text (including selects)
    "& .MuiInputBase-input, & .MuiSelect-select": {
      color: "#e5e7eb !important",
      WebkitTextFillColor: "#e5e7eb", // needed for disabled inputs
    },

    // 🔥 disabled input/select text: keep it white & fully opaque
    "& .MuiInputBase-input.Mui-disabled, & .MuiSelect-select.Mui-disabled": {
      color: "#e5e7eb !important",
      WebkitTextFillColor: "#e5e7eb",
      opacity: 1,
    },

    "& .MuiSvgIcon-root": {
      color: "rgba(148, 163, 184, 0.9)",
    },
  },
};


export function UserProfile() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const initialUser = state?.user || state || null;

    const [user, setUser] = useState(initialUser);
    const [loading, setLoading] = useState(!initialUser);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const [course, setCourse] = useState("");
    const [batch, setBatch] = useState("");
    const [hostel, setHostel] = useState("");
    const [mess, setMess] = useState("");
    const [food, setFood] = useState("");

    const [profileImageFile, setProfileImageFile] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);

    // Fetch only if needed
    useEffect(() => {
        if (initialUser?.google_id) {
            localStorage.setItem("googleId", initialUser.google_id);
        }

        if (initialUser) {
            setUser(initialUser);
            setLoading(false);
            return;
        }

        const storedGoogleId = localStorage.getItem("googleId");
        if (!storedGoogleId) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${BASE_URI}/user/${storedGoogleId}`);
                setUser(res.data.user);
            } catch (err) {
                setError("Unable to load user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [initialUser, navigate]);

    useEffect(() => {
        if (!user) return;
        setCourse(user.course || "");
        setBatch(user.batch || "");
        setHostel(user.hostel || "");
        setMess(user.mess || "");
        setFood(user.food_choice || "");
        setProfileImagePreview(user.avatar_url || null);
    }, [user]);

    useEffect(() => {
        if (!profileImageFile) {
            setProfileImagePreview((prev) => prev || user?.avatar_url || null);
            return;
        }
        const url = URL.createObjectURL(profileImageFile);
        setProfileImagePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [profileImageFile, user]);

    if (loading) {
        return (
            <Box
                sx={{
                    position: "fixed",
                    inset: 0,
                    background: "radial-gradient(circle at top, #0f172a 0, #020617 45%, #020617 100%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error || !user) {
        return (
            <Box
                sx={{
                    inset: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#e5e7eb",
                    display: "flex",
                }}
            >
                {error}
            </Box>
        );
    }

    const status = user.status || "pending";
    const isEditable = status === "pending";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEditable) return;
        if (!course || !batch || !hostel || !mess || !food) {
            alert("Please fill all fields");
            return;
        }

        try {
            setSaving(true);
            const formData = new FormData();
            formData.append("googleId", user.google_id);
            formData.append("course", course);
            formData.append("batch", batch);
            formData.append("hostel", hostel);
            formData.append("mess", mess);
            formData.append("food_choice", food);

            if (profileImageFile) formData.append("avatar", profileImageFile);

            const res = await axios.post(`${BASE_URI}/update-profile`, formData);
            setUser(res.data.user);
            alert("Saved!");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                background: "radial-gradient(circle at top, #0f172a 0, #020617 45%, #020617 100%)",
                display: "flex",
                px: 4,
                py: 6,
                overflowY: "auto",
            }}
        >
            <Box sx={{ width: "100%", maxWidth: 1000, mx: "auto" }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Button
                        variant="text"
                        onClick={() => navigate("/")}
                        sx={{ color: "rgba(148,163,184,0.9)" }}
                    >
                        ← Back to Home
                    </Button>

                    <Typography variant="h6" sx={{ color: "white" }}>
                        Your Profile
                    </Typography>
                </Stack>

                <Card
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        bgcolor: "rgba(15,23,42,0.95)",
                        border: "1px solid rgba(51,65,85,0.9)",
                    }}
                >
                    <Grid container spacing={4}>
                        {/* LEFT SIDE */}
                        <Grid item xs={12} md={4}>
                            <Stack alignItems="center" spacing={2}>
                                <Avatar
                                    src={profileImagePreview || undefined}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        bgcolor: "#4f46e5",
                                        fontSize: 36,
                                    }}
                                >
                                    {!profileImagePreview && (user.name[0] || "U")}
                                </Avatar>

                                <Typography variant="h6" sx={{ color: "white" }}>
                                    {user.name}
                                </Typography>
                                <Typography sx={{ color: "rgba(148,163,184,0.9)" }}>
                                    {user.email} • {user.entry_no}
                                </Typography>

                                <Chip
                                    label={status === "verified" ? "Profile Verified" : "Pending Verification"}
                                    sx={{
                                        bgcolor:
                                            status === "verified"
                                                ? "rgba(22,163,74,0.2)"
                                                : "rgba(234,179,8,0.2)",
                                        color: status === "verified" ? "#4ade80" : "#facc15",
                                    }}
                                />

                                <Button
                                    variant="outlined"
                                    component="label"
                                    disabled={!isEditable}
                                    sx={{ color: "white", borderColor: "gray" }}
                                >
                                    {isEditable ? "Change photo" : "Photo locked"}
                                    <input type="file" hidden accept="image/*" onChange={(e) => setProfileImageFile(e.target.files[0])} />
                                </Button>
                            </Stack>
                        </Grid>

                        {/* RIGHT SIDE */}
                        <Grid item xs={12} md={8}>
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    {/* Name + Email */}
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            {...textFieldStyles}
                                            label="Name"
                                            value={user.name}
                                            InputProps={{
                                                ...textFieldStyles.InputProps,
                                                readOnly: true,
                                            }}
                                        />

                                        <TextField
                                            {...textFieldStyles}
                                            label="Email"
                                            value={user.email}
                                            InputProps={{
                                                ...textFieldStyles.InputProps,
                                                readOnly: true,
                                            }}
                                        />
                                    </Stack>

                                    {/* Entry No + Course */}
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            {...textFieldStyles}
                                            label="Entry Number"
                                            value={user.entry_no}
                                            InputProps={{
                                                ...textFieldStyles.InputProps,
                                                readOnly: true,
                                            }}
                                        />

                                        <TextField
                                            {...textFieldStyles}
                                            select
                                            label="Course"
                                            value={course}
                                            onChange={(e) => setCourse(e.target.value)}
                                            disabled={!isEditable}
                                        >
                                            {["BTech", "MTech", "MSc", "Other"].map((x) => (
                                                <MenuItem key={x} value={x} sx={{
                                                    color: "white",
                                                    background: "#0f172a",

                                                    "&.Mui-selected": {
                                                        backgroundColor: "#e5e7eb !important",
                                                        color: "#000 !important",
                                                    },

                                                    "&.Mui-selected:hover": {
                                                        backgroundColor: "#d1d5db !important",
                                                        color: "#000 !important",
                                                    },

                                                    "&:hover": {
                                                        backgroundColor: "#1e293b !important",
                                                    },
                                                }}
                                                >
                                                    {x}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Stack>

                                    {/* Batch + Hostel */}
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            {...textFieldStyles}
                                            select
                                            label="Batch"
                                            value={batch}
                                            onChange={(e) => setBatch(e.target.value)}
                                            disabled={!isEditable}
                                        >
                                            {["2020", "2021", "2022", "2023", "2024", "2025"].map((x) => (
                                                <MenuItem key={x} value={x} sx={{
                                                    color: "white",
                                                    background: "#0f172a",

                                                    "&.Mui-selected": {
                                                        backgroundColor: "#e5e7eb !important",
                                                        color: "#000 !important",
                                                    },

                                                    "&.Mui-selected:hover": {
                                                        backgroundColor: "#d1d5db !important",
                                                        color: "#000 !important",
                                                    },

                                                    "&:hover": {
                                                        backgroundColor: "#1e293b !important",
                                                    },
                                                }}
                                                >
                                                    {x}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        <TextField
                                            {...textFieldStyles}
                                            select
                                            label="Hostel"
                                            value={hostel}
                                            onChange={(e) => setHostel(e.target.value)}
                                            disabled={!isEditable}
                                        >
                                            {["Chenab", "Beas", "Sutlej", "Ravi", "Brahmputra", "T6"].map((x) => (
                                                <MenuItem key={x} value={x} sx={{
                                                    color: "white",
                                                    background: "#0f172a",

                                                    "&.Mui-selected": {
                                                        backgroundColor: "#e5e7eb !important",
                                                        color: "#000 !important",
                                                    },

                                                    "&.Mui-selected:hover": {
                                                        backgroundColor: "#d1d5db !important",
                                                        color: "#000 !important",
                                                    },

                                                    "&:hover": {
                                                        backgroundColor: "#1e293b !important",
                                                    },
                                                }}
                                                >
                                                    {x}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Stack>

                                    {/* Mess + Food */}
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            {...textFieldStyles}
                                            select
                                            label="Mess"
                                            value={mess}
                                            onChange={(e) => setMess(e.target.value)}
                                            disabled={!isEditable}
                                        >
                                            {["Anusha", "Konark", "Ideal"].map((x) => (
                                                <MenuItem key={x} value={x} sx={{
                                                    color: "white",
                                                    background: "#0f172a",

                                                    "&.Mui-selected": {
                                                        backgroundColor: "#e5e7eb !important",
                                                        color: "#000 !important",
                                                    },

                                                    "&.Mui-selected:hover": {
                                                        backgroundColor: "#d1d5db !important",
                                                        color: "#000 !important",
                                                    },

                                                    "&:hover": {
                                                        backgroundColor: "#1e293b !important",
                                                    },
                                                }}
                                                >
                                                    {x}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        <TextField
                                            {...textFieldStyles}
                                            select
                                            label="Food Choice"
                                            value={food}
                                            onChange={(e) => setFood(e.target.value)}
                                            disabled={!isEditable}
                                        >
                                            <MenuItem value="veg" sx={{
                                                color: "white",
                                                background: "#0f172a",

                                                "&.Mui-selected": {
                                                    backgroundColor: "#e5e7eb !important",
                                                    color: "#000 !important",
                                                },

                                                "&.Mui-selected:hover": {
                                                    backgroundColor: "#d1d5db !important",
                                                    color: "#000 !important",
                                                },

                                                "&:hover": {
                                                    backgroundColor: "#1e293b !important",
                                                },
                                            }}
                                            >
                                                Veg
                                            </MenuItem>
                                            <MenuItem value="nonveg" sx={{
                                                color: "white",
                                                background: "#0f172a",

                                                "&.Mui-selected": {
                                                    backgroundColor: "#e5e7eb !important",
                                                    color: "#000 !important",
                                                },

                                                "&.Mui-selected:hover": {
                                                    backgroundColor: "#d1d5db !important",
                                                    color: "#000 !important",
                                                },

                                                "&:hover": {
                                                    backgroundColor: "#1e293b !important",
                                                },
                                            }}
                                            >
                                                Non-Veg
                                            </MenuItem>
                                        </TextField>
                                    </Stack>

                                    {/* Button */}
                                    <Button
                                        type="submit"
                                        disabled={!isEditable || saving}
                                        sx={{
                                            mt: 2,
                                            py: 1.2,
                                            borderRadius: 999,
                                            backgroundImage:
                                                "linear-gradient(135deg, #4f46e5 0%, #22c55e 50%, #0ea5e9 100%)",
                                            color: "white",
                                        }}
                                    >
                                        {isEditable ? (saving ? "Saving..." : "Save Changes") : "Profile is locked (verified)"}
                                    </Button>
                                </Stack>
                            </form>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </Box>
    );
}

export default UserProfile;
