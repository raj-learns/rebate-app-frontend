import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Stack, Card, Typography, TextField, MenuItem, Button } from "@mui/material";

const BASE_URI = "http://localhost:3000";

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
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Title */}
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          color="white"
          textAlign="center"
          mb={5}
        >
          Complete Your Profile
        </Typography>

        {/* STACK AUTOMATICALLY SPACES EVERYTHING */}
        <Stack spacing={4}>

          {/* NAME */}
          <TextField
            label="Name"
            value={user.name}
            InputProps={{
              readOnly: true,
              sx: { color: "white" },
            }}
            InputLabelProps={{
              sx: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& .MuiSvgIcon-root": { color: "white" }
            }}
          />

          {/* EMAIL */}
          <TextField
            label="Email"
            value={user.email}
            InputProps={{
              readOnly: true,
              sx: { color: "white" },
            }}
            InputLabelProps={{
              sx: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& .MuiSvgIcon-root": { color: "white" }
            }}
          />

          {/* ENTRY NO */}
          <TextField
            label="Entry Number"
            value={user.entry_no}
            InputProps={{
              readOnly: true,
              sx: { color: "white" },
            }}
            InputLabelProps={{
              sx: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& .MuiSvgIcon-root": { color: "white" }
            }}
          />

          {/* COURSE */}
          <TextField
            select
            label="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            InputLabelProps={{ sx: { color: "white" } }}
            InputProps={{ sx: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& .MuiSvgIcon-root": { color: "white" }
            }}
          >
            {["BTech", "MTech", "MSc", "Other"].map((item) => (
              <MenuItem key={item} value={item} sx={{ color: "#103d04ff" }}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          {/* BATCH */}
          <TextField
            select
            label="Batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            InputLabelProps={{ sx: { color: "white" } }}
            InputProps={{ sx: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& .MuiSvgIcon-root": { color: "white" }
            }}
          >
            {["2020", "2021", "2022", "2023", "2024", "2025"].map((b) => (
              <MenuItem key={b} value={b} sx={{ color: "#103d04ff" }}>
                {b}
              </MenuItem>
            ))}
          </TextField>

          {/* HOSTEL */}
          <TextField
            select
            label="Hostel"
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            InputLabelProps={{ sx: { color: "white" } }}
            InputProps={{ sx: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& .MuiSvgIcon-root": { color: "white" }
            }}
          >
            {["Chenab", "Beas", "Sutlej", "Ravi", "Brahmputra", "T6"].map((h) => (
              <MenuItem key={h} value={h} sx={{ color: "#103d04ff" }}>
                {h}
              </MenuItem>
            ))}
          </TextField>

          {/* MESS */}
          <TextField
            select
            label="Mess"
            value={mess}
            onChange={(e) => setMess(e.target.value)}
            InputLabelProps={{ sx: { color: "white" } }}
            InputProps={{ sx: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& .MuiSvgIcon-root": { color: "white" }
            }}
          >
            {["Anusha", "Konark", "Ideal"].map((m) => (
              <MenuItem key={m} value={m} sx={{ color: "#103d04ff" }}>
                {m}
              </MenuItem>
            ))}
          </TextField>

          {/* FOOD */}
          <TextField
            select
            label="Food Choice"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            InputLabelProps={{ sx: { color: "white" } }}
            InputProps={{ sx: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& .MuiSvgIcon-root": { color: "white" }
            }}
          >
            <MenuItem value="veg" sx={{ color: "#103d04ff" }}>Veg</MenuItem>
            <MenuItem value="nonveg" sx={{ color: "#103d04ff" }}>Non-Veg</MenuItem>
          </TextField>

          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ py: 1.5 }}
          >
            Submit Profile
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default CreateProfile;
