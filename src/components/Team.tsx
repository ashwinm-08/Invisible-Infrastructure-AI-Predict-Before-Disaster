import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Award, Github, Linkedin, Mail } from 'lucide-react';

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
  return (
    <section id="team" className="py-24 bg-[#0D1117] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hackathon Engineers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Meet Team Cortexa
          </h2>

          <p className="text-slate-300 text-base">
            The minds building predictive AI infrastructure to protect urban communities worldwide.
          </p>
        </div>

        {/* 4 Member Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MEMBERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between relative group border border-slate-800 text-center"
            >
              <div className="space-y-4 flex flex-col items-center">
                
                {/* Initials Avatar Circle */}
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} text-slate-950 font-extrabold font-mono text-2xl flex items-center justify-center border-4 border-slate-900 shadow-xl shadow-cyan-950/40 group-hover:scale-105 transition-transform duration-300`}
                >
                  {member.initials}
                </div>

                {/* Name & Role */}
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-700 uppercase tracking-widest inline-block mb-1">
                    {member.badge}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400/90 mt-0.5">
                    {member.role}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-slate-300 text-xs leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Social action buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-3 text-slate-400">
                <a
                  href={member.githubUrl}
                  target={member.githubUrl !== '#' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
                  aria-label={`${member.name} GitHub`}
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={member.linkedinUrl}
                  target={member.linkedinUrl !== '#' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={member.emailUrl}
                  className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
                  aria-label={`${member.name} Email`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
