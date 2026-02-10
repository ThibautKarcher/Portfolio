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
            title: "Semestre 1 : Découverte des Réseaux et Télécommunications",
            skills: ["Hygiène informatique", "Configuration réseau", "Déploiement Wi-Fi", "Développement web", "Sécurité réseau"],
            projects: [
                "SAE 1.01 - Hygiène informatique",
                "SAE 1.02 - Réseau entreprise",
                "SAE 1.03 - Déploiement Wi-Fi",
                "SAE 1.04 - Site web",
                "SAE 1.05 - Attaques réseau"
            ]
        },
        2: {
            vlan: 20,
            title: "Semestre 2 : Approfondissement Réseaux & Communication",
            skills: ["Transmissions numériques", "Django Framework", "ToIP", "Protocoles de communication"],
            projects: [
                "SAE 2.02 - Systèmes de transmissions",
                "SAE 2.03 - Application web Django",
                "SAE 2.04 - ToIP (Téléphonie sur IP)"
            ]
        },
        3: {
            vlan: 30,
            title: "Semestre 3 : Infrastructure & Cybersécurité",
            skills: ["Infrastructure IoT", "Architecture Client/Serveur", "Routage FAI", "Penetration Testing"],
            projects: [
                "SAE 3.01 - Infrastructure IoT",
                "SAE 3.02 - Application Client/Serveur",
                "SAE 3.03 - FAI et routage avancé",
                "SAE 3.04 - Pentesting (Cyber)"
            ]
        },
        4: {
            vlan: 40,
            title: "Semestre 4 : Infrastructure et Sécurité Avancée",
            skills: ["Infrastructure réseau", "LDAP", "VPN", "PKI/IGC", "Haute disponibilité"],
            projects: [
                "SAE 4.01 - Réseau d'entreprise sécurisé",
                "Stage BUT2 - Immersion professionnelle",
                "Configuration réseau avancée",
                "Administration système et sécurité"
            ]
        },
        5: {
            vlan: 50,
            title: "Semestre 5 : Projets Avancés & Spécialisation",
            skills: ["IoT & LoRaWan", "Développement fullstack", "Conteneurisation Docker", "Architecture applicative"],
            projects: [
                "SAE 5.01 - Système de tracking IoT LoRaWan",
                "SAE 5.02 - Application web Instravel",
                "Gestion de projet en équipe",
                "Technologies émergentes"
            ]
        },
        competences: {
            vlan: "trunk",
            title: "Port Trunk : Compétences de la Formation",
            skills: ["Administration réseaux", "Connexion entreprises/usagers", "Création outils R&T", "Sécurisation SI"],
            projects: [
                "3 Compétences communes du tronc R&T",
                "2 Compétences du parcours Cybersécurité",
                "Apprentissages critiques détaillés",
                "Découvrir toutes les compétences →"
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
            { prompt: 'Switch>', command: 'enable', delay: 130 },
            { prompt: 'Switch#', command: 'configure terminal', delay: 165 },
            { prompt: 'Switch(config)#', command: `interface GigabitEthernet0/${portNumber}`, delay: 130 }
        ];
        
        cliTransitionContent.innerHTML = '';
        
        function typeCommand(index) {
            if (index >= commands.length) {
                // Animation complete, redirect after a short delay
                setTimeout(() => {
                    window.location.href = `./pages/semestre_${semester}/semestre-${semester}.html`;
                }, 400);
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
            }, 33); // Faster typing
        }
        
        // Start typing animation
        setTimeout(() => typeCommand(0), 200);
    }
    
    // Add event listeners to ports
    ports.forEach(port => {
        const semester = port.dataset.semester;
        const isDisabled = port.classList.contains('disabled');
        
        // Only enable hover and click for active ports
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
                
                // Special handling for competences trunk port
                if (semester === 'competences') {
                    cliTransition.classList.add('active');
                    
                    const commands = [
                        { prompt: 'Switch>', command: 'enable', delay: 130 },
                        { prompt: 'Switch#', command: 'show interface trunk', delay: 165 },
                        { prompt: 'Switch#', command: 'show competences-list', delay: 130 }
                    ];
                    
                    cliTransitionContent.innerHTML = '';
                    
                    function typeCommand(index) {
                        if (index >= commands.length) {
                            setTimeout(() => {
                                window.location.href = './pages/competences/competences.html';
                            }, 400);
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
                        
                        let charIndex = 0;
                        const typeInterval = setInterval(() => {
                            if (charIndex < commandText.length) {
                                commandSpan.textContent = commandText.substring(0, charIndex + 1);
                                charIndex++;
                            } else {
                                clearInterval(typeInterval);
                                setTimeout(() => typeCommand(index + 1), cmd.delay);
                            }
                        }, 33);
                    }
                    
                    setTimeout(() => typeCommand(0), 200);
                } else {
                    // Normal semester navigation
                    startCLITransition(parseInt(semester), portNumber);
                }
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
