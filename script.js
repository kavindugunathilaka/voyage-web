// ===================================
// NAVIGATION SCROLL EFFECT
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// FAQ ACCORDION
// ===================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    });
});

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================
const revealElements = document.querySelectorAll('[data-aos]');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial check
revealOnScroll();

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// ===================================
// PARALLAX EFFECT FOR HERO SECTION
// ===================================
const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// ===================================
// COUNTER ANIMATION
// ===================================
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Animate stats when they come into view
const statElements = document.querySelectorAll('.service-stat');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const target = parseInt(entry.target.textContent);
            if (!isNaN(target)) {
                animateCounter(entry.target, target);
            }
        }
    });
}, { threshold: 0.5 });

statElements.forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// GRADIENT ANIMATION
// ===================================
const gradientElements = document.querySelectorAll('.gradient-text');

gradientElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements on page load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease-out';
    }
});

// ===================================
// TYPING EFFECT FOR HERO TITLE
// ===================================
const typingEffect = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Uncomment to enable typing effect on hero title
// const heroTitle = document.querySelector('.hero-title .gradient-text');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typingEffect(heroTitle, originalText, 100);
// }

// ===================================
// FORM VALIDATION (if you add a form)
// ===================================
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const email = form.querySelector('input[type="email"]')?.value;
    
    if (email && !validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Handle form submission
    console.log('Form submitted');
    
    // Show success message
    alert('Thank you! We\'ll be in touch soon.');
    form.reset();
};

// Add form submission handler if forms exist
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
});

// ===================================
// SCROLL PROGRESS BAR
// ===================================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
};

// Uncomment to enable scroll progress bar
// createScrollProgress();

// ===================================
// LAZY LOADING IMAGES
// ===================================
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

lazyLoadImages();

// ===================================
// TOAST NOTIFICATION SYSTEM
// ===================================
const showToast = (message, type = 'info', duration = 3000) => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: white;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Add color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#6366f1'
    };
    
    toast.style.borderLeft = `4px solid ${colors[type] || colors.info}`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, duration);
};

// Add toast styles
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(toastStyles);

// ===================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ===================================
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy', 'error');
    });
};

// Add copy functionality to code blocks
document.querySelectorAll('pre code').forEach(block => {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.className = 'copy-button';
    button.onclick = () => copyToClipboard(block.textContent);
    block.parentElement.appendChild(button);
});

// ===================================
// DARK MODE TOGGLE (Optional)
// ===================================
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
};

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Add dark mode toggle button if needed
// const darkModeToggle = document.createElement('button');
// darkModeToggle.textContent = '🌓';
// darkModeToggle.onclick = toggleDarkMode;
// darkModeToggle.style.cssText = `
//     position: fixed;
//     bottom: 2rem;
//     left: 2rem;
//     width: 3rem;
//     height: 3rem;
//     border-radius: 50%;
//     background: var(--gradient-primary);
//     border: none;
//     cursor: pointer;
//     font-size: 1.5rem;
//     z-index: 1000;
//     box-shadow: var(--shadow-lg);
// `;
// document.body.appendChild(darkModeToggle);

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll event logic here
}, 10));

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c🚀 Voyage Website', 'font-size: 24px; font-weight: bold; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cBuilt with modern web technologies', 'font-size: 14px; color: #6366f1;');
console.log('%cInterested in working with us? Visit our careers page!', 'font-size: 12px; color: #6b7280;');

// ===================================
// INITIALIZE ALL FEATURES ON LOAD
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Website loaded successfully');
    
    // Add any initialization code here
    revealOnScroll();
    
    // Animate elements with delay
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
});

// ===================================
// BACK TO TOP BUTTON
// ===================================
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(button);
};

// Uncomment to enable back to top button
createBackToTopButton();

// ===================================
// CURSOR EFFECTS (Optional)
// ===================================
const createCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #6366f1;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: all 0.1s ease;
        display: none;
    `;
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorDot.style.cssText = `
        width: 4px;
        height: 4px;
        background: #6366f1;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10001;
        display: none;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
        cursor.style.left = `${e.clientX - 10}px`;
        cursor.style.top = `${e.clientY - 10}px`;
        cursorDot.style.left = `${e.clientX - 2}px`;
        cursorDot.style.top = `${e.clientY - 2}px`;
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
};

// Uncomment to enable custom cursor
// createCursorEffect();