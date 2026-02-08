// Switch Interactivity
document.addEventListener('DOMContentLoaded', () => {
    const ports = document.querySelectorAll('.port');
    const cliWindow = document.getElementById('cliWindow');
    const cliContent = document.getElementById('cliContent');
    const cliClose = document.querySelector('.cli-close');
    
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
    
    // Add event listeners to ports
    ports.forEach(port => {
        port.addEventListener('mouseenter', () => {
            const semester = parseInt(port.dataset.semester);
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
            const semester = parseInt(port.dataset.semester);
            window.location.href = `semestre-${semester}.html`;
        });
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
