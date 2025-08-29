import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function SearchBar({ setAddresses, setError }) {
  const [cep, setCep] = useState("");

  const handleSearch = async () => {
    const cleanCep = (cep || "").replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setAddresses([]);
      setError("Informe um CEP válido (8 dígitos).");
      return;
    }

    setError("");

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

      if (!res.ok) {
        setAddresses([]);
        setError("Erro ao acessar a API. Tente novamente.");
        return;
      }

      const data = await res.json();

      if (data.erro) {
        setAddresses([]);
        setError("CEP não encontrado.");
        return;
      }

      setAddresses([data]);
      setError("");
    } catch (err) {
      console.error("Erro na requisição:", err);
      setAddresses([]);
      setError("Erro na requisição. Verifique sua conexão e tente novamente.");
    }
  };

  return (
    <Box display="flex" gap={2} justifyContent="center" mt={2}>
      <TextField
        label="Digite o CEP"
        variant="outlined"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Ex.: 01001-000 ou 01001000"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </Button>
    </Box>
  );
}

export default SearchBar;
