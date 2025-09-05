// src/components/Preview.tsx
import React from "react";
import { Habilidade, Experiencia } from "../services/pdfService";

type Props = {
  nome: string;
  email: string;
  telefone: string;
  linkedin: string;
  resumo: string;
  habilidades: Habilidade[];
  experiencias: Experiencia[];
};

export default function Preview({ nome, email, telefone, linkedin, resumo, habilidades, experiencias }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-h-[80vh] overflow-y-auto">
      <div className="mb-4 p-4 bg-blue-200 rounded-xl shadow-sm text-left">
        <h2 className="text-xl font-bold text-blue-900">Preview do Currículo</h2>
        {!nome && <p className="text-blue-800 text-sm">Visualização em tempo real</p>}
      </div>

      <div className="space-y-4">
        <div className="border-b pb-2 mb-4">
          <h1 className={`${nome ? "text-2xl font-bold text-black" : "text-gray-400 italic"}`}>
            {nome || "Seu Nome Completo"}
          </h1>
          <p className="text-gray-500 italic">
            {email || "seu.email@exemplo.com"} • {telefone || "(11) 99999-9999"}
          </p>
          <p className="text-gray-500 italic">{linkedin || ""}</p>
          <p className="mt-2 text-gray-700">{resumo || "Seu resumo profissional aparecerá aqui..."}</p>
        </div>

        {habilidades.some((h) => h.nome) && (
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-1">Habilidades</h3>
            <ul className="list-disc ml-5">
              {habilidades.map(
                (hab, idx) =>
                  hab.nome && (
                    <li key={idx}>
                      {hab.nome} - <span className="text-sm text-gray-600">{hab.nivel}</span>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}

        {experiencias.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-2">Experiência Profissional</h3>
            {experiencias.map((exp, idx) => (
              <div key={idx} className="mb-4 border-b pb-2">
                <p className="font-bold">{exp.cargo}</p>
                <p className="text-gray-600">{exp.empresa}</p>
                <p className="text-gray-500 text-sm">
                  {exp.inicio} - {exp.fim || "Atual"}
                </p>
                <p className="mt-1">{exp.descricao}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
