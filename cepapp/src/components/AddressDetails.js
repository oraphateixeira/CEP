import React from "react";

function AddressDetails({ address }) {
  return (
    <div>
      <h2>Detalhes do Endereço</h2>
      <p>CEP: {address.cep}</p>
      <p>Logradouro: {address.logradouro}</p>
      <p>Bairro: {address.bairro}</p>
      <p>Cidade: {address.localidade}</p>
      <p>Estado: {address.uf}</p>
      <p>Complemento: {address.complemento || "Nenhum"}</p>
    </div>
  );
}

export default AddressDetails;
