import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function SearchBar({ addAddress, setLoading }) {
  const [cep, setCep] = useState("");

  const handleSearch = async () => {
    const cleanCep = (cep || "").replace(/\D/g, "");
    if (cleanCep.length !== 8) {
      alert("Informe um CEP válido (8 dígitos).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (!res.ok) throw new Error("Erro na API");
      const data = await res.json();
      if (data.erro) throw new Error("CEP não encontrado");
      addAddress(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
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
