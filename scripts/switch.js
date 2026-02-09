// Switch Interactivity
document.addEventListener('DOMContentLoaded', () => {
    const ports = document.querySelectorAll('.port');
    const cliWindow = document.getElementById('cliWindow');
    const cliContent = document.getElementById('cliContent');
    const cliClose = document.querySelector('.cli-close');
    const cliTransition = document.getElementById('cliTransition');
    const cliTransitionContent = document.getElementById('cliTransitionContent');
    
    // Semester data
    const semesterData = {
        1: {
            vlan: 10,
            title: "Semestre 1 : Fondamentaux des Réseaux",
            skills: ["Administration Linux", "Bases TCP/IP", "Python Scripting", "Cisco IOS"],
            projects: [
                "Configuration d'un serveur DHCP",
                "Automatisation avec Python",
                "Mise en place d'un réseau LAN",
                "Documentation réseau",
                "Monitoring avec Nagios",
                "Scripts Bash avancés"
            ]
        },
        2: {
            vlan: 20,
            title: "Semestre 2 : Routage & Commutation",
            skills: ["VLAN Configuration", "Routage Statique/Dynamique", "Spanning Tree", "EtherChannel"],
            projects: [
                "Infrastructure multi-VLAN",
                "Routage inter-VLAN",
                "Configuration STP",
                "Mise en place HSRP",
                "Agrégation de liens",
                "QoS sur switches"
            ]
        },
        3: {
            vlan: 30,
            title: "Semestre 3 : Sécurité & Services",
            skills: ["Firewall Configuration", "VPN", "Services Web", "Sécurité réseau"],
            projects: [
                "Déploiement pfSense",
                "Configuration VPN site-to-site",
                "Serveur Web Apache/Nginx",
                "Certificats SSL/TLS",
                "IDS/IPS avec Snort",
                "Hardening Linux"
            ]
        },
        4: {
            vlan: 40,
            title: "Semestre 4 : Systèmes & Virtualisation",
            skills: ["Virtualisation", "Docker", "Kubernetes", "Active Directory"],
            projects: [
                "Infrastructure VMware",
                "Conteneurisation avec Docker",
                "Orchestration K8s",
                "Domaine Active Directory",
                "Automatisation Ansible",
                "CI/CD Pipeline"
            ]
        },
        5: {
            vlan: 50,
            title: "Semestre 5 : Cloud & DevOps",
            skills: ["AWS/Azure", "Infrastructure as Code", "Monitoring", "High Availability"],
            projects: [
                "Déploiement AWS EC2/S3",
                "Terraform Infrastructure",
                "Monitoring Prometheus/Grafana",
                "Load Balancing",
                "Architecture Microservices",
                "Projet de fin d'études"
            ]
        }
    };
    
    // Function to show CLI window
    function showCLI(semester) {
        const data = semesterData[semester];
        
        if (!data) return;
        
        // Build CLI content
        let html = `
            <div class="cli-info">
                <strong>VLAN ${data.vlan} - ${data.title}</strong>
            </div>
            <div class="cli-info">
                <strong>Compétences:</strong>
                <ul>
                    ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
            <div class="cli-info">
                <strong>Projets (${data.projects.length}):</strong>
                <ul>
                    ${data.projects.map((project, index) => `<li>${index + 1}. ${project}</li>`).join('')}
                </ul>
            </div>
            <div class="cli-info" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                <strong style="color: #3B82F6;">Cliquez sur le port pour accéder au détail →</strong>
            </div>
        `;
        
        cliContent.innerHTML = html;
        cliWindow.classList.add('active');
    }
    
    // Function to hide CLI window
    function hideCLI() {
        cliWindow.classList.remove('active');
    }
    
    // CLI Transition Animation
    function startCLITransition(semester, portNumber) {
        // Show overlay
        cliTransition.classList.add('active');
        
        // CLI commands sequence - only 3 lines
        const commands = [
            { prompt: 'Switch>', command: 'enable', delay: 200 },
            { prompt: 'Switch#', command: 'configure terminal', delay: 250 },
            { prompt: 'Switch(config)#', command: `interface GigabitEthernet0/${portNumber}`, delay: 200 }
        ];
        
        cliTransitionContent.innerHTML = '';
        
        function typeCommand(index) {
            if (index >= commands.length) {
                // Animation complete, redirect after a short delay
                setTimeout(() => {
                    window.location.href = `./pages/semestre_${semester}/semestre-${semester}.html`;
                }, 600);
                return;
            }
            
            const cmd = commands[index];
            const line = document.createElement('div');
            line.className = 'cli-line';
            
            const commandText = cmd.command || '';
            const promptSpan = document.createElement('span');
            promptSpan.className = 'cli-prompt';
            promptSpan.textContent = cmd.prompt + ' ';
            line.appendChild(promptSpan);
            
            const commandSpan = document.createElement('span');
            commandSpan.className = 'cli-command';
            line.appendChild(commandSpan);
            
            cliTransitionContent.appendChild(line);
            cliTransitionContent.scrollTop = cliTransitionContent.scrollHeight;
            
            // Animate typing effect character by character
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < commandText.length) {
                    commandSpan.textContent = commandText.substring(0, charIndex + 1);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => typeCommand(index + 1), cmd.delay);
                }
            }, 50); // Slower typing for better effect
        }
        
        // Start typing animation
        setTimeout(() => typeCommand(0), 300);
    }
    
    // Add event listeners to ports
    ports.forEach(port => {
        const semester = parseInt(port.dataset.semester);
        const isDisabled = port.classList.contains('disabled');
        
        // Only enable hover and click for active semesters (1-5)
        if (!isDisabled) {
            port.addEventListener('mouseenter', () => {
                showCLI(semester);
            });
            
            port.addEventListener('mouseleave', () => {
                // Small delay before hiding to allow moving to CLI window
                setTimeout(() => {
                    if (!cliWindow.matches(':hover') && !port.matches(':hover')) {
                        hideCLI();
                    }
                }, 100);
            });
            
            port.addEventListener('click', () => {
                const portNumber = port.querySelector('.port-number').textContent.replace('Gi0/', '');
                startCLITransition(semester, portNumber);
            });
        }
    });
    
    // Keep CLI window open when hovering over it
    cliWindow.addEventListener('mouseenter', () => {
        cliWindow.classList.add('active');
    });
    
    cliWindow.addEventListener('mouseleave', () => {
        const hoveredPort = document.querySelector('.port:hover');
        if (!hoveredPort) {
            hideCLI();
        }
    });
    
    // Close button
    if (cliClose) {
        cliClose.addEventListener('click', () => {
            hideCLI();
        });
    }
    
    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const switchSection = document.getElementById('switch');
            if (switchSection) {
                switchSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
