# Krithish Ravindra Suvarna — Personal Portfolio

A dark, terminal/DevOps-inspired developer portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

🌐 **Live Demo**: [Krithish Suvarna — Full-Stack Developer & Automation Specialist](https://krithish-portfolio.vercel.app/)

---

## ⚡ Highlights & Features

- 🖥️ **Terminal Boot Sequence**: Interactive typewriter intro on initial load.
- 🔄 **Interactive Pipeline Architecture**: Real-time SVG data flow animation showcasing backend lead automation.
- 📜 **Git-Log Work Timeline**: Work history presented in a git-commit hash timeline.
- 🍱 **Process Bento Grid**: Visual breakdown of system architecture, building, automation, and containerized deployment.
- 🎴 **3D Tilt Project Cards**: TeleCRM & Quotation Master case studies with custom architecture mini-flow diagrams and count-up metrics.
- ♿ **Full Accessibility**: Every animation respects `prefers-reduced-motion` with clean static fallbacks.

---

## 🛠️ Tech Stack

- **Core**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS animations, Custom HSL Tokens
- **Motion**: Framer Motion, HTML5 Canvas particle network
- **Icons & Fonts**: Lucide React, JetBrains Mono, Inter

---

## 📂 Project Structure

```
app/
  layout.tsx            — Fonts, metadata, ambient particle background & cursor spotlight
  page.tsx               — Main page assembling sections with section dividers & scroll-to-top control
  globals.css             — Theme tokens, dark grid background, grain overlay & keyframes
components/
  Nav.tsx                 — Sticky navigation with scroll-spy & scroll progress indicator
  Hero.tsx                 — Staggered headline reveal, magnetic CTAs & profile avatar
  BootSequence.tsx          — Terminal typewriter intro sequence
  Pipeline.tsx                — Interactive lead conversion SVG pipeline diagram
  About.tsx                        — Terminal-styled README summary card
  Experience.tsx                    — Git-log timeline for work history
  Process.tsx                        — Workflow bento grid (Design → Build → Automate → Deploy)
  Projects.tsx                        — 3D tilt project cards with MiniFlow data architecture diagrams
  Skills.tsx                              — Categorized skill chips with magnetic hover effects
  Education.tsx                            — Academic history
  Footer.tsx                                — Direct email & social links
  ScrollToTop.tsx                     — Fixed circular scroll progress ring & scroll-to-top button
  SectionDivider.tsx                 — Animated gradient line divider between sections
```

---

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Krithish04/Personal-Portfolio.git
   cd Personal-Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📬 Contact

- **Email**: [suvarnakrithish24@gmail.com](https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=suvarnakrithish24@gmail.com)
- **GitHub**: [github.com/Krithish04](https://github.com/Krithish04)
- **LinkedIn**: [linkedin.com/in/krithish04](https://www.linkedin.com/in/krithish04)