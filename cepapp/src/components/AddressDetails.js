import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AddressDetails({ address, open, onClose }) {
  if (!address) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Detalhes do Endereço
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          <strong>CEP:</strong> {address.cep}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Logradouro:</strong> {address.logradouro || "Não informado"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Bairro:</strong> {address.bairro || "Não informado"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Cidade:</strong> {address.localidade}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Estado:</strong> {address.uf}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Complemento:</strong> {address.complemento || "Nenhum"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddressDetails;