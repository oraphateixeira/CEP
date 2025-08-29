import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  TextField,
  Typography,
  Chip,
  Box,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

function AddressList({ addresses, selectedAddress, onSelect, onRemove }) {
  const [filter, setFilter] = useState("");

  const filtered = addresses.filter(
    (a) =>
      a.logradouro?.toLowerCase().includes(filter.toLowerCase()) ||
      a.bairro?.toLowerCase().includes(filter.toLowerCase()) ||
      a.localidade?.toLowerCase().includes(filter.toLowerCase()) ||
      a.cep?.includes(filter)
  );

  if (addresses.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          Nenhum endereço encontrado. Digite um CEP para buscar.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <TextField
        fullWidth
        placeholder="Filtrar por logradouro, bairro, cidade ou CEP"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      {filtered.length === 0 ? (
        <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 2 }}>
          Nenhum endereço encontrado com o filtro aplicado.
        </Typography>
      ) : (
        <List>
          {filtered.map((address, index) => (
            <ListItem
              key={`${address.cep}-${index}`}
              secondaryAction={
                <IconButton 
                  edge="end" 
                  onClick={() => onRemove(addresses.findIndex(a => a.cep === address.cep))}
                  aria-label="remover"
                >
                  <DeleteIcon />
                </IconButton>
              }
              sx={{
                backgroundColor: selectedAddress?.cep === address.cep ? 'action.selected' : 'transparent',
                border: selectedAddress?.cep === address.cep ? '2px solid' : 'none',
                borderColor: selectedAddress?.cep === address.cep ? 'primary.main' : 'transparent',
                borderRadius: 1,
                mb: 1
              }}
            >
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    {address.logradouro 
                      ? `${address.logradouro}, ${address.bairro}`
                      : `Endereço não especificado - ${address.bairro || 'Bairro não informado'}`
                    }
                    {selectedAddress?.cep === address.cep && (
                      <Chip 
                        icon={<InfoIcon />} 
                        label="Selecionado" 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                    )}
                  </Box>
                }
                secondary={`${address.localidade}/${address.uf} - CEP: ${address.cep}`}
              />
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => onSelect(address)}
                sx={{ ml: 2 }}
              >
                {selectedAddress?.cep === address.cep ? 'Fechar' : 'Detalhes'}
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default AddressList;