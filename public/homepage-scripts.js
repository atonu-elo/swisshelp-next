/* ==========================================================
   Next.js afterInteractive Compatibility Patch
   ----------------------------------------------------------
   When Next.js loads this script with strategy="afterInteractive",
   DOMContentLoaded has ALREADY fired. Any call to
   document.addEventListener('DOMContentLoaded', fn) is a no-op.
   This patch makes those handlers run via setTimeout(0) so all
   JS initialisation (bento reveal, animations, slider, etc.)
   works correctly inside the Next.js App Router.
   ========================================================== */
(function () {
  if (document.readyState === 'loading') return; // DOM not ready — DOMContentLoaded will fire normally
  var _origAEL = Document.prototype.addEventListener;
  Document.prototype.addEventListener = function (type, fn, opts) {
    if (type === 'DOMContentLoaded') {
      setTimeout(fn, 0); // run on next tick — DOM is ready, original event already fired
    } else {
      _origAEL.call(this, type, fn, opts);
    }
  };
  // Restore after 500ms — all DOMContentLoaded registrations happen synchronously in this script tick
  setTimeout(function () { Document.prototype.addEventListener = _origAEL; }, 500);
})();

// Scramble Hover Links (Event Delegation - globally active across all pages)
(function () {
  if (typeof window === 'undefined') return;
  var scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  if (window.__swhScrambleListenerAdded) return;
  window.__swhScrambleListenerAdded = true;

  document.addEventListener("mouseover", function (e) {
    var el = e.target.closest("[data-scramble]");
    if (!el) return;

    var textNode = null;
    for (var i = 0; i < el.childNodes.length; i++) {
      if (el.childNodes[i].nodeType === 3 && el.childNodes[i].textContent.trim()) {
        textNode = el.childNodes[i];
        break;
      }
    }
    if (!textNode) return;

    if (!el.__scrambleOriginal) {
      el.__scrambleOriginal = textNode.textContent;
    }

    if (el.__scrambling) return;
    el.__scrambling = true;

    var original = el.__scrambleOriginal;
    var iteration = 0;

    if (el.__scrambleInterval) {
      clearInterval(el.__scrambleInterval);
    }

    el.__scrambleInterval = setInterval(function () {
      textNode.textContent = original.split("").map(function (ch, idx) {
        if (idx < iteration) return original[idx];
        if (ch === " " || /[·\-—\/()\\.,]/.test(ch)) return ch;
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }).join("");
      iteration += 0.5;
      if (iteration >= original.length + 1) {
        clearInterval(el.__scrambleInterval);
        textNode.textContent = original;
        el.__scrambling = false;
      }
    }, 38);
  });
})();

// Re-executable homepage initialization suite
window.__swhInitHomepage = function () {
  // Guard: only execute homepage animations on the actual homepage path to prevent mutating dynamic React subpages
  if (typeof window !== 'undefined' && window.location.pathname !== '/') {
    return;
  }
  // Guard to prevent double execution on the same DOM render
  var activeRoot = document.getElementById('swh-homepage-root') || document.getElementById('main-content');
  if (activeRoot) {
    if (activeRoot.dataset.swhInitialized === "1") return;
    activeRoot.dataset.swhInitialized = "1";
  }

  // 1. Set page-loaded body class
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add('page-loaded');
    });
  });

  // 2. FAQ Toggles
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    if (btn.dataset.faqBound) return;
    btn.dataset.faqBound = "1";
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const open = item.classList.contains('open');
      item.classList.toggle('open');
      btn.setAttribute('aria-expanded', !open);
    });
  });

  // 3. Floating Phone Visibility
  (function () {
    const fp = document.querySelector('.float-phone');
    const target = document.getElementById('kontakt');
    if (!fp || !target || !('IntersectionObserver' in window)) return;
    if (fp.dataset.observerBound) return;
    fp.dataset.observerBound = "1";
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          fp.style.opacity = '0';
          fp.style.pointerEvents = 'none';
        } else {
          fp.style.opacity = '';
          fp.style.pointerEvents = '';
        }
      });
    }, { threshold: 0.18 });
    io.observe(target);
    fp.style.transition = 'opacity .3s, background .2s, transform .2s';
  })();

  // 4. Funnel Form Logic
  (function () {
    const form = document.getElementById('funnel-form');
    if (!form) return;
    if (form.dataset.funnelBound) return;
    form.dataset.funnelBound = "1";
    
    const dots = form.querySelectorAll('.funnel-dot');
    const doneEl = form.querySelector('.funnel-done');
    const nav = document.getElementById('funnel-nav');
    const backBtn = document.getElementById('funnel-back');
    const nextBtn = document.getElementById('funnel-next');
    const submitBtn = document.getElementById('funnel-submit');
    const qTime = document.getElementById('q-time');

    let current = 1;
    let branch = 'time'; // time | emergency | other
    const data = { anliegen: '', wann: '', name: '', tel: '', note: '' };

    const branchFor = {
      'Notfall': 'emergency',
      'Service': 'time',
      'Wallbox': 'time',
      'Smart Home': 'time',
      'NIV-Kontrolle': 'time',
      'Anderes': 'other'
    };
    const timeQuestion = {
      'Service': 'Wann soll der Service stattfinden?',
      'Wallbox': 'Wann soll die Wallbox installiert werden?',
      'Smart Home': 'Wann soll das Smart Home umgesetzt werden?',
      'NIV-Kontrolle': 'Wann brauchen Sie den Sicherheitsnachweis?'
    };

    // Step-1 Options
    form.querySelectorAll('.funnel-step[data-step="1"] .funnel-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        form.querySelectorAll('.funnel-step[data-step="1"] .funnel-option').forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        data.anliegen = opt.dataset.value;
        branch = branchFor[data.anliegen] || 'time';
        if (branch === 'time' && timeQuestion[data.anliegen] && qTime) {
          qTime.textContent = timeQuestion[data.anliegen];
        }
        setTimeout(function () { goTo(2); }, 200);
      });
    });

    // Step-2 Time-Branch Options
    form.querySelectorAll('.funnel-step[data-branch="time"] .funnel-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        form.querySelectorAll('.funnel-step[data-branch="time"] .funnel-option').forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        data.wann = opt.dataset.value;
        setTimeout(function () { goTo(3); }, 200);
      });
    });

    function showStep(n) {
      const allSteps = form.querySelectorAll('.funnel-step, .funnel-done');
      allSteps.forEach(function (s) {
        const step = parseInt(s.dataset.step);
        const stepBranch = s.dataset.branch;
        s.classList.remove('active', 'leaving-left');
        if (step === n) {
          if (step === 2) {
            if (stepBranch === branch) {
              s.style.display = '';
              requestAnimationFrame(function () { s.classList.add('active'); });
            } else {
              s.style.display = 'none';
            }
          } else {
            s.style.display = '';
            requestAnimationFrame(function () { s.classList.add('active'); });
          }
        } else {
          if (step === 2 && stepBranch) {
            s.style.display = stepBranch === branch ? '' : 'none';
          }
        }
      });
    }

    function goTo(n) {
      current = n;
      dots.forEach(function (d) { d.classList.toggle('active', parseInt(d.dataset.step) <= n); });
      backBtn.disabled = n === 1;

      if (n === 3) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
      } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
      }

      showStep(n);
    }

    nextBtn.addEventListener('click', function () {
      if (current === 1 && !data.anliegen) return;
      if (current === 2 && branch === 'time' && !data.wann) return;
      if (current < 3) goTo(current + 1);
    });
    backBtn.addEventListener('click', function () { if (current > 1) goTo(current - 1); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      data.name = document.getElementById('f-name').value.trim();
      data.tel = document.getElementById('f-tel').value.trim();
      data.note = document.getElementById('f-note').value.trim();
      if (!data.name || !data.tel) return;
      const allSteps = form.querySelectorAll('.funnel-step');
      allSteps.forEach(function (s) { s.classList.remove('active'); });
      doneEl.classList.add('active');
      nav.style.display = 'none';
    });
  })();

  // 5. Bento Card Bulk Reveal
  (function () {
    var bentoGrid = document.querySelector(".bento");
    if (!bentoGrid || bentoGrid.dataset.bentoBound === "1") return;
    bentoGrid.dataset.bentoBound = "1";

    var cards = document.querySelectorAll(".bento-card");
    if (!cards.length) return;

    // Reset visibility from previous render
    // cards.forEach(function (c) { c.classList.remove("is-in"); });

    function sectionOf(el) {
      return el.closest(".bento-grid") || el.closest("section") || el.parentElement;
    }
    var sections = new Map();
    cards.forEach(function (c) {
      var sec = sectionOf(c);
      if (!sections.has(sec)) sections.set(sec, []);
      sections.get(sec).push(c);
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var groupCards = sections.get(e.target);
          if (groupCards) {
            groupCards.forEach(function (c) { c.classList.add("is-in"); });
          }
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });

    sections.forEach(function (groupCards, sec) {
      io.observe(sec);
      var rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight || sec.clientHeight === 0) {
        groupCards.forEach(function (c) { c.classList.add("is-in"); });
        io.unobserve(sec);
      }
    });
  })();

  // 6. Animation Suite (Headlines, Eyebrows, Counter)
  (function () {
    var SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function splitWords(el) {
      if (!el) return;
      if (el.dataset.wordsApplied === "1") return;
      el.dataset.wordsApplied = "1";
      if (!el.hasAttribute("data-words")) el.setAttribute("data-words", "");
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
      var textNodes = [];
      var n;
      while ((n = walker.nextNode())) textNodes.push(n);
      var wi = 0;
      textNodes.forEach(function (tn) {
        var text = tn.textContent;
        if (!text || !text.trim()) return;
        var frag = document.createDocumentFragment();
        var tokens = text.split(/(\s+)/);
        tokens.forEach(function (token) {
          if (!token) return;
          if (/^\s+$/.test(token)) {
            frag.appendChild(document.createTextNode(token));
          } else {
            var span = document.createElement("span");
            span.className = "word";
            span.style.setProperty("--wi", wi);
            wi++;
            var inner = document.createElement("span");
            inner.className = "word-inner";
            inner.textContent = token;
            span.appendChild(inner);
            frag.appendChild(span);
          }
        });
        tn.parentNode.replaceChild(frag, tn);
      });
    }

    function markEyebrow(el) {
      if (!el) return;
      if (el.dataset.charsApplied === "1") return;
      el.dataset.charsApplied = "1";
      if (!el.hasAttribute("data-chars")) el.setAttribute("data-chars", "");
      var orig = "";
      el.childNodes.forEach(function (n) {
        if (n.nodeType === 3) orig += n.textContent;
        else if (n.nodeType === 1) orig += n.textContent;
      });
      el.dataset.charsOrig = orig;
    }

    function scrambleEyebrow(el) {
      if (!el || el.dataset.charsScrambled === "1") return;
      el.dataset.charsScrambled = "1";
      if (REDUCED) return;
      scrambleTextNodes(el, 1100);
    }

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
    function countTextNode(textNode, target, duration, startVal) {
      if (REDUCED) { textNode.textContent = target; return; }
      var from = (typeof startVal === "number" && !isNaN(startVal)) ? startVal : 0;
      var span = target - from;
      var start = performance.now();
      function step(now) {
        var p = Math.min((now - start) / duration, 1);
        var v = Math.floor(from + easeOutCubic(p) * span);
        textNode.textContent = v;
        if (p < 1) requestAnimationFrame(step);
        else textNode.textContent = target;
      }
      requestAnimationFrame(step);
    }

    function animateMegaStat(el, delay) {
      if (el.dataset.megaAnimated === "1") return;
      el.dataset.megaAnimated = "1";
      setTimeout(function () {
        el.classList.add("is-in");
        var numEl = el.querySelector(".mega-stat-num");
        if (!numEl) return;
        var firstTextNode = null;
        var firstText = "";
        for (var i = 0; i < numEl.childNodes.length; i++) {
          var n = numEl.childNodes[i];
          if (n.nodeType === 3 && n.textContent.trim()) {
            firstTextNode = n;
            firstText = n.textContent.trim();
            break;
          }
        }
        var asNum = parseInt(firstText, 10);
        if (firstTextNode && !isNaN(asNum) && /^\d+$/.test(firstText)) {
          countTextNode(firstTextNode, asNum, 1500);
        } else {
          scrambleTextNodes(numEl, 1200);
        }
      }, delay);
    }

    function scrambleTextNodes(el, duration) {
      if (REDUCED) return;
      if (el.dataset.scrambled === "done") return;

      if (el.__scrambleTick) {
        clearInterval(el.__scrambleTick);
        el.__scrambleTick = null;
      }

      var parts = el.__scrambleParts;
      if (!parts) {
        parts = [];
        el.childNodes.forEach(function (n) {
          if (n.nodeType === 3 && n.textContent.trim()) parts.push({ node: n, original: n.textContent });
          else if (n.nodeName === "EM") parts.push({ node: n, original: n.textContent });
        });
        el.__scrambleParts = parts;
      }
      if (!parts.length) { el.dataset.scrambled = "done"; return; }

      var start = Date.now();
      var tick = setInterval(function () {
        var elapsed = Date.now() - start;
        var progress = Math.min(elapsed / duration, 1);
        parts.forEach(function (p) {
          var revealLen = Math.floor(p.original.length * progress);
          p.node.textContent = p.original.split("").map(function (ch, i) {
            if (i < revealLen) return p.original[i];
            if (/[^A-Za-z0-9]/.test(ch)) return ch;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }).join("");
        });
        if (progress >= 1) {
          clearInterval(tick);
          parts.forEach(function (p) { p.node.textContent = p.original; });
          el.dataset.scrambled = "done";
          el.__scrambleTick = null;
        }
      }, 70);
      el.__scrambleTick = tick;
    }

    function animateProofCounter(el) {
      if (el.dataset.counted === "1") return;
      el.dataset.counted = "1";
      var firstTextNode = null;
      for (var i = 0; i < el.childNodes.length; i++) {
        if (el.childNodes[i].nodeType === 3 && el.childNodes[i].textContent.trim()) {
          firstTextNode = el.childNodes[i];
          break;
        }
      }
      if (!firstTextNode) return;
      var target = parseInt(firstTextNode.textContent.replace(/\D/g, ""), 10);
      if (isNaN(target)) return;
      var startVal = Math.round(target * 0.875);
      firstTextNode.textContent = startVal;
      countTextNode(firstTextNode, target, 2200, startVal);
    }

    function setupImgReveals() {
      var IMG_SELECTORS = [
        ".ablauf-step-img",
        ".knx-img",
        ".wallbox-img",
        ".about-img",
        ".about-us-img-full",
        ".team-photo-full",
        ".team-card-img",
        ".big-cta-bg",
        ".knx-partner-logo-img",
        "[data-img-reveal]"
      ];
      var nodes = Array.from(document.querySelectorAll(IMG_SELECTORS.join(","))).filter(function(n) {
        return !n.classList.contains("is-visible");
      });
      if (!nodes.length) return;
      nodes.forEach(function (n) {
        // n.classList.remove("is-visible");
        if (!n.querySelector("img") && !n.querySelector("picture")) return;
        n.setAttribute("data-img-reveal", "");
      });
      if (REDUCED || !("IntersectionObserver" in window)) {
        nodes.forEach(function (n) { n.classList.add("is-visible"); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      nodes.forEach(function (n) {
        io.observe(n);
        var rect = n.getBoundingClientRect();
        if (rect.top < window.innerHeight || n.clientHeight === 0) {
          n.classList.add("is-visible");
          io.unobserve(n);
        }
      });
    }

    function triggerReveal(target) {
      target.classList.add("is-visible");
      target.querySelectorAll("[data-words]").forEach(function (w) { w.classList.add("is-visible"); });
      target.querySelectorAll("[data-chars]").forEach(function (c) {
        c.classList.add("is-visible");
        scrambleEyebrow(c);
      });
      target.querySelectorAll(".about-us-proof-num").forEach(function (c) { animateProofCounter(c); });

      if (target.matches("[data-words]")) target.classList.add("is-visible");
      if (target.matches("[data-chars]")) {
        target.classList.add("is-visible");
        scrambleEyebrow(target);
      }
      if (target.matches(".about-us-proof-num")) animateProofCounter(target);
    }

    // Split words on headlines
    var wordTargets = document.querySelectorAll(
      ".hero h1, [data-reveal] h1, [data-reveal] h2, .diag-break h2, .big-cta h2"
    );
    wordTargets.forEach(splitWords);

    // Eyebrows scramble setup
    var charTargets = document.querySelectorAll(".hero-eyebrow, .eyebrow, .diag-break-eyebrow");
    charTargets.forEach(markEyebrow);

    // Image reveal setup
    setupImgReveals();

    // Trigger hero directly
    var heroEyebrow = document.querySelector(".hero-eyebrow");
    var heroH1 = document.querySelector(".hero h1");
    if (heroEyebrow) {
      setTimeout(function () {
        heroEyebrow.classList.add("is-visible");
        scrambleEyebrow(heroEyebrow);
      }, 180);
    }
    if (heroH1) {
      setTimeout(function () { heroH1.classList.add("is-visible"); }, 380);
    }

    // Mega-Stats
    var stats = document.querySelectorAll(".mega-stat");
    if (stats.length) {
      stats.forEach(function (el) {
        if (el.classList.contains("is-in")) return;
        el.classList.remove("is-in");
        delete el.dataset.megaAnimated;
        var numEl = el.querySelector(".mega-stat-num");
        if (numEl) {
          delete numEl.dataset.scrambled;
          if (numEl.__scrambleTick) {
            clearInterval(numEl.__scrambleTick);
            numEl.__scrambleTick = null;
          }
        }
      });
      var statsObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            stats.forEach(function (el) { animateMegaStat(el, 0); });
            statsObs.disconnect();
          }
        });
      }, { threshold: 0.32 });
      statsObs.observe(stats[0]);
    }

    window.__swhTriggerReveal = triggerReveal;
  })();

  // 7. Scramble Hover Links (Moved to global scope)

  // 8. Ablauf Slider
  (function () {
    var slider = document.getElementById("ablauf-slider");
    if (!slider) return;
    if (slider.dataset.sliderBound) return;
    slider.dataset.sliderBound = "1";

    var steps = slider.querySelectorAll(".ablauf-step");
    var segs = document.querySelectorAll(".ablauf-progress-top .ablauf-progress-seg");
    var counter = document.getElementById("ablauf-current");
    var prevBtn = document.querySelector('.ablauf-nav-btn[data-dir="prev"]');
    var nextBtn = document.querySelector('.ablauf-nav-btn[data-dir="next"]');
    if (steps.length === 0) return;
    var current = 0;
    var INTERVAL = 5500;

    function setDir(dir) {
      if (dir === "prev") {
        slider.style.setProperty("--ablauf-enter-from", "-100%");
        slider.style.setProperty("--ablauf-exit-to", "100%");
      } else {
        slider.style.setProperty("--ablauf-enter-from", "100%");
        slider.style.setProperty("--ablauf-exit-to", "-100%");
      }
    }

    function goto(next, dir) {
      next = ((next % steps.length) + steps.length) % steps.length;
      if (next === current) return;
      setDir(dir || "next");
      for (var i = 0; i < steps.length; i++) {
        steps[i].classList.remove("is-active", "is-leaving");
      }
      steps[current].classList.add("is-leaving");
      void steps[next].offsetWidth;
      steps[next].classList.add("is-active");
      for (var j = 0; j < segs.length; j++) {
        segs[j].classList.remove("is-active", "is-done");
        if (j < next) segs[j].classList.add("is-done");
      }
      if (counter) counter.textContent = (next + 1 < 10 ? "0" : "") + (next + 1);
      if (segs[next]) {
        void segs[next].offsetWidth;
        segs[next].classList.add("is-active");
      }
      current = next;
    }

    var timer = setInterval(function () { goto(current + 1, "next"); }, INTERVAL);
    function reset() { clearInterval(timer); timer = setInterval(function () { goto(current + 1, "next"); }, INTERVAL); }

    if (nextBtn) nextBtn.addEventListener("click", function () { goto(current + 1, "next"); reset(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { goto(current - 1, "prev"); reset(); });

    window.addEventListener("keydown", function (e) {
      var rect = slider.getBoundingClientRect();
      var inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;
      if (e.key === "ArrowLeft") { goto(current - 1, "prev"); reset(); }
      if (e.key === "ArrowRight") { goto(current + 1, "next"); reset(); }
    });
  })();

  // 9. Wallbox Carousel
  (function () {
    var carousel = document.getElementById("wallbox-carousel");
    if (!carousel) return;
    if (carousel.dataset.carouselBound) return;
    carousel.dataset.carouselBound = "1";

    var slides = carousel.querySelectorAll(".wallbox-step");
    var segs = carousel.querySelectorAll(".wallbox-progress .wallbox-progress-seg");
    var progress = carousel.querySelector(".wallbox-progress");
    if (!slides.length) return;

    var current = 0;
    for (var initialIndex = 0; initialIndex < slides.length; initialIndex++) {
      if (slides[initialIndex].classList.contains("is-active")) {
        current = initialIndex;
        break;
      }
    }
    // Read interval from CSS variable (e.g., "4s") or default to 4000ms
    var configuredInterval = carousel.style.getPropertyValue("--wallbox-interval") || window.getComputedStyle(carousel).getPropertyValue("--wallbox-interval");
    var intervalSeconds = parseFloat(configuredInterval);
    var INTERVAL = Number.isFinite(intervalSeconds) && intervalSeconds > 0 ? intervalSeconds * 1000 : 4000;

    function setDir(dir) {
      if (dir === "prev") {
        carousel.style.setProperty("--wallbox-enter-from", "-100%");
        carousel.style.setProperty("--wallbox-exit-to", "100%");
      } else {
        carousel.style.setProperty("--wallbox-enter-from", "100%");
        carousel.style.setProperty("--wallbox-exit-to", "-100%");
      }
    }

    function goto(next, dir) {
      next = ((next % slides.length) + slides.length) % slides.length;
      if (next === current) return;
      setDir(dir || "next");
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove("is-active", "is-leaving");
      }
      slides[current].classList.add("is-leaving");
      void slides[next].offsetWidth;
      slides[next].classList.add("is-active");

      for (var j = 0; j < segs.length; j++) {
        segs[j].classList.remove("is-active", "is-done");
        if (j < next) segs[j].classList.add("is-done");
      }
      if (segs[next]) {
        void segs[next].offsetWidth;
        segs[next].classList.add("is-active");
      }
      if (progress) {
        progress.setAttribute("aria-valuenow", String(next + 1));
      }

      current = next;
    }

    setDir("next");
    if (progress) {
      progress.setAttribute("aria-valuenow", String(current + 1));
    }
    setInterval(function () {
      goto(current + 1, "next");
    }, INTERVAL);
  })();

  // 10. Scroll Reveal
  (function () {
    var trigger = window.__swhTriggerReveal || function (el) { el.classList.add("is-visible"); };
    var seen = new Set();
    function add(el) { if (el && !seen.has(el)) { seen.add(el); } }
    document.querySelectorAll("[data-reveal]").forEach(add);
    document.querySelectorAll(".diag-break h2, .big-cta h2").forEach(function (h) {
      if (!h.closest("[data-reveal]")) add(h);
    });
    document.querySelectorAll(".diag-break-eyebrow").forEach(function (eb) {
      if (!eb.closest("[data-reveal]")) add(eb);
    });

    var els = Array.from(seen).filter(function(el) {
      return !el.classList.contains("is-visible");
    });
    if (!els.length) return;

    // Reset visibility class
    // els.forEach(function (el) { el.classList.remove("is-visible"); });

    if (!("IntersectionObserver" in window)) {
      els.forEach(trigger);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          trigger(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px 12% 0px" });
    els.forEach(function (el) {
      io.observe(el);
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight || el.clientHeight === 0) {
        trigger(el);
        io.unobserve(el);
      }
    });
  })();

  // 11. Card Height Equalizer
  (function () {
    function equalize(els) {
      if (!els.length) return;
      els.forEach(function (e) { e.style.minHeight = ""; });
      var max = els.reduce(function (m, e) { return Math.max(m, e.offsetHeight); }, 0);
      els.forEach(function (e) { e.style.minHeight = max + "px"; });
    }
    function equalizeCards(sel) {
      equalize(Array.from(document.querySelectorAll(sel)));
    }
    function equalizeChildren(parentSel, childSel) {
      var parents = Array.from(document.querySelectorAll(parentSel));
      var kids = parents.map(function (p) { return p.querySelector(childSel); }).filter(Boolean);
      equalize(kids);
    }
    function runAll() {
      equalizeChildren(".about-us-card", "h3");
      equalizeChildren(".team-card", ".team-card-name");
      equalizeChildren(".team-card", ".team-card-role");
      equalizeCards(".about-us-card");
      equalizeCards(".team-card");
    }
    runAll();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runAll);
    }
    var eqTimer;
    window.addEventListener("resize", function () {
      clearTimeout(eqTimer);
      eqTimer = setTimeout(runAll, 150);
    });
  })();
};

// Execute immediately when the script loads
if (typeof window !== 'undefined') {
  window.dispatchEvent(new Event('swh:homepage-script-ready'));
  window.__swhInitHomepage();
}
