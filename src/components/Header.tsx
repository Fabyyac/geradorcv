// src/components/Header.tsx
import React, { useState } from "react";
import { setApiKey } from "../services/aiService";

type HeaderProps = {
  onExport: () => void;
  logo?: string;
};

export default function Header({ onExport, logo }: HeaderProps) {
  const [apiKey, setLocalApiKey] = useState("");
  const [iaAtiva, setIaAtiva] = useState(false);

  const aplicarApiKey = () => {
    const key = apiKey.trim();
    setApiKey(key);
    setIaAtiva(!!key);
    alert(key ? "✅ IA Ativa!" : "❌ API Key inválida");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      aplicarApiKey();
    }
  };

  return (
    <div className="py-10 px-8 bg-blue-800 text-white flex justify-between items-center">
      {/* py-10 aumenta bastante a altura do topo azul */}
      <div className="flex items-center gap-8">
        {/* Logo maior, respeitando o espaço do topo */}
        {logo && (
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "350px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        )}

        <div className="flex flex-col">
          <label className="text-sm">API Key</label>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Cole sua API Key e pressione Enter"
              value={apiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
              onKeyDown={handleKeyDown}
              className="px-3 py-1 rounded text-black w-64"
            />
            <button
              type="button"
              onClick={aplicarApiKey}
              className="px-3 py-1 bg-green-600 rounded text-white hover:bg-green-700"
            >
              Ativar
            </button>
          </div>
          {iaAtiva && (
            <span className="text-green-400 text-sm mt-1">IA Ativa</span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onExport}
        className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600"
      >
        Exportar PDF
      </button>
    </div>
  );
}
