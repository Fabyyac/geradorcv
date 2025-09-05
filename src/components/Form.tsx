// src/components/Form.tsx
import React from "react";
import { Habilidade, Experiencia } from "../services/pdfService";
import { melhorarTextoIA } from "../services/aiService";

type Props = {
  nome: string;
  setNome: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  telefone: string;
  setTelefone: (v: string) => void;
  linkedin: string;
  setLinkedin: (v: string) => void;
  resumo: string;
  setResumo: (v: string) => void;
  habilidades: Habilidade[];
  atualizarHabilidade: (index: number, campo: string, valor: string) => void;
  adicionarHabilidade: () => void;
  experiencias: Experiencia[];
  novaExperiencia: Experiencia;
  setNovaExperiencia: (n: Experiencia) => void;
  showExperienciaForm: boolean;
  setShowExperienciaForm: (b: boolean) => void;
  adicionarExperiencia: () => void;
  cancelarExperiencia: () => void;
  apiKey?: string; // chave da IA
};

export default function Form(props: Props) {
  const {
    nome, setNome, email, setEmail, telefone, setTelefone,
    linkedin, setLinkedin, resumo, setResumo,
    habilidades, atualizarHabilidade, adicionarHabilidade,
    experiencias, novaExperiencia, setNovaExperiencia,
    showExperienciaForm, setShowExperienciaForm,
    adicionarExperiencia, cancelarExperiencia,
    apiKey
  } = props;

  const [loadingResumo, setLoadingResumo] = React.useState(false);
  const [loadingExperiencia, setLoadingExperiencia] = React.useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-h-[80vh] overflow-y-auto">
      {/* Cabeçalho do formulário */}
      <div className="mb-4 p-4 bg-blue-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-blue-900 mb-1">Informações do Currículo</h2>
        <p className="text-blue-800 text-sm">Preencha os dados e veja o preview em tempo real</p>
      </div>

      <form className="space-y-4">
        {[{ label: "Nome", value: nome, setter: setNome, type: "text", placeholder: "Digite seu nome" },
          { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "Digite seu email" },
          { label: "Telefone", value: telefone, setter: setTelefone, type: "text", placeholder: "Digite seu telefone" },
          { label: "LinkedIn", value: linkedin, setter: setLinkedin, type: "text", placeholder: "Digite seu LinkedIn" }].map((campo) => (
            <div key={campo.label}>
              <label className="block font-medium">{campo.label}</label>
              <input
                type={campo.type}
                value={campo.value}
                onChange={(e) => campo.setter(e.target.value)}
                className="w-full border rounded-lg p-2"
                placeholder={campo.placeholder}
              />
            </div>
        ))}

        {/* Resumo Profissional */}
        <div>
          <label className="block font-medium">Resumo Profissional</label>
          <textarea
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows={5}
            placeholder="Digite um resumo profissional"
          />
          <button
            type="button"
            onClick={async () => {
              setLoadingResumo(true);
              try {
                const textoMelhorado = await melhorarTextoIA(resumo, "Resumo Profissional", apiKey);
                setResumo(textoMelhorado);
              } catch (err: any) {
                alert(err.message);
              } finally {
                setLoadingResumo(false);
              }
            }}
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            disabled={loadingResumo}
          >
            {loadingResumo ? "Processando..." : "Melhorar com IA"}
          </button>
        </div>

        {/* Habilidades */}
        <div>
          <label className="block font-medium text-lg font-bold">Habilidades</label>
          {habilidades.map((hab, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={hab.nome}
                onChange={(e) => atualizarHabilidade(index, "nome", e.target.value)}
                className="flex-1 border rounded-lg p-2"
                placeholder="Nome da habilidade"
              />
              <select
                value={hab.nivel}
                onChange={(e) => atualizarHabilidade(index, "nivel", e.target.value)}
                className="border rounded-lg p-2"
              >
                <option>Básico</option>
                <option>Intermediário</option>
                <option>Avançado</option>
              </select>
            </div>
          ))}
          <button
            type="button"
            onClick={adicionarHabilidade}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Adicionar Habilidade
          </button>
        </div>

        {/* Experiências */}
        <div>
          <label className="block font-medium text-lg font-bold">Experiência Profissional</label>
          <p className="text-sm text-gray-600 mb-2">Adicione suas experiências de trabalho mais relevantes</p>
          {!showExperienciaForm && (
            <button
              type="button"
              onClick={() => setShowExperienciaForm(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Adicionar Experiência
            </button>
          )}
          {showExperienciaForm && (
            <div className="space-y-2 mt-2 border p-4 rounded-lg bg-gray-50">
              {["empresa", "cargo"].map((campo) => (
                <input
                  key={campo}
                  type="text"
                  placeholder={campo === "empresa" ? "Empresa *" : "Cargo *"}
                  value={(novaExperiencia as any)[campo]}
                  onChange={(e) =>
                    setNovaExperiencia({ ...novaExperiencia, [campo]: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                />
              ))}
              <div className="flex gap-2">
                {["inicio", "fim"].map((campo) => (
                  <input
                    key={campo}
                    type="month"
                    placeholder={campo === "inicio" ? "Data de Início" : "Data de Fim"}
                    value={(novaExperiencia as any)[campo]}
                    onChange={(e) =>
                      setNovaExperiencia({ ...novaExperiencia, [campo]: e.target.value })
                    }
                    className="w-1/2 border rounded-lg p-2"
                  />
                ))}
              </div>
              <textarea
                placeholder="Descrição das Atividades"
                value={novaExperiencia.descricao}
                onChange={(e) =>
                  setNovaExperiencia({ ...novaExperiencia, descricao: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                rows={3}
              />
              <button
                type="button"
                onClick={async () => {
                  setLoadingExperiencia(true);
                  try {
                    const textoMelhorado = await melhorarTextoIA(
                      novaExperiencia.descricao,
                      "Descrição de Experiência",
                      apiKey
                    );
                    setNovaExperiencia({ ...novaExperiencia, descricao: textoMelhorado });
                  } catch (err: any) {
                    alert(err.message);
                  } finally {
                    setLoadingExperiencia(false);
                  }
                }}
                className="mt-1 px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                disabled={loadingExperiencia}
              >
                {loadingExperiencia ? "Processando..." : "Melhorar com IA"}
              </button>

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={adicionarExperiencia}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Adicionar
                </button>
                <button
                  type="button"
                  onClick={cancelarExperiencia}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
