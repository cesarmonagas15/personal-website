import React, { useState } from 'react';
import yahooProjectImg from '../assets/Creating the Foundation for Linguistic Equity copy.jpeg';
import bakariFoundationImg from '../assets/bakari-foundation.jpeg';
import canKitchenImg from '../assets/can-kitchen.jpg';
import launchplanImg from '../assets/launchplan.png';
import astronautImg from '../assets/astronaut.png';
import deloitteShowcaseImg from '../assets/deloitte-showcase.png';

interface SlideCarouselProps {
  slides: string[];
  title: string;
}

const SlideCarousel: React.FC<SlideCarouselProps> = ({ slides, title }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <>
      {/* Carousel Trigger */}
      <div className="mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-6 py-3 bg-black text-white font-bold text-sm uppercase hover:bg-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          PRESENTATION ({slides.length} SLIDES)
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 cursor-pointer">{title} - Presentation</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Slide Content */}
            <div className="relative">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <iframe
                  src={slides[currentSlide]}
                  className="w-full h-full border-0"
                  allowFullScreen
                  title={`${title} - Slide ${currentSlide + 1}`}
                />
              </div>

              {/* Navigation Arrows */}
              {slides.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Slide Indicators */}
            {slides.length > 1 && (
              <div className="flex items-center justify-center gap-2 p-4 border-t border-gray-200">
                <span className="text-sm text-gray-600 mr-4">
                  {currentSlide + 1} of {slides.length}
                </span>
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentSlide ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Yahoo Mail: Multilingual AI",
      category: "AI/ML Product Management",
      description: "Led product development of multilingual email classification for Spanish-speaking users — building AI for the 2M+ people who weren't the default.",
      technologies: ["AI/ML Platform", "Product Management", "Multilingual NLP", "Email Infrastructure", "PRD"],
      highlights: [
        "Co-inventor on patent filed with the USPTO through Yahoo Holdings Inc.",
        "Drove development reaching 700k+ users, generating $35k monthly revenue",
        "Owned roadmap and PRDs for ML models processing 19M+ daily emails",
        "Established go-to internationalization framework for Yahoo Mail's global expansion"
      ],
      color: "border-purple-500",
      bgColor: "bg-purple-50",
      period: "Summer 2025",
      image: yahooProjectImg,
      slides: []
    },
    {
      title: "Bakari Foundation CRM",
      category: "Solutions Architecture",
      description: "Built complete Salesforce CRM system for nonprofit, migrating 2k+ donor records with custom automation.",
      technologies: ["Salesforce NPSP", "Data Migration", "CRM Architecture", "Automation"],
      highlights: [
        "Migrated 2k+ records with custom validation rules",
        "Owned complete technical delivery from design to QA",
        "Educated stakeholders on technical constraints & MVP scope"
      ],
      color: "border-green-500",
      bgColor: "bg-green-50",
      period: "May 2025",
      image: bakariFoundationImg,
      slides: [
        // Add your Google Slides embed URLs here
        "https://docs.google.com/presentation/d/e/2PACX-1vR14UMSguyfWQ4lMfckKj2i3w9-zX3aS0ni3BkE6394TmBgnonQKB1-5EkGDgofNLfwCiPhgbfDSnb7/pubembed?start=false&loop=false&delayms=3000"
      ]
    },
    {
      title: "CAN Kitchen Recipe Finder",
      category: "Product & Engineering",
      description: "Recipe finder web app built with Food Shift nonprofit, optimized for accessibility and social impact.",
      technologies: ["Product Strategy", "Web Development", "Accessibility", "SEO"],
      highlights: [
        "30% improvement in accessibility & SEO scores",
        "End-to-end delivery from concept to deployment", 
        "Strategic nonprofit partnership with Food Shift"
      ],
      color: "border-purple-500",
      bgColor: "bg-purple-50",
      period: "August 2023",
      image: canKitchenImg,
      slides: [
        // Add your Google Slides embed URLs here
      ],
      website: "https://capstonecan.web.app/"
    },
    {
      title: "LA3S: Large-scale Annotation Platform",
      category: "AI Research & Systems",
      description: "Productionized AI research experiment using serverless AWS architecture for automated data collection at scale.",
      technologies: ["AWS Lambda", "MTurk API", "Serverless", "Data Pipeline", "CloudWatch"],
      highlights: [
        "Built fully automated research infrastructure",
        "Serverless architecture with real-time processing",
        "Scaled experiment to 1k+ participants with zero intervention",
        "End-to-end AWS pipeline from collection to storage"
      ],
      color: "border-blue-500",
      bgColor: "bg-blue-50",
      period: "June 2025 - Present",
      slides: [
        // Add your Google Slides embed URLs here
        "https://docs.google.com/presentation/d/e/2PACX-1vSUNS1ZeHR9pvCaNkJNUhLuZHBeDdYPAZK01nOAPg60o1V23dFyi9rIXit8fp5rBa-4lwE6edpbCwcw/pubembed?start=false&loop=false&delayms=3000"
      ]
    },
    {
      title: "Salesforce Monitoring Dashboard",
      category: "Software Engineering",
      description: "Real-time monitoring dashboard for 8k+ cloud services, improving SRE observability and workflows.",
      technologies: ["Grafana", "Java", "API Development", "Cloud Infrastructure"],
      highlights: [
        "8k+ services monitored across public clouds",
        "400% faster API response times for 100+ SREs",
        "Real-time observability & alerting system"
      ],
      color: "border-orange-500",
      bgColor: "bg-orange-50",
      period: "August 2024",
      slides: [
        "https://docs.google.com/presentation/d/e/2PACX-1vSZuOvieWFmlPwjXkmYOfcpdgHBtaiJGqSaC-jvtXiegY-69N3dDWmgIK0i2iny8rtLZbY5XgMb9R69/pubembed?start=false&loop=false&delayms=3000"
      ]
    },
    {
      title: "Deloitte AI Advisory Showcase",
      category: "AI Strategy & Prototyping",
      description: "Three agentic workflow prototypes built with Claude Code, demonstrating how AI accelerates consulting work — from M&A tech due diligence to AI readiness assessments to program execution intelligence.",
      technologies: ["Claude Code", "Agentic Workflows", "MCP Integration", "Chart.js", "AI Advisory"],
      highlights: [
        "TechScan: automated M&A tech due diligence — 847 repos analyzed, risk-ranked, and structured in hours not weeks",
        "AI Compass: AI readiness assessment across 6 dimensions with peer benchmarking and a prioritized 18-month roadmap",
        "ProgramPulse: execution intelligence layer unifying Jira, CMDB, and program data into a single blocker-detection view",
        "Built with Claude Code as the agentic synthesis engine — human-in-the-loop throughout"
      ],
      color: "border-green-500",
      bgColor: "bg-green-50",
      period: "Summer 2026",
      slides: [],
      website: "/deloitte-showcase.html",
      websiteLabel: "VIEW SHOWCASE",
      image: deloitteShowcaseImg
    },
    {
      title: "LaunchPlan — AI Execution OS",
      category: "AI Product Engineering",
      description: "Personal execution OS (React/TypeScript) that automates transformation of raw daily work logs into structured OKR evidence, stakeholder status updates, and annual review artifacts — using Claude Code as the AI synthesis layer.",
      technologies: ["React", "TypeScript", "Claude Code", "OKR Systems", "AI Synthesis"],
      highlights: [
        "Solved the core failure mode in enterprise OKR systems: manual, episodic evidence capture",
        "LLM-based continuous context aggregation maps unstructured work logs directly to key performance metrics",
        "Designed, built, and shipped end-to-end in 8 weeks against a hard shipping target",
        "Validates an enterprise product concept analogous to Lattice and Quantive — built from real PM pain"
      ],
      color: "border-indigo-500",
      bgColor: "bg-indigo-50",
      period: "Jun 2026 – Present",
      slides: [],
      image: launchplanImg
    },
    {
      title: "Astronaut — Infrastructure Intelligence",
      category: "Internal Product (Visa)",
      description: "Agentic execution intelligence platform (React, Flask, MCP, TypeScript) built at Visa to support the migration of 64k+ VMs from VMware ESX to Red Hat OpenShift — collapsing ~40 minutes of manual cross-referencing into under 2 minutes per host lookup across a ~$50M infrastructure modernization initiative.",
      technologies: ["React", "TypeScript", "Python Flask", "MCP", "Agentic Workflows"],
      highlights: [
        "Unified fragmented data from 6 disconnected systems into a single readiness score per host — supporting a $16.1T global payment network operating across 200+ countries",
        "Designed HITL agentic workflows with hybrid rule-based + LLM classification to automate ticket triage and route blocked decommission steps to named technical owners",
        "Defined a taxonomy for recurring migration blockers with automated escalation paths — resolving ownership gaps that were stalling active decommission work",
        "Owned cross-functional OKRs for the 64k+ VM migration; architected Astronaut as a read-only System of Understanding feeding governed reporting platforms"
      ],
      color: "border-violet-500",
      bgColor: "bg-violet-50",
      period: "2026 – Present",
      slides: [],
      image: astronautImg
    }
  ];

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-8">
            PROJECTS
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((project, index) => {
            // Define color schemes for each project
            const colorSchemes = [
              'hover:border-purple-500 hover:bg-purple-50', // Yahoo Multilingual AI
              'hover:border-green-500 hover:bg-green-50',   // Bakari Foundation
              'hover:border-purple-500 hover:bg-purple-50', // CAN Kitchen
              'hover:border-blue-500 hover:bg-blue-50',     // LA3S
              'hover:border-orange-500 hover:bg-orange-50', // Salesforce Dashboard
              'hover:border-green-500 hover:bg-green-50',   // Deloitte AI Showcase
              'hover:border-indigo-500 hover:bg-indigo-50', // LaunchPlan
              'hover:border-violet-500 hover:bg-violet-50', // Astronaut
            ];
            
            return (
              <div key={index} className={`border-4 border-white bg-white ${colorSchemes[index]} group transition-all duration-300`}>
                {project.image && (
                  <div className="h-64 border-b-4 border-black group-hover:border-current">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}
                
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="px-4 py-1 bg-black text-white text-sm font-bold uppercase tracking-wide">
                        {project.category}
                      </span>
                      {project.period && (
                        <span className="text-sm font-bold text-gray-600">
                          {project.period}
                        </span>
                      )}
                    </div>
                    <h3 className="text-3xl font-black text-black mb-4">
                      {project.title}
                    </h3>
                    <p className="text-lg text-black font-medium leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-black text-black mb-4">KEY HIGHLIGHTS</h4>
                    <ul className="space-y-3">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="w-3 h-3 bg-black mt-2 flex-shrink-0"></div>
                          <span className="text-black font-medium">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-black text-black mb-4">TECHNOLOGIES</h4>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-4 py-2 border-2 border-black text-black font-bold text-sm uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Slide Carousel Integration */}
                    <SlideCarousel slides={project.slides || []} title={project.title} />

                    {/* Website Link */}
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white font-bold text-sm uppercase hover:bg-gray-800 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                        {project.websiteLabel || 'VISIT WEBSITE'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;