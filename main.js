/**
 * Pollboxx Landing Page — Vanilla JavaScript
 * Navigation, scroll effects, carousel, form validation, and submission.
 */

(function () {
  "use strict";

  const FOUNDING_SPOTS = { claimed: 753, total: 1000 };
  const FORMSPREE_URL = "https://formspree.io/f/xnjdywqw";

  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a, .nav-links a");
  const heroForm = document.getElementById("hero-form");
  const heroEmail = document.getElementById("hero-email");
  const heroEmailError = document.getElementById("hero-email-error");
  const signupForm = document.getElementById("signup-form");
  const successModal = document.getElementById("success-modal");
  const modalClose = document.getElementById("modal-close");
  const carouselTrack = document.getElementById("carousel-track");
  const carouselDots = document.getElementById("carousel-dots");
  const progressFill = document.getElementById("progress-fill");
  const revealElements = document.querySelectorAll(".reveal");

  /* Progress meter */

  if (progressFill) {
    const pct = (FOUNDING_SPOTS.claimed / FOUNDING_SPOTS.total) * 100;
    requestAnimationFrame(function () {
      progressFill.style.width = pct + "%";
    });
  }

  /* Navbar scroll */

  function handleNavbarScroll() {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 20);
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* Mobile menu */

  function closeMobileMenu() {
    if (!hamburger) return;
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
    mobileOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function openMobileMenu() {
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("open");
    mobileOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      mobileMenu.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
    });
  }

  if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileMenu);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMobileMenu();
      if (successModal && successModal.classList.contains("open")) closeModal();
    }
  });

  /* Active nav link */

  const sections = document.querySelectorAll("section[id]");

  function setActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        mobileNavLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveNavLink, { passive: true });
  mobileNavLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  /* Scroll reveal */

  if ("IntersectionObserver" in window && revealElements.length) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Carousel dots */

  if (carouselTrack && carouselDots) {
    const slides = carouselTrack.querySelectorAll(".screenshot-slide");

    slides.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Go to screenshot " + (i + 1));
      dot.addEventListener("click", function () {
        slides[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
      carouselDots.appendChild(dot);
    });

    carouselTrack.addEventListener("scroll", function () {
      const trackRect = carouselTrack.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      let closest = 0;
      let minDist = Infinity;

      slides.forEach(function (slide, i) {
        const rect = slide.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const dist = Math.abs(center - trackCenter);
        if (dist < minDist) { minDist = dist; closest = i; }
      });

      carouselDots.querySelectorAll(".carousel-dot").forEach(function (dot, i) {
        dot.classList.toggle("active", i === closest);
      });
    }, { passive: true });
  }

  /* Validation helpers */

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add("error");
    if (error) { error.textContent = message; error.classList.add("visible"); }
  }

  function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.remove("error");
    if (error) { error.textContent = ""; error.classList.remove("visible"); }
  }

  function showErrorEl(errorId, message) {
    const error = document.getElementById(errorId);
    if (error) { error.textContent = message; error.classList.add("visible"); }
  }

  function clearErrorEl(errorId) {
    const error = document.getElementById(errorId);
    if (error) { error.textContent = ""; error.classList.remove("visible"); }
  }

  /* Modal */

  function openModal() {
    if (!successModal) return;
    successModal.classList.add("open");
    document.body.style.overflow = "hidden";
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!successModal) return;
    successModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (successModal) {
    successModal.addEventListener("click", function (e) {
      if (e.target === successModal) closeModal();
    });
  }

  const shareText = encodeURIComponent("Just joined the Pollboxx Founding Members Circle — vote, debate, decide. Grab your spot:");
  const shareUrl = encodeURIComponent(window.location.href);

  const shareX = document.getElementById("share-x");
  if (shareX) shareX.href = "https://twitter.com/intent/tweet?text=" + shareText + "&url=" + shareUrl;

  /* Form submission */

  function submitToFormspree(data, submitBtn, originalHTML) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

    return fetch(FORMSPREE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Submit failed");
        openModal();
        return true;
      })
      .catch(function () {
        alert("Something went wrong. Please try again or email us at hello@pollboxx.com.");
        return false;
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      });
  }

  /* Hero quick-capture */

  if (heroForm) {
    function showHeroError(message) {
      heroEmail.classList.add("error");
      if (heroEmailError) {
        heroEmailError.textContent = message;
        heroEmailError.classList.add("visible");
      }
    }

    function clearHeroError() {
      heroEmail.classList.remove("error");
      if (heroEmailError) {
        heroEmailError.textContent = "";
        heroEmailError.classList.remove("visible");
      }
    }

    heroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = heroEmail.value.trim();

      if (!email) { showHeroError("Email is required."); return; }
      if (!isValidEmail(email)) { showHeroError("Please enter a valid email address."); return; }

      clearHeroError();
      const btn = heroForm.querySelector('[type="submit"]');
      const original = btn.innerHTML;

      submitToFormspree({
        email: email,
        source: "hero_quick_capture",
        _subject: "Pollboxx Founding Circle — Hero Sign-Up",
        _replyto: email,
      }, btn, original).then(function (ok) {
        if (ok) {
          heroForm.reset();
          document.getElementById("signup").scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    heroEmail.addEventListener("input", function () {
      const val = heroEmail.value.trim();
      if (!val) { clearHeroError(); return; }
      if (isValidEmail(val)) clearHeroError();
      else showHeroError("Please enter a valid email address.");
    });
  }

  /* Full signup form */

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById("fullname").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const platform = signupForm.querySelector('input[name="platform"]:checked');
      const topics = signupForm.querySelectorAll('input[name="topics"]:checked');

      clearError("fullname", "fullname-error");
      clearError("signup-email", "signup-email-error");
      clearErrorEl("platform-error");
      clearErrorEl("topics-error");

      if (!name || name.length < 2) {
        showError("fullname", "fullname-error", "Please enter your full name.");
        valid = false;
      }

      if (!email) {
        showError("signup-email", "signup-email-error", "Email is required.");
        valid = false;
      } else if (!isValidEmail(email)) {
        showError("signup-email", "signup-email-error", "Please enter a valid email address.");
        valid = false;
      }

      if (!platform) {
        showErrorEl("platform-error", "Please select a platform preference.");
        valid = false;
      }

      if (topics.length === 0) {
        showErrorEl("topics-error", "Select at least one topic you care about.");
        valid = false;
      }

      if (!valid) return;

      const topicsList = Array.from(topics).map(function (t) { return t.value; });
      const submitBtn = document.getElementById("signup-submit");
      const original = submitBtn.innerHTML;

      submitToFormspree({
        name: name,
        email: email,
        platform: platform.value,
        topics: topicsList.join(", "),
        source: "founding_circle_signup",
        _subject: "Pollboxx Founding Circle — Full Sign-Up",
        _replyto: email,
      }, submitBtn, original).then(function (ok) {
        if (ok) signupForm.reset();
      });
    });

    document.getElementById("signup-email").addEventListener("input", function () {
      const val = this.value.trim();
      if (!val) { clearError("signup-email", "signup-email-error"); return; }
      if (isValidEmail(val)) clearError("signup-email", "signup-email-error");
      else showError("signup-email", "signup-email-error", "Please enter a valid email address.");
    });
  }

  /* Smooth scroll */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navHeight,
        behavior: "smooth",
      });
    });
  });
})();
