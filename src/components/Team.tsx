import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const MEMBERS = [
  {
    initials: 'MG',
    name: 'Mahitha Reddy G',
    role: 'Team Lead & AI Architect',
    bio: 'Lead architect behind Cortexa-Vision CV models & spatial defect predictive engine.',
    gradient: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/40',
    badge: 'Team Lead',
    githubUrl: 'https://github.com/MahithaReddy28',
    linkedinUrl: 'https://www.linkedin.com/in/mahitha-reddy-69b167382/',
    emailUrl: 'mailto:mahithareddy9495@gmail.com',
  },
  {
    initials: 'AM',
    name: 'Ashwin M',
    role: 'Full-Stack & Systems Engineer',
    bio: 'Built real-time GIS Health Map command dashboard & municipal work-order sync API.',
    gradient: 'from-teal-400 to-emerald-600',
    borderColor: 'border-teal-500/40',
    badge: 'Member',
    githubUrl: 'https://github.com/ashwinm-08',
    linkedinUrl: 'https://www.linkedin.com/in/ashwin-m-1b02a6369?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    emailUrl: 'mailto:ashwinm.aiml2025@citchennai.net',
  },
  {
    initials: 'RM',
    name: 'Ragavendra M',
    role: 'ML & Computer Vision Specialist',
    bio: 'Fine-tuned object detection pipeline & physics-based structural severity scoring.',
    gradient: 'from-amber-400 to-orange-600',
    borderColor: 'border-amber-500/40',
    badge: 'Member',
    githubUrl: 'https://github.com/ragavendram2007',
    linkedinUrl: 'https://www.linkedin.com/in/ragavendra-er?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    emailUrl: 'mailto:ragavendram.aiml2025@gmail.com',
  },
  {
    initials: 'KA',
    name: 'Kanimozhi A',
    role: 'Data Science & Geospatial Engineer',
    bio: 'Developed DBSCAN clustering algorithms & temporal failure degradation matrices.',
    gradient: 'from-purple-400 to-pink-600',
    borderColor: 'border-purple-500/40',
    badge: 'Member',
    githubUrl: 'https://github.com/',
    linkedinUrl: 'https://www.linkedin.com/in/kanimozhi-engineer',
    emailUrl: 'mailto:kanimozhi9992@gmail.com',
  },
];

export const Team: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="team" className={`py-24 relative border-t transition-colors ${
      theme === 'dark' ? 'bg-[#0D1117] border-slate-800/80 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>The Engineers Behind The Vision</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Team Cortexa</span>.
          </h2>

          <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-base sm:text-lg`}>
            A specialized group of AI architects, full-stack systems engineers, and data scientists.
          </p>
        </div>

        {/* 4 Member Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MEMBERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`glass-panel glass-panel-hover rounded-2xl p-6 border flex flex-col justify-between relative group ${
                theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-lg'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.gradient} text-slate-950 font-bold text-xl flex items-center justify-center border-2 border-slate-950 shadow-xl group-hover:scale-105 transition-transform`}>
                    {member.initials}
                  </div>

                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${
                    member.badge === 'Team Lead'
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 font-bold'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {member.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {member.name}
                  </h3>
                  <span className="text-xs font-mono text-cyan-400 font-semibold block mt-0.5">
                    {member.role}
                  </span>
                </div>

                <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-xs leading-relaxed`}>
                  {member.bio}
                </p>
              </div>

              {/* Social & Contact Buttons */}
              <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} flex items-center justify-between`}>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Connect:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors"
                    title={`${member.name}'s GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors"
                    title={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={member.emailUrl}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
