import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function SearchBar({ setAddresses }) {
  const [cep, setCep] = useState("");

  const handleSearch = async () => {
    if (!cep) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setAddresses([]);
        alert("CEP não encontrado!");
      } else {
        setAddresses([data]); // Coloca o resultado em um array
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro na busca do CEP!");
    }
  };

  return (
    <Box display="flex" gap={2} justifyContent="center" mt={2}>
      <TextField
        label="Digite o CEP"
        variant="outlined"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </Button>
    </Box>
  );
}

export default SearchBar;
