import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import AddressList from "./components/AddressList";
import AddressDetails from "./components/AddressDetails";
import { Container, Typography, Paper, Box, CircularProgress } from "@mui/material";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const addAddress = (address) => {
    setAddresses((prev) => [address, ...prev]);
  };

  const removeAddress = (index) => {
    setAddresses((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Busca de CEP
        </Typography>

        <SearchBar addAddress={addAddress} setLoading={setLoading} />

        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}

        <Box mt={3}>
          <AddressList
            addresses={addresses}
            onSelect={setSelectedAddress}
            onRemove={removeAddress}
          />
        </Box>

        {selectedAddress && (
          <AddressDetails
            address={selectedAddress}
            onClose={() => setSelectedAddress(null)}
          />
        )}
      </Paper>
    </Container>
  );
}

export default App;
