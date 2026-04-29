/* ============================================================
   DATA – ROADMAP
============================================================ */
const years = [
    { id: 'r26', year: '2026', title: { de: "Next Horizon", en: "Next Horizon", sq: "Horizonti i ardhshëm" }, desc: { de: "Web3 & Cloud Scaling.", en: "Web3 & Cloud Scaling.", sq: "Web3 & Skalimi." }, icons: ['fa-brands fa-ethereum', 'fa-solid fa-cloud'], long: { de: "Die Vision für 2026 ist die vollständige Dezentralisierung. Ich plane die Integration von Smart Contracts in Unternehmensprozesse und den Aufbau von hochskalierbaren Edge-Computing Architekturen.", en: "The vision for 2026 is full decentralization. Planning smart contract integration and scalable edge computing architectures.", sq: "Vizioni për vitin 2026 është deçentralizimi i plotë." } },
    { id: 'r25', year: '2025', title: { de: "AI & Scalability", en: "AI & Scalability", sq: "AI dhe Skalueshmëria" }, desc: { de: "KI-Workflows.", en: "AI workflows.", sq: "Proceset AI." }, icons: ['fa-solid fa-robot', 'fa-solid fa-brain'], long: { de: "Zentrierung auf KI-Modelle und RAG-Systeme zur effizienten Datenverarbeitung.", en: "Focusing on AI models and RAG systems.", sq: "Fokusi në modelet AI dhe sistemet RAG." } },
    { id: 'r1',  year: '2024', title: { de: "SaaS Innovation", en: "SaaS Innovation", sq: "SaaS Inovacion" }, desc: { de: "Cloud-native B2B Apps.", en: "Cloud-native B2B apps.", sq: "Aplikacione cloud-native." }, icons: ['fa-brands fa-docker', 'fa-brands fa-aws'], long: { de: "Entwicklung hochverfügbarer SaaS-Lösungen mittels Docker und AWS.", en: "Development of high-availability SaaS solutions using Docker and AWS.", sq: "Zhvillimi i zgjidhjeve SaaS me Docker dhe AWS." } },
    { id: 'r2',  year: '2023', title: { de: "E-Commerce Core", en: "E-Commerce Core", sq: "Baza e E-Commerce" }, desc: { de: "API & Checkout.", en: "API & Checkout.", sq: "API & Checkout." }, icons: ['fa-solid fa-bolt', 'fa-solid fa-server'], long: { de: "Optimierung kritischer Checkout-Prozesse und API-Strukturen.", en: "Optimization of critical checkout processes and API structures.", sq: "Optimizimi i proceseve të arkëtimit." } },
    { id: 'r22', year: '2022', title: { de: "Backend Excellence", en: "Backend Excellence", sq: "Backend Excellence" }, desc: { de: "Node.js & SQL.", en: "Node.js & SQL.", sq: "Node.js & SQL." }, icons: ['fa-brands fa-node-js', 'fa-solid fa-database'], long: { de: "Vertiefung in komplexe Serverarchitekturen.", en: "Deep dive into complex server architectures.", sq: "Thellimi në arkitekturat e serverëve." } },
    { id: 'r21', year: '2021', title: { de: "Frontend Mastery", en: "Frontend Mastery", sq: "Frontend Mastery" }, desc: { de: "React & State Mgmt.", en: "React & State Mgmt.", sq: "React & State Mgmt." }, icons: ['fa-brands fa-react', 'fa-brands fa-js'], long: { de: "Spezialisierung auf moderne Frontend-Entwicklung mit React.", en: "Specialization in modern frontend development with React.", sq: "Specializimi në zhvillimin e frontend-it." } },
    { id: 'r19', year: '2019', title: { de: "The Start", en: "The Start", sq: "Fillimi" }, desc: { de: "Official Entry.", en: "Official Entry.", sq: "Fillimi zyrtar." }, icons: ['fa-solid fa-code', 'fa-solid fa-terminal'], long: { de: "Erste Schritte in der professionellen Softwareentwicklung.", en: "First steps in professional software development.", sq: "Hapat e parë në zhvillimin e softuerit." } }
];

/* ============================================================
   DATA – PROJECTS
============================================================ */
const projects = [
    {
        id: 'p1',
        tag: { de: "Web App", en: "Web App", sq: "Aplikacion Web" },
        title: { de: "Developer Portfolio", en: "Developer Portfolio", sq: "Portfolio Developer" },
        desc: { de: "Dieses Portfolio — gebaut mit reinem HTML, CSS & JS. Animationen, Mehrsprachigkeit und Dark Mode.", en: "This portfolio — built with pure HTML, CSS & JS. Animations, multilanguage and dark mode.", sq: "Ky portfolio — ndërtuar me HTML, CSS & JS." },
        icons: ['fa-brands fa-html5', 'fa-brands fa-css3-alt', 'fa-brands fa-js'],
        long: { de: "Ein vollständig selbst entwickeltes Portfolio. Features: Scramble-Text-Effekt, Spotlight-Karten, Particle-System, Dark/Light Mode, 3-sprachige UI (DE/EN/SQ) und ein animiertes Roadmap-Timeline.", en: "A fully self-developed portfolio. Features: scramble text effect, spotlight cards, particle system, dark/light mode, 3-language UI (DE/EN/SQ) and an animated roadmap timeline.", sq: "Një portfolio i zhvilluar plotësisht vetë." }
    },
    {
        id: 'p2',
        tag: { de: "SaaS Plattform", en: "SaaS Platform", sq: "Platformë SaaS" },
        title: { de: "E-Commerce Backend", en: "E-Commerce Backend", sq: "Backend E-Commerce" },
        desc: { de: "Hochperformantes Backend für Online-Shops mit REST API, Auth und Zahlungsintegration.", en: "High-performance backend for online shops with REST API, auth and payment integration.", sq: "Backend me performancë të lartë për dyqane online." },
        icons: ['fa-brands fa-node-js', 'fa-solid fa-database', 'fa-solid fa-bolt'],
        long: { de: "Entwicklung einer skalierbaren E-Commerce-Infrastruktur mit Node.js und PostgreSQL. Features: JWT-Auth, Stripe-Integration, Redis-Caching und Docker-Deployment.", en: "Development of a scalable e-commerce infrastructure with Node.js and PostgreSQL. Features: JWT auth, Stripe integration, Redis caching and Docker deployment.", sq: "Infrastrukturë e skaluar e-commerce me Node.js dhe PostgreSQL." }
    },
    {
        id: 'p3',
        tag: { de: "KI Projekt", en: "AI Project", sq: "Projekt AI" },
        title: { de: "AI Dashboard", en: "AI Dashboard", sq: "Dashboard AI" },
        desc: { de: "React-Dashboard zur Visualisierung und Steuerung von KI-Modellen und RAG-Pipelines.", en: "React dashboard for visualizing and controlling AI models and RAG pipelines.", sq: "Dashboard React për vizualizimin e modeleve AI." },
        icons: ['fa-brands fa-react', 'fa-solid fa-robot', 'fa-brands fa-python'],
        long: { de: "Ein modernes Dashboard zur Verwaltung von KI-Workflows. Echtzeit-Datenvisualisierung mit Chart.js, Integration von OpenAI und Anthropic APIs, Python-Backend mit FastAPI.", en: "A modern dashboard for managing AI workflows. Real-time data visualization with Chart.js, integration of OpenAI and Anthropic APIs, Python backend with FastAPI.", sq: "Dashboard modern për menaxhimin e rrjedhave të punës AI." }
    }
];

/* ============================================================
   TRANSLATIONS (i18n)
============================================================ */
const translations = {
    de: {
        nav_home: "Home", nav_skills: "Skills", nav_projects: "Projekte", nav_roadmap: "Roadmap", nav_contact: "Kontakt",
        roadmap_title: "Roadmap", roadmap_subtitle: "Meine Entwicklung als Developer",
        skills_title: "Skills", skills_subtitle: "Technologien mit denen ich arbeite",
        projects_title: "Projekte", projects_subtitle: "Ausgewählte Arbeiten",
        contact_btn: "NACHRICHT SENDEN", contact_subtitle: "Schreib mir eine Nachricht",
        p_name: "Name", p_email: "Email", p_msg: "Deine Nachricht...",
        scroll_hint: "Scroll"
    },
    en: {
        nav_home: "Home", nav_skills: "Skills", nav_projects: "Projects", nav_roadmap: "Roadmap", nav_contact: "Contact",
        roadmap_title: "Roadmap", roadmap_subtitle: "My journey as a developer",
        skills_title: "Skills", skills_subtitle: "Technologies I work with",
        projects_title: "Projects", projects_subtitle: "Selected works",
        contact_btn: "SEND MESSAGE", contact_subtitle: "Send me a message",
        p_name: "Name", p_email: "Email", p_msg: "Your message...",
        scroll_hint: "Scroll"
    },
    sq: {
        nav_home: "Kryefaqja", nav_skills: "Aftësitë", nav_projects: "Projektet", nav_roadmap: "Ecuria", nav_contact: "Kontakt",
        roadmap_title: "Ecuria", roadmap_subtitle: "Udhëtimi im si developer",
        skills_title: "Aftësitë", skills_subtitle: "Teknologjitë që përdor",
        projects_title: "Projektet", projects_subtitle: "Punime të zgjedhura",
        contact_btn: "DËRGO MESAZH", contact_subtitle: "Më dërgo një mesazh",
        p_name: "Emri", p_email: "Email", p_msg: "Mesazhi juaj...",
        scroll_hint: "Scroll"
    }
};

/* ============================================================
   RENDER PROJECTS
   Uses map+join so innerHTML is set exactly once, avoiding
   repeated layout thrashing from innerHTML +=.
============================================================ */
function renderProjects(lang) {
    const list = document.getElementById('projects-list');
    list.innerHTML = projects.map((p, index) => {
        const delay = index * 120;
        const iconsHtml = p.icons.map(i => `<i class="${i}"></i>`).join('');
        return `
        <div class="project-card reveal spotlight-project" style="transition-delay: ${delay}ms" onclick="openProjectDetails('${p.id}')">
            <span class="project-tag">${p.tag[lang]}</span>
            <h3>${p.title[lang]}</h3>
            <p>${p.desc[lang]}</p>
            <div class="project-icons">${iconsHtml}</div>
            <i class="fas fa-arrow-up-right project-arrow"></i>
        </div>`;
    }).join('');

    if (typeof initProjectSpotlight === 'function') initProjectSpotlight();
}

/* ============================================================
   RENDER ROADMAP
   Same pattern: build full string, then set innerHTML once.
============================================================ */
function renderRoadmap(lang) {
    const list = document.getElementById('roadmap-list');
    list.innerHTML = years.map((y, index) => {
        const delay = index * 100;
        return `
        <div class="container reveal" style="transition-delay: ${delay}ms" onclick="openDetails('${y.id}')">
            <div class="timeline-dot"></div>
            <div class="content spotlight-card">
                <span class="year-badge">${y.year}</span>
                <h3>${y.title[lang]}</h3>
                <p style="font-size:0.95rem; color:var(--text-dim);">${y.desc[lang]}</p>
            </div>
        </div>`;
    }).join('');

    if (typeof initSpotlight === 'function') initSpotlight();
    if (typeof initObserver === 'function') initObserver();
}

/* ============================================================
   SPOTLIGHT EFFECTS
============================================================ */
function initSpotlight() {
    document.querySelectorAll('.spotlight-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });
}

function initProjectSpotlight() {
    document.querySelectorAll('.spotlight-project').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });
}

/* ============================================================
   SCRAMBLE TEXT
============================================================ */
function scrambleText(elementId, finalSubText) {
    const element = document.getElementById(elementId);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    let iterations = 0;
    const finalText = finalSubText || element.innerText;

    const interval = setInterval(() => {
        element.innerText = finalText.split("").map((letter, index) => {
            if (index < iterations) return finalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
        }).join("");

        if (iterations >= finalText.length) clearInterval(interval);
        iterations += 1/3;
    }, 30);

    return interval;
}

/* ============================================================
   INTERSECTION OBSERVER (Scroll-Reveal)
============================================================ */
function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   THEME & LANGUAGE
============================================================ */
function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

function setLanguage(lang) {
    if (!translations[lang]) return;

    localStorage.setItem('preferredLang', lang);

    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + lang).classList.add('active');

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });

    document.getElementById('p_name').placeholder = translations[lang].p_name;
    document.getElementById('p_email').placeholder = translations[lang].p_email;
    document.getElementById('p_msg').placeholder = translations[lang].p_msg;

    renderProjects(lang);
    renderRoadmap(lang);
}

/* ============================================================
   MODAL FUNCTIONS
   _openModal handles the shared DOM-filling logic so
   openDetails and openProjectDetails stay thin.
============================================================ */
function _openModal(item) {
    const lang = localStorage.getItem('preferredLang') || 'de';
    document.getElementById('modalTitle').innerText = item.title[lang];
    document.getElementById('modalBody').innerText = item.long[lang];
    document.getElementById('modalIcons').innerHTML = item.icons.map(i => `<i class="${i}"></i>`).join('');
    const modal = document.getElementById('projectModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function openDetails(id) {
    const item = years.find(y => y.id === id);
    if (!item) return;
    _openModal(item);
}

function openProjectDetails(id) {
    const item = projects.find(p => p.id === id);
    if (!item) return;
    _openModal(item);
}

function closeModalFunc() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

function closeDetails(e) {
    if (e.target.id === 'projectModal') closeModalFunc();
}

/* ============================================================
   KEY LISTENERS
   Extracted so it can be called once at startup and tested
   independently without side-effects on module load.
============================================================ */
function setupKeyListeners() {
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalFunc(); });
}

/* ============================================================
   PAGE LOADER
============================================================ */
const loaderLines = [
    { text: '> system.boot()',                        color: null,       delay: 150  },
    { text: '> Loading Trimlind Maliqi...',           color: null,       delay: 700  },
    { text: '> Compiling assets...',                  color: null,       delay: 1200 },
    { text: '> [████████████████████] 100%',          color: '#7ee787',  delay: 1800 },
    { text: '> [SUCCESS] Portfolio ready.',           color: '#7ee787',  delay: 2250 },
];

let loaderDone = false;

function _resetLoaderDone() {
    loaderDone = false;
}

function runLoader(onComplete) {
    document.body.style.overflow = 'hidden';
    const body = document.getElementById('loader-body');
    const progress = document.getElementById('loader-progress');

    loaderLines.forEach(line => {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'loader-line';
            el.innerText = line.text;
            if (line.color) el.style.color = line.color;
            body.appendChild(el);
            requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
        }, line.delay);
    });

    setTimeout(() => { progress.style.width = '35%'; }, 500);
    setTimeout(() => { progress.style.width = '70%'; }, 1100);
    setTimeout(() => { progress.style.width = '100%'; }, 1700);
    setTimeout(() => dismissLoader(onComplete), 2900);
}

function dismissLoader(onComplete) {
    if (loaderDone) return;
    loaderDone = true;

    const loader = document.getElementById('page-loader');
    loader.classList.add('slide-out');
    document.body.style.overflow = '';

    setTimeout(() => {
        loader.style.display = 'none';
        if (typeof onComplete === 'function') onComplete();
    }, 900);
}

/* ============================================================
   NODE.JS EXPORTS (for testing)
============================================================ */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        years,
        projects,
        translations,
        loaderLines,
        renderProjects,
        renderRoadmap,
        setLanguage,
        toggleTheme,
        _openModal,
        openDetails,
        openProjectDetails,
        closeModalFunc,
        closeDetails,
        setupKeyListeners,
        dismissLoader,
        _resetLoaderDone,
        scrambleText,
    };
}
