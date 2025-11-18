import React from "react";

const Signup = () => {
  const handleGoogleSignup = () => {
    // Redirect to backend Google OAuth route
    window.location.href = "http://localhost:4001/api/auth/google";
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create your account</h2>

        <button style={styles.googleButton} onClick={handleGoogleSignup}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
            style={styles.googleIcon}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f9f9f9",
  },
  card: {
    width: "380px",
    padding: "32px",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "24px",
    fontSize: "24px",
    fontWeight: "600",
  },
  googleButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontWeight: "500",
  },
  googleIcon: {
    width: "20px",
  },
};

export default Signup;
