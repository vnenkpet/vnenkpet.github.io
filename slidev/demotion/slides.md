---
title: Role Change & Compensation Request
layout: cover
---

<div class="cover-slide">
  <div class="cover-bg" aria-hidden="true" />
  <div class="cover-overlay">
    <h1
      v-motion
      :initial="{ opacity: 0, y: 28, scale: 0.96 }"
      :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }"
      class="cover-title"
    >
      Role Change & Compensation Request
    </h1>
    <div
      v-motion
      :initial="{ opacity: 0, y: 16 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 200, ease: [0.22, 1, 0.36, 1] } }"
      class="cover-name-block"
    >
      <p class="cover-name">Petr Vnenk</p>
      <p class="cover-role">Senior engineer, former Tech Lead</p>
    </div>
  </div>
</div>

<style>
.cover-slide {
  position: absolute;
  inset: 0;
}
.cover-bg {
  position: absolute;
  inset: 0;
  background-image: url(/assets/pvn.png);
  background-size: cover;
  background-position: right center;
  background-repeat: no-repeat;
}
.cover-overlay {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  padding: 0 3rem;
  min-height: 100%;
  max-width: 55%;
  z-index: 1;
}
.cover-title {
  font-size: clamp(1rem, 2.2vw, 1.5rem);
  margin: 0;
  margin-top: 4vh;
  line-height: 1.2;
}
.cover-name-block {
  margin-bottom: 2rem;
}
.cover-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.15rem 0;
  letter-spacing: 0.02em;
}
.cover-role {
  font-size: 1rem;
  opacity: 0.95;
  margin: 0;
}
</style>

---

# Career & Projects

<Timeline3D />

---

<div class="highlights-title-slide">
  <div class="highlights-bg-tiles" aria-hidden="true">
    <HighlightsGrid />
  </div>
  <div class="highlights-gradient" aria-hidden="true"></div>
  <HighlightsPulse />
  <h1 class="highlights-heading">Project Highlights</h1>
</div>

<style>
.highlights-title-slide {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 2rem;
  overflow: hidden;
  background: transparent;
}
.highlights-bg-tiles {
  position: fixed;
  left: -2px;
  top: -2px;
  right: -2px;
  bottom: -8px;
  z-index: 0;
  overflow: hidden;
  opacity: 1;
  perspective: 800px;
  perspective-origin: 50% 50%;
}
.highlights-gradient {
  position: fixed;
  left: -2px;
  top: -2px;
  right: -2px;
  bottom: -8px;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.7s ease-out;
  background: linear-gradient(140deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.1) 70%);
}
.highlights-title-slide.slide-entered .highlights-gradient {
  opacity: 1;
}
.highlights-bg-rotated {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 600%;
  height: 600%;
  margin-left: -300%;
  margin-top: -300%;
  transform-style: preserve-3d;
  transform-origin: center center;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
}
.highlights-heading {
  position: relative;
  z-index: 2;
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0;
  color: #fff;
  opacity: 0;
  transform: translateY(24px) scale(0.96);
  animation: highlights-heading-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.6),
    0 2px 8px rgba(0, 0, 0, 0.5),
    0 4px 16px rgba(0, 0, 0, 0.4);
}
@keyframes highlights-heading-in {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>

---
layout: ProjectShowcase
image: /assets/lusk.png
---

## Lusk

### Pre-Applifting

- **Microservices Node.js platform** — PHP and Node.js; refactoring and evolution of the backend
- Automated **email scraping** and **document importing** pipelines
- **Real-time WebSockets-based chat** solution for videocalls
- Overtook as **main backend engineer** over time

---
layout: ProjectShowcase
image: /assets/lusk.png
---

## Lusk — Technical challenges & accomplishments

- Wrote an **email conversation/candidate application parser** which imports candidates into the app directly
- Solved major technical challenges related to **app startup** left by previous engineers (saved a lot of hassle)
- **Refactored a large part** of the application for better code and readability
- Learned **WebSockets with PHP** for real-time chat implementation in another system

---
layout: ProjectShowcase
image: /assets/digitoo.jpg
---

## Digitoo

### 2019–2021

- Tech‑led a team for ~2 years: ran Scrum ceremonies, guided hiring, and set up deployment pipelines
- Transformed from multi‑provider integration to a standalone product with high client satisfaction

---
layout: ProjectShowcase
image: /assets/digitoo.jpg
---

## Digitoo — Technical challenges & accomplishments

- Oversaw the whole implementation **start to finish**
- Helped with **hiring and team leading** on the client side
- **Communication with technical partners** (Datasentics, Wflow, Rossum)
- Wrote a comprehensive **invoice data validation module** connected to tax services (VIES/ARES)

---
layout: ProjectShowcase
image: /assets/refsite.png
---

## Refsite

### 2021

- Main backend developer for a photovoltaic installations platform
- Mentored junior engineers while delivering a robust, scalable system

---
layout: ProjectShowcase
image: /assets/refsite.png
---

## Refsite — Technical challenges & accomplishments

- **Pioneered Prisma v2** on the project
- Designed the **GraphQL schema and domains** necessary for this
- Helped set up and implement the backend, **aiding 2 junior BE engineers**

---
layout: ProjectShowcase
image: /assets/sakurabook.png
---

## Sakurabook

### 2022

- Developed a Japanese Shopify plugin enabling localized short‑term rental and in‑person service purchases
- Full‑stack delivery with internationalization and e‑commerce integration

---
layout: ProjectShowcase
image: /assets/sakurabook.png
---

## Sakurabook — Technical challenges & accomplishments

- Implemented a **NestJS application** acting as a Shopify plugin connected to billing providers (Stripe, Shopify and **Google Pub/Sub**) and **Google Calendar** integration for booking
- Helped **reform the whole technical brief** because there were factual issues with it (nonsensical requirements)
- Helped with communication with the **Japanese client** (can communicate Japanese at **N3 intermediate** level)
- Helped set up and implement the backend, **aiding 2 junior BE engineers**

---
layout: ProjectShowcase
image: /assets/investbay.png
---

## Investbay

### 2023

- Architected a pragmatic workaround to enable Google Sign‑In on an unsupported SaaS backend
- Leveraged internal templates and creative compromises to ship a production‑ready solution

---
layout: ProjectShowcase
image: /assets/remangu.webp
---

## Remangu

### 2023–present

- Led development from greenfield to production in a fast‑moving team (up to 5 developers)
- Pivoted to an AI‑assisted full‑stack approach, accelerating development
- Delivered cloud‑desktop platform for game studios in 2 months for GDC 2023
- Created playtesting platform demo for GDC 2025 with pre‑release AWS tech

---
layout: ProjectShowcase
image: /assets/remangu.webp
---

## Remangu — Technical challenges & accomplishments

- **Main engineer** of the whole platform for 3 years now
- Currently the **only full-stack engineer**
- Heavily transformed the development into **AI-powered engineering** in cooperation with a very technical client
- Helping **shaping and improving** the requested features proactively

---
layout: ProjectShowcaseRight
image: /assets/skoala.png
---

## Skoala

- Helped with the inital setup of the project
- **Battle test of the backend template** I've been working on — proved it in production
- Checked **most of the boxes** needed for a new project to get **up and running fast**
- Validated templates, tooling, and practices across a real client delivery


---
layout: ProjectShowcase
image: /assets/deliella.png
---

## Deliciously Ella

### 2025–present

- Analytical and architectural role on a complex legacy codebase
- Proposed refactoring strategies and debt removal plans
- Established a clear technical roadmap for the platform

---
layout: ProjectShowcase
image: /assets/deliella.png
---

## Deliciously Ella — Technical challenges & accomplishments

- Performed an **AI-driven analysis** of the whole codebase to fill in basically non-existing technical documentation, including analysis of current mobile apps to serve as materials for new backend
- Proposed a **complete rewrite** of the backend systems and APIs to improve maintainability and developer velocity
- Currently serving as **technical overview** over another engineer and driving **AI-powered development** in our little BE team

---
layout: SectionTitle
---

# Internal Work & Representing Applifting

---
layout: ProjectShowcaseRight
image: /assets/internal/internal.png
---

## Tech Leading & Internal Work

- Main author and long-term maintainer of Applifting's backend/full-stack templates, powering **Skoala**, Sakurabook, Refsite, Remangu, Investbay, Toggl Rounder, Deliciously Ella, Hannover Messe, and others
- Revamp of the entire **Node.js competency model**
- Creation and maintenance of a **Node.js tech radar** (frameworks, libraries, tooling)
- Creation and maintenance of a **backend/Node.js knowledge base** for internal use

---
layout: ProjectShowcaseRight
image: /assets/vse/photo.jpeg
---

## University of Economics in Prague

- Co-teaching the **Web Project Development** course (backend focus)
- Proposed and implemented a major revamp of the backend tech stack based on Applifting's internal templates
- Updated practical classes for backend best practices across varying student skill levels
- Created a new practical class focused on **AI-driven development**
- Two course runs: first teaching support and improvements; second full tech-stack revamp
- Transitioning from active teaching to a technical-support role

---
layout: ProjectShowcaseRight
image: /assets/crewtalks/prisma.png
---

## Crew Talks

- Talk on **Prisma 2** shortly after release with a practical live example
- Talk on **Cursor and agentic development** before mainstream adoption — complete web game without writing code manually

---
layout: SectionTitle
---

# Other Skills

---
layout: ProjectShowcaseRight
video: /assets/bladeimpact/video.mp4
---

## Blade Impact VR

- Solo development and release of a **commercial VR title** ([bladeimpactvr.com](https://www.bladeimpactvr.com/))
- Full lifecycle: learning, development, release, and marketing
- **VR / Unity / C#** — handled independently
- Generated several thousand USD in revenue to date

---
layout: ContentStagger
---

# Going Forward...

- **Role change**: Step back from Tech Lead to **Senior** — focus on hands‑on project work and technical depth.
- **Ongoing contribution**: Support the new Tech Lead in **non‑project time** (reviews, standards, onboarding).
- **Longer term**: Open to growing into **architect** when it feels natural. For now: enjoy delivery and help drive **AI adoption** in the company.

---
layout: ContentStagger
---

# What I'm asking

- **Role change**: Step back from Tech Lead to **Senior** — focus on hands‑on project work and technical depth.
- **Compensation**: Target <span v-mark.underline.orange>**top of Senior band (750)**</span> given experience and impact (tech lead since ~2022, templates, greenfield & legacy delivery).

<SalaryLine />

- **Ongoing contribution**: Support the new Tech Lead in **non‑project time** (reviews, standards, onboarding).

---
layout: DiagramShowcase
---

## Technical challenges

### Example stack

- **Full-stack architecture** — React, GraphQL/REST, NestJS, Prisma, Postgres
- **Integrations** — AWS, Stripe, and other third-party services

---
layout: SectionTitle
---

# Thank you
