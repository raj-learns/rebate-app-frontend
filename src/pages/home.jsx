import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Card,
  Stack,
  Avatar,
  Chip,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

const BASE_URI = "http://localhost:3000";

export function HomePage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const initialUser = state?.user || state || null;

  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  const [error, setError] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  // ------- fetch user from API -------
  useEffect(() => {
    if (initialUser?.google_id) {
      localStorage.setItem("googleId", initialUser.google_id);
    }

    if (initialUser) {
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
        setError(null);
        const res = await axios.get(`${BASE_URI}/user/${storedGoogleId}`);
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setError("Unable to load user");
        }
      } catch (err) {
        console.error("Fetch user error:", err);
        setError("Unable to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [initialUser, navigate]);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleViewProfile = () => {
    handleMenuClose();
    if (user) navigate("/profile", { state: { user } });
  };

  const handleApplyRebate = () => {
    handleMenuClose();

    if (user)
      navigate("/rebate-application", {
        state: {
          name: user.name,
          google_id: user.google_id,
          entry_no: user.entry_no,
          hostel: user.hostel,
          mess: user.mess,
        },
      });
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("googleId");
    navigate("/login");
  };

  if (loading) {
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
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at top, #0f172a 0, #020617 45%, #020617 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#e5e7eb",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography>{error || "User not found"}</Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Go to login
        </Button>
      </Box>
    );
  }

  const status = user.status || "pending";
  const isVerified = status === "verified";
  const firstName = user?.name?.split(" ")[0] || "Student";

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(circle at top, #0f172a 0, #020617 45%, #020617 100%)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* NAVBAR full width */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "rgba(15,23,42,0.95)",
          borderBottom: "1px solid rgba(30, 64, 175, 0.35)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            width: "100%",
            mx: "auto",
            px: { xs: 2, md: 3 },
          }}
        >
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700, color: "#e5e7eb" }}
          >

          </Typography>

          <IconButton
            onClick={handleAvatarClick}
            sx={{ p: 0 }}
            aria-controls={menuOpen ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
          >
            <Avatar
              src={user.avatar_url || undefined}
              alt={user.name}
              sx={{
                width: 38,
                height: 38,
                bgcolor: "#4f46e5",
                fontWeight: 600,
              }}
            >
              {!user.avatar_url &&
                (user?.name?.[0]?.toUpperCase() || "U")}
            </Avatar>
          </IconButton>

          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.2,
                minWidth: 170,
                borderRadius: 2,
              },
            }}
          >
            <MenuItem onClick={handleViewProfile}>View profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 3, md: 6 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, md: 5 }}
          alignItems="center"
          sx={{
            maxWidth: 1200,
            width: "100%",
            mx: "auto",
          }}
        >
          {/* LEFT: welcome text */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: 1.6,
                  color: "rgba(148, 163, 184, 0.9)",
                  fontSize: 11,
                }}
              >
                IIT ROPAR • CAMPUS PORTAL
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "#f9fafb",
                  mt: 1.5,
                  mb: 1,
                  lineHeight: 1.1,
                  fontSize: { xs: 28, md: 34 },
                }}
              >
                Hi, {firstName} 👋
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(148, 163, 184, 0.95)",
                  maxWidth: { xs: "100%", md: 440 },
                  mx: { xs: "auto", md: 0 },
                  mb: 3,
                }}
              >
                This is your home base for mess updates, hostel information and
                campus notifications. We’ll unlock all features once your
                profile is verified.
              </Typography>

              <Stack
                spacing={1.2}
                sx={{
                  alignItems: "flex-start",
                  maxWidth: { xs: "100%", md: 360 },
                  mx: { xs: "auto", md: 0 },
                }}
              >
                {[
                  "Keep your mess & hostel preferences updated.",
                  "Get notifications tailored to your batch and course.",
                  "Easily manage your profile anytime.",
                ].map((text) => (
                  <Stack
                    key={text}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "4px",
                        bgcolor: "#22c55e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        color: "#022c22",
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(203, 213, 225, 0.95)" }}
                    >
                      {text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* RIGHT: compact status card */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  maxWidth: 420,
                  p: { xs: 3, sm: 3.5 },
                  borderRadius: 3,
                  bgcolor: "rgba(15, 23, 42, 0.98)",
                  border: "1px solid rgba(51, 65, 85, 1)",
                  boxShadow: "0 20px 50px rgba(15,23,42,0.9)",
                }}
              >
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={
                          isVerified
                            ? "Profile Verified"
                            : "Pending Verification"
                        }
                        size="small"
                        sx={{
                          bgcolor: isVerified
                            ? "rgba(22, 163, 74, 0.15)"
                            : "rgba(234, 179, 8, 0.12)",
                          color: isVerified ? "#4ade80" : "#facc15",
                          borderRadius: "999px",
                          border: "1px solid rgba(148,163,184,0.25)",
                          fontWeight: 500,
                        }}
                      />
                      {user?.entry_no && (
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(148, 163, 184, 0.9)" }}
                        >
                          {user.entry_no}
                        </Typography>
                      )}
                    </Stack>

                    <Avatar
                      src={user?.avatar_url || undefined}
                      alt={user?.name}
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: "#4f46e5",
                        fontSize: 24,
                        fontWeight: 700,
                      }}
                    >
                      {!user?.avatar_url &&
                        (user?.name?.[0]?.toUpperCase() || "U")}
                    </Avatar>
                  </Stack>

                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#e5e7eb", fontWeight: 600 }}
                  >
                    {isVerified
                      ? "You're all set!"
                      : "Your profile is under review"}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(148, 163, 184, 0.95)" }}
                  >
                    {isVerified ? (
                      <>
                        Your profile has been <strong>verified</strong>. You
                        now receive full access and personalized campus updates
                        based on your preferences.
                      </>
                    ) : (
                      <>
                        Your profile is currently{" "}
                        <strong>under verification</strong>. Once an admin
                        approves it, this badge will turn green and you’ll get
                        full access.
                      </>
                    )}
                  </Typography>

                  <Stack spacing={1.2}>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(148, 163, 184, 0.9)" }}
                    >
                      {user?.email}
                    </Typography>
                    {user?.course && (
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(148, 163, 184, 0.9)" }}
                      >
                        {user.course} • {user.batch}
                      </Typography>
                    )}
                    {user?.hostel && (
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(148, 163, 184, 0.9)" }}
                      >
                        {user.hostel} hostel • {user.mess} mess ·{" "}
                        {user.food_choice === "veg" ? "Veg" : "Non-veg"}
                      </Typography>
                    )}
                  </Stack>

                  <Stack direction="row" spacing={1.5} mt={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleApplyRebate}
                      sx={{
                        textTransform: "none",
                        borderRadius: 999,
                        borderColor: "rgba(75, 85, 99, 1)",
                        color: "#e5e7eb",
                        "&:hover": {
                          borderColor: "#6366f1",
                          backgroundColor: "rgba(55, 65, 81, 0.5)",
                        },
                      }}
                    >
                      Apply for rebate
                    </Button>
                    {!isVerified && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(148, 163, 184, 0.9)",
                          alignSelf: "center",
                        }}
                      >
                        Verification usually takes a short time.
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

//export default HomePage;
