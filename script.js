 

document.addEventListener("DOMContentLoaded", () => {
  // ————————————————
  // Menu elements
  // ————————————————
  const container = document.querySelector(".container");
  const hero = document.querySelector(".hero"); 
  const spotlight = document.querySelector(".spotlight");
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
    defaultPreviewImg.src = "https://cdn.midjourney.com/1de91d02-0f6f-43db-ae17-19ed710a4278/0_0.png";
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
    gsap.to(spotlight, {
      rotation: 10,
      x: 300,
      y: 450,
      scale: 1.5,
      duration: 1.25,
      ease: "power4.inOut",
    });
    gsap.to(hero, {
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
      gsap.to(spotlight, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.25,
      ease: "power4.inOut",
    });
      gsap.to(hero, {
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
});




 

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const animatedIcons = document.querySelector(".animated-icons");
  const iconElements = document.querySelectorAll(".animated-icon");
  const textSegments = document.querySelectorAll(".text-segment");
  const placeholders = document.querySelectorAll(".placeholder-icon");
  const heroHeader = document.querySelector(".hero-header");
  const heroSection = document.querySelector(".hero");

  const textAnimationOrder = [];
  textSegments.forEach((segment, index) => {
    textAnimationOrder.push({ segment, originalIndex: index });
  });

  for (let i = textAnimationOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [textAnimationOrder[i], textAnimationOrder[j]] = [
      textAnimationOrder[j],
      textAnimationOrder[i],
    ];
  }

  const isMobile = window.innerWidth <= 1000;
  const headerIconSize = isMobile ? 30 : 60;
  const currentIconSize = iconElements[0].getBoundingClientRect().width;
  const exactScale = headerIconSize / currentIconSize;

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: `+=${window.innerHeight * 8}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      textSegments.forEach((segment) => {
        gsap.set(segment, { opacity: 0 });
      });

      if (progress <= 0.3) {
        const moveProgress = progress / 0.3;
        const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

        if (progress <= 0.15) {
          const headerProgress = progress / 0.15;
          const headerMoveY = -50 * headerProgress;
          const headerOpacity = 1 - headerProgress;

          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
            opacity: headerOpacity,
          });
        } else {
          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -50px))`,
            opacity: 0,
          });
        }

        if (window.duplicateIcons) {
          window.duplicateIcons.forEach((duplicate) => {
            if (duplicate.parentNode) {
              duplicate.parentNode.removeChild(duplicate);
            }
          });
          window.duplicateIcons = null;
        }

        gsap.set(animatedIcons, {
          x: 0,
          y: containerMoveY,
          scale: 1,
          opacity: 1,
        });

        iconElements.forEach((icon, index) => {
          const staggerDelay = index * 0.1;
          const iconStart = staggerDelay;
          const iconEnd = staggerDelay + 0.5;

          const iconProgress = gsap.utils.mapRange(
            iconStart,
            iconEnd,
            0,
            1,
            moveProgress
          );
          const clampedProgress = Math.max(0, Math.min(1, iconProgress));

          const startOffset = -containerMoveY;
          const individualY = startOffset * (1 - clampedProgress);

          gsap.set(icon, {
            x: 0,
            y: individualY,
          });
        });
      } else if (progress <= 0.6) {
        const scaleProgress = (progress - 0.3) / 0.3;

        gsap.set(heroHeader, {
          transform: `translate(-50%, calc(-50% + -50px))`,
          opacity: 0,
        });

        if (scaleProgress >= 0.5) {
          heroSection.style.backgroundColor = "#e3e3db";
        } else {
          heroSection.style.backgroundColor = "#141414";
        }

        if (window.duplicateIcons) {
          window.duplicateIcons.forEach((duplicate) => {
            if (duplicate.parentNode) {
              duplicate.parentNode.removeChild(duplicate);
            }
          });
          window.duplicateIcons = null;
        }

        const targetCenterY = window.innerHeight / 2;
        const targetCenterX = window.innerWidth / 2;
        const containerRect = animatedIcons.getBoundingClientRect();
        const currentCenterX = containerRect.left + containerRect.width / 2;
        const currentCenterY = containerRect.top + containerRect.height / 2;
        const deltaX = (targetCenterX - currentCenterX) * scaleProgress;
        const deltaY = (targetCenterY - currentCenterY) * scaleProgress;
        const baseY = -window.innerHeight * 0.3;
        const currentScale = 1 + (exactScale - 1) * scaleProgress;

        gsap.set(animatedIcons, {
          x: deltaX,
          y: baseY + deltaY,
          scale: currentScale,
          opacity: 1,
        });

        iconElements.forEach((icon) => {
          gsap.set(icon, { x: 0, y: 0 });
        });
      } else if (progress <= 0.75) {
        const moveProgress = (progress - 0.6) / 0.15;

        gsap.set(heroHeader, {
          transform: `translate(-50%, calc(-50% + -50px))`,
          opacity: 0,
        });

        heroSection.style.backgroundColor = "#e3e3db";

        const targetCenterY = window.innerHeight / 2;
        const targetCenterX = window.innerWidth / 2;
        const containerRect = animatedIcons.getBoundingClientRect();
        const currentCenterX = containerRect.left + containerRect.width / 2;
        const currentCenterY = containerRect.top + containerRect.height / 2;
        const deltaX = targetCenterX - currentCenterX;
        const deltaY = targetCenterY - currentCenterY;
        const baseY = -window.innerHeight * 0.3;

        gsap.set(animatedIcons, {
          x: deltaX,
          y: baseY + deltaY,
          scale: exactScale,
          opacity: 0,
        });

        iconElements.forEach((icon) => {
          gsap.set(icon, { x: 0, y: 0 });
        });

        if (!window.duplicateIcons) {
          window.duplicateIcons = [];

          iconElements.forEach((icon, index) => {
            const duplicate = icon.cloneNode(true);
            duplicate.className = "duplicate-icon";
            duplicate.style.position = "absolute";
            duplicate.style.width = headerIconSize + "px";
            duplicate.style.height = headerIconSize + "px";

            document.body.appendChild(duplicate);
            window.duplicateIcons.push(duplicate);
          });
        }

        if (window.duplicateIcons) {
          window.duplicateIcons.forEach((duplicate, index) => {
            if (index < placeholders.length) {
              const iconRect = iconElements[index].getBoundingClientRect();
              const startCenterX = iconRect.left + iconRect.width / 2;
              const startCenterY = iconRect.top + iconRect.height / 2;
              const startPageX = startCenterX + window.pageXOffset;
              const startPageY = startCenterY + window.pageYOffset;

              const targetRect = placeholders[index].getBoundingClientRect();
              const targetCenterX = targetRect.left + targetRect.width / 2;
              const targetCenterY = targetRect.top + targetRect.height / 2;
              const targetPageX = targetCenterX + window.pageXOffset;
              const targetPageY = targetCenterY + window.pageYOffset;

              const moveX = targetPageX - startPageX;
              const moveY = targetPageY - startPageY;

              let currentX = 0;
              let currentY = 0;

              if (moveProgress <= 0.5) {
                const verticalProgress = moveProgress / 0.5;
                currentY = moveY * verticalProgress;
              } else {
                const horizontalProgress = (moveProgress - 0.5) / 0.5;
                currentY = moveY;
                currentX = moveX * horizontalProgress;
              }

              const finalPageX = startPageX + currentX;
              const finalPageY = startPageY + currentY;

              duplicate.style.left = finalPageX - headerIconSize / 2 + "px";
              duplicate.style.top = finalPageY - headerIconSize / 2 + "px";
              duplicate.style.opacity = "1";
              duplicate.style.display = "flex";
            }
          });
        }
      } else {
        gsap.set(heroHeader, {
          transform: `translate(-50%, calc(-50% + -100px))`,
          opacity: 0,
        });

        heroSection.style.backgroundColor = "#e3e3db";

        gsap.set(animatedIcons, { opacity: 0 });

        if (window.duplicateIcons) {
          window.duplicateIcons.forEach((duplicate, index) => {
            if (index < placeholders.length) {
              const targetRect = placeholders[index].getBoundingClientRect();
              const targetCenterX = targetRect.left + targetRect.width / 2;
              const targetCenterY = targetRect.top + targetRect.height / 2;
              const targetPageX = targetCenterX + window.pageXOffset;
              const targetPageY = targetCenterY + window.pageYOffset;

              duplicate.style.left = targetPageX - headerIconSize / 2 + "px";
              duplicate.style.top = targetPageY - headerIconSize / 2 + "px";
              duplicate.style.opacity = "1";
              duplicate.style.display = "flex";
            }
          });
        }

        textAnimationOrder.forEach((item, randomIndex) => {
          const segmentStart = 0.75 + randomIndex * 0.03;
          const segmentEnd = segmentStart + 0.015;

          const segmentProgress = gsap.utils.mapRange(
            segmentStart,
            segmentEnd,
            0,
            1,
            progress
          );
          const clampedProgress = Math.max(0, Math.min(1, segmentProgress));

          gsap.set(item.segment, {
            opacity: clampedProgress,
          });
        });
      }
    },
  });
});
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // keep references so we can clean up
  let introHeaderSplit = null;
  let outroHeaderSplit = null;
  let spotlightTrigger = null;

  function initSpotlightAnimations() {
    // CLEANUP on rebuild
    if (introHeaderSplit) introHeaderSplit.revert();
    if (outroHeaderSplit) outroHeaderSplit.revert();
    if (spotlightTrigger) spotlightTrigger.kill();

    const images = document.querySelectorAll(".img");
    const coverImg = document.querySelector(".spotlight-cover-img");
    const introHeader = document.querySelector(".spotlight-intro-header h1");
    const outroHeader = document.querySelector(".spotlight-outro-header h1");

    introHeaderSplit = new SplitText(introHeader, { type: "words" });
    gsap.set(introHeaderSplit.words, { opacity: 1 });

    outroHeaderSplit = new SplitText(outroHeader, { type: "words" });
    gsap.set(outroHeaderSplit.words, { opacity: 0 });
    gsap.set(outroHeader, { opacity: 1 });

    const scatterDirections = [
      { x: 1.3, y: 0.7 }, { x: -1.5, y: 1.0 }, { x: 1.1, y: -1.3 },
      { x: -1.7, y: -0.8 }, { x: 0.8, y: 1.5 }, { x: -1.0, y: -1.4 },
      { x: 1.6, y: 0.3 }, { x: -0.7, y: 1.7 }, { x: 1.2, y: -1.6 },
      { x: -1.4, y: 0.9 }, { x: 1.8, y: -0.5 }, { x: -1.1, y: -1.8 },
      { x: 0.9, y: 1.8 }, { x: -1.9, y: 0.4 }, { x: 1.0, y: -1.9 },
      { x: -0.8, y: 1.9 }, { x: 1.7, y: -1.0 }, { x: -1.3, y: -1.2 },
      { x: 0.7, y: 2.0 }, { x: 1.25, y: -0.2 },
    ].slice(0, images.length);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMobile = window.innerWidth < 1000;
    const scatterMultiplier = isMobile ? 2.5 : 0.5;

    const startPositions = Array.from(images).map(() => ({
      x: 0, y: 0, z: -1000, scale: 0,
    }));

    const endPositions = scatterDirections.map((dir) => ({
      x: dir.x * screenWidth * scatterMultiplier,
      y: dir.y * screenHeight * scatterMultiplier,
      z: 2000,
      scale: 1,
    }));

    images.forEach((img, index) => {
      gsap.set(img, startPositions[index]);
    });

    gsap.set(coverImg, { z: -1000, scale: 0, x: 0, y: 0 });

    spotlightTrigger = ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `+=${window.innerHeight * 15}px`, // untouched
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // --- your original animation logic (unchanged) ---
        images.forEach((img, index) => {
          const staggerDelay = index * 0.03;
          const scaleMultiplier = isMobile ? 4 : 2;
          let imageProgress = Math.max(0, (progress - staggerDelay) * 4);

          const start = startPositions[index];
          const end = endPositions[index];

          gsap.set(img, {
            z: gsap.utils.interpolate(start.z, end.z, imageProgress),
            scale: gsap.utils.interpolate(start.scale, end.scale, imageProgress * scaleMultiplier),
            x: gsap.utils.interpolate(start.x, end.x, imageProgress),
            y: gsap.utils.interpolate(start.y, end.y, imageProgress),
          });
        });

        const coverProgress = Math.max(0, (progress - 0.7) * 4);
        gsap.set(coverImg, {
          z: -1000 + 1000 * coverProgress,
          scale: Math.min(1, coverProgress * 2),
          x: 0,
          y: 0,
        });

        // intro fade (unchanged)
        if (introHeaderSplit && introHeaderSplit.words.length > 0) {
          if (progress >= 0.6 && progress <= 0.75) {
            const introFadeProgress = (progress - 0.6) / 0.15;
            const totalWords = introHeaderSplit.words.length;
            introHeaderSplit.words.forEach((word, index) => {
              const wordFadeProgress = index / totalWords;
              const fadeRange = 0.1;
              if (introFadeProgress >= wordFadeProgress + fadeRange) {
                gsap.set(word, { opacity: 0 });
              } else if (introFadeProgress <= wordFadeProgress) {
                gsap.set(word, { opacity: 1 });
              } else {
                gsap.set(word, {
                  opacity: 1 - (introFadeProgress - wordFadeProgress) / fadeRange,
                });
              }
            });
          } else if (progress < 0.6) {
            gsap.set(introHeaderSplit.words, { opacity: 1 });
          } else if (progress > 0.75) {
            gsap.set(introHeaderSplit.words, { opacity: 0 });
          }
        }

        // outro fade (unchanged)
        if (outroHeaderSplit && outroHeaderSplit.words.length > 0) {
          if (progress >= 0.8 && progress <= 0.95) {
            const outroRevealProgress = (progress - 0.8) / 0.15;
            const totalWords = outroHeaderSplit.words.length;
            outroHeaderSplit.words.forEach((word, index) => {
              const wordRevealProgress = index / totalWords;
              const fadeRange = 0.1;
              if (outroRevealProgress >= wordRevealProgress + fadeRange) {
                gsap.set(word, { opacity: 1 });
              } else if (outroRevealProgress <= wordRevealProgress) {
                gsap.set(word, { opacity: 0 });
              } else {
                gsap.set(word, {
                  opacity: (outroRevealProgress - wordRevealProgress) / fadeRange,
                });
              }
            });
          } else if (progress < 0.8) {
            gsap.set(outroHeaderSplit.words, { opacity: 0 });
          } else if (progress > 0.95) {
            gsap.set(outroHeaderSplit.words, { opacity: 1 });
          }
        }
      },
    });

    ScrollTrigger.refresh();
  }

  // initial run
  initSpotlightAnimations();

  // rebuild on resize
  window.addEventListener("resize", () => {
    initSpotlightAnimations();
  });
});


function isValid(input) {
  if (input.type === "email") {
    return /\S+@\S+\.\S+/.test(input.value);
  }
  if (input.tagName.toLowerCase() === "textarea") {
    return input.value.trim().length > 5; // at least 5 chars for message
  }
  return input.value.trim().length > 0;
}

function focusElement(inputElm) {
  const field = inputElm.closest(".form-field");
  const lsLine = field.querySelector(".ls-line");
  const svg = field.querySelector("svg");

  if (svg.classList.contains("initial") || svg.classList.contains("validate") ||
      svg.classList.contains("error") || svg.classList.contains("success")) {
    svg.classList.remove("initial", "validate", "error", "success");
    svg.classList.add("focus");

    function handler() {
      svg.classList.remove("error", "success");
      lsLine.removeEventListener("transitionend", handler);
    }
    lsLine.addEventListener("transitionend", handler, false);
  }
}

function blurElement(inputElm) {
  const field = inputElm.closest(".form-field");
  const svg = field.querySelector("svg");

  if (svg.classList.contains("focus")) {
    svg.classList.remove("focus");
    svg.classList.add("validate");

    setTimeout(function () {
      svg.classList.remove("validate");
      if (isValid(inputElm)) {
        svg.classList.add("success");
      } else {
        inputElm.setAttribute("placeholder", inputElm.getAttribute("data-text"));
        svg.classList.add("error");
      }
    }, 1000);
  }
}

function bindEvents() {
  const formFields = document.querySelectorAll(".form-field input, .form-field textarea");

  formFields.forEach(input => {
    // Only attach animations to inputs that have SVG
    if (input.tagName.toLowerCase() === "input") {
      input.addEventListener("focus", () => focusElement(input));
      input.addEventListener("blur", () => blurElement(input));
    }
  });

  document.querySelector("#contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const button = this.querySelector(".submitBtn");

    formFields.forEach(input => {
      if (input.tagName.toLowerCase() === "input") {
        blurElement(input);
      }
    });

    const allValid = Array.from(formFields).every(isValid);
    if (allValid) {
      button.classList.add("loading");

      setTimeout(() => {
        button.classList.remove("loading");
        button.classList.add("sent");

        setTimeout(() => {
          button.classList.remove("sent");
          this.reset();
          // reset SVGs
          document.querySelectorAll(".form-field svg").forEach(svg => {
            svg.classList.remove("success", "error", "focus", "validate");
            svg.classList.add("initial");
          });
        }, 2500);
      }, 2000);
    }
  });
}

bindEvents();
