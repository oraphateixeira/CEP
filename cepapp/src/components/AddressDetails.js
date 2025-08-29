import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";

function AddressDetails({ address, onClose }) {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Detalhes do Endereço</DialogTitle>
      <DialogContent>
        <Typography>CEP: {address.cep}</Typography>
        <Typography>Logradouro: {address.logradouro || "Não informado"}</Typography>
        <Typography>Bairro: {address.bairro}</Typography>
        <Typography>Cidade: {address.localidade}</Typography>
        <Typography>Estado: {address.uf}</Typography>
        <Typography>
          Complemento: {address.complemento || "Nenhum"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddressDetails;
