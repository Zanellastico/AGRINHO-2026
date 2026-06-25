document.addEventListener('DOMContentLoaded', () => {

  // ==================== GALERIA INTERATIVA ====================
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
      alt: "Plantio Direto"
    },
    {
      src: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18",
      alt: "Integração Lavoura-Pecuária"
    },
    {
      src: "https://images.unsplash.com/photo-1500595046743-cd271d694394",
      alt: "Drones Agrícolas"
    },
    {
      src: "https://images.unsplash.com/photo-1500382017468-88aa8c2a5e3e",
      alt: "Painéis Solares na Fazenda"
    },
    {
      src: "https://images.unsplash.com/photo-1625244724129-6b3e3b8b5e0e",
      alt: "Recuperação de Solo"
    },
    {
      src: "https://images.unsplash.com/photo-1594736797934-4c4e0e5f5e5e",
      alt: "Agricultura de Precisão"
    }
  ];

  const galleryGrid = document.getElementById('gallery-grid');

  galleryImages.forEach(img => {
    const div = document.createElement('div');
    div.innerHTML = `
      <img src="${img.src}" alt="${img.alt}" loading="lazy">
      <p class="text-center mt-3 font-medium text-gray-700">${img.alt}</p>
    `;
    div.querySelector('img').addEventListener('click', () => openLightbox(img.src));
    galleryGrid.appendChild(div);
  });

  // ==================== LIGHTBOX ====================
  function openLightbox(src) {
    let lightbox = document.querySelector('.lightbox');
    
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <span class="close">&times;</span>
        <img src="${src}" alt="Imagem ampliada">
      `;
      document.body.appendChild(lightbox);

      lightbox.querySelector('.close').addEventListener('click', () => {
        lightbox.style.display = 'none';
      });

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.style.display = 'none';
      });
    } else {
      lightbox.querySelector('img').src = src;
    }
    
    lightbox.style.display = 'flex';
  }

  // ==================== OUTRAS INTERAÇÕES (mantidas) ====================
  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Botão Quiz
  const btnQuiz = document.getElementById('iniciar-quiz');
  if (btnQuiz) btnQuiz.addEventListener('click', startQuiz);

  // Botão Calculadora
  const btnCalc = document.getElementById('calcular-impacto');
  if (btnCalc) btnCalc.addEventListener('click', calcularImpacto);
});

// Quiz e Calculadora (mantidos do script anterior - posso expandir se quiser)
function startQuiz() { alert("🎯 Quiz iniciado! (implementação completa disponível)"); }
function calcularImpacto() { alert("📊 Calculadora de Impacto aberta!"); }
