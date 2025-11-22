import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Stack,
  Card,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  Grid,
} from "@mui/material";

const BASE_URI = "http://localhost:3000";

const textFieldStyles = {
  fullWidth: true,
  variant: "outlined",
  InputLabelProps: {
    sx: { color: "rgba(148, 163, 184, 0.9)", fontSize: 13 },
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
    "& .MuiSvgIcon-root": {
      color: "rgba(148, 163, 184, 0.9)",
    },
  },
};

function CreateProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const user = state;

  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [hostel, setHostel] = useState("");
  const [mess, setMess] = useState("");
  const [food, setFood] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!course || !batch || !hostel || !mess || !food) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URI}/update-profile`, {
        googleId: user.google_id,
        course,
        batch,
        hostel,
        mess,
        food_choice: food,
      });

      if (res.data.success) {
        alert("Profile Created Successfully!");
        navigate("/");
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error("Profile Update Error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",          // cover whole viewport
        inset: 0,                   // top:0, right:0, bottom:0, left:0
        background:
          "radial-gradient(circle at top, #0f172a 0, #020617 45%, #020617 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3, md: 8 },
        py: { xs: 4, md: 6 },
        boxSizing: "border-box",
        overflowY: "auto",          // scroll only vertically if needed
        overflowX: "hidden",        // no horizontal scroll
      }}
    >
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        alignItems="center"
        sx={{
          width: "100%",            // full width within viewport
          maxWidth: 1200,           // but keep content readable
          mx: "auto",
        }}
      >
        {/* LEFT: WELCOME */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              textAlign: { xs: "center", md: "left" },
            }}
          >
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
                fontSize: { xs: 28, md: 36 },
              }}
            >
              Welcome, {user?.name?.split(" ")[0] || "Student"} 👋
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(148, 163, 184, 0.95)",
                maxWidth: { xs: "100%", md: 460 },
                mx: { xs: "auto", md: 0 },
                mb: 3,
              }}
            >
              Just one quick step before you’re in. Tell us about your course,
              hostel and food preference so we can tailor your campus
              experience.
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
                "Faster mess & hostel-related updates",
                "Personalized campus notifications",
                "Better discovery of relevant events",
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

        {/* RIGHT: FORM CARD */}
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
                maxWidth: 430,
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                bgcolor: "rgba(15, 23, 42, 0.98)",
                border: "1px solid rgba(51, 65, 85, 1)",
                boxShadow: "0 20px 50px rgba(15,23,42,0.9)",
              }}
            >
              {/* Small title on mobile */}
              <Stack
                spacing={0.5}
                mb={2.5}
                display={{ xs: "flex", md: "none" }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    letterSpacing: 1.4,
                    color: "rgba(148, 163, 184, 0.9)",
                    fontSize: 11,
                  }}
                >
                  Profile setup
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#f9fafb" }}
                >
                  Complete your profile
                </Typography>
              </Stack>

              {/* Logged info */}
              <Box
                sx={{
                  mb: 3,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(15, 23, 42, 0.9)",
                  border: "1px dashed rgba(55, 65, 81, 1)",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(148, 163, 184, 0.9)" }}
                >
                  Logged in as
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#e5e7eb", fontWeight: 500 }}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(148, 163, 184, 0.9)" }}
                >
                  {user.email} • {user.entry_no}
                </Typography>
              </Box>

              <Divider
                sx={{
                  mb: 3,
                  borderColor: "rgba(30, 41, 59, 1)",
                }}
              />

              {/* FORM */}
              <form onSubmit={handleSubmit}>
                <Stack spacing={2.2}>
                  <TextField
                    select
                    label="Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    {...textFieldStyles}
                  >
                    {["BTech", "MTech", "MSc", "Other"].map((item) => (
                      <MenuItem
                        key={item}
                        value={item}
                        sx={{ color: "#020617" }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      select
                      label="Batch"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      {...textFieldStyles}
                    >
                      {["2020", "2021", "2022", "2023", "2024", "2025"].map(
                        (b) => (
                          <MenuItem
                            key={b}
                            value={b}
                            sx={{ color: "#020617" }}
                          >
                            {b}
                          </MenuItem>
                        )
                      )}
                    </TextField>

                    <TextField
                      select
                      label="Hostel"
                      value={hostel}
                      onChange={(e) => setHostel(e.target.value)}
                      {...textFieldStyles}
                    >
                      {["Chenab", "Beas", "Sutlej", "Ravi", "Brahmputra", "T6"]
                        .map((h) => (
                          <MenuItem
                            key={h}
                            value={h}
                            sx={{ color: "#020617" }}
                          >
                            {h}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Stack>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      select
                      label="Mess"
                      value={mess}
                      onChange={(e) => setMess(e.target.value)}
                      {...textFieldStyles}
                    >
                      {["Anusha", "Konark", "Ideal"].map((m) => (
                        <MenuItem
                          key={m}
                          value={m}
                          sx={{ color: "#020617" }}
                        >
                          {m}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      label="Food Choice"
                      value={food}
                      onChange={(e) => setFood(e.target.value)}
                      {...textFieldStyles}
                    >
                      <MenuItem value="veg" sx={{ color: "#020617" }}>
                        Veg
                      </MenuItem>
                      <MenuItem value="nonveg" sx={{ color: "#020617" }}>
                        Non-Veg
                      </MenuItem>
                    </TextField>
                  </Stack>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 1,
                      py: 1.2,
                      borderRadius: 999,
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: 15,
                      width: "100%",
                      backgroundImage:
                        "linear-gradient(135deg, #4f46e5 0%, #22c55e 50%, #0ea5e9 100%)",
                      boxShadow: "0 15px 40px rgba(15,23,42,0.7)",
                      "&:hover": {
                        filter: "brightness(1.05)",
                        boxShadow: "0 18px 50px rgba(15,23,42,0.9)",
                      },
                    }}
                  >
                    Save & Continue
                  </Button>

                  <Typography
                    variant="caption"
                    sx={{
                      textAlign: "center",
                      color: "rgba(148, 163, 184, 0.9)",
                    }}
                  >
                    You can update these details later from your profile
                    settings.
                  </Typography>
                </Stack>
              </form>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateProfile;
