/**
 * Zenith Medical Centre — shared front-end behaviour.
 * No external libraries; small and dependency-free for performance.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initAccordions();
    initAnnouncementBanner();
    renderHours();
    renderRegistrationStatus();
    renderDoctorCards();
    renderDoctorProfile();
    renderContactDetails();
    initContactForm();
    initHeaderShadowOnScroll();
  });

  /* ---------------- Mobile navigation ---------------- */
  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  function initHeaderShadowOnScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = function () {
      header.style.boxShadow = window.scrollY > 4 ? "var(--shadow-sm)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Accessible accordion (FAQ) ---------------- */
  function initAccordions() {
    document.querySelectorAll(".accordion-trigger").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        const panelId = btn.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);
        btn.setAttribute("aria-expanded", String(!expanded));
        if (panel) panel.setAttribute("data-open", String(!expanded));
      });
    });
  }

  /* ---------------- Announcement banner ---------------- */
  function initAnnouncementBanner() {
    const el = document.getElementById("announcement-banner");
    if (!el || typeof CLINIC_CONTENT === "undefined") return;

    const active = CLINIC_CONTENT.announcements.find(function (a) { return a.active; });
    if (!active) {
      el.hidden = true;
      return;
    }

    const dismissedKey = "zenith-dismissed-announcement";
    if (sessionStorage.getItem(dismissedKey) === active.id) {
      el.hidden = true;
      return;
    }

    const textEl = el.querySelector("[data-announcement-text]");
    if (textEl) textEl.innerHTML = active.message;
    el.hidden = false;

    const dismissBtn = el.querySelector(".dismiss");
    if (dismissBtn) {
      dismissBtn.addEventListener("click", function () {
        el.hidden = true;
        try { sessionStorage.setItem(dismissedKey, active.id); } catch (e) { /* storage unavailable */ }
      });
    }
  }

  /* ---------------- Hours rendering ---------------- */
  function renderHours() {
    const targets = document.querySelectorAll("[data-render='hours']");
    if (!targets.length || typeof CLINIC_CONTENT === "undefined") return;

    targets.forEach(function (target) {
      const rows = CLINIC_CONTENT.hours.map(function (h) {
        return "<tr><td>" + h.day + "</td><td>" + h.hours + "</td></tr>";
      }).join("");
      target.innerHTML = rows;
    });
  }

  /* ---------------- Registration status ---------------- */
  function renderRegistrationStatus() {
    const targets = document.querySelectorAll("[data-render='registration-status']");
    if (!targets.length || typeof CLINIC_CONTENT === "undefined") return;

    const status = CLINIC_CONTENT.registrationStatus;
    const text = CLINIC_CONTENT.registrationStatusText[status] || "";
    const labels = { accepting: "Accepting New Patients", waitlist: "Wait List Open", closed: "Registration Closed" };

    targets.forEach(function (target) {
      target.classList.remove("waitlist", "closed");
      if (status !== "accepting") target.classList.add(status);
      target.innerHTML = '<span class="status-dot" aria-hidden="true"></span> ' + (labels[status] || "");
      target.setAttribute("data-status-text", text);
    });

    document.querySelectorAll("[data-render='registration-status-text']").forEach(function (el) {
      el.textContent = text;
    });
  }

  /* ---------------- Contact details (single source: content.js) ---------------- */
  function renderContactDetails() {
    if (typeof CLINIC_CONTENT === "undefined") return;
    const c = CLINIC_CONTENT.contact;

    setText("contact-phone-text", c.phone);
    setText("contact-fax-text", c.fax);
    setText("contact-email-text", c.email);
    setText("contact-address-1", c.addressLine1);
    setText("contact-address-2", c.addressLine2);
    setText("contact-parking-text", c.parking);

    document.querySelectorAll("[data-render='contact-phone-href']").forEach(function (el) {
      el.setAttribute("href", c.phoneHref);
      if (!el.textContent.trim()) el.textContent = c.phone;
    });
    document.querySelectorAll("[data-render='contact-email-href']").forEach(function (el) {
      el.setAttribute("href", "mailto:" + c.email);
      if (!el.textContent.trim()) el.textContent = c.email;
    });
    document.querySelectorAll("[data-render='map-embed']").forEach(function (el) {
      el.setAttribute("src", "https://maps.google.com/maps?q=" + encodeURIComponent(c.mapQuery) + "&z=14&output=embed");
    });
    document.querySelectorAll("[data-render='directions-href']").forEach(function (el) {
      el.setAttribute("href", "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(c.mapQuery));
    });
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  }

  /* ---------------- Doctor card rendering ---------------- */
  function doctorAvatarSvg(name) {
    const initials = name.replace("Dr.", "").trim().split(" ").filter(Boolean).map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase();
    return '<svg viewBox="0 0 200 160" role="img" aria-label="Placeholder photo for ' + name + '" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="200" height="160" fill="#e7eef5"/>' +
      '<circle cx="100" cy="60" r="34" fill="#0d3b61" opacity="0.15"/>' +
      '<text x="100" y="70" text-anchor="middle" font-family="Inter, sans-serif" font-size="30" font-weight="700" fill="#0a2f4e">' + initials + '</text>' +
      '<rect x="40" y="112" width="120" height="14" rx="7" fill="#0d3b61" opacity="0.10"/>' +
      '</svg>';
  }

  function doctorCardHtml(doc, basePath) {
    const statusLabel = doc.accepting ? "Accepting new patients" : "Not currently accepting new patients";
    return (
      '<article class="card doctor-card">' +
        '<div class="doctor-photo">' + doctorAvatarSvg(doc.name) + '</div>' +
        '<h3>' + doc.name + '</h3>' +
        '<p class="credentials">' + doc.credentials + '</p>' +
        '<p class="role">' + doc.role + '</p>' +
        '<p class="meta-line"><strong>Clinical interests:</strong> ' + doc.interests.join(", ") + '</p>' +
        '<p class="meta-line"><strong>Languages:</strong> ' + doc.languages.join(", ") + '</p>' +
        '<p class="meta-line"><strong>Status:</strong> ' + statusLabel + '</p>' +
        '<a class="view-profile" href="' + basePath + 'doctors/' + doc.slug + '.html">View Profile &rarr;</a>' +
      '</article>'
    );
  }

  function renderDoctorCards() {
    if (typeof CLINIC_CONTENT === "undefined") return;

    const preview = document.querySelector("[data-render='doctors-preview']");
    if (preview) {
      const basePath = preview.getAttribute("data-base-path") || "";
      preview.innerHTML = CLINIC_CONTENT.doctors.slice(0, 3).map(function (d) { return doctorCardHtml(d, basePath); }).join("");
    }

    const full = document.querySelector("[data-render='doctors-full']");
    if (full) {
      const basePath = full.getAttribute("data-base-path") || "";
      full.innerHTML = CLINIC_CONTENT.doctors.map(function (d) { return doctorCardHtml(d, basePath); }).join("");
    }
  }

  /* ---------------- Individual physician profile ---------------- */
  function renderDoctorProfile() {
    const el = document.querySelector("[data-render='doctor-profile']");
    if (!el || typeof CLINIC_CONTENT === "undefined") return;
    const slug = el.getAttribute("data-slug");
    const doc = CLINIC_CONTENT.doctors.find(function (d) { return d.slug === slug; });
    if (!doc) return;

    const statusLabel = doc.accepting ? "Accepting new patients" : "Not currently accepting new patients";
    document.title = doc.name + " | Zenith Medical Centre Ottawa";
    setText("doctor-name", doc.name);
    setText("doctor-credentials", doc.credentials);
    setText("doctor-role", doc.role);
    setText("doctor-bio", doc.bio);
    setText("doctor-status", statusLabel);

    const photoEl = document.getElementById("doctor-photo");
    if (photoEl) photoEl.innerHTML = doctorAvatarSvg(doc.name);

    const interestsEl = document.getElementById("doctor-interests");
    if (interestsEl) interestsEl.innerHTML = doc.interests.map(function (i) { return "<li>" + i + "</li>"; }).join("");

    const languagesEl = document.getElementById("doctor-languages");
    if (languagesEl) languagesEl.innerHTML = doc.languages.map(function (l) { return "<li>" + l + "</li>"; }).join("");
  }

  /* ---------------- Contact form: validation + honeypot + simple captcha ---------------- */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    // Simple arithmetic CAPTCHA (front-end deterrent only).
    // A production deployment MUST also verify submissions server-side
    // (e.g., a serverless function or backend that re-checks this value,
    // rate-limits by IP, and/or verifies a service like hCaptcha/reCAPTCHA).
    const a = Math.floor(Math.random() * 8) + 1;
    const b = Math.floor(Math.random() * 8) + 1;
    const captchaQuestion = document.getElementById("captcha-question");
    const captchaAnswerField = document.getElementById("captcha-answer");
    if (captchaQuestion) {
      captchaQuestion.textContent = "What is " + a + " + " + b + "?";
      form.dataset.captchaExpected = String(a + b);
    }

    const statusEl = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      valid = validateField("contact-name", function (v) { return v.trim().length > 1; }, "Please enter your name.") && valid;
      valid = validateField("contact-phone", function (v) { return /^[0-9()+\-.\s]{7,20}$/.test(v.trim()); }, "Please enter a valid phone number.") && valid;
      valid = validateField("contact-email", function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, "Please enter a valid email address.") && valid;
      valid = validateField("contact-message", function (v) { return v.trim().length > 5; }, "Please enter a message.") && valid;

      // Honeypot: real users never fill this hidden field.
      const honeypot = form.querySelector("input[name='website']");
      if (honeypot && honeypot.value.trim() !== "") {
        valid = false;
      }

      // CAPTCHA check
      if (captchaAnswerField) {
        const expected = form.dataset.captchaExpected;
        if (String(captchaAnswerField.value).trim() !== expected) {
          valid = false;
          showFieldError("captcha-answer", "That answer isn't quite right — please try again.");
        } else {
          clearFieldError("captcha-answer");
        }
      }

      if (!valid) {
        if (statusEl) {
          statusEl.textContent = "Please correct the highlighted fields and try again.";
          statusEl.className = "form-status error";
        }
        return;
      }

      // NOTE: This front end does not transmit or store personal health
      // information. Wire this submission to a secure backend endpoint
      // that performs server-side validation and spam filtering before
      // enabling it in production.
      if (statusEl) {
        statusEl.textContent = "Thank you — your message has been received. Our team will respond during clinic hours.";
        statusEl.className = "form-status success";
      }
      form.reset();
    });

    function validateField(id, testFn, message) {
      const field = document.getElementById(id);
      if (!field) return true;
      const ok = testFn(field.value || "");
      if (!ok) {
        showFieldError(id, message);
      } else {
        clearFieldError(id);
      }
      return ok;
    }

    function showFieldError(id, message) {
      const field = document.getElementById(id);
      const errorEl = document.getElementById(id + "-error");
      if (field) field.setAttribute("aria-invalid", "true");
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add("is-visible");
      }
    }

    function clearFieldError(id) {
      const field = document.getElementById(id);
      const errorEl = document.getElementById(id + "-error");
      if (field) field.removeAttribute("aria-invalid");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("is-visible");
      }
    }
  }
})();
