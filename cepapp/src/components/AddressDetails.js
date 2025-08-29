import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function AddressDetails({ address }) {
  return (
    <Card sx={{ mt: 3, borderRadius: 2 }} elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Detalhes do Endereço
        </Typography>
        <Typography>CEP: {address.cep}</Typography>
        <Typography>Logradouro: {address.logradouro || "Não informado"}</Typography>
        <Typography>Bairro: {address.bairro}</Typography>
        <Typography>Cidade: {address.localidade}</Typography>
        <Typography>Estado: {address.uf}</Typography>
        <Typography>
          Complemento: {address.complemento || "Nenhum"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AddressDetails;
