import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import AddressList from "./components/AddressList";
import AddressDetails from "./components/AddressDetails";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Snackbar
} from "@mui/material";

function App() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const addAddress = (address) => {
    // Verifica se o CEP já existe para evitar duplicatas
    const cepExists = addresses.some(addr => addr.cep === address.cep);
    if (!cepExists) {
      setAddresses((prev) => [address, ...prev]);
      // Mostra mensagem de sucesso
      setError("CEP adicionado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } else {
      handleError("CEP já adicionado à lista.", "warning");
    }
  };

  const removeAddress = (index) => {
    const addressToRemove = addresses[index];
    setAddresses((prev) => prev.filter((_, i) => i !== index));
    
    // Se o endereço removido era o selecionado, fecha os detalhes
    if (selectedAddress && selectedAddress.cep === addressToRemove.cep) {
      setSelectedAddress(null);
    }
  };

  const handleError = (errorMessage, severity = "error") => {
    setError(errorMessage);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setError("");
  };

  // Fecha os detalhes quando não há endereços
  useEffect(() => {
    if (addresses.length === 0 && selectedAddress) {
      setSelectedAddress(null);
    }
  }, [addresses, selectedAddress]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Busca de CEP
        </Typography>

        <SearchBar 
          addAddress={addAddress} 
          loading={loading}
          setLoading={setLoading} 
          setError={handleError}
        />

        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}

        <Box mt={3}>
          <AddressList
            addresses={addresses}
            selectedAddress={selectedAddress}
            onSelect={setSelectedAddress}
            onRemove={removeAddress}
          />
        </Box>

        {selectedAddress && (
          <AddressDetails
            address={selectedAddress}
            open={!!selectedAddress}
            onClose={() => setSelectedAddress(null)}
          />
        )}

        <Snackbar 
          open={openSnackbar} 
          autoHideDuration={4000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

export default App;