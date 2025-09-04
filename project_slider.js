 
document.addEventListener("DOMContentLoaded", () => {
  // ————————————————
  // Menu elements
  // ————————————————
  const container = document.querySelector(".container");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuContent = document.querySelector(".menu-content");
  const menuPreviewImg = document.querySelector(".menu-preview-img");
  const menuLinks = document.querySelectorAll(".link a, .social a");

  let isOpen = false;
  let isAnimating = false;

  // Toggle button
  menuToggle.addEventListener("click", () => {
    if (!isOpen) openMenu();
    else closeMenu();
  });

  function cleanupPreviewImages() {
    const previewImages = menuPreviewImg.querySelectorAll("img");
    if (previewImages.length > 3) {
      for (let i = 0; i < previewImages.length - 3; i++) {
        menuPreviewImg.removeChild(previewImages[i]);
      }
    }
  }

  function resetPreviewImage() {
    menuPreviewImg.innerHTML = "";
    const defaultPreviewImg = document.createElement("img");
    defaultPreviewImg.src = "img-1.jpg";
    defaultPreviewImg.alt = "";
    menuPreviewImg.appendChild(defaultPreviewImg);
  }

  function animateMenuToggle(isOpening) {
    const open = document.querySelector("p#menu-open");
    const close = document.querySelector("p#menu-close");

    gsap.to(isOpening ? open : close, {
      x: -5,
      y: isOpening ? -10 : 10,
      rotation: isOpening ? -5 : 5,
      opacity: 0,
      delay: 0.25,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(isOpening ? close : open, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      delay: 0.5,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  function openMenu() {
    if (isAnimating || isOpen) return;
    isAnimating = true;

    gsap.to(container, {
      rotation: 10,
      x: 300,
      y: 450,
      scale: 1.5,
      duration: 1.25,
      ease: "power4.inOut",
    });

    animateMenuToggle(true);

    gsap.to(menuContent, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to([".link a", ".social a"], {
      y: "0%",
      delay: 0.75,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.to(menuOverlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
      duration: 1.25,
      ease: "power4.inOut",
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });
  }

  function closeMenu() {
    if (isAnimating || !isOpen) return;
    isAnimating = true;

    gsap.to(container, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.25,
      ease: "power4.inOut",
    });

    animateMenuToggle(false);

    gsap.to(menuContent, {
      rotation: -15,
      x: -100,
      y: -100,
      scale: 1.5,
      opacity: 0.25,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to(menuOverlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1.25,
      ease: "power4.inOut",
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        gsap.set([".link a", ".social a"], { y: "120%", opacity: 0 });
        resetPreviewImage();
      },
    });
  }

  // Hover preview
  menuLinks.forEach((link) => {
    link.addEventListener("mouseover", () => {
      if (!isOpen || isAnimating) return;

      const imgSrc = link.getAttribute("data-img");
      if (!imgSrc) return;

      const previewImages = menuPreviewImg.querySelectorAll("img");
      if (
        previewImages.length > 0 &&
        previewImages[previewImages.length - 1].src.endsWith(imgSrc)
      ) {
        return;
      }

      const newPreviewImg = document.createElement("img");
      newPreviewImg.src = imgSrc;
      newPreviewImg.alt = "";
      newPreviewImg.style.opacity = "0";
      newPreviewImg.style.transform = "scale(1.25) rotate(10deg)";

      menuPreviewImg.appendChild(newPreviewImg);
      cleanupPreviewImages();

      gsap.to(newPreviewImg, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.75,
        ease: "power2.out",
      });
    });

    // Close menu on click; handle anchors vs external links
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href") || "";
      const isHash = href.startsWith("#");
      if (isHash) e.preventDefault();

      // Start closing animation
      closeMenu();

      // After a short delay, act on the link
      setTimeout(() => {
        if (isHash) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else {
          window.open(href, link.getAttribute("target") || "_self");
        }
      }, 350);
    });
  });

  // ————————————————
  // Slider data
  // ————————————————
  const slides = [
    {
      slideTitle: "Mollie Hughes",
      slideDescription:
        "Custom WordPress site for record-breaking mountaineer Mollie Hughes. Editorial layout with bold photography, accessible navigation, and improved Core Web Vitals for a fast, immersive read.",
      slideUrl: "https://molliehughes.co.uk/",
      slideTags: ["WordPress", "HTML5", "CSS3", "JavaScript"],
      slideImg:
        "https://molliehughes.co.uk/wp-content/uploads/2018/04/cropped-Mollie-header.jpg",
    },
    {
      slideTitle: "Aurabella",
      slideDescription:
        "Work-in-progress Shopify landing page for Aurabella, a luxury wellbeing bath-blends brand. Features a particle-based animated logo over a cinematic backdrop as the centrepiece of the coming-soon experience.",
      slideUrl: "https://aurabella.uk/",
      slideTags: ["Shopify", "GSAP", "WebGL", "Liquid"],
      slideImg: "img/landing.jpg",
    },
    {
      slideTitle: "Tiso",
      slideDescription:
        "Tiso is the biggest outdoor retailer in Scotland, selling outdoor gear, bikes, and skis. Work included brand landing pages, product campaigns, and optimised shopping experiences.",
      slideUrl: "https://www.tiso.com/",
      slideTags: ["Ecommerce", "Smarty", "HTML5", "CSS3", "jQuery"],
      slideImg: "img/tiso.jpg",
    },
    {
      slideTitle: "Tiso History",
      slideDescription:
        "Interactive timeline page charting the brand’s milestones. GSAP-driven scroll animations, pinned sections, and responsive media for an engaging long-form experience.",
      slideUrl: "https://www.tiso.com/history",
      slideTags: ["GSAP", "HTML5", "jQuery", "CSS3"],
      slideImg: "img/history.jpg",
    },
    {
      slideTitle: "The North Face",
      slideDescription:
        "Brand landing page on tiso.com providing insight into The North Face’s story, values, and curated collections, blending editorial content with shoppable features.",
      slideUrl: "https://www.tiso.com/the-north-face-landing",
      slideTags: ["HTML5", "CSS3", "jQuery"],
      slideImg: "img/northface.jpg",
    },
    {
      slideTitle: "Patagonia",
      slideDescription:
        "Brand landing page on tiso.com highlighting Patagonia’s sustainability mission and key product ranges, combining storytelling with direct shopping pathways.",
      slideUrl: "https://www.tiso.com/patagonia-landing",
      slideTags: ["HTML5", "CSS3", "jQuery"],
      slideImg: "img/patagonia.jpg",
    },
    {
      slideTitle: "Explore Aviemore",
      slideDescription:
        "WordPress + Elementor website for a local tourism project, featuring directory cards, itinerary ideas, and simple filtering for a modern visitor experience.",
      slideUrl: "https://www.exploreaviemore.com/",
      slideTags: ["WordPress", "Elementor", "HTML5", "CSS3"],
      slideImg: "img/aviemore.jpg",
    },
  ];

  // ————————————————
  // Slider logic
  // ————————————————
  const totalSlides = slides.length;
  let currentSlide = 1;

  let isSlideAnimating = false;
  let scrollAllowed = true;
  let lastScrollTime = 0;

  function createSlide(slideIndex) {
    const slideData = slides[slideIndex - 1];

    const slide = document.createElement("div");
    slide.className = "slide";

    const slideImg = document.createElement("div");
    slideImg.className = "slide-img";
    const img = document.createElement("img");
    img.src = slideData.slideImg;
    img.alt = "";
    slideImg.appendChild(img);

    const slideHeader = document.createElement("div");
    slideHeader.className = "slide-header";

    const slideTitle = document.createElement("div");
    slideTitle.className = "slide-title";
    const h1 = document.createElement("h1");
    h1.textContent = slideData.slideTitle;
    slideTitle.appendChild(h1);

    const slideDescription = document.createElement("div");
    slideDescription.className = "slide-description";
    const p = document.createElement("p");
    p.textContent = slideData.slideDescription;
    slideDescription.appendChild(p);

    const slideLink = document.createElement("div");
    slideLink.className = "slide-link";
    const a = document.createElement("a");
    a.href = slideData.slideUrl;
    a.textContent = "View Project";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    slideLink.appendChild(a);

    slideHeader.appendChild(slideTitle);
    slideHeader.appendChild(slideDescription);
    slideHeader.appendChild(slideLink);

    const slideInfo = document.createElement("div");
    slideInfo.className = "slide-info";

    const slideTags = document.createElement("div");
    slideTags.className = "slide-tags";
    const tagsLabel = document.createElement("p");
    tagsLabel.textContent = "Tools";
    slideTags.appendChild(tagsLabel);

    slideData.slideTags.forEach((tag) => {
      const tagP = document.createElement("p");
      tagP.textContent = tag;
      slideTags.appendChild(tagP);
    });

    const slideIndexWrapper = document.createElement("div");
    slideIndexWrapper.className = "slide-index-wrapper";
    const slideIndexCopy = document.createElement("p");
    slideIndexCopy.textContent = slideIndex.toString().padStart(2, "0");
    const slideIndexSeparator = document.createElement("p");
    slideIndexSeparator.textContent = "/";
    const slidesTotalCount = document.createElement("p");
    slidesTotalCount.textContent = totalSlides.toString().padStart(2, "0");

    slideIndexWrapper.appendChild(slideIndexCopy);
    slideIndexWrapper.appendChild(slideIndexSeparator);
    slideIndexWrapper.appendChild(slidesTotalCount);

    slideInfo.appendChild(slideTags);
    slideInfo.appendChild(slideIndexWrapper);

    slide.appendChild(slideImg);
    slide.appendChild(slideHeader);
    slide.appendChild(slideInfo);

    return slide;
  }

  function splitText(slide) {
    // Only run if SplitText is available
    if (typeof SplitText === "undefined") return;

    const slideHeader = slide.querySelector(".slide-title h1");
    if (slideHeader) {
      SplitText.create(slideHeader, {
        type: "words",
        wordsClass: "word",
        mask: "words",
      });
    }

    const slideContent = slide.querySelectorAll("p, a");
    slideContent.forEach((element) => {
      SplitText.create(element, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
        reduceWhiteSpace: false,
      });
    });
  }

  function animateSlide(direction) {
    if (isSlideAnimating || !scrollAllowed) return;

    isSlideAnimating = true;
    scrollAllowed = false;

    const slider = document.querySelector(".slider");
    const currentSlideElement = slider ? slider.querySelector(".slide") : null;
    if (!slider || !currentSlideElement) {
      isSlideAnimating = false;
      scrollAllowed = true;
      return;
    }

    if (direction === "down") {
      currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
    } else {
      currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
    }

    const exitY = direction === "down" ? "-200vh" : "200vh";
    const entryY = direction === "down" ? "100vh" : "-100vh";
    const entryClipPath =
      direction === "down"
        ? "polygon(20% 20%, 80% 20%, 80% 100%, 20% 100%)"
        : "polygon(20% 0%, 80% 0%, 80% 80%, 20% 80%)";

    gsap.to(currentSlideElement, {
      scale: 0.25,
      opacity: 0,
      rotation: 30,
      y: exitY,
      duration: 2,
      ease: "power4.inOut",
      force3D: true,
      onComplete: () => {
        currentSlideElement.remove();
      },
    });

    setTimeout(() => {
      const newSlide = createSlide(currentSlide);

      gsap.set(newSlide, {
        y: entryY,
        clipPath: entryClipPath,
        force3D: true,
      });

      slider.appendChild(newSlide);

      splitText(newSlide);

      const words = newSlide.querySelectorAll(".word");
      const lines = newSlide.querySelectorAll(".line");

      gsap.set([...words, ...lines], { y: "100%", force3D: true });

      gsap.to(newSlide, {
        y: 0,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power4.out",
        force3D: true,
        onStart: () => {
          const tl = gsap.timeline();

          const headerWords = newSlide.querySelectorAll(".slide-title .word");
          tl.to(
            headerWords,
            {
              y: "0%",
              duration: 1,
              ease: "power4.out",
              stagger: 0.1,
              force3D: true,
            },
            0.75
          );

          const tagsLines = newSlide.querySelectorAll(".slide-tags .line");
          const indexLines = newSlide.querySelectorAll(
            ".slide-index-wrapper .line"
          );
          const descriptionLines = newSlide.querySelectorAll(
            ".slide-description .line"
          );

          tl.to(
            tagsLines,
            { y: "0%", duration: 1, ease: "power4.out", stagger: 0.1 },
            "-=0.75"
          );

          tl.to(indexLines, { y: "0%", duration: 1, ease: "power4.out", stagger: 0.1 }, "<");
          tl.to(descriptionLines, { y: "0%", duration: 1, ease: "power4.out", stagger: 0.1 }, "<");

          const linkLines = newSlide.querySelectorAll(".slide-link .line");
          tl.to(linkLines, { y: "0%", duration: 1, ease: "power4.out" }, "-=1");
        },
        onComplete: () => {
          isSlideAnimating = false;
          setTimeout(() => {
            scrollAllowed = true;
            lastScrollTime = Date.now();
          }, 100);
        },
      });
    }, 750);
  }

  function handleScroll(direction) {
    const now = Date.now();
    if (isSlideAnimating || !scrollAllowed) return;
    if (now - lastScrollTime < 1000) return;

    lastScrollTime = now;
    animateSlide(direction);
  }

  // Wheel
  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? "down" : "up";
      handleScroll(direction);
    },
    { passive: false }
  );

  // Touch
  let touchStartY = 0;
  let isTouchActive = false;

  window.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
      isTouchActive = true;
    },
    { passive: false }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      if (!isTouchActive || isSlideAnimating || !scrollAllowed) return;

      const touchCurrentY = e.touches[0].clientY;
      const difference = touchStartY - touchCurrentY;

      if (Math.abs(difference) > 50) {
        isTouchActive = false;
        const direction = difference > 0 ? "down" : "up";
        handleScroll(direction);
      }
    },
    { passive: false }
  );

  window.addEventListener("touchend", () => {
    isTouchActive = false;
  });
});
 
