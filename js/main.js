/**
 * NOUFAL - AI CONTENT CREATOR PORTFOLIO
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initPhotoUploader();
  initProjectFiltering();
  initProjectModal();
  initContactForm();
  initClipboardActions();
  initServiceInquiryLinks();
  initSmoothScroll();
});

// ==========================================================================
// 1. Theme Toggle (Paper Editorial <-> Dark Studio)
// ==========================================================================
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('noufal_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('noufal_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark Studio' : 'Editorial Paper'} mode`);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggleBtn i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
}

// ==========================================================================
// 2. Mobile Navigation Menu
// ==========================================================================
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    toggleBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // Close nav on click link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

// ==========================================================================
// 3. Polaroid Custom Photo Upload & Persistence
// ==========================================================================
function initPhotoUploader() {
  const fileInput = document.getElementById('avatarFileInput');
  const avatarImg = document.getElementById('creatorAvatarImg');
  const uploadOverlay = document.getElementById('photoUploadBtn');

  if (!fileInput || !avatarImg) return;

  // Load saved photo if exists
  const savedAvatar = localStorage.getItem('noufal_avatar_photo');
  if (savedAvatar) {
    avatarImg.src = savedAvatar;
  }

  if (uploadOverlay) {
    uploadOverlay.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });
  }

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file (PNG/JPG/WEBP).');
        return;
      }

      const reader = new FileReader();
      reader.onload = function(evt) {
        const base64Data = evt.target.result;
        avatarImg.src = base64Data;
        try {
          localStorage.setItem('noufal_avatar_photo', base64Data);
          showToast('Photo updated successfully!');
        } catch (err) {
          showToast('Photo displayed! (File was large for local cache)');
        }
      };
      reader.readAsDataURL(file);
    }
  });
}

// ==========================================================================
// 4. Project Filtering
// ==========================================================================
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// ==========================================================================
// 5. Project Details Lightbox Modal
// ==========================================================================
const projectData = {
  'proj-vid-1': {
    title: 'Luxury Jewellery: AI Commercial Reel',
    category: '01. AI Video Projects',
    video: 'assets/videos/jewellery.mp4',
    image: 'assets/images/project-video-1.svg',
    description: 'High-end luxury jewellery commercial created with AI video synthesis, dynamic lighting reflections, and cinematic pacing.',
    tools: 'AI Video Synthesis, CapCut Audio Design',
    showcase: 'AI reels, jewellery commercials, cinematic ads',
    promptSnippet: 'macro cinematic product commercial of luxury diamond and gold jewelry, glistening sparkle refraction, dark velvet studio lighting, 4k 60fps'
  },
  'proj-vid-2': {
    title: 'Luxury Perfume: AI Cinematic Trailer',
    category: '01. AI Video Projects',
    video: 'assets/videos/perfume.mp4',
    image: 'assets/images/project-video-2.svg',
    description: 'Cinematic AI video commercial for a luxury fragrance brand with fluid reflections and amber lighting.',
    tools: 'AI Video Synthesis, CapCut Audio Design',
    showcase: 'AI reels, perfume trailers, luxury commercials',
    promptSnippet: 'cinematic product commercial of luxury crystal perfume bottle, fluid amber motion, gold highlights, 4k 60fps'
  },
  'proj-ad-1': {
    title: 'Artisan Chocolate: AI Product Commercial',
    category: '02. AI Advertisement Projects',
    video: 'assets/videos/chocolate.mp4',
    image: 'assets/images/project-ad-1.svg',
    description: 'Sensory-rich cinematic AI product commercial showcasing artisan chocolate textures, fluid motion, and gourmet aesthetic.',
    tools: 'AI Video Synthesis, CapCut Audio Design',
    showcase: 'Product commercials, food & beverage ads, luxury reels',
    promptSnippet: 'cinematic macro commercial of molten dark artisan chocolate pouring over gourmet hazelnut pralines, golden ambient lighting, 4k 60fps slow motion'
  },
  'proj-ad-2': {
    title: 'Aura Energy Drink: High-ROAS AI Ad',
    category: '02. AI Advertisement Projects',
    video: 'assets/videos/energy_drink.mp4',
    image: 'assets/images/project-ad-2.svg',
    description: 'High-energy dynamic commercial engineered for Meta Ads with striking visual hooks and dynamic pacing.',
    tools: 'AI Video Synthesis, CapCut Audio Design',
    showcase: 'E-commerce ads, beverage commercials, 3.8x ROAS conversion visuals',
    promptSnippet: 'high-velocity dynamic commercial of glowing neon energy drink can splashing through icy crystal water droplets, volumetric green rim light, 4k 60fps'
  },
  'proj-img-2': {
    title: 'Ronin 2099: Cyber Concept Character & Poster',
    category: '03. AI Image & Poster Design',
    image: 'assets/images/project-image-2.svg',
    description: 'Hyper-detailed futuristic character poster featuring custom cyber armor, neon katana illumination, and dramatic crimson backlighting. Ideal for gaming brands, digital collectibles, and streetwear prints.',
    tools: 'Nano Banana, Kling Engine, Lightroom Color Correction',
    showcase: 'AI concept art, digital artwork, creative posters',
    promptSnippet: 'futuristic cybernetic samurai armor, glowing ruby red visor, dark crimson ambient smoke, Japanese calligraphy accents, gritty texture --ar 4:5'
  }
};

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const mediaContainer = document.querySelector('.modal-media-container');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalHireBtn = document.getElementById('modalHireBtn');

  if (!modal || !closeBtn || !mediaContainer) return;

  document.querySelectorAll('.open-modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = trigger.getAttribute('data-project-id');
      const data = projectData[projId];

      if (data) {
        if (data.video) {
          mediaContainer.innerHTML = `<video src="${data.video}" controls autoplay loop playsinline style="width:100%; height:100%; object-fit:contain; background:#000; display:block;"></video>`;
        } else {
          mediaContainer.innerHTML = `<img src="${data.image}" id="modalImage" alt="Project Preview" style="width:100%; height:100%; object-fit:cover;">`;
        }

        if (modalCategory) modalCategory.textContent = data.category;
        if (modalTitle) modalTitle.textContent = data.title;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    const video = mediaContainer.querySelector('video');
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (modalHireBtn) {
    modalHireBtn.addEventListener('click', () => {
      closeModal();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// ==========================================================================
// 6. Contact Form & WhatsApp Integration
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('projectInquiryForm');
  const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');
  const sendEmailBtn = document.getElementById('sendEmailBtn');

  if (!form) return;

  const getFormData = () => {
    const name = document.getElementById('senderName')?.value.trim() || 'Client';
    const emailOrPhone = document.getElementById('senderContact')?.value.trim() || 'Not specified';
    const service = document.getElementById('serviceSelect')?.value || 'AI Content Creation';
    const budget = document.getElementById('budgetSelect')?.value || 'Flexible';
    const message = document.getElementById('projectMessage')?.value.trim() || 'Hi Noufal, I would like to discuss a project with you.';

    return { name, emailOrPhone, service, budget, message };
  };

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const { name, emailOrPhone, service, budget, message } = getFormData();
      
      const whatsappText = `*New Project Inquiry for Muhammed Noufal* 🚀\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Contact:* ${emailOrPhone}\n` +
        `🎯 *Service Required:* ${service}\n` +
        `💰 *Estimated Budget:* ${budget}\n` +
        `📝 *Project Details:*\n${message}\n\n` +
        `Sent via aantappante.ai portfolio`;

      const whatsappUrl = `https://wa.me/919048045393?text=${encodeURIComponent(whatsappText)}`;
      window.open(whatsappUrl, '_blank');
      showToast('Opening WhatsApp with your project brief...');
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const { name, emailOrPhone, service, budget, message } = getFormData();

      const subject = `Project Inquiry: ${service} - From ${name}`;
      const emailBody = `Hi Muhammed Noufal,\n\n` +
        `My name is ${name} (${emailOrPhone}).\n` +
        `I am interested in your service: ${service}.\n` +
        `Estimated Budget: ${budget}\n\n` +
        `Project Details:\n${message}\n\n` +
        `Best regards,\n${name}`;

      const mailtoUrl = `mailto:wwwnoufalpattuppara@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoUrl;
      showToast('Opening your default email client...');
    });
  }
}

// ==========================================================================
// 7. Clipboard Copy Actions
// ==========================================================================
function initClipboardActions() {
  document.querySelectorAll('.copy-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast(`Could not copy, text: ${textToCopy}`);
        });
      }
    });
  });
}

// ==========================================================================
// 8. Service Card Inquire Quick Links
// ==========================================================================
function initServiceInquiryLinks() {
  document.querySelectorAll('.service-inquire-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = link.getAttribute('data-service-name');
      const serviceSelect = document.getElementById('serviceSelect');
      const contactSection = document.getElementById('contact');

      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        showToast(`Selected "${serviceName}" in contact form`);
      }
    });
  });
}

// ==========================================================================
// 9. Smooth Scroll & Back to Top
// ==========================================================================
function initSmoothScroll() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ==========================================================================
// Toast Notification Engine
// ==========================================================================
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
