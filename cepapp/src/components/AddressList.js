import React from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

function AddressList({ addresses, onSelect }) {
  if (addresses.length === 0) {
    return <Typography align="center">Nenhum endereço encontrado.</Typography>;
  }

  return (
    <Paper elevation={2}>
      <List>
        {addresses.map((address, index) => (
          <ListItem
            button
            key={index}
            onClick={() => onSelect(address)}
            sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
          >
            <ListItemText
              primary={`${address.logradouro || "Sem logradouro"}, ${address.bairro}`}
              secondary={`${address.localidade}/${address.uf}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default AddressList;
