import React from "react";

function AddressList({ addresses, onSelect }) {
  return (
    <div>
      {addresses.length === 0 && <p>Nenhum endereço encontrado.</p>}
      <ul>
        {addresses.map((address, index) => (
          <li key={index} onClick={() => onSelect(address)}>
            {address.logradouro}, {address.bairro} - {address.localidade}/{address.uf}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddressList;
