import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import messMenu from "../assets/messMenu";
import DEFAULT_IMAGE from "../assets/default.jpg";
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
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const BASE_URI = "http://localhost:3000";

const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
const todayMenu = messMenu[todayName];

export function HomePage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const initialUser = state?.user || state || null;

  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  const [error, setError] = useState(null);
  const [openMeal, setOpenMeal] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const moreItems = {
    breakfast: todayMenu.breakfast.slice(1),
    lunch: todayMenu.lunch.slice(1),
    dinner: todayMenu.dinner.slice(1),
  };

  // fetch user if needed
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
    if (user) {
      navigate("/profile", { state: { user } });
    }
  };

  const handleApplyRebate = () => {
    handleMenuClose();
    if (user) {
      navigate("/rebate-application", {
        state: {
          name: user.name,
          google_id: user.google_id,
          entry_no: user.entry_no,
          hostel: user.hostel,
          mess: user.mess,
        },
      });
    }
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
  const weekday = new Date().toLocaleDateString(undefined, { weekday: "long" });

  const foodCards = [
    {
      key: "breakfast",
      label: "Breakfast",
      main: todayMenu.breakfast[0],
    },
    {
      key: "lunch",
      label: "Lunch",
      main: todayMenu.lunch[0],
    },
    {
      key: "dinner",
      label: "Dinner",
      main: todayMenu.dinner[0],
    },
  ];

  const extraItems = {
    lunch: { title: "Curd", desc: "Fresh curd (200 ml)" },
    dinner: { title: "Chicken Biryani", desc: "Spicy biryani (single plate)" },
  };

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
      {/* NAVBAR */}
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
            MessMate
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
              {!user.avatar_url && (user?.name?.[0]?.toUpperCase() || "U")}
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

      {/* MAIN */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          px: { xs: 2, sm: 3, md: 6 },
          py: { xs: 3, md: 6 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 3, md: 5 }}
          alignItems="flex-start"
          sx={{
            maxWidth: 1200,
            width: "100%",
            mx: "auto",
          }}
        >
          {/* LEFT: greeting + menu */}
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
                IIT ROPAR • MESS MENU
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#f9fafb",
                  mt: 1,
                  mb: 1.2,
                  lineHeight: 1.05,
                  fontSize: { xs: 22, md: 30 },
                }}
              >
                Hi, {firstName}. Happy {weekday}!
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(148, 163, 184, 0.95)",
                  maxWidth: { xs: "100%", md: 520 },
                  mx: { xs: "auto", md: 0 },
                  mb: 2,
                }}
              >
                Food menu for today:
              </Typography>

              {/* Food cards row */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "stretch",
                  overflowX: { xs: "auto", md: "visible" },
                  py: { xs: 1, md: 0 },
                  px: { xs: 1, md: 0 },
                  "&::-webkit-scrollbar": { height: 6 },
                }}
              >
                {foodCards.map((card) => (
                  <Card
                    key={card.key}
                    sx={{
                      minWidth: { xs: 160, sm: 180, md: 200 },
                      maxWidth: { xs: 180, sm: 200, md: 240 },
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "rgba(10,14,23,0.75)",
                      border: "1px solid rgba(41, 50, 70, 0.9)",
                      flex: "0 0 auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(148,163,184,0.8)", mb: 0.7 }}
                    >
                      {card.label}
                    </Typography>

                    <Box
                      component="img"
                      src={DEFAULT_IMAGE}
                      alt={`${card.label} image`}
                      sx={{
                        width: { xs: 72, sm: 84, md: 96 },
                        height: { xs: 72, sm: 84, md: 96 },
                        objectFit: "cover",
                        borderRadius: 1,
                        mb: 1,
                        border: "1px solid rgba(55,65,81,0.6)",
                      }}
                    />

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#e5e7eb",
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      {card.main}
                    </Typography>

                    <Button
                      size="small"
                      sx={{
                        mt: 1,
                        textTransform: "none",
                        color: "rgba(130,140,255,0.95)",
                      }}
                      onClick={() =>
                        setOpenMeal(openMeal === card.key ? null : card.key)
                      }
                    >
                      {openMeal === card.key ? "See less" : "See more"}
                    </Button>

                    <Collapse in={openMeal === card.key}>
                      <List dense>
                        {moreItems[card.key].map((item, idx) => (
                          <ListItem key={idx} sx={{ py: 0 }}>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{
                                sx: {
                                  color: "rgba(203,213,225,0.9)",
                                  fontSize: 13,
                                },
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </Card>
                ))}
              </Box>

              {/* Extra items */}
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(15,23,42,0.85)",
                  border: "1px solid rgba(51,65,85,0.6)",
                  maxWidth: 720,
                  mx: { xs: "auto", md: 0 },
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#e5e7eb", fontWeight: 700, mb: 1 }}
                >
                  Today's Extra Items
                </Typography>

                <Stack spacing={1.4}>
                  {/* Lunch extra */}
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{
                      bgcolor: "rgba(8,10,18,0.6)",
                      p: 1,
                      borderRadius: 1.5,
                      border: "1px solid rgba(41,50,70,0.6)",
                    }}
                  >
                    <Box
                      component="img"
                      src={DEFAULT_IMAGE}
                      alt="curd"
                      sx={{
                        width: 64,
                        height: 64,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#e5e7eb", fontWeight: 600 }}
                      >
                        Lunch — {extraItems.lunch.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(148,163,184,0.9)" }}
                      >
                        {extraItems.lunch.desc}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        textTransform: "none",
                        borderRadius: 999,
                        borderColor: "rgba(75,85,99,0.8)",
                        color: "#e5e7eb",
                      }}
                      onClick={() => alert("Extra item details (TODO)")}
                    >
                      Details
                    </Button>
                  </Stack>

                  {/* Dinner extra */}
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{
                      bgcolor: "rgba(8,10,18,0.6)",
                      p: 1,
                      borderRadius: 1.5,
                      border: "1px solid rgba(41,50,70,0.6)",
                    }}
                  >
                    <Box
                      component="img"
                      src={DEFAULT_IMAGE}
                      alt="biryani"
                      sx={{
                        width: 64,
                        height: 64,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#e5e7eb", fontWeight: 600 }}
                      >
                        Dinner — {extraItems.dinner.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(148,163,184,0.9)" }}
                      >
                        {extraItems.dinner.desc}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        textTransform: "none",
                        borderRadius: 999,
                        borderColor: "rgba(75,85,99,0.8)",
                        color: "#e5e7eb",
                      }}
                      onClick={() => alert("Extra item details (TODO)")}
                    >
                      Details
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT: unified status + rebate card */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              width: "100%",
            }}
          >
            <Card
              sx={{
                width: { xs: "100%", sm: "92%", md: "100%" },
                maxWidth: { xs: "100%", sm: 480, md: 420 },
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: 3,
                bgcolor: "rgba(15, 23, 42, 0.98)",
                border: "1px solid rgba(51, 65, 85, 1)",
                boxShadow: "0 20px 50px rgba(15,23,42,0.9)",
              }}
            >
              <Stack spacing={2.5}>
                {/* top: chip + avatar + info */}
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack spacing={0.6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={isVerified ? "Profile Verified" : "Pending Verification"}
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

                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(148,163,184,0.9)" }}
                    >
                      {user.email}
                    </Typography>

                    {user?.hostel && (
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(148,163,184,0.9)" }}
                      >
                        {user.hostel} hostel • {user.mess} mess ·{" "}
                        {user.food_choice === "veg" ? "Veg" : "Non-veg"}
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
                    {!user?.avatar_url && (user?.name?.[0]?.toUpperCase() || "U")}
                  </Avatar>
                </Stack>

                {/* middle: status text */}
                <Stack spacing={0.8}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#e5e7eb", fontWeight: 600 }}
                  >
                    {isVerified ? "You're all set!" : "Your profile is under review"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(148, 163, 184, 0.95)" }}
                  >
                    {isVerified ? (
                      <>
                        Your profile has been <strong>verified</strong>. You now get
                        full access to all rebate features.
                      </>
                    ) : (
                      <>
                        Once an admin verifies your profile, rebate features will be
                        unlocked automatically. You’ll see your full rebate summary
                        here.
                      </>
                    )}
                  </Typography>
                </Stack>

                {/* bottom: actions */}
                {isVerified ? (
                  <Stack spacing={1.5} mt={1}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#e5e7eb", fontWeight: 600 }}
                    >
                      Rebate overview
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(148,163,184,0.9)" }}
                    >
                      Total rebates left: <strong>— TODO / 20</strong>
                    </Typography>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1.2}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          py: 1,
                          borderRadius: 999,
                          backgroundImage:
                            "linear-gradient(135deg, #4f46e5 0%, #22c55e 50%, #0ea5e9 100%)",
                          fontWeight: 600,
                          textTransform: "none",
                        }}
                        onClick={() => navigate("/my-rebates")}
                      >
                        View rebate history
                      </Button>

                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleApplyRebate}
                        sx={{
                          textTransform: "none",
                          borderRadius: 999,
                          borderColor: "rgba(75, 85, 99, 1)",
                          color: "#e5e7eb",
                          "&:hover": {
                            borderColor: "#6366f1",
                            backgroundColor: "rgba(55,65,81,0.6)",
                          },
                        }}
                      >
                        Apply for rebate
                      </Button>
                    </Stack>
                  </Stack>
                ) : (
                  <Stack spacing={1.5} mt={1}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#e5e7eb", fontWeight: 600 }}
                    >
                      Finish verification to use rebates
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(148,163,184,0.9)" }}
                    >
                      You can review your details from the profile page. If any
                      information is incorrect, edit it there while your profile is
                      still in pending state.
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={handleViewProfile}
                      sx={{
                        mt: 0.5,
                        textTransform: "none",
                        borderRadius: 999,
                        borderColor: "rgba(75, 85, 99, 1)",
                        color: "#e5e7eb",
                        alignSelf: "flex-start",
                      }}
                    >
                      Go to profile
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
