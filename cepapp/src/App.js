import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import AddressList from "./components/AddressList";
import AddressDetails from "./components/AddressDetails";
import { Container, Typography, Box, Paper, Alert } from "@mui/material";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState("");

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

        <SearchBar setAddresses={setAddresses} setError={setError} />

        <Box mt={3}>
          <AddressList addresses={addresses} onSelect={setSelectedAddress} />
          {selectedAddress && <AddressDetails address={selectedAddress} />}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
