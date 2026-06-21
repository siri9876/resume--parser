import type { Job } from "@/types";

export const seedJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    jobCode: "SFE-2024",
    requiredSkills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "GraphQL"],
    experienceRequired: 5,
    location: "San Francisco, CA (Remote)",
    description: "Build and maintain scalable frontend applications with modern React patterns, component libraries, and design systems. Lead frontend architecture decisions."
  },
  {
    id: "job-2",
    title: "Full Stack Developer",
    jobCode: "FSD-2024",
    requiredSkills: ["Node.js", "React", "MongoDB", "Docker", "AWS"],
    experienceRequired: 3,
    location: "New York, NY (Hybrid)",
    description: "Develop end-to-end features across our platform stack. Work closely with product and design to ship impactful features quickly."
  },
  {
    id: "job-3",
    title: "Machine Learning Engineer",
    jobCode: "MLE-2024",
    requiredSkills: ["Python", "TensorFlow", "PyTorch", "SQL", "Docker"],
    experienceRequired: 4,
    location: "Austin, TX (On-site)",
    description: "Design and deploy ML models for production use. Collaborate with data scientists to bring research prototypes to scalable services."
  },
  {
    id: "job-4",
    title: "DevOps Engineer",
    jobCode: "DOE-2024",
    requiredSkills: ["Kubernetes", "Terraform", "AWS", "CI/CD", "Linux"],
    experienceRequired: 3,
    location: "Seattle, WA (Remote)",
    description: "Manage cloud infrastructure, build CI/CD pipelines, and ensure high availability of production systems across multiple regions."
  },
  {
    id: "job-5",
    title: "Backend API Developer",
    jobCode: "BAD-2024",
    requiredSkills: ["Node.js", "Express", "PostgreSQL", "Redis", "REST APIs"],
    experienceRequired: 2,
    location: "London, UK (Remote)",
    description: "Design and implement RESTful APIs powering our core platform. Focus on performance, security, and developer experience."
  }
];
