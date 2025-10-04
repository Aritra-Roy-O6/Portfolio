import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// --- Import all the JSON data ---
import projectsData from './data/projects.json';
import booksData from './data/books.json';
import photographyData from './data/photography.json';
import workExperienceData from './data/workExp.json';
import achievementsData from './data/achievements.json';
import certificatesData from './data/certificates.json';

// --- Text Scramble Effect Logic (no changes) ---
const allowedCharacters = ['█', '▓', '&', '*', '§', '¶', '•', '&', '►', '▼'];
function getRandomCharacter() {
    const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
    return allowedCharacters[randomIndex];
}
function createEventHandler() {
    let isInProgress = false;
    let originalText = '';
    return function handleHoverEvent(e) {
        if (isInProgress) return;
        isInProgress = true;
        originalText = e.target.innerText;
        const text = originalText;
        const randomizedText = text.split('').map(getRandomCharacter).join('');
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                const nextIndex = i + 1;
                e.target.innerText = `${text.substring(0, nextIndex)}${randomizedText.substring(nextIndex)}`;
                if (nextIndex === text.length) {
                    isInProgress = false;
                }
            }, i * 70);
        }
    };
}

// --- SVG Icons (no changes) ---
const LinkedInIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="currentColor" className="social-icon"> <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/> </svg> );
const GitHubIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="currentColor" className="social-icon"> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/> </svg> );
const GmailIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="currentColor" className="social-icon"> <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/> </svg> );

// --- MOBILE NAVIGATION COMPONENT (no changes) ---
const MobileNav = ({ onMenuToggle, onChatToggle }) => ( <div className="mobile-nav"> <button onClick={onMenuToggle} className="mobile-nav-button" aria-label="Open navigation menu"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> </button> <span className="mobile-nav-title">Aritra Roy</span> <button onClick={onChatToggle} className="mobile-nav-button" aria-label="Open AI chat"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 S 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> </button> </div> );

// --- MODAL COMPONENTS (no changes) ---
const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    const ExternalLinkIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Project Link"><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="15 3 21 3 21 9" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/></svg> );
    const GitHubIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFF" aria-label="GitHub" className="social-icon"> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/> </svg> );
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content fixed-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>×</button>
                <div className="modal-image-container">
                    {/* --- The Change is Here: Swapping img for iframe --- */}
                    <iframe
                        src={project.link}
                        title={project.title}
                        className="modal-iframe"
                        sandbox="allow-scripts allow-same-origin" // Security sandbox for iframes
                    ></iframe>
                    <div className="modal-links-row">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="modal-project-link" aria-label="Project Link">
                            <ExternalLinkIcon />
                        </a>
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="modal-github-link" aria-label="GitHub">
                                <GitHubIcon />
                            </a>
                        )}
                    </div>
                </div>
                <div className="modal-body">
                    <h2 className="h2-purple">{project.title}</h2>
                    <p className="p-light-gray modal-description">{project.description}</p>
                    <h3 className="h3-red">Tech Stack</h3>
                    <div className="modal-tech-stack">
                        {project.techStack.map(tech => (<span key={tech} className="tech-badge">{tech}</span>))}
                    </div>
                </div>
            </div>
        </div>
    );
};
const CertificateModal = ({ certificate, onClose }) => { if (!certificate) return null; return ( <div className="modal-overlay" onClick={onClose}> <div className="modal-content fixed-modal" onClick={(e) => e.stopPropagation()}> <button className="modal-close-button" onClick={onClose}>×</button> <div className="modal-body"> <h2 className="h2-purple">{certificate.title}</h2> <img src={certificate.imageUrl} alt={certificate.title} className="modal-certificate-image" /> <div className="modal-certificate-details"> <p className="p-gray">Issued by {certificate.issuer} on {certificate.date}</p> {certificate.id && <p className="p-gray">Certificate ID: {certificate.id}</p>} </div> </div> </div> </div> ); };
const BookModal = ({ book, onClose }) => { if (!book) return null; return ( <div className="modal-overlay" onClick={onClose}> <div className="modal-content fixed-modal" onClick={(e) => e.stopPropagation()}> <button className="modal-close-button" onClick={onClose}>×</button> <div className="modal-body"> <div className="modal-book-content"> <img src={book.cover} alt={`Cover of ${book.title}`} className="modal-book-cover" /> <div className="modal-book-details"> <h2 className="h2-purple">{book.title}</h2> <p className="p-gray" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>by {book.author}</p> <p className="p-light-gray">{book.description}</p> </div> </div> </div> </div> </div> ); };

// =================================================================================
// --- SECTION COMPONENTS ---
// =================================================================================
const About = () => {
    const aboutRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--x', `${x}px`);
        e.currentTarget.style.setProperty('--y', `${y}px`);
    };

    return (
        <div>
            <h2 className="h2-purple scramble-effect">About Me</h2>
            <p
                ref={aboutRef}
                className="p-light-gray about-glow"
                onMouseMove={handleMouseMove}
                onTouchMove={(e) => handleMouseMove(e.touches[0])}
            >
                A curious and a creative thinker, always ready to take on new challenges. Currently exploring the world of AI and building immersive web experiences. I am a dedicated and enthusiastic developer with a strong foundation in web technologies. My journey in the world of programming began with a curiosity to understand how things work, and it has since evolved into a passion for creating meaningful and innovative solutions. I am a quick learner, a collaborative team player, a dependable leader and I am always eager to expand my skillset.
            </p>
        </div>
    );
};

const ProjectList = ({ projects, onProjectSelect, onHover }) => (
    <div className="projects-container">
        {projects.map(p => (
            <div
                key={p.id}
                className="project-card"
                onClick={() => onProjectSelect(p)}
                onMouseEnter={(e) => onHover(p.imageUrl, e)}
                onMouseLeave={() => onHover(null)}
            >
                <h3 className="h3-red scramble-effect">{p.title}</h3>
                <div className="project-card-tech">
                    {p.techStack.slice(0, 4).map(tech => (
                        <span key={tech} className="tech-badge-preview">{tech}</span>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const FrontendProjects = (props) => ( <div> <h2 className="h2-purple scramble-effect">Frontend Projects</h2> <ProjectList projects={projectsData.frontend} {...props} /> </div> );
const FullstackProjects = (props) => ( <div> <h2 className="h2-purple scramble-effect">Fullstack Projects</h2> <ProjectList projects={projectsData.fullstack} {...props} /> </div> );
const AgenticAiProjects = (props) => ( <div> <h2 className="h2-purple scramble-effect">Agentic AI Projects</h2> {projectsData.agenticAI.length > 0 ? <ProjectList projects={projectsData.agenticAI} {...props} /> : <p className="p-light-gray">Coming soon...</p>} </div> );
const WorkExperience = () => ( <div> <h2 className="h2-purple scramble-effect">Work Experience </h2> <div className="experience-container"> {workExperienceData.map((job, index) => ( <div key={index} className="job-card"> <h3 className="h3-red">{job.role}</h3> <p className="p-gray" style={{fontWeight: 'bold'}}>{job.company}</p> <p className="p-gray" style={{fontStyle: 'italic', marginBottom: '1rem'}}>{job.duration}</p> <ul className="responsibilities-list"> {job.responsibilities.map((task, i) => ( <li key={i}>{task}</li> ))} </ul> </div> )) }</div> </div> );

const TechStack = () => (
    <div>
        <h2 className="h2-purple scramble-effect">Tech Stack</h2>
        <div className="tech-stack-container" style={{ marginTop: '1.5rem' }}>
            <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
            <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
            <img src="https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=white" alt="C" />
            <img src="https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=cplusplus&logoColor=white" alt="C++" />
            <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
            <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
            <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
            <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
            <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
            <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
            <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
            <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
            <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
            <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
            <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
        </div>
    </div>
);

const Achievements = () => ( <div> <h2 className="h2-purple scramble-effect">Achievements</h2> <ul className="achievements-list"> {achievementsData.map((ach, index) => ( <li key={index}> <h3 className="h3-red scramble-effect">{ach.title}</h3> <p className="p-gray">{ach.description}</p> </li> ))} </ul> </div> );
// --- Updated Photography Component with Live Instagram Feed ---
const Photography = () => {
    useEffect(() => {
        const script = document.createElement('script');
        // Use the new script URL from the user's code
        script.src = "https://elfsightcdn.com/platform.js";
        script.setAttribute('data-use-service-core', '');
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    return (
        <div>
            <h2 className="h2-purple">Photography</h2>
            <p className="p-light-gray" style={{ marginBottom: '1.5rem' }}>
                A collection of moments captured through my lens.
            </p>
            {/* Use the new class name from the user's code */}
            <div className="elfsight-app-899fbcb9-9253-4ebd-a79a-2254d2517e6a" data-elfsight-app-lazy></div>
        </div>
    );
};

const Books = ({ onBookSelect }) => ( <div> <h2 className="h2-purple scramble-effect">Books</h2> <p className="p-light-gray" style={{ marginBottom: '1.5rem' }}> Some of the reads that have shaped my thinking and perspective. </p> <div className="book-descriptions-row"> {booksData.map((book, index) => ( <div key={index} className="book-description-card" onClick={() => onBookSelect(book)}> <img src={book.cover} alt={`Cover of ${book.title}`} className="book-cover" style={{ marginBottom: '1rem' }} /> <h3 className="h3-red ">{book.title}</h3> <p className="p-gray" style={{ fontStyle: 'italic' }}>by {book.author}</p> </div> ))} </div> </div> );
const Degrees = () => ( <div> <h2 className="h2-purple scramble-effect">Degrees</h2> <div className="timeline-container"> <div className="timeline-item"> <div className="timeline-content"> <h3 className="h3-red scramble-effect">B.Tech in CSE</h3> <p className="p-gray timeline-date">Pursuing</p> <span className="institute-name">RCC Institute of Information Technology, Kolkata</span> <p className="p-light-gray">8.4 YGPA in 1st year.</p> </div> </div> <div className="timeline-item"> <div className="timeline-content"> <h3 className="h3-red scramble-effect">AISSCE</h3> <p className="p-gray timeline-date">2024</p> <span className="institute-name">Asian International School, Howrah</span> <p className="p-light-gray">87.6%. 95 in Mathematics.</p> </div> </div> <div className="timeline-item"> <div className="timeline-content"> <h3 className="h3-red scramble-effect">AISSE</h3> <p className="p-gray timeline-date">2022</p> <span className="institute-name">Asian International School, Howrah</span> <p className="p-light-gray">95.8%. 100 in English, 96 in IT.</p> </div> </div> </div> </div> );
const Certificates = ({ onCertificateSelect }) => ( <div> <h2 className="h2-purple">Certificates</h2> <ul className="certificates-list"> {certificatesData.map(cert => ( <li key={cert.id} onClick={() => onCertificateSelect(cert)}> <h3 className="h3-red scramble-effect">{cert.title}</h3> <p className="p-gray">Issued by {cert.issuer}</p> </li> ))} </ul> </div> );


// --- LAYOUT COMPONENTS ---
const Header = () => (
    <div className="header-section">
        <div className="header-info">
            <h1 className="h1-teal typing-effect">Hey, I'm Aritra Roy</h1>
            <p className="p-gray">Kolkata, India</p>
            <p className="p-gray">Oct, 2006</p>
            <div className="social-links">
                <a href="mailto:contact.aritra2006@gmail.com" target="_blank" rel="noopener noreferrer"><GmailIcon /></a>
                <a href="https://www.linkedin.com/in/aritra-roy-862014343/" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>
                <a href="https://github.com/Aritra-Roy-O6" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a>
            </div>
        </div>
        <img src="./pic.webp" alt="Aritra Roy" className="profile-picture" />
    </div>
);
const Sidebar = ({ activeSection, setActiveSection, isMobileOpen, onNavLinkClick }) => {
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const [isEducationOpen, setIsEducationOpen] = useState(false);
    const [isMiscOpen, setIsMiscOpen] = useState(false);
    const handleSectionClick = (sectionId) => { setActiveSection(sectionId); onNavLinkClick(); };
    const handleDropdownToggle = (dropdown) => { if (dropdown === 'projects') { setIsProjectsOpen(!isProjectsOpen); setIsEducationOpen(false); setIsMiscOpen(false); } else if (dropdown === 'education') { setIsEducationOpen(!isEducationOpen); setIsProjectsOpen(false); setIsMiscOpen(false); if (!isEducationOpen) { setActiveSection('degrees'); } } else if (dropdown === 'misc') { setIsMiscOpen(!isMiscOpen); setIsProjectsOpen(false); setIsEducationOpen(false); } };
    const topSections = [ { id: 'about', name: 'About' }, { id: 'techstack', name: 'Tech Stack' } ];
    const projectSections = [ { id: 'frontend', name: 'Frontend' }, { id: 'fullstack', name: 'Fullstack' }, { id: 'agentic-ai', name: 'Agentic AI' } ];
    const educationSections = [ { id: 'degrees', name: 'Degrees' }, { id: 'certificates', name: 'Certificates' }];
    return ( <div className={`sidebar ${isMobileOpen ? 'mobile-visible' : ''}`}> <h2 className="h2-teal">Explorer</h2> <ul> {topSections.map((section) => ( <li key={section.id} className={activeSection === section.id ? 'active' : ''} onClick={() => handleSectionClick(section.id)}> {section.name} </li> ))} <li className="dropdown-toggle" onClick={() => handleDropdownToggle('projects')}> <span>Projects</span> <span className={`arrow ${isProjectsOpen ? 'down' : 'right'}`}></span> </li> {isProjectsOpen && ( <ul className="dropdown-menu"> {projectSections.map((section) => ( <li key={section.id} className={activeSection === section.id ? 'active' : ''} onClick={() => handleSectionClick(section.id)}> {section.name} </li> ))} </ul> )} <li className="dropdown-toggle" onClick={() => handleDropdownToggle('education')}> <span>Education</span> <span className={`arrow ${isEducationOpen ? 'down' : 'right'}`}></span> </li> {isEducationOpen && ( <ul className="dropdown-menu"> {educationSections.map((section) => ( <li key={section.id} className={activeSection === section.id ? 'active' : ''} onClick={() => handleSectionClick(section.id)}> {section.name} </li> ))} </ul> )} <li key="work-experience" className={activeSection === 'work-experience' ? 'active' : ''} onClick={() => handleSectionClick('work-experience')}> Work Experience </li> <li key="achievements" className={activeSection === 'achievements' ? 'active' : ''} onClick={() => handleSectionClick('achievements')}> Achievements </li> <li className="dropdown-toggle" onClick={() => handleDropdownToggle('misc')}> <span>Miscellaneous</span> <span className={`arrow ${isMiscOpen ? 'down' : 'right'}`}></span> </li> {isMiscOpen && ( <ul className="dropdown-menu"> <li key="books" className={activeSection === 'books' ? 'active' : ''} onClick={() => handleSectionClick('books')}>Books</li> <li key="photography" className={activeSection === 'photography' ? 'active' : ''} onClick={() => handleSectionClick('photography')}>Photography</li> </ul> )} </ul> </div> );
};
const AiChat = ({ isMobileOpen, onClose }) => ( <div className={`ai-chat-section ${isMobileOpen ? 'mobile-visible' : ''}`}> <div className="ai-chat-header"> <h3 className="h3-teal">Talk to my agent</h3> <button onClick={onClose} className="ai-chat-close-button" aria-label="Close AI Chat">×</button> </div> <div className="ai-chat-container"> <iframe src="https://aroyzz-o6-career-chatbot.hf.space/" className="huggingface-iframe" title="Aritra AI Career Bot" ></iframe> </div> </div> );

// --- Floating Image Component for Project Hover ---
const FloatingProjectImage = ({ imageUrl, position }) => {
    if (!imageUrl) return null;
    return (
        <img
            src={imageUrl}
            alt="Project Preview"
            className="floating-project-image"
            style={{ top: `${position.y}px`, left: `${position.x}px` }}
        />
    );
};

// =================================================================================
// --- MAIN APP COMPONENT ---
// =================================================================================
const App = () => {
    const [activeSection, setActiveSection] = useState('about');
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAiChatOpen, setIsAiChatOpen] = useState(false);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const scrambleElements = document.querySelectorAll('.scramble-effect');
        const handlers = [];
        scrambleElements.forEach((element) => {
            const eventHandler = createEventHandler();
            element.addEventListener('mouseover', eventHandler);
            handlers.push({ element, eventHandler });
        });
        // Cleanup: remove all attached handlers
        return () => {
            handlers.forEach(({ element, eventHandler }) => {
                element.removeEventListener('mouseover', eventHandler);
            });
        };
    }, [activeSection]); // Rerun when section changes to apply to new elements

    const handleProjectHover = (imageUrl, event) => {
        setHoveredImage(imageUrl);
        if (event) {
            // Position the image near the cursor
            setMousePosition({ x: event.clientX + 20, y: event.clientY - 50 });
        }
    };

    const renderSection = () => {
        const projectProps = {
            onProjectSelect: setSelectedProject,
            onHover: handleProjectHover
        };
        switch (activeSection) {
            case 'about': return <About />;
            case 'techstack': return <TechStack />;
            case 'frontend': return <FrontendProjects {...projectProps} />;
            case 'fullstack': return <FullstackProjects {...projectProps} />;
            case 'agentic-ai': return <AgenticAiProjects {...projectProps} />;
            case 'degrees': return <Degrees />;
            case 'certificates': return <Certificates onCertificateSelect={setSelectedCertificate} />;
            case 'work-experience': return <WorkExperience />;
            case 'achievements': return <Achievements />;
            case 'books': return <Books onBookSelect={setSelectedBook} />;
            case 'photography': return <Photography />;
            default: return <About />;
        }
    };

    return (
        <>
            <MobileNav
                onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                onChatToggle={() => setIsAiChatOpen(!isAiChatOpen)}
            />
            <div className="app-layout">
                <Sidebar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    isMobileOpen={isMobileMenuOpen}
                    onNavLinkClick={() => setIsMobileMenuOpen(false)}
                />
                <div className="middle-column">
                    <Header />
                    <div className="scrollable-content">
                        {renderSection()}
                    </div>
                </div>
                <AiChat
                    isMobileOpen={isAiChatOpen}
                    onClose={() => setIsAiChatOpen(false)}
                />
                <FloatingProjectImage imageUrl={hoveredImage} position={mousePosition} />
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
                <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
            </div>
        </>
    );
};

export default App;

