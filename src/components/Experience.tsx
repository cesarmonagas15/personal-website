import { useState } from 'react';
import visaLogo from '../assets/visa-logo.png';
import salesforceLogo from '../assets/salesforce-logo.png';
import yahooLogo from '../assets/yahoo-logo.png';
import utAustinLogo from '../assets/ut-austin-logo.png';
import hclLogo from '../assets/hcl-tech.jpeg';
import deloitteLogo from '../assets/deloitte.jpg';
import anthropicLogo from '../assets/anthropic.png';

type ExperienceItem = {
  role: string; company: string; location: string; period: string;
  discipline: string; chapter: string; thesis: string; impact: string[];
  accent: string; logo: string;
};

const experiences: ExperienceItem[] = [
  { role: 'Associate Technical Product Manager', company: 'Visa', location: 'Denver, CO · Hybrid', period: '2026 — Present', discipline: 'AI Product · Payments', chapter: 'OPERATING AT GLOBAL SCALE', thesis: 'Architecting AI-native workflows for the infrastructure behind global commerce.', impact: ['$16.1T in annual payment volume across 200+ countries', 'Governance, observability, and operational readiness for platform programs'], accent: 'bg-blue-600', logo: visaLogo },
  { role: 'Claude Builder Ambassador', company: 'Anthropic', location: 'Austin, TX', period: 'Aug — Nov 2025', discipline: 'AI Adoption', chapter: 'MAKING AI USEFUL', thesis: 'Built a campus community around practical AI literacy and responsible creation.', impact: ["Founded and scaled UT's Claude Builder club for developers and researchers"], accent: 'bg-orange-500', logo: anthropicLogo },
  { role: 'Teaching Assistant', company: 'UT Austin', location: 'Austin, TX', period: 'Aug — Dec 2025', discipline: 'Technical Education', chapter: 'MAKING AI USEFUL', thesis: 'Turned full-stack concepts into practical skills for the next cohort of builders.', impact: ['Mentored 15+ students across React, Node.js, databases, and code reviews'], accent: 'bg-purple-600', logo: utAustinLogo },
  { role: 'Product Manager Intern, AI/ML Platform', company: 'Yahoo!', location: 'Remote', period: 'Jun — Aug 2025', discipline: 'AI Product', chapter: 'MAKING AI USEFUL', thesis: 'Translated multilingual ML research into a product built for international markets.', impact: ['700K+ users reached · $35K monthly revenue opportunity', 'Roadmap and PRDs for models processing 19M+ emails daily'], accent: 'bg-violet-600', logo: yahooLogo },
  { role: 'Research Assistant, AI & Ethics', company: 'UT Austin', location: 'Austin, TX', period: 'Jun — Aug 2025', discipline: 'Responsible AI', chapter: 'MAKING AI USEFUL', thesis: 'Studied how AI explanations shape human judgment—and how to measure that responsibly.', impact: ['Experimental infrastructure and sampling for 3K+ participants', 'AWS Lambda + S3 workflows for real-time crowdsourced research'], accent: 'bg-yellow-500', logo: utAustinLogo },
  { role: 'Software Engineer Intern, Observability', company: 'Salesforce', location: 'San Francisco, CA', period: 'May — Aug 2024', discipline: 'Cloud Infrastructure', chapter: 'LEARNING THE SYSTEMS', thesis: 'Made complex cloud systems easier for reliability teams to see, trust, and operate.', impact: ['Real-time observability across 8K+ services', '4× faster API response times for 100+ SREs'], accent: 'bg-red-600', logo: salesforceLogo },
  { role: 'Technical Program Manager Intern', company: 'HCLTech', location: 'Remote', period: 'Feb — May 2024', discipline: 'Program Management', chapter: 'LEARNING THE SYSTEMS', thesis: 'Coordinated the people, priorities, and resources behind global technology delivery.', impact: ['Allocated 45% of product resources across APAC and AMER', 'Reduced client escalations 60% in two months'], accent: 'bg-orange-600', logo: hclLogo },
  { role: 'Software Engineer Intern, Full-Stack', company: 'Salesforce', location: 'San Francisco, CA', period: 'Jun — Aug 2023', discipline: 'Product Engineering', chapter: 'BUILDING THE FOUNDATION', thesis: 'Learned to build end to end—and to connect technical choices to user outcomes.', impact: ['Built 5+ full-stack applications across React, Node, AWS, and PostgreSQL', 'Improved completion rates 25% through usability research'], accent: 'bg-blue-600', logo: salesforceLogo },
  { role: 'Strategy Consulting Intern', company: 'Deloitte Consulting', location: 'Austin, TX', period: 'Jun — Jul 2022', discipline: 'Strategy', chapter: 'BUILDING THE FOUNDATION', thesis: 'Started with the problem: align teams, understand users, and make strategy actionable.', impact: ['Led teams of 8+ across two nationwide projects', 'Expanded the potential reach of services for 50K+ United Way clients'], accent: 'bg-emerald-600', logo: deloitteLogo },
];

const signals = [
  { value: '$16.1T', label: 'payment volume supported' },
  { value: '200+', label: 'countries & territories' },
  { value: '19M+', label: 'daily emails in scope' },
  { value: '8K+', label: 'cloud services observed' },
];

const expertise = [
  { title: 'AI PRODUCT', note: 'Turning emerging technology into useful products', color: 'bg-blue-600', roles: [0, 1, 3] },
  { title: 'SYSTEMS & ENGINEERING', note: 'Understanding how reliable technology gets built', color: 'bg-red-600', roles: [5, 7] },
  { title: 'RESEARCH & TEACHING', note: 'Asking better questions and sharing what I learn', color: 'bg-yellow-500', roles: [2, 4] },
  { title: 'STRATEGY & DELIVERY', note: 'Aligning people, priorities, and execution', color: 'bg-emerald-600', roles: [6, 8] },
];

const Experience = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = experiences[selectedIndex];

  return (
  <section id="experience" className="bg-white py-20 sm:py-28">
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid gap-8 border-b-4 border-black pb-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
        <div>
          <p className="mb-4 text-sm font-black tracking-[0.24em] text-blue-600">EXPERIENCE</p>
          <h2 className="text-5xl font-black leading-[0.88] text-black sm:text-7xl md:text-8xl">WORK WITH<br />A PURPOSE.</h2>
        </div>
        <div>
          <p className="max-w-xl text-2xl font-bold leading-tight text-black sm:text-3xl">I want to build technology that works for more people, in more places.</p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">That has taken me through strategy, software engineering, AI research, and product. Different roles, same curiosity: how can technology be more useful, accessible, and human?</p>
        </div>
      </div>

      <div className="grid grid-cols-2 border-x-4 border-b-4 border-black lg:grid-cols-4">
        {signals.map((signal, index) => (
          <div key={signal.value} className={`border-black p-5 sm:p-7 ${index % 2 !== 0 ? 'border-l-4' : ''} ${index > 1 ? 'border-t-4 lg:border-t-0' : ''} lg:border-l-4 lg:first:border-l-0`}>
            <p className="text-3xl font-black text-black sm:text-4xl">{signal.value}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-500 sm:text-sm">{signal.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 sm:mt-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div><p className="text-sm font-black tracking-[0.24em] text-red-600">MY CAREER MAP</p><h3 className="mt-2 text-3xl font-black text-black sm:text-4xl">HOW THE PIECES CONNECT.</h3></div>
          <p className="hidden max-w-xs text-right text-sm font-semibold text-gray-500 sm:block">Choose any role to see what I worked on and what it taught me.</p>
        </div>

        <div className="career-mindmap border-4 border-black bg-[#f7f4ec] p-4 sm:p-7 lg:p-10">
          <div className="grid gap-5 xl:grid-cols-[1fr_250px_1fr] xl:items-center xl:gap-10">
            <div className="space-y-4">
              {expertise.slice(0, 2).map((area) => (
                <div key={area.title} className="career-branch career-branch-left bg-white p-5">
                  <div className="flex items-center gap-3"><span className={`h-3 w-3 ${area.color}`} /><h4 className="text-sm font-black tracking-[0.12em] text-black">{area.title}</h4></div>
                  <p className="mt-2 text-sm font-semibold text-gray-500">{area.note}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {area.roles.map((roleIndex) => <button key={roleIndex} type="button" onClick={() => setSelectedIndex(roleIndex)} className={`career-role-chip ${selectedIndex === roleIndex ? 'career-role-chip-active' : ''}`}><span>{experiences[roleIndex].company}</span><small>{experiences[roleIndex].period.match(/\d{4}/)?.[0]}</small></button>)}
                  </div>
                </div>
              ))}
            </div>

            <div className="career-center relative z-10 order-first flex aspect-square w-full max-w-[250px] flex-col items-center justify-center justify-self-center rounded-full bg-black p-7 text-center text-white xl:order-none">
              <span className="mb-3 text-2xl" aria-hidden="true">✦</span>
              <p className="text-xs font-black tracking-[0.18em] text-yellow-400">THE NORTH STAR</p>
              <p className="mt-3 text-lg font-black leading-tight">Build technology that works for more people, in more places.</p>
            </div>

            <div className="space-y-4">
              {expertise.slice(2).map((area) => (
                <div key={area.title} className="career-branch career-branch-right bg-white p-5">
                  <div className="flex items-center gap-3"><span className={`h-3 w-3 ${area.color}`} /><h4 className="text-sm font-black tracking-[0.12em] text-black">{area.title}</h4></div>
                  <p className="mt-2 text-sm font-semibold text-gray-500">{area.note}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {area.roles.map((roleIndex) => <button key={roleIndex} type="button" onClick={() => setSelectedIndex(roleIndex)} className={`career-role-chip ${selectedIndex === roleIndex ? 'career-role-chip-active' : ''}`}><span>{experiences[roleIndex].company}</span><small>{experiences[roleIndex].period.match(/\d{4}/)?.[0]}</small></button>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 grid overflow-hidden border-4 border-black bg-white md:grid-cols-[190px_1fr]">
            <div className="flex items-center justify-between gap-4 border-b-4 border-black p-5 md:block md:border-b-0 md:border-r-4">
              <img src={selected.logo} alt={`${selected.company} logo`} className="h-11 max-w-28 object-contain object-left md:mb-8" />
              <div>
                <p className="text-xs font-black tracking-wider text-red-600">{selected.period}</p>
                <p className="mt-1 text-sm font-bold text-gray-500">{selected.location}</p>
              </div>
            </div>
            <div className="p-5 sm:p-7">
              <span className={`${selected.accent} inline-block px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white`}>{selected.discipline}</span>
              <h4 className="mt-4 text-2xl font-black leading-tight text-black sm:text-3xl">{selected.role}</h4>
              <p className="mt-1 text-xl font-bold text-gray-400">{selected.company}</p>
              <p className="mt-4 max-w-3xl text-lg font-semibold leading-relaxed text-black">{selected.thesis}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {selected.impact.map((item) => <li key={item} className="flex gap-3 text-sm font-bold leading-snug text-gray-700"><span className={`mt-1.5 h-3 w-3 shrink-0 ${selected.accent}`} aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Experience;
