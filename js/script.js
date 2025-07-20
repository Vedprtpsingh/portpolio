document.addEventListener('DOMContentLoaded', function () {
    // Profile image carousel on hover
    const profileImgContainer = document.querySelector('.profile-image');
    if (profileImgContainer) {
        const profileImg = profileImgContainer.querySelector('img');
        const imageCount = 3; // Using the 3 available images
        let currentImage = 1;
        
        // Add transition style
        profileImg.style.transition = 'opacity 0.5s ease-in-out';
        
        function changeProfileImage() {
            // Fade out
            profileImg.style.opacity = 0;
            
            setTimeout(() => {
                currentImage = (currentImage % imageCount) + 1;
                profileImg.src = `../assets/profile${currentImage}.jpg`;
                
                // Fade in
                setTimeout(() => {
                    profileImg.style.opacity = 1;
                }, 50);
            }, 500);
        }

        // Initialize first image
        profileImg.src = `../assets/profile${currentImage}.jpg`;
        profileImg.style.opacity = 1;
        
        // Change image on hover
        profileImgContainer.addEventListener('mouseenter', changeProfileImage);
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.main-nav ul');
    const navItems = document.querySelectorAll('.main-nav li');

    // Initialize menu state
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('show');
        mobileMenuBtn.innerHTML = isExpanded ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
    });

    // Close menu when clicking outside or on a nav item
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav') && navList.classList.contains('show')) {
            navList.classList.remove('show');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu when clicking on a nav item (mobile only)
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    navList.classList.remove('show');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    
                    // Allow default anchor behavior after closing menu
                    setTimeout(() => {
                        const target = document.querySelector(link.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 300);
                }
            });
        }
    });

    // Theme Toggle Functionality
    const themeToggle = document.createElement('div');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.classList.add('theme-toggle');
    document.body.prepend(themeToggle);

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else {
        // No saved theme, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Smooth Scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.animate');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });

    // Modal popup for projects
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const closeBtn = modal.querySelector('.close-btn');

    const projectDetails = {
        crm: {
            title: 'CRM Project',
            description: 'Customer Relationship Management system with authentication and database integration using Spring Boot, JWT, and MySQL.',
            link: 'https://drive.google.com/file/d/1u5_2aXAlN_mAEoaYLsWY9vTv8jt9ZE0V/view'
        },
        parkflow: {
            title: 'ParkFlow',
            description: 'Parking management system implementing Data Access Object design pattern using Java and Spring Boot.',
            link: 'https://github.com/Vedprtpsingh/ParkFlow'
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectKey = card.getAttribute('data-project');
            if (projectDetails[projectKey]) {
                modalTitle.textContent = projectDetails[projectKey].title;
                modalDescription.textContent = projectDetails[projectKey].description;
                modalLink.href = projectDetails[projectKey].link;
                modal.style.display = 'block';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Animated skill progress bars
    const skillItems = document.querySelectorAll('.skills-category li');
    function animateSkills() {
        skillItems.forEach(item => {
            const skillLevel = item.getAttribute('data-skill-level');
            const progressBar = item.querySelector('.skill-progress::after');
            if (progressBar) {
                progressBar.style.width = skillLevel;
            }
            const progress = item.querySelector('.skill-progress');
            if (progress) {
                progress.style.setProperty('--skill-level', skillLevel);
                progress.querySelector('::after').style.width = skillLevel;
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkSkillsAnimation() {
        skillItems.forEach(item => {
            if (isElementInViewport(item)) {
                const progress = item.querySelector('.skill-progress');
                if (progress) {
                    const skillLevel = item.getAttribute('data-skill-level');
                    progress.style.setProperty('--skill-level', skillLevel);
                    progress.querySelector('::after').style.width = skillLevel;
                }
            }
        });
    }

    window.addEventListener('scroll', checkSkillsAnimation);
    checkSkillsAnimation();

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
