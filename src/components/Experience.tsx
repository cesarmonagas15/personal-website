import salesforceLogo from '../assets/salesforce-logo.png';
import yahooLogo from '../assets/yahoo-logo.png';
import utAustinLogo from '../assets/ut-austin-logo.png';
import hclLogo from '../assets/hcl-tech.jpeg';
import deloitteLogo from '../assets/deloitte.jpg';
import anthropicLogo from '../assets/anthropic.png';


const Experience = () => {
  const experiences = [
    {
      role: "Claude Builder Ambassador",
      company: "Anthropic",
      location: "Austin, TX",
      period: "August 2025 - Present",
      type: "Growth & Adoption",
      description: "Leading campus community development and AI literacy initiatives to drive Claude adoption among university developers and researchers.",
      achievements: [
        "Founding and scaling UT Claude Builder club to foster AI development skills and expand Claude's campus presence"
      ],
      color: "bg-orange-100 text-orange-800 border-orange-200",
      logo: anthropicLogo
    },
    {
      role: "Teaching Assistant",
      company: "University of Texas at Austin",
      location: "Austin, TX",
      period: "August 2025 - Present",
      type: "Education",
      description: "Supporting full-stack web development instruction, teaching React fundamentals and modern JavaScript frameworks to undergraduate students.",
      achievements: [
        "Mentoring 15+ students in React, Node.js, and database integration while leading weekly lab sessions and code reviews"
      ],
      color: "bg-blue-100 text-blue-800 border-blue-200",
      logo: utAustinLogo
    },
    {
      role: "Product Manager Intern, AI/ML Platform",
      company: "Yahoo!",
      location: "Remote",
      period: "June 2025 – August 2025",
      type: "Product Management",
      description: "Driving the development of multilingual AI/ML features for email classification, bridging research and engineering to create scalable prototypes for international markets.",
      achievements: [
        "Drove development of multilingual email classification tool set to reach 700k+ users and generate $35k monthly revenue",
        "Delivered production-ready ML models through roadmap ownership and PRD creation, processing 19M+ daily email traffic",
        "Bridged research and engineering teams to develop scalable ML prototypes, establishing go-to framework for internationalization"
      ],
      color: "bg-purple-100 text-purple-800 border-purple-200",
      logo: yahooLogo
    },
    {
      role: "Research Assistant, AI & Ethics",
      company: "University of Texas at Austin",
      location: "Austin, TX",
      period: "June 2025 – August 2025",
      type: "Research",
      description: "Conducting cutting-edge research on AI explainability and bias in human decision-making, leveraging AWS cloud infrastructure for large-scale data collection and analysis.",
      achievements: [
        "Conducting research with Professor Maria De-Arteaga on AI explainability to study how LLMs bias human decision-making",
        "Served as SME on experimental design and MTurk workflows; leveraged AWS Lambda + S3 for real-time crowdsourcing",
        "Managed data collection from 3K+ participants using principled sampling methods to support unbiased algorithmic outcomes"
      ],
      color: "bg-green-100 text-green-800 border-green-200",
      logo: utAustinLogo
    },
    {
      role: "Software Engineer Intern, Monitoring & Observability",
      company: "Salesforce",
      location: "San Francisco, CA",
      period: "May 2024 – August 2024",
      type: "Engineering",
      description: "Developed real-time monitoring solutions for enterprise-scale cloud infrastructure, improving observability across thousands of services and enhancing user experience for site reliability engineers.",
      achievements: [
        "Developed and owned real-time monitoring dashboard on Grafana, ensuring observability of 8k+ services across public clouds",
        "Collaborated with product manager and 7-member agile team to design UI and align features with product strategy",
        "Designed, developed and deployed API decreasing request time by 400% and improving UX for 100+ SREs",
        "Retrieved and processed Argus queries via Java-based API integrations to view real-time SLOs of mission-critical AI tools"
      ],
      color: "bg-blue-100 text-blue-800 border-blue-200",
      logo: salesforceLogo
    },
    {
      role: "Technical Program Manager Intern",
      company: "HCL Technologies",
      location: "Remote",
      period: "February 2024 – May 2024",
      type: "Program Management",
      description: "Managed global product resources and client relationships while driving cross-functional collaboration to reduce escalations and improve service delivery efficiency.",
      achievements: [
        "Owned and maintained a global progress tracker, successfully allocating 45% of product resources in APAC and AMER regions",
        "Collaborated with 10+ internal & external cross-functional stakeholders to reduce client escalations by 60% in two months",
        "Partnered with global engineering teams to prioritize 10+ client requests daily, guaranteeing prompt and efficient service delivery"
      ],
      color: "bg-orange-100 text-orange-800 border-orange-200",
      logo: hclLogo
    },
    {
      role: "Software Engineer Intern, Full-Stack",
      company: "Salesforce",
      location: "San Francisco, CA",
      period: "June 2023 – August 2023",
      type: "Engineering",
      description: "Led full-stack development initiatives and team leadership, focusing on user experience optimization and strategic product vision development.",
      achievements: [
        "Spearheaded end-to-end development of 5+ full stack web applications using React, Node, Express, AWS, and PostgreSQL",
        "Led team of three engineer interns in establishing strategic product vision and Agile sprint plan for capstone project",
        "Researched product usability to inform engineering and UX teams, boosting completion rates by 25% in user testing"
      ],
      color: "bg-blue-100 text-blue-800 border-blue-200",
      logo: salesforceLogo
    },
    {
      role: "Strategy Consulting Intern",
      company: "Deloitte Consulting",
      location: "Austin, TX",
      period: "June 2022 – July 2022",
      type: "Consulting",
      description: "Led cross-functional teams on nation-wide consulting projects, delivering impact-driven solutions and strategic recommendations to key stakeholders.",
      achievements: [
        "Led teams of 8+ on two nation-wide projects, leveraging top-tier consulting practices and reporting to five key stakeholders",
        "Synthesized a pro-bono and impact-driven solution to expand service access for 50K+ United Way clients in Central Maryland"
      ],
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      logo: deloitteLogo
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-black mb-8">
            EXPERIENCE
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-600 via-red-600 to-yellow-400"></div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="border-4 border-black p-8 bg-white relative">
              {exp.logo && (
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  className="absolute top-8 right-8 h-12 md:h-16 w-auto object-contain hover:grayscale-0 transition-all duration-300"
                />
              )}

              <div className="pr-0 md:pr-24">
                <div className="mb-6">
                  <div className="flex items-center gap-2 md:gap-4 mb-2 flex-wrap">
                    <h3 className="text-2xl md:text-3xl font-black text-black">{exp.role}</h3>
                    <span className={`px-3 md:px-4 py-1 text-white text-xs md:text-sm font-bold uppercase ${
                      exp.type === 'Product Management' ? 'bg-blue-600' :
                      exp.type === 'Engineering' ? 'bg-red-600' :
                      exp.type === 'Research' ? 'bg-yellow-600' :
                      exp.type === 'Consulting' ? 'bg-green-600' :
                      exp.type === 'Education' ? 'bg-purple-600' :
                      exp.type === 'Program Management' ? 'bg-orange-600' :
                      exp.type === 'Growth & Adoption' ? 'bg-pink-600' :
                      'bg-black'
                    }`}>
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-black mb-2">{exp.company}</p>
                  <p className="text-lg font-medium text-gray-600">{exp.location} • {exp.period}</p>
                </div>

                <p className="text-lg text-black mb-8 leading-relaxed font-medium">
                  {exp.description}
                </p>

                <div>
                  <h4 className="text-xl font-black text-black mb-4">KEY ACHIEVEMENTS</h4>
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-4 h-4 bg-black mt-1 flex-shrink-0"></div>
                        <span className="text-black font-medium leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;