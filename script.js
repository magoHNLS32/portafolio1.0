// script.js
// Navegación móvil
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Botón volver arriba
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Año actual en footer
const currentYear = document.getElementById('currentYear');
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Formulario de contacto (simulación)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aquí normalmente enviarías el formulario a un servidor
        // Por ahora solo mostramos una alerta
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('Datos del formulario:', data);
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por tu mensaje! Te contactaré pronto.');
        
        // Resetear formulario
        contactForm.reset();
    });
}

// Animación de barras de habilidades al hacer scroll
const skillBars = document.querySelectorAll('.habilidad-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const percentage = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = percentage;
        }, 300);
    });
};

// Observer para animar habilidades cuando son visibles
const skillsSection = document.getElementById('habilidades');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
}

// Efecto parallax suave en hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `center ${rate}px`;
    }
});

// Preloader (opcional)
window.addEventListener('load', () => {
    // Aquí podrías añadir un preloader si lo deseas
    console.log('Página cargada completamente');
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de revelación al hacer scroll
const revealElements = () => {
    const elements = document.querySelectorAll('.reveal');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
};

// Inicializar efecto reveal
window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// Agregar clase reveal a elementos importantes (opcional)
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section > .container > *');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
});

// Tooltips para iconos sociales
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    const platform = link.querySelector('i').className.split(' ')[1].replace('fa-', '');
    link.title = platform.charAt(0).toUpperCase() + platform.slice(1);
});

// Contador de visitas (simplificado - en producción usarías una API)
let visitCount = localStorage.getItem('portfolioVisits') || 0;
visitCount = parseInt(visitCount) + 1;
localStorage.setItem('portfolioVisits', visitCount);

// Puedes mostrar el contador en algún lugar si lo deseas
console.log(`Visitas a este portafolio: ${visitCount}`);

// Modo oscuro/claro (más sutil y profesional)
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.className = 'theme-toggle';
themeToggle.title = 'Cambiar tema';
themeToggle.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 80px;
    width: 45px;
    height: 45px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    opacity: 0.8;
`;

themeToggle.addEventListener('mouseenter', () => themeToggle.style.opacity = '1');
themeToggle.addEventListener('mouseleave', () => themeToggle.style.opacity = '0.8');

document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    themeToggle.title = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    
    // Guardar preferencia
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.title = 'Cambiar a modo claro';
}

// Añadir estilos para modo oscuro
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    body.dark-mode {
        --dark: #f8fafc;
        --light: #1e293b;
        --secondary: #94a3b8;
        --gray: #64748b;
        background-color: #0f172a;
        color: #f1f5f9;
    }
    
    body.dark-mode .navbar {
        background-color: #1e293b;
    }
    
    body.dark-mode .logo {
        color: #f8fafc;
    }
    
    body.dark-mode .nav-menu a {
        color: #cbd5e1;
    }
    
    body.dark-mode .hero {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    }
    
    body.dark-mode .info-card,
    body.dark-mode .timeline-content,
    body.dark-mode .proyecto-card,
    body.dark-mode .habilidad-categoria,
    body.dark-mode .certificacion-card,
    body.dark-mode .contacto-form {
        background: #1e293b;
        color: #f1f5f9;
    }
    
    body.dark-mode .sobre-mi-quote {
        background: #334155;
    }
    
    body.dark-mode .experiencia,
    body.dark-mode .habilidades {
        background-color: #0f172a;
    }
    
    body.dark-mode .footer {
        background: #0f172a;
    }
    
    body.dark-mode .form-group input,
    body.dark-mode .form-group textarea {
        background: #1e293b;
        border-color: #334155;
        color: #f1f5f9;
    }
    
    body.dark-mode .soft-skill {
        background: #334155;
        color: #cbd5e1;
    }
    
    body.dark-mode .proyecto-tech span {
        background: #334155;
        color: #cbd5e1;
    }
    
    body.dark-mode .tag {
        background: #334155;
        color: #cbd5e1;
    }
`;
document.head.appendChild(darkModeStyles);