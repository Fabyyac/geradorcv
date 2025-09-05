// pdfService.ts
import jsPDF from "jspdf";

export type Habilidade = { nome: string; nivel: string };
export type Experiencia = { empresa: string; cargo: string; inicio: string; fim: string; descricao: string };
export type Formacao = { curso: string; instituicao: string; inicio: string; fim: string };

type GerarPdfOptions = {
  nome: string;
  email: string;
  telefone: string;
  linkedin: string;
  resumo: string;
  habilidades: Habilidade[];
  experiencias: Experiencia[];
  formacoes: Formacao[];
  tema?: "tema_01" | "tema_02";
  cor?: "Azul" | "Laranja" | "Cinza" | "Verde";
  temaUrl?: string;
};

export function gerarPDF(options: GerarPdfOptions) {
  const {
    nome = "Seu Nome Completo",
    email = "seu.email@exemplo.com",
    telefone = "(11) 99999-9999",
    linkedin = "",
    resumo = "Seu resumo profissional aparecerá aqui...",
    habilidades = [],
    experiencias = [],
    formacoes = [],
    cor = "Azul",
    temaUrl
  } = options;

  const doc = new jsPDF();

  // Definição das margens
  const marginLeft = 15;
  const marginRight = 195; // largura A4 (210) - margem
  const pageWidth = 210;
  const usableWidth = pageWidth - marginLeft * 2;

  let y = 20;

  // Background
  if (temaUrl) {
    doc.addImage(temaUrl, "JPEG", 0, 0, 210, 297);
  }

  // Cores
  const colorMap: Record<string, string> = {
    Azul: "#1E40AF",
    Laranja: "#F97316",
    Cinza: "#6B7280",
    Verde: "#16A34A",
  };
  doc.setTextColor(colorMap[cor]);

  doc.setFont("helvetica", "normal");

  // Nome
  doc.setFontSize(18);
  doc.text(nome, marginLeft, y);

  y += 4;
  doc.setLineWidth(0.5);
  doc.line(marginLeft, y, marginRight, y);
  y += 8;

  // Contatos
  doc.setFontSize(12);
  doc.text(`Email: ${email}`, marginLeft, y);
  y += 6;
  doc.text(`Telefone: ${telefone}`, marginLeft, y);
  y += 6;
  doc.text(`LinkedIn: ${linkedin}`, marginLeft, y);
  y += 10;

  // Resumo
  doc.setFontSize(14);
  doc.text("Resumo Profissional:", marginLeft, y);
  y += 6;
  doc.setFontSize(12);
  const resumoLines = doc.splitTextToSize(resumo, usableWidth);
  doc.text(resumoLines, marginLeft, y);
  y += resumoLines.length * 6 + 6;

  // Habilidades
  if (habilidades.length > 0) {
    doc.setFontSize(14);
    doc.text("Habilidades:", marginLeft, y);
    y += 6;
    doc.setFontSize(12);
    habilidades.forEach(hab => {
      const habLines = doc.splitTextToSize(`- ${hab.nome} (${hab.nivel})`, usableWidth);
      doc.text(habLines, marginLeft + 2, y);
      y += habLines.length * 6;
    });
    y += 4;
  }

  // Formação
  if (formacoes.length > 0) {
    doc.setFontSize(14);
    doc.text("Formação Acadêmica:", marginLeft, y);
    y += 6;
    doc.setFontSize(12);
    formacoes.forEach(f => {
      const cursoLines = doc.splitTextToSize(
        `${f.curso} - ${f.instituicao} (${f.inicio} - ${f.fim || "Atual"})`,
        usableWidth
      );
      doc.text(cursoLines, marginLeft + 2, y);
      y += cursoLines.length * 6 + 4;
    });
    y += 4;
  }

  // Experiências
  if (experiencias.length > 0) {
    doc.setFontSize(14);
    doc.text("Experiência Profissional:", marginLeft, y);
    y += 6;
    doc.setFontSize(12);
    experiencias.forEach(exp => {
      doc.text(`${exp.cargo} - ${exp.empresa}`, marginLeft + 2, y);
      y += 6;
      doc.text(`${exp.inicio} - ${exp.fim || "Atual"}`, marginLeft + 2, y);
      y += 6;
      const descLines = doc.splitTextToSize(exp.descricao, usableWidth);
      doc.text(descLines, marginLeft + 2, y);
      y += descLines.length * 6 + 6;
    });
  }

  doc.save("curriculo.pdf");
}
