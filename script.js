// script.js for Agro Sustentável

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, footer a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            if (targetId) {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'md:hidden text-2xl text-green-800';
    mobileMenuBtn.innerHTML = '☰';
    const headerContainer = document.querySelector('header .max-w-7xl');
    if (headerContainer) {
        const nav = headerContainer.querySelector('nav');
        headerContainer.insertBefore(mobileMenuBtn, nav);
        
        let isMenuOpen = false;
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (nav) {
                nav.style.display = isMenuOpen ? 'flex' : 'none';
                nav.style.flexDirection = 'column';
                nav.style.gap = '1rem';
            }
            mobileMenuBtn.innerHTML = isMenuOpen ? '✕' : '☰';
        });
    }

    // Quiz Functionality
    const quizBtn = document.getElementById('iniciar-quiz');
    if (quizBtn) {
        quizBtn.addEventListener('click', startQuiz);
    }

    function startQuiz() {
        const questions = [
            {
                question: "Qual é a principal prática de conservação do solo mencionada?",
                options: ["Plantio convencional", "Plantio direto", "Queima de palha", "Monocultura intensiva"],
                correct: 1
            },
            {
                question: "O que significa ILPF?",
                options: ["Integração Lavoura-Pecuária-Floresta", "Irrigação Linear Por Fita", "Intensificação Lavoura Pecuária Florestal", "Índice de Lucro Por Fazenda"],
                correct: 0
            },
            {
                question: "Qual tecnologia pode economizar até 30% de água?",
                options: ["Drones", "Irrigação inteligente", "GPS", "Robótica"],
                correct: 1
            },
            {
                question: "Qual é a meta de futuro para o agronegócio brasileiro?",
                options: ["Aumentar o desmatamento", "Ser carbono neutro ou positivo", "Eliminar todas as tecnologias", "Focar apenas em exportação"],
                correct: 1
            }
        ];

        let currentQuestion = 0;
        let score = 0;

        const quizModal = document.createElement('div');
        quizModal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
        quizModal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-lg w-full p-8">
                <div id="quiz-content"></div>
                <div class="flex justify-between mt-6">
                    <button id="quit-quiz" class="px-6 py-3 text-gray-600 hover:text-red-600">Sair</button>
                    <button id="next-question" class="btn-primary px-8 py-3">Próxima</button>
                </div>
            </div>
        `;
        document.body.appendChild(quizModal);

        function showQuestion() {
            const content = document.getElementById('quiz-content');
            const q = questions[currentQuestion];
            
            let optionsHTML = '';
            q.options.forEach((option, index) => {
                optionsHTML += `
                    <button onclick="selectAnswer(${index})" 
                            class="answer-btn w-full text-left p-4 mb-3 border border-gray-200 hover:border-green-600 rounded-xl transition-all">
                        ${option}
                    </button>
                `;
            });

            content.innerHTML = `
                <h3 class="text-2xl font-bold text-green-800 mb-6">Pergunta ${currentQuestion + 1} de ${questions.length}</h3>
                <p class="text-xl mb-8">${q.question}</p>
                <div class="options">${optionsHTML}</div>
                <div id="feedback" class="mt-4 min-h-[40px]"></div>
            `;
        }

        window.selectAnswer = (selectedIndex) => {
            const q = questions[currentQuestion];
            const feedback = document.getElementById('feedback');
            const buttons = document.querySelectorAll('.answer-btn');
            
            buttons.forEach((btn, idx) => {
                btn.disabled = true;
                if (idx === q.correct) {
                    btn.classList.add('bg-green-100', 'border-green-600');
                }
                if (idx === selectedIndex && idx !== q.correct) {
                    btn.classList.add('bg-red-100', 'border-red-600');
                }
            });

            if (selectedIndex === q.correct) score++;

            document.getElementById('next-question').textContent = 
                currentQuestion < questions.length - 1 ? 'Próxima' : 'Ver Resultado';
        };

        document.getElementById('next-question').addEventListener('click', () => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        });

        document.getElementById('quit-quiz').addEventListener('click', () => {
            quizModal.remove();
        });

        showQuestion();
    }

    function showResults() {
        const content = document.getElementById('quiz-content');
        const percentage = Math.round((score / questions.length) * 100);
        
        let message = '';
        if (percentage >= 80) message = "Parabéns! Você é um verdadeiro defensor da agricultura sustentável! 🌱";
        else if (percentage >= 50) message = "Bom trabalho! Continue aprendendo sobre práticas sustentáveis.";
        else message = "Ótimo esforço! O agronegócio sustentável precisa de mais pessoas como você.";

        content.innerHTML = `
            <div class="text-center">
                <div class="text-6xl mb-6">🌾</div>
                <h3 class="text-3xl font-bold text-green-800 mb-4">Quiz Concluído!</h3>
                <p class="text-5xl font-bold text-green-600 mb-2">${percentage}%</p>
                <p class="text-xl mb-8">${score} de ${questions.length} acertos</p>
                <p class="text-lg mb-8">${message}</p>
                <button onclick="restartQuiz()" 
                        class="btn-primary px-10 py-4 text-lg">Refazer Quiz</button>
            </div>
        `;
    }

    window.restartQuiz = () => {
        document.querySelector('.fixed.inset-0').remove();
        startQuiz();
    };

    // Impact Calculator
    const calcBtn = document.getElementById('calcular-impacto');
    if (calcBtn) {
        calcBtn.addEventListener('click', showCalculator);
    }

    function showCalculator() {
        const calcModal = document.createElement('div');
        calcModal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
        calcModal.innerHTML = `
            <div class="bg-white rounded-3xl max-w-md w-full p-8 max-h-[90vh] overflow-auto">
                <h3 class="text-2xl font-bold text-green-800 mb-6 text-center">Calculadora de Impacto Ambiental</h3>
                
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium mb-2">Tamanho da propriedade (hectares)</label>
                        <input type="number" id="farm-size" value="500" 
                               class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-600">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Práticas sustentáveis adotadas</label>
                        <div class="grid grid-cols-2 gap-3">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" id="plantio-direto" checked> Plantio Direto
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" id="ilpf" checked> ILPF
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" id="irrigacao" checked> Irrigação Inteligente
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" id="solar" checked> Energia Solar
                            </label>
                        </div>
                    </div>
                    
                    <button id="calculate-btn" 
                            class="btn-primary w-full py-4 text-lg font-semibold">
                        Calcular Impacto
                    </button>
                    
                    <div id="result" class="hidden mt-6 p-6 bg-green-50 rounded-2xl border border-green-100"></div>
                </div>
                
                <button onclick="this.closest('.fixed').remove()" 
                        class="mt-6 text-gray-500 hover:text-red-600 mx-auto block">
                    Fechar
                </button>
            </div>
        `;
        document.body.appendChild(calcModal);

        document.getElementById('calculate-btn').addEventListener('click', calculateImpact);
    }

    function calculateImpact() {
        const size = parseFloat(document.getElementById('farm-size').value) || 100;
        const hasPlantio = document.getElementById('plantio-direto').checked;
        const hasILPF = document.getElementById('ilpf').checked;
        const hasIrrig = document.getElementById('irrigacao').checked;
        const hasSolar = document.getElementById('solar').checked;

        let carbonReduction = size * 2.5; // base tons CO2e per year
        
        if (hasPlantio) carbonReduction *= 1.3;
        if (hasILPF) carbonReduction *= 1.25;
        if (hasIrrig) carbonReduction *= 1.15;
        if (hasSolar) carbonReduction *= 1.2;

        const waterSaved = Math.round(size * 1200 * (hasIrrig ? 0.3 : 0.1));
        
        const resultDiv = document.getElementById('result');
        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = `
            <h4 class="font-semibold text-green-800 mb-4">Seu impacto estimado:</h4>
            <div class="grid grid-cols-2 gap-4 text-center">
                <div class="bg-white p-4 rounded-2xl">
                    <div class="text-3xl font-bold text-green-600">${Math.round(carbonReduction)}</div>
                    <div class="text-sm text-gray-600">toneladas de CO₂e evitadas/ano</div>
                </div>
                <div class="bg-white p-4 rounded-2xl">
                    <div class="text-3xl font-bold text-blue-600">${waterSaved.toLocaleString()}</div>
                    <div class="text-sm text-gray-600">litros de água economizados/ano</div>
                </div>
            </div>
            <p class="text-center text-sm text-gray-500 mt-6">
                Resultado baseado em médias do setor. 
                Cada ação conta para um agro mais sustentável!
            </p>
        `;
    }

    // Gallery lightbox (simple version)
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100]';
            lightbox.innerHTML = `
                <img src="${img.src}" class="max-h-[90vh] max-w-[90vw] rounded-2xl">
                <button onclick="this.parentElement.remove()" 
                        class="absolute top-8 right-8 text-white text-4xl">✕</button>
            `;
            document.body.appendChild(lightbox);
        });
    });

    // Add subtle scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, section').forEach(el => {
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Footer year
    const yearEl = document.querySelector('.footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
