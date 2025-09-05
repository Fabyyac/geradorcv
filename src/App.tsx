// src/App.tsx
import React, { useState } from "react";

// Componentes principais
import Header from "./components/Header";
import ExportModal from "./components/ExportModal";
import Form from "./components/Form";
import Preview from "./components/Preview";

// Serviços
import { gerarPDF, Habilidade, Experiencia } from "./services/pdfService";
import { setApiKey as setGeminiApiKey } from "./services/aiService";

// Logo
import logo from "./assets/logo.png";

// Temas como imagens
import tema01 from "./assets/tema_01.jpg";
import tema02 from "./assets/tema_02.png";

function App() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [resumo, setResumo] = useState<string>("");

  const [habilidades, setHabilidades] = useState<Habilidade[]>([
    { nome: "", nivel: "Básico" },
  ]);

  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [novaExperiencia, setNovaExperiencia] = useState<Experiencia>({
    empresa: "",
    cargo: "",
    inicio: "",
    fim: "",
    descricao: "",
  });

  const [showExperienciaForm, setShowExperienciaForm] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // Tema e cor do PDF
  const [tema, setTema] = useState<"Moderno" | "Clássico" | "Minimalista">("Moderno");
  const [cor, setCor] = useState<"Azul" | "Laranja" | "Cinza" | "Verde">("Azul");

  // API Key Gemini
  const [apiKey, setApiKey] = useState<string>("");
  const [apiStatus, setApiStatus] = useState<string>("API Key não configurada");

  // Atualiza habilidades
  const atualizarHabilidade = (index: number, campo: keyof Habilidade, valor: string) => {
    const novasHabilidades = [...habilidades];
    novasHabilidades[index][campo] = valor;
    setHabilidades(novasHabilidades);
  };

  const adicionarHabilidade = () => {
    setHabilidades([...habilidades, { nome: "", nivel: "Básico" }]);
  };

  // Adicionar / cancelar experiência
  const adicionarExperiencia = () => {
    setExperiencias([...experiencias, novaExperiencia]);
    setNovaExperiencia({ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" });
    setShowExperienciaForm(false);
  };

  const cancelarExperiencia = () => {
    setNovaExperiencia({ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" });
    setShowExperienciaForm(false);
  };

  // Função para gerar PDF com tema como imagem
  const handleGerarPDF = () => {
    // Escolhe o fundo correto baseado no tema
    let temaUrl = tema === "Minimalista" ? tema02 : tema01; // exemplo: Minimalista = tema02
    gerarPDF({
      nome,
      email,
      telefone,
      linkedin,
      resumo,
      habilidades,
      experiencias,
      tema: tema === "Minimalista" ? "tema_02" : "tema_01", // corresponde ao pdfService
      cor,
      temaUrl,
    });
    setShowExportModal(false);
  };

  // Detecta Enter na API Key
  const handleApiKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (apiKey.trim() !== "") {
        setGeminiApiKey(apiKey);
        setApiStatus("IA ATIVA!");
        console.log("Chave Gemini configurada:", apiKey);
      } else {
        setApiStatus("API Key não configurada");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row items-center justify-between bg-blue-900 p-6 md:p-8 gap-4 md:gap-0">
        <img src={logo} alt="Logo" className="h-16 md:h-20" />
        <div className="flex flex-col md:flex-row items-center gap-3">
          <input
            type="password"
            placeholder="Cole sua API Key e pressione Enter"
            className="px-4 py-3 rounded-md text-black bg-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 text-justify w-72 md:w-96"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={handleApiKeyEnter}
          />
          <span className="text-orange-500 font-bold">{apiStatus}</span>
          <button
            onClick={() => setShowExportModal(true)}
            className="bg-white text-blue-900 font-bold px-5 py-3 rounded-md hover:bg-gray-200"
          >
            Exportar PDF
          </button>
        </div>
      </div>

      {showExportModal && (
        <ExportModal
          tema={tema}
          setTema={setTema}
          cor={cor}
          setCor={setCor}
          onGenerate={handleGerarPDF}
          onCancel={() => setShowExportModal(false)}
        />
      )}

      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <div className="grid grid-cols-2 gap-6">
          <Form
            nome={nome}
            setNome={setNome}
            email={email}
            setEmail={setEmail}
            telefone={telefone}
            setTelefone={setTelefone}
            linkedin={linkedin}
            setLinkedin={setLinkedin}
            resumo={resumo}
            setResumo={setResumo}
            habilidades={habilidades}
            atualizarHabilidade={atualizarHabilidade}
            adicionarHabilidade={adicionarHabilidade}
            experiencias={experiencias}
            novaExperiencia={novaExperiencia}
            setNovaExperiencia={setNovaExperiencia}
            showExperienciaForm={showExperienciaForm}
            setShowExperienciaForm={setShowExperienciaForm}
            adicionarExperiencia={adicionarExperiencia}
            cancelarExperiencia={cancelarExperiencia}
            apiKey={apiKey}
          />
          <Preview
            nome={nome}
            email={email}
            telefone={telefone}
            linkedin={linkedin}
            resumo={resumo}
            habilidades={habilidades}
            experiencias={experiencias}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
