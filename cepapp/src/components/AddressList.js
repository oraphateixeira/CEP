import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function AddressList({ addresses, onSelect, onRemove }) {
  const [filter, setFilter] = useState("");

  const filtered = addresses.filter(
    (a) =>
      a.logradouro?.toLowerCase().includes(filter.toLowerCase()) ||
      a.bairro?.toLowerCase().includes(filter.toLowerCase())
  );

  if (addresses.length === 0) return <p align="center">Nenhum endereço.</p>;

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <TextField
        fullWidth
        placeholder="Filtrar por logradouro ou bairro"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 2 }}
      />
      <List>
        {filtered.map((address, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" onClick={() => onRemove(index)}>
                <DeleteIcon />
              </IconButton>
            }
            button
            onClick={() => onSelect(address)}
          >
            <ListItemText
              primary={`${address.logradouro || "Sem logradouro"}, ${
                address.bairro
              }`}
              secondary={`${address.localidade}/${address.uf}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default AddressList;
