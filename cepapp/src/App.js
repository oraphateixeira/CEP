import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import AddressList from "./components/AddressList";
import AddressDetails from "./components/AddressDetails";
import { Container, Typography, Box, Paper, Alert, TextField } from "@mui/material";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  const filteredAddresses = addresses.filter(addr =>
    addr.logradouro?.toLowerCase().includes(filter.toLowerCase()) ||
    addr.bairro?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Busca de CEP
        </Typography>

        {error && (
          <Box mb={2}>
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          </Box>
        )}

        <SearchBar setAddresses={setAddresses} setError={setError} setLoading={setLoading} />

        <Box mt={3}>
          <TextField
            label="Filtrar resultados (logradouro ou bairro)"
            variant="outlined"
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ mb: 2 }}
          />

          {loading && <Typography align="center">Carregando...</Typography>}

          <AddressList addresses={filteredAddresses} onSelect={setSelectedAddress} />

          {selectedAddress && <AddressDetails address={selectedAddress} />}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
