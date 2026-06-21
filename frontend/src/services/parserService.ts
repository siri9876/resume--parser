import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
  education: string;
  company: string;
}

export async function parseResumeFile(file: File): Promise<string> {
  if (file.type === "application/pdf") {
    return parsePDF(file);
  }

  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx")
  ) {
    return parseDOCX(file);
  }

  throw new Error("Unsupported file type. Please upload PDF or DOCX.");
}

async function parsePDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
  }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const content = await page.getTextContent();

    const pageText = content.items
      .map((item) => {
        if ("str" in item) {
          return item.str;
        }
        return "";
      })
      .join(" ");

    text += pageText + "\n";
  }

  return text;
}

async function parseDOCX(file: File): Promise<string> {
  const mammoth = await import("mammoth");

  const arrayBuffer = await file.arrayBuffer();

  const result = await mammoth.extractRawText({
    arrayBuffer,
  });

  return result.value;
}

export function extractFields(text: string): ParsedResume {
  const cleanText = text.replace(/\s+/g, " ").trim();

  // Email
  const emailMatch = cleanText.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );

  // Phone
  const phoneMatch = cleanText.match(
    /(?:\+91[-\s]?)?[6-9]\d{9}/
  );

  // Name
  let name = "";

  if (emailMatch) {
    const beforeEmail = cleanText.substring(
      0,
      cleanText.indexOf(emailMatch[0])
    );

    name = beforeEmail
      .replace(/Andhra Pradesh/gi, "")
      .replace(/India/gi, "")
      .replace(/\|/g, "")
      .replace(/[0-9]/g, "")
      .trim();

    const words = name.split(" ").filter(Boolean);

    if (words.length > 3) {
      name = words.slice(0, 3).join(" ");
    }
  }

  // Experience
  const expMatch = cleanText.match(
    /(\d{1,2})\+?\s*(?:years?|yrs?)\s*(?:of\s+)?(?:experience|exp)/i
  );

  const experience = expMatch
    ? parseInt(expMatch[1])
    : 0;

  // Skills
  const commonSkills = [
    "Java",
    "JavaScript",
    "TypeScript",
    "React",
    "Angular",
    "Vue",
    "Spring Boot",
    "Spring",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "SQL",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Next.js",
    "Git",
    "GitHub",
    "Postman",
    "Docker",
    "AWS",
  ];

  const skills = commonSkills.filter((skill) =>
    cleanText.toLowerCase().includes(skill.toLowerCase())
  );

  // Education
  let education = "";

  const educationMatch = cleanText.match(
    /(B\.?Tech|BTECH|Bachelor|MCA|BCA|BSc|M\.?Tech|Intermediate)/i
  );

  if (educationMatch) {
    education = educationMatch[0];
  }

  // Company
  let company = "";

  const companyMatch = cleanText.match(
    /(Infosys|TCS|Wipro|Accenture|Capgemini|Cognizant|Tech Mahindra|HCL|IBM)/i
  );

  if (companyMatch) {
    company = companyMatch[0];
  }

  return {
    name,
    email: emailMatch?.[0] || "",
    phone: phoneMatch?.[0] || "",
    skills,
    experience,
    education,
    company,
  };
}

