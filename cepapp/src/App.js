import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import AddressList from "./components/AddressList";
import AddressDetails from "./components/AddressDetails";
import { Container, Typography, Box, Paper } from "@mui/material";

function App() {
  const [addresses, setAddresses] = useState([]); // Lista de resultados
  const [selectedAddress, setSelectedAddress] = useState(null); // Endereço selecionado

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Busca de CEP
        </Typography>

        {/* Campo de busca */}
        <SearchBar setAddresses={setAddresses} />

        <Box mt={3}>
          {/* Lista de endereços */}
          <AddressList addresses={addresses} onSelect={setSelectedAddress} />

          {/* Detalhes do endereço selecionado */}
          {selectedAddress && <AddressDetails address={selectedAddress} />}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
