import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function SearchBar({ addAddress, loading, setLoading, setError }) {
  const [cep, setCep] = useState("");

  const handleSearch = async () => {
    const cleanCep = (cep || "").replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setError("Informe um CEP válido (8 dígitos).");
      return;
    }

    setLoading(true);
    setError(""); // Limpa erros anteriores

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      
      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }

      const data = await response.json();

      // Verifica se a API retornou erro (CEP não encontrado)
      if (data.erro) {
        throw new Error("CEP não encontrado");
      }

      // Formata o CEP para exibição consistente
      const formattedData = {
        ...data,
        cep: data.cep || cleanCep
      };

      addAddress(formattedData);
      setCep(""); // Limpa o campo após busca bem-sucedida
      
    } catch (err) {
      console.error("Erro na requisição:", err);
      
      // Mensagens de erro específicas
      if (err.message === "CEP não encontrado") {
        setError("CEP não encontrado. Verifique o número digitado.");
      } else if (err.message.includes("HTTP")) {
        setError("Erro ao acessar o serviço. Tente novamente.");
      } else {
        setError("Erro ao buscar CEP. Verifique sua conexão.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatCep = (value) => {
    // Remove tudo que não é dígito
    const cleanValue = value.replace(/\D/g, '');
    
    // Aplica a máscara de CEP: 00000-000
    if (cleanValue.length <= 5) {
      return cleanValue;
    } else {
      return `${cleanValue.slice(0, 5)}-${cleanValue.slice(5, 8)}`;
    }
  };

  const handleCepChange = (e) => {
    const formattedCep = formatCep(e.target.value);
    setCep(formattedCep);
  };

  return (
    <Box display="flex" gap={2} justifyContent="center" mt={2}>
      <TextField
        label="Digite o CEP"
        variant="outlined"
        value={cep}
        onChange={handleCepChange}
        onKeyPress={handleKeyPress}
        placeholder="Ex.: 01001-000"
        inputProps={{ 
          maxLength: 9
        }}
        helperText="Digite 8 dígitos (com ou sem hífen)"
        error={cep.length > 0 && cep.replace(/\D/g, '').length !== 8}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSearch}
        disabled={loading || cep.replace(/\D/g, '').length !== 8}
      >
        {loading ? 'Buscando...' : 'Buscar'}
      </Button>
    </Box>
  );
}

export default SearchBar;