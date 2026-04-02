
            (function() {
                // ========== YOUR EXISTING CODE (keep as is) ==========
                // Typing effect
                const typingSpan = document.getElementById('dynamic-typing');
                const staticSpan = document.getElementById('static-highlight');
                const fullText = "Bridging Healthcare & Technology";
                let idx = 0;
                
                if(typingSpan && staticSpan) {
                    staticSpan.style.display = "none";
                    typingSpan.textContent = "";
                    function typeWriter() {
                        if(idx < fullText.length) {
                            typingSpan.textContent += fullText.charAt(idx);
                            idx++;
                            setTimeout(typeWriter, 45);
                        } else {
                            typingSpan.style.display = "inline";
                            staticSpan.style.display = "inline-block";
                            staticSpan.classList.add("text-blue-300", "font-medium");
                        }
                    }
                    typeWriter();
                }

                // Mobile menu toggle
                const mobileBtn = document.getElementById('mobile-menu-btn');
                const mobileNav = document.getElementById('mobile-nav');
                if(mobileBtn && mobileNav) {
                    mobileBtn.addEventListener('click', () => mobileNav.classList.toggle('hidden'));
                    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileNav.classList.add('hidden')));
                }

                // Scroll reveal observer
                const reveals = document.querySelectorAll('.reveal-on-scroll');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if(entry.isIntersecting) entry.target.classList.add('revealed');
                    });
                }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });
                reveals.forEach(el => observer.observe(el));

                // Active nav highlight
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.nav-link');
                window.addEventListener('scroll', () => {
                    let current = '';
                    const scrollPosition = window.scrollY + 200;
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        const sectionBottom = sectionTop + section.offsetHeight;
                        if(scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                            current = section.getAttribute('id');
                        }
                    });
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        const href = link.getAttribute('href');
                        if(href === `#${current}`) {
                            link.classList.add('active');
                        }
                    });
                });

                // Dark mode toggle
                const themeToggle = document.getElementById('theme-toggle');
                if(themeToggle) {
                    if(localStorage.getItem('darkMode') === 'true') {
                        document.body.classList.add('dark-mode');
                        document.body.style.backgroundColor = "#17181aff";
                    }
                    themeToggle.addEventListener('click', () => {
                        document.body.classList.toggle('dark-mode');
                        const isDark = document.body.classList.contains('dark-mode');
                        localStorage.setItem('darkMode', isDark);
                        if(isDark) {
                            document.body.style.backgroundColor = "#0b1120";
                        } else {
                            document.body.style.backgroundColor = "";
                        }
                    });
                }

                // EmailJS
                if(typeof emailjs !== 'undefined') {
                    emailjs.init("YOUR_PUBLIC_KEY");
                    const form = document.getElementById('contact-form');
                    const statusMsg = document.getElementById('form-status');
                    if(form) {
                        form.addEventListener('submit', (e) => {
                            e.preventDefault();
                            const btn = form.querySelector('button[type="submit"]');
                            const originalText = btn.innerHTML;
                            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
                            btn.disabled = true;
                            if(statusMsg) {
                                statusMsg.classList.add('hidden');
                                statusMsg.textContent = '';
                            }
                            emailjs.sendForm('service_placeholder', 'template_placeholder', form)
                                .then(() => {
                                    if(statusMsg) {
                                        statusMsg.textContent = '✓ Message sent successfully!';
                                        statusMsg.classList.remove('hidden', 'text-red-400');
                                        statusMsg.classList.add('text-green-400');
                                    }
                                    form.reset();
                                    setTimeout(() => {
                                        if(statusMsg) statusMsg.classList.add('hidden');
                                    }, 5000);
                                })
                                .catch((error) => {
                                    console.error('EmailJS Error:', error);
                                    if(statusMsg) {
                                        statusMsg.textContent = '⚠ Failed to send. Please email me directly';
                                        statusMsg.classList.remove('hidden', 'text-green-400');
                                        statusMsg.classList.add('text-yellow-400');
                                    }
                                })
                                .finally(() => {
                                    btn.innerHTML = originalText;
                                    btn.disabled = false;
                                });
                        });
                    }
                }

                // ========== NEW FEATURES (ADD BELOW) ==========
                
                // 1. 3D TILT EFFECT ON CARDS
                const tiltElements = document.querySelectorAll('.project-tile, .glass-card');
                tiltElements.forEach(card => {
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width - 0.5;
                        const y = (e.clientY - rect.top) / rect.height - 0.5;
                        card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateY(-6px)`;
                    });
                    card.addEventListener('mouseleave', () => {
                        card.style.transform = '';
                    });
                });

                // 2. RIPPLE EFFECT ON BUTTONS
                const rippleButtons = document.querySelectorAll('button, .btn-glow, .overlay-btn');
                rippleButtons.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const ripple = document.createElement('span');
                        ripple.classList.add('ripple');
                        const rect = btn.getBoundingClientRect();
                        ripple.style.left = `${e.clientX - rect.left}px`;
                        ripple.style.top = `${e.clientY - rect.top}px`;
                        btn.style.position = 'relative';
                        btn.style.overflow = 'hidden';
                        btn.appendChild(ripple);
                        setTimeout(() => ripple.remove(), 600);
                    });
                });

                // 3. SCROLL PROGRESS BAR
                const progressBar = document.createElement('div');
                progressBar.style.cssText = `
                    position: fixed; top: 0; left: 0; height: 3px;
                    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
                    width: 0%; z-index: 10000; transition: width 0.1s;
                `;
                document.body.appendChild(progressBar);
                window.addEventListener('scroll', () => {
                    const winScroll = document.documentElement.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolled = (winScroll / height) * 100;
                    progressBar.style.width = scrolled + '%';
                });

                // 4. BACK TO TOP BUTTON
                const backToTop = document.createElement('button');
                backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
                backToTop.style.cssText = `
                    position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
                    border-radius: 50%; background: rgba(59,130,246,0.8); backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.2); color: white; font-size: 20px;
                    cursor: pointer; z-index: 1000; opacity: 0; visibility: hidden;
                    transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                `;
                document.body.appendChild(backToTop);
                
                window.addEventListener('scroll', () => {
                    if(window.scrollY > 500) {
                        backToTop.style.opacity = '1';
                        backToTop.style.visibility = 'visible';
                    } else {
                        backToTop.style.opacity = '0';
                        backToTop.style.visibility = 'hidden';
                    }
                });
                
                backToTop.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                backToTop.addEventListener('mouseenter', () => {
                    backToTop.style.transform = 'translateY(-5px)';
                    backToTop.style.background = 'rgba(59,130,246,1)';
                });
                backToTop.addEventListener('mouseleave', () => {
                    backToTop.style.transform = 'translateY(0)';
                    backToTop.style.background = 'rgba(59,130,246,0.8)';
                });

                // 5. NUMBER COUNTERS (add data-target attributes to elements)
                const counters = document.querySelectorAll('[data-counter]');
                const counterObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if(entry.isIntersecting) {
                            const el = entry.target;
                            const target = parseInt(el.getAttribute('data-target'));
                            let current = 0;
                            const increment = target / 50;
                            const updateCounter = () => {
                                current += increment;
                                if(current < target) {
                                    el.textContent = Math.floor(current);
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    el.textContent = target;
                                }
                            };
                            updateCounter();
                            counterObserver.unobserve(el);
                        }
                    });
                }, { threshold: 0.5 });
                counters.forEach(counter => counterObserver.observe(counter));

                // 6. PARALLAX ON SCROLL (add class "parallax-bg" to elements)
                window.addEventListener('scroll', () => {
                    const scrolled = window.scrollY;
                    document.querySelectorAll('.parallax-bg').forEach(el => {
                        el.style.transform = `translateY(${scrolled * 0.2}px)`;
                    });
                });

                // 7. CUSTOM CURSOR (optional - uncomment if desired)
                /*
                const cursor = document.createElement('div');
                const cursorDot = document.createElement('div');
                cursor.className = 'custom-cursor';
                cursorDot.className = 'cursor-dot';
                document.body.appendChild(cursor);
                document.body.appendChild(cursorDot);
                
                document.addEventListener('mousemove', (e) => {
                    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
                    cursorDot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
                });
                
                document.querySelectorAll('a, button').forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        cursor.style.transform = 'scale(1.5)';
                        cursorDot.style.transform = 'scale(1.5)';
                    });
                    el.addEventListener('mouseleave', () => {
                        cursor.style.transform = 'scale(1)';
                        cursorDot.style.transform = 'scale(1)';
                    });
                });
                */

                // 8. SMOOTH REVEAL FOR PROJECT CARDS WITH STAGGER
                const projectCards = document.querySelectorAll('.project-tile');
                const staggerObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry, index) => {
                        if(entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0)';
                            }, index * 100);
                            staggerObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });
                
                projectCards.forEach((card, i) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
                    staggerObserver.observe(card);
                });

                // 9. HOVER FOLLOW GLOW EFFECT
                const glowElements = document.querySelectorAll('.glass-card, .project-tile');
                glowElements.forEach(el => {
                    el.addEventListener('mousemove', (e) => {
                        const rect = el.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        el.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(59,130,246,0.15), rgba(12,20,35,0.65))`;
                    });
                    el.addEventListener('mouseleave', () => {
                        el.style.background = '';
                    });
                });

                // 10. TYPING MULTIPLE ROLES (cycle through professions)
                const roleElement = document.getElementById('dynamic-typing');
                if(roleElement && !typingSpan) { // Only if you want to replace existing typing
                    const roles = ["Doctor ", "Developer ", "Innovator ", "Problem Solver "];
                    let roleIndex = 0;
                    let charIndex = 0;
                    let isDeleting = false;
                    
                    function typeRoles() {
                        const currentRole = roles[roleIndex];
                        if(isDeleting) {
                            roleElement.textContent = currentRole.substring(0, charIndex - 1);
                            charIndex--;
                        } else {
                            roleElement.textContent = currentRole.substring(0, charIndex + 1);
                            charIndex++;
                        }
                        
                        if(!isDeleting && charIndex === currentRole.length) {
                            isDeleting = true;
                            setTimeout(typeRoles, 2000);
                            return;
                        }
                        
                        if(isDeleting && charIndex === 0) {
                            isDeleting = false;
                            roleIndex = (roleIndex + 1) % roles.length;
                            setTimeout(typeRoles, 500);
                            return;
                        }
                        
                        setTimeout(typeRoles, isDeleting ? 50 : 100);
                    }
                    // typeRoles(); // Uncomment to enable
                }
                
                            })();
                    // ========== PDF MODAL FUNCTIONALITY ==========
                const pdfModal = document.getElementById('pdfModal');
                const viewResumeBtn = document.getElementById('viewResumeBtn');
                const pdfFrame = document.getElementById('pdfFrame');
                const pdfLoader = document.getElementById('pdfLoader');

                // Function to open PDF modal
                function openPdfModal() {
                    // Set the PDF source - UPDATE THIS PATH
                    const pdfPath = 'files/resume.pdf'; // Change to your actual file path
                    
                    pdfFrame.src = pdfPath;
                    pdfModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Track view
                    console.log('📄 Resume viewed in modal:', new Date().toLocaleString());
                    
                    // Track in localStorage
                    let resumeViews = localStorage.getItem('resumeViews') || 0;
                    resumeViews = parseInt(resumeViews) + 1;
                    localStorage.setItem('resumeViews', resumeViews);
                }

                // Function to close PDF modal
                function closePdfModal() {
                    pdfModal.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Clear iframe and reset loader
                    setTimeout(() => {
                        pdfFrame.src = '';
                        if(pdfLoader) pdfLoader.classList.remove('hide');
                    }, 300);
                }

                // Function to download resume
                function downloadResume() {
                    const pdfPath = 'files/resume.pdf';
                    const link = document.createElement('a');
                    link.href = pdfPath;
                    link.download = 'Cyprian_Makori_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Show success notification
                    showDownloadNotification();
                }

                // Function to print resume
                function printResume() {
                    const iframe = pdfFrame;
                    if(iframe && iframe.contentWindow) {
                        iframe.contentWindow.print();
                    } else {
                        // Fallback: open in new tab and print
                        window.open('files/resume.pdf', '_blank');
                    }
                }

                // Function to show notification
                function showDownloadNotification() {
                    const notification = document.createElement('div');
                    notification.innerHTML = '<i class="fas fa-check-circle text-green-400 mr-2"></i> Download started! Check your downloads folder.';
                    notification.style.cssText = `
                        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
                        background: rgba(0,0,0,0.9); backdrop-filter: blur(10px);
                        color: white; padding: 12px 24px; border-radius: 50px;
                        z-index: 10001; font-size: 14px; font-weight: 500;
                        animation: slideUp 0.3s ease; border: 1px solid rgba(74, 222, 128, 0.3);
                        white-space: nowrap;
                    `;
                    document.body.appendChild(notification);
                    setTimeout(() => notification.remove(), 3000);
                }

                // Event Listeners
                if(viewResumeBtn) {
                    viewResumeBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        openPdfModal();
                    });
                }

                // Close modal with escape key
                document.addEventListener('keydown', (e) => {
                    if(e.key === 'Escape' && pdfModal && pdfModal.classList.contains('active')) {
                        closePdfModal();
                    }
                });

                // Close modal when clicking outside
                if(pdfModal) {
                    pdfModal.addEventListener('click', (e) => {
                        if(e.target === pdfModal) {
                            closePdfModal();
                        }
                    });
                }

                // Close buttons
                const closeButtons = ['closePdfModal', 'closePdfModalFooter'];
                closeButtons.forEach(btnId => {
                    const btn = document.getElementById(btnId);
                    if(btn) {
                        btn.addEventListener('click', closePdfModal);
                    }
                });

                // Download button
                const downloadBtn = document.getElementById('downloadResumeBtn');
                if(downloadBtn) {
                    downloadBtn.addEventListener('click', downloadResume);
                }

                // Print button
                const printBtn = document.getElementById('printResumeBtn');
                if(printBtn) {
                    printBtn.addEventListener('click', printResume);
                }

                // Hide loader when iframe loads
                if(pdfFrame) {
                    pdfFrame.addEventListener('load', () => {
                        if(pdfLoader) pdfLoader.classList.add('hide');
                    });
                }