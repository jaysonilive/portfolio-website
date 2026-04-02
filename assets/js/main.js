/**
 * Main JavaScript for Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Theme Toggle Logic ----
    const htmlElement = document.documentElement;
    const themeToggles = [
        document.getElementById('theme-toggle'), 
        document.getElementById('mobile-theme-toggle')
    ];
    
    // Check local storage or OS preference
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // Apply initial theme
    if (isDarkMode) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    // Toggle function
    themeToggles.forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    });

    // ---- Mobile Menu Logic ----
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ---- Scroll Animation Logic ----
    // Intersection Observer for scroll reveals
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // ---- Navbar Blur/Shadow on Scroll ----
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });
});

// ---- Project Modal Logic ----
const projectData = {
    nexclassroom: {
        title: "NexClassroom - AI Academic Suite",
        techStack: "Flutter (Frontend), Python (Backend AI), Dart, QR Validation Logic.",
        features: [
            "<strong>AI Evaluator:</strong> Automatically evaluates student assignments based on predefined rubrics using Python AI logic.",
            "<strong>Secure QR Validation:</strong> A unique QR-based system that prevents academic dishonesty by validating the physical presence/identity of the submitter.",
            "<strong>Cross-Platform:</strong> Built with Flutter to ensure a seamless experience across Android, iOS, and Web.",
            "<strong>Faculty Dashboard:</strong> Provides detailed analytics on student performance and grading trends."
        ]
    },
    friday: {
        title: "F.R.I.D.A.Y. - Agentic AI Assistant",
        techStack: "Python, NLP (Natural Language Processing), Automation Scripts, Speech Recognition.",
        features: [
            "<strong>Voice-Controlled Interface:</strong> Full system control via voice commands using SpeechRecognition and pyttsx3.",
            "<strong>Task Automation:</strong> Capable of opening apps (YouTube, Gmail, Chrome), taking screenshots, and managing system power states.",
            "<strong>Information Retrieval:</strong> Integrated with Wikipedia and WolframAlpha APIs to answer complex computational and geographical questions.",
            "<strong>Project Structuring:</strong> Includes a custom script to automatically generate organized folder structures for new coding projects."
        ]
    }
};

window.openProjectModal = function(projectId) {
    const data = projectData[projectId];
    if (!data) return;
    
    // Fill the modal content
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-tech-stack').textContent = data.techStack;
    
    const featuresList = document.getElementById('modal-features');
    featuresList.innerHTML = ''; // clear previous features
    data.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = feature;
        li.className = 'flex items-start text-slate-600 dark:text-slate-300 before:content-[\"\\2022\"] before:text-primary-500 before:mr-3 before:text-xl before:leading-tight';
        featuresList.appendChild(li);
    });
    
    // Show modal with animation
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('project-modal-content');
    
    modal.classList.remove('hidden');
    // slight delay for transition
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
};

window.closeProjectModal = function() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('project-modal-content');
    
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
};

// Close modal when clicking outside (on the overlay)
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    }
});
