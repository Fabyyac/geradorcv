// src/components/ExportModal.tsx
import React from "react";

type Props = {
  tema: "Moderno" | "Clássico" | "Minimalista";
  setTema: (t: "Moderno" | "Clássico" | "Minimalista") => void;
  cor: "Azul" | "Laranja" | "Cinza" | "Verde";
  setCor: (c: "Azul" | "Laranja" | "Cinza" | "Verde") => void;
  onGenerate: () => void; // disparar geração do PDF
  onCancel: () => void; // fechar modal
};

export default function ExportModal({ tema, setTema, cor, setCor, onGenerate, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Opções de Exportação</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Tema do Layout</label>
          <select
            value={tema}
            onChange={(e) => setTema(e.target.value as any)}
            className="w-full border rounded-lg p-2"
          >
            <option>Moderno</option>
            <option>Clássico</option>
            <option>Minimalista</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Cor do Layout</label>
          <select
            value={cor}
            onChange={(e) => setCor(e.target.value as any)}
            className="w-full border rounded-lg p-2"
          >
            <option>Azul</option>
            <option>Laranja</option>
            <option>Cinza</option>
            <option>Verde</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onGenerate}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Gerar PDF
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
