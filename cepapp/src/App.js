import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import AddressList from "./components/AddressList";
import AddressDetails from "./components/AddressDetails";

function App() {
  const [addresses, setAddresses] = useState([]); // Lista de resultados
  const [selectedAddress, setSelectedAddress] = useState(null); // Endereço selecionado

  return (
    <div className="App">
      <h1>Busca de CEP</h1>

      {/* Campo de busca */}
      <SearchBar setAddresses={setAddresses} />

      {/* Lista de endereços */}
      <AddressList addresses={addresses} onSelect={setSelectedAddress} />

      {/* Detalhes do endereço selecionado */}
      {selectedAddress && <AddressDetails address={selectedAddress} />}
    </div>
  );
}

export default App;
