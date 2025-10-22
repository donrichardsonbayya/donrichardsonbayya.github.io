// ===== Modern Portfolio JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ once: true, duration: 700, easing: 'ease-out' });
  
  // --- Rotating subtitle with gentle fade ---
  const el = document.querySelector('.typing-text');
  if (el) {
    const phrases = [
      'Data Engineer',
      'Analytics Engineer',
      'Real-time Analytics Builder'
    ];
    let i = 0;
    const swap = () => {
      // fade-out
      el.style.opacity = '0';
      setTimeout(() => {
        i = (i + 1) % phrases.length;
        el.textContent = phrases[i];
        // fade-in
        el.style.opacity = '1';
      }, 250);
    };
    // start with visible, then rotate every 3s
    el.style.opacity = '1';
    setInterval(swap, 3000);
  }
  
  // --- Ensure 'View Project' buttons open GitHub in new tab ---
  document.querySelectorAll('.project-card').forEach(card => {
    const overlayBtn = card.querySelector('.project-overlay .view-project-btn');
    if (!overlayBtn) return;
    // try to find an existing GitHub link within this card
   let gh = card.querySelector('a[href*="github.com"]');
    if (gh && gh.getAttribute('href') && gh.getAttribute('href') !== '#') {
      overlayBtn.setAttribute('href', gh.getAttribute('href'));
    } else {
      // leave placeholder if no link found; developer will replace later
      if (!overlayBtn.getAttribute('href') || overlayBtn.getAttribute('href') === '#') {
        overlayBtn.setAttribute('href', 'https://github.com/donrichardsonbayya/REPO_NAME'); // TODO: replace
      }
    }
    overlayBtn.setAttribute('target', '_blank');
    overlayBtn.setAttribute('rel', 'noopener noreferrer');
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Initialize all components
    initNavigation();
    initProjectFilter();
    initContactForm();
    initBackToTop();
    initSmoothScrolling();
    initTypingEffect();
    initParallaxEffect();
    initParticleEffect();
});

// ===== Navigation Functions =====
function initNavigation() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Chrome/Webkit specific navbar fixes
    if (navigator.userAgent.indexOf('Chrome') > -1 || navigator.userAgent.indexOf('Safari') > -1) {
        // Ensure navbar is properly positioned
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.width = '100%';
        navbar.style.zIndex = '1000';
        
        // Fix backdrop filter for Chrome
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.webkitBackdropFilter = 'blur(10px)';
        
        // Ensure proper background
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    }

    // Navbar scroll effect with glassmorphism
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            // Chrome-specific scrolled state
            if (navigator.userAgent.indexOf('Chrome') > -1) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        } else {
            navbar.classList.remove('scrolled');
            // Chrome-specific normal state
            if (navigator.userAgent.indexOf('Chrome') > -1) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// ===== Project Filter Functions =====
function initProjectFilter() {
    // --- Projects filter ---
    (function(){
      const grid = document.getElementById('projects-grid') || document.querySelector('#projects .row, #projects .projects-grid');
      const items = grid ? [...grid.querySelectorAll('.project-item')] : [];
      const buttons = [...document.querySelectorAll('.filter-btn')];
      if (!grid || !items.length || !buttons.length) return;

      const applyFilter = (key) => {
        items.forEach(it => {
          const show = key === 'all' || it.dataset.category === key;
          it.style.display = show ? '' : 'none';
        });
      };

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');          // active indicator = underline; text stays black via CSS
          applyFilter(btn.dataset.filter);
        });
      });

      // default: show all
      applyFilter('all');
    })();
}

// ===== Contact Form Functions =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<span class="loading"></span> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// ===== Back to Top Button =====
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Typing Effect =====
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = [
            'Data Engineer & Analytics Professional',
            'Python Developer',
            'Machine Learning Enthusiast',
            'Cloud Solutions Architect'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeText, typeSpeed);
        }
        
        typeText();
    }
}

// ===== Parallax Effect =====
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// ===== Particle Effect =====
function initParticleEffect() {
    const heroSection = document.querySelector('.hero-section');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    heroSection.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: float-particle ${duration}s linear infinite;
    `;
    
    container.appendChild(particle);
}

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Performance Optimizations =====
const optimizedScrollHandler = throttle(() => {
    // Handle scroll events here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// ===== Error Handling =====
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

// ===== Export Functions =====
window.Portfolio = {
    showNotification,
    initTypingEffect,
    initParallaxEffect
};

// --- NAVBAR LOGIC ---
document.querySelectorAll('#navbarNav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('navbarNav');
    if (nav && nav.classList.contains('show')) {
      new bootstrap.Collapse(nav).hide();
    }
  });
});

// Highlight active section in navbar
const sections = [...document.querySelectorAll('section[id]')];
window.addEventListener('scroll', () => {
  const pos = window.scrollY + 120;
  let current = sections.findLast(s => s.offsetTop <= pos);
  document.querySelectorAll('.nav-link').forEach(l => {
    const active = current && l.getAttribute('href') === `#${current.id}`;      
    l.classList.toggle('active', active);
    if (active) l.setAttribute('aria-current', 'page');
    else l.removeAttribute('aria-current');
  });
});

// ===== Measure the real navbar height on load + resize, apply globally =====
(function() {
  function setNavHeightVar() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const h = Math.round(nav.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--nav-h', h + 'px');
  }
  window.addEventListener('load', setNavHeightVar);
  window.addEventListener('resize', setNavHeightVar);
  // If fonts/icons load late and change height, re-measure after a tick
  document.addEventListener('DOMContentLoaded', () => setTimeout(setNavHeightVar, 200));
})();

// ===== Measure the real navbar height and apply it globally =====
(function () {
  function setNavHeightVar() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const h = Math.round(nav.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--nav-h', h + 'px');
  }
  window.addEventListener('load', setNavHeightVar);
  window.addEventListener('resize', setNavHeightVar);
  document.addEventListener('DOMContentLoaded', () => setTimeout(setNavHeightVar, 150));
})();