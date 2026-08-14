# 🛰️ Invisible Infrastructure AI — Predict Before Disaster

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Production-00E5C7?style=for-the-badge&logo=vercel&logoColor=black)](https://invisible-infrastructure-five.vercel.app)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-purple?style=for-the-badge&logo=framer)](https://framer.com/motion)

> **"An AI platform that detects, scores, and predicts infrastructure failures — from a single photo — before they become accidents."**

Built with ❤️ by **Team Cortexa** for the National Hackathon 2026.

---

## 🌐 Live Production Demo

- 🚀 **Main Production Web App**: **[https://invisible-infrastructure-five.vercel.app](https://invisible-infrastructure-five.vercel.app)**
- 📁 **GitHub Repository**: **[https://github.com/ashwinm-08/Invisible-Infrastructure-AI-Predict-Before-Disaster](https://github.com/ashwinm-08/Invisible-Infrastructure-AI-Predict-Before-Disaster)**

---

## 👥 Team Cortexa

| Member | Role | Social & Contact Links |
| :--- | :--- | :--- |
| **Mahitha Reddy G** | Team Lead & AI Architect | [![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=flat-square&logo=github)](https://github.com/MahithaReddy28) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/mahitha-reddy-69b167382/) [![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=flat-square&logo=gmail)](mailto:mahithareddy9495@gmail.com) |
| **Ashwin M** | Full-Stack & Systems Engineer | [![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=flat-square&logo=github)](https://github.com/ashwinm-08) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/ashwin-m-1b02a6369?utm_source=share_via&utm_content=profile&utm_medium=member_android) [![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=flat-square&logo=gmail)](mailto:ashwinm.aiml2025@citchennai.net) |
| **Ragavendra M** | ML & Computer Vision Specialist | [![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=flat-square&logo=github)](https://github.com/ragavendram2007) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/ragavendra-er?utm_source=share_via&utm_content=profile&utm_medium=member_android) [![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=flat-square&logo=gmail)](mailto:ragavendram.aiml2025@gmail.com) |
| **Kanimozhi A** | Data Science & Geospatial Engineer | [![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=flat-square&logo=github)](https://github.com/) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/kanimozhi-engineer) [![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=flat-square&logo=gmail)](mailto:kanimozhi9992@gmail.com) |

---

## ⚡ Problem & Core Solution

### The Problem
Cities repair infrastructure **reactively** — after a complaint, a breakdown, or a serious accident. Roads, bridges, poles, drains, and transformers silently degrade for months. Emergency repairs cost up to **4.5x more** than preventive maintenance.

### The Solution
Point your phone camera. **Invisible Infrastructure AI** automatically:
1. **Detects** 6+ defect types (potholes, structural cracks, pole tilts, transformer leaks, drainage wall shifts).
2. **Scores** defect severity from 0.0 to 10.0 using physics-based risk algorithms.
3. **Predicts** estimated failure windows (days to weeks ahead).
4. **Geo-Clusters** nearby defects into unified municipal work orders.

---

## 🧠 End-to-End Intelligence Pipeline (6 Stages)

```
[1. Capture] ➔ [2. Detect] ➔ [3. Score] ➔ [4. Predict] ➔ [5. Cluster] ➔ [6. Report & Map]
```

1. **Capture**: Image/Video upload with EXIF geo-location metadata parsing.
2. **Detect**: YOLO-based object detection fine-tuned on structural defect classes.
3. **Score**: Severity matrix calculator combining volume size, location & asset criticality.
4. **Predict**: Time-series structural degradation model estimating failure probability.
5. **Cluster**: DBSCAN spatial clustering grouping nearby reports into single dispatch jobs.
6. **Report & Map**: Automated municipal work-order dispatch & live GIS command map.

---

## 🗺️ Interactive Command Center Features

- 📍 **Infrastructure Health Map**: Real-time vector GIS map with pulsing color-coded markers (🔴 Critical, 🟠 High Risk, 🟢 Stable).
- 📸 **Interactive AI File Scanner**: Drag-and-drop file inspection tool with live scan HUD log and instant diagnostic determination.
- 📊 **Recharts Data Vis**: Live risk distribution breakdown across municipal asset categories.
- ⚡ **Auto Work-Order Dispatch**: One-click ward engineer notification & task assignment.

---

## 🏗️ Project Structure

```
cortexa-invisible-infrastructure/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # Sticky glassmorphism nav with scrollspy
│   │   ├── Hero.tsx           # Dynamic AI scan overlay & team badges
│   │   ├── Problem.tsx        # 3-column crisis card breakdown
│   │   ├── Solution.tsx       # 3-step visual flow & animated counters
│   │   ├── FileAnalyzer.tsx   # Interactive AI image inspector & upload
│   │   ├── HowItWorks.tsx     # 6-step intelligence pipeline
│   │   ├── Features.tsx       # 6-card capability grid
│   │   ├── Architecture.tsx   # 5-layer system stack diagram
│   │   ├── HealthMap.tsx      # Interactive GIS command dashboard
│   │   ├── Impact.tsx         # 4-card civic value breakdown
│   │   ├── Roadmap.tsx        # 4-phase horizontal timeline
│   │   ├── Team.tsx           # Team Cortexa member cards & socials
│   │   ├── CTASection.tsx     # Closing banner & contact trigger
│   │   └── Footer.tsx         # Footer links & hackathon attribution
│   ├── App.tsx                # Main single-page assembly
│   ├── main.tsx               # React entrypoint
│   ├── index.css              # Cyber theme & Tailwind v4 design system
│   └── vite-env.d.ts          # Type declarations
├── index.html                 # Main HTML template with Space Grotesk fonts
├── package.json               # Dependencies and build scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite bundler configuration
├── vercel.json                # Vercel deployment settings
└── README.md                  # Comprehensive documentation
```

---

## 🛠️ Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ashwinm-08/Invisible-Infrastructure-AI-Predict-Before-Disaster.git
cd Invisible-Infrastructure-AI-Predict-Before-Disaster
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build Production Bundle
```bash
npm run build
```

---

## 📜 License & Copyright

&copy; 2026 **Team Cortexa** (Mahitha Reddy G, Ashwin M, Ragavendra M, Kanimozhi A). All rights reserved. Built for National Hackathon 2026.
