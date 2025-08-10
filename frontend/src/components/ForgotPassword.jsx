import React, { useState } from "react";
import axios from "../services/api"; // adapta este caminho conforme o teu setup
import {
  Box, Typography, TextField, Button, Alert, IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const pageStyleScrollable = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(to top, #F4E6B0, #EEEEEE)',
  padding: '20px',
  position: 'relative',
};

const contentContainerStyle = {
  maxWidth: 400,
  width: "100%",
  padding: "40px 20px",
  borderRadius: "12px",
};

export default function PasswordRequest({ onBack }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      await axios.post("/password-reset", { email });
      setSuccessMsg("Se este email existir, irás receber um link para redefinir a palavra-passe.");
    } catch (err) {
      setError("Erro ao enviar o email. Tenta novamente.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Box sx={pageStyleScrollable}>
      <Box sx={{ position: "fixed", top: 20, left: 20, zIndex: 2001 }}>
        <IconButton onClick={onBack} sx={{ color: "#6b7280" }}>
          <ArrowBackIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>

      <Box sx={contentContainerStyle}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center' ,  mb:4 }}>
          <Typography variant="h5" sx={{ color: "#374151", fontWeight: 500 , mb:3}}>
            Esqueceste a tua palavra-passe?
          </Typography>
          <Typography variant="body2" sx={{ color: "#374151", fontWeight: 500}}>
            Introduz o teu email e enviaremos um link para redefinir a tua palavra-passe.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {successMsg && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMsg}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            placeholder="Introduz o teu email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "white",
              },
            }}
          />

          <Button
            type="submit"
            disabled={loading}
            fullWidth
            sx={{
              backgroundColor: "#FFC107",
              color: "#374151",
              borderRadius: "12px",
              padding: "10px 24px",
              fontWeight: 500,
              fontSize: "16px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f9cc33",
              },
            }}
          >
            {loading ? "A enviar..." : "Enviar email"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}