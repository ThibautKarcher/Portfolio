// Semester to Semester Transition
document.addEventListener('DOMContentLoaded', () => {
    const cliTransition = document.getElementById('cliTransition');
    const cliTransitionContent = document.getElementById('cliTransitionContent');
    
    // Function to start transition between semesters
    function startSemesterTransition(targetSemester, targetUrl) {
        // Show overlay
        cliTransition.classList.add('active');
        
        // CLI commands sequence for changing interface
        const commands = [
            { prompt: 'Switch(config-if)#', command: 'exit', delay: 400 },
            { prompt: 'Switch(config)#', command: `interface GigabitEthernet0/${targetSemester}`, delay: 600 }
        ];
        
        cliTransitionContent.innerHTML = '';
        
        function typeCommand(index) {
            if (index >= commands.length) {
                // Animation complete, redirect after a short delay
                setTimeout(() => {
                    window.location.href = targetUrl;
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
    
    // Function to return to switch (main page)
    function returnToSwitch(targetUrl) {
        // Show overlay
        cliTransition.classList.add('active');
        
        // CLI command for exiting
        const commands = [
            { prompt: 'Switch(config-if)#', command: 'end', delay: 400 }
        ];
        
        cliTransitionContent.innerHTML = '';
        
        function typeCommand(index) {
            if (index >= commands.length) {
                // Animation complete, redirect after a short delay
                setTimeout(() => {
                    window.location.href = targetUrl;
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
    
    // Add event listeners to semester navigation links
    const semesterLinks = document.querySelectorAll('a[href^="semestre-"]');
    semesterLinks.forEach(link => {
        const href = link.getAttribute('href');
        const match = href.match(/semestre-(\d+)\.html/);
        
        if (match) {
            const targetSemester = match[1];
            link.addEventListener('click', (e) => {
                e.preventDefault();
                startSemesterTransition(targetSemester, href);
            });
        }
    });
    
    // Add event listeners to "Retour au Switch" links
    const switchLinks = document.querySelectorAll('a[href="index.html"]');
    switchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            returnToSwitch('index.html');
        });
    });
});
