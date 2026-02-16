// Enable JavaScript flag for progressive enhancement
document.body.classList.add('js-enabled');

        // Theme Toggle
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            
            const themeIcon = document.querySelector('.theme-icon');
            const themeText = document.querySelector('.theme-text');
            
            if (newTheme === 'light') {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Light';
            } else {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Dark';
            }
            
            // Update chart colors
            updateChartTheme();
        }
        
        // Animated Counter for Stats
        function animateCounter(element, target, suffix = '') {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        }
        
        // Intersection Observer for Stats Animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                    entry.target.classList.add('visible');
                    
                    const numberElement = entry.target.querySelector('.stat-number');
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    
                    let suffix = '';
                    if (numberElement.textContent.includes('%')) suffix = '%';
                    if (numberElement.textContent.includes('+')) suffix += '+';
                    if (numberElement.textContent.includes('K')) suffix = 'K' + suffix;
                    
                    setTimeout(() => {
                        animateCounter(numberElement, target, suffix);
                    }, 200);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.stat-item').forEach(stat => {
            statsObserver.observe(stat);
        });
        
        // Interactive Skills Chart
        let skillsChart;
        
        function createSkillsChart() {
            const ctx = document.getElementById('skillsChart').getContext('2d');
            const theme = document.documentElement.getAttribute('data-theme');
            const textColor = theme === 'light' ? '#1a1f2e' : '#e8eaed';
            const gridColor = theme === 'light' ? '#dee2e6' : '#2d3548';
            
            if (skillsChart) {
                skillsChart.destroy();
            }
            
            skillsChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['SQL', 'Python', 'Power BI', 'Tableau', 'Machine Learning', 'ETL', 'Statistical Analysis', 'Dashboard Design'],
                    datasets: [{
                        label: 'Years of Experience',
                        data: [3, 3, 2.5, 2, 2, 2, 2.5, 3],
                        backgroundColor: 'rgba(0, 212, 255, 0.2)',
                        borderColor: '#00d4ff',
                        borderWidth: 2,
                        pointBackgroundColor: '#00d4ff',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#00d4ff'
                    }]
                },
                options: {
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 4,
                            ticks: {
                                stepSize: 1,
                                color: textColor
                            },
                            grid: {
                                color: gridColor
                            },
                            pointLabels: {
                                color: textColor,
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: textColor
                            }
                        }
                    }
                }
            });
        }
        
        function updateChartTheme() {
            if (skillsChart) {
                createSkillsChart();
            }
        }
        
        // Initialize chart when page loads
        window.addEventListener('load', createSkillsChart);
        
        // Project Filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        const tags = card.getAttribute('data-tags');
                        if (tags && tags.includes(filter)) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
        
        // Fun Facts System
        const funFacts = [
            "Did you know? Sreya analyzed over 10,000+ inventory records at Nike WHQ with 95% accuracy!",
            "Fun fact: Sreya's shipment tracking dashboard monitors 500+ shipments daily in real-time!",
            "Impressive! Sreya improved user retention targeting by 15% using predictive modeling at Rutgers.",
            "Cool stat: Sreya achieved 96% client satisfaction rating through her analytical insights!",
            "Tech stack: Sreya is proficient in SQL, Python, Power BI, Tableau, and Machine Learning!",
            "Achievement unlocked: Sreya reduced reporting effort by 50%+ through automation!",
            "Sreya built an Alexa skill using AWS Lambda and DynamoDB for university students!",
            "Data wizard: Sreya created ML pipelines for customer behavior prediction with high accuracy!"
        ];
        
        let currentFactIndex = -1;
        
        function showFunFact() {
            currentFactIndex = (currentFactIndex + 1) % funFacts.length;
            document.getElementById('funFactText').textContent = funFacts[currentFactIndex];
            document.getElementById('funFactsOverlay').classList.add('active');
            document.getElementById('funFactsModal').classList.add('active');
        }
        
        function closeFunFact() {
            document.getElementById('funFactsOverlay').classList.remove('active');
            document.getElementById('funFactsModal').classList.remove('active');
        }
        
        // Testimonials Slider
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            const cards = document.querySelectorAll('.testimonial-card');
            const dots = document.querySelectorAll('.testimonial-dot');
            
            cards.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            cards[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentTestimonial = index;
        }
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            const nextIndex = (currentTestimonial + 1) % 3;
            showTestimonial(nextIndex);
        }, 5000);
        
        // Contact Form Handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            document.getElementById('formSuccess').classList.add('active');
            
            // Reset form
            this.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('formSuccess').classList.remove('active');
            }, 5000);
        });
    </script>
</body>
        
        // Enhanced Fun Facts with Dice Roll Animation
        const originalShowFunFact = window.showFunFact;
        window.showFunFact = function() {
            // Add dice roll animation
            const diceButton = document.querySelector('.fun-facts-trigger');
            if (diceButton) {
                diceButton.classList.add('rolling');
                setTimeout(() => {
                    diceButton.classList.remove('rolling');
                }, 600);
            }
            
            // Call original function
            currentFactIndex = (currentFactIndex + 1) % funFacts.length;
            document.getElementById('funFactText').textContent = funFacts[currentFactIndex];
            document.getElementById('funFactsOverlay').classList.add('active');
            document.getElementById('funFactsModal').classList.add('active');
        };
        
        // Apple-style Scroll Reveal Observer
        const scrollRevealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe all scroll-reveal elements
        document.querySelectorAll('.scroll-reveal').forEach(element => {
            scrollRevealObserver.observe(element);
        });
