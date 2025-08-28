import React, { useState } from "react";

function SearchBar({ setAddresses }) {
  const [cep, setCep] = useState("");

  const handleSearch = async () => {
    if (!cep) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setAddresses([]);
        alert("CEP não encontrado!");
      } else {
        setAddresses([data]); // Coloca o resultado em um array
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro na busca do CEP!");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;
