"use strict";

/*
 * PERSONNALISATION RAPIDE
 * - Remplissez votre téléphone ci-dessous, par exemple : "+33 6 12 34 56 78".
 * - Changez votre portrait dans index.html : src="assets/portrait.png".
 * - Modifiez votre adresse e-mail ici si nécessaire.
 * - Toutes les rubriques sont éditables directement dans index.html.
 */
const PROFILE = {
  phone: "+33 7 83 98 73 82", // (à remplir) — le bouton d'appel apparaît dès que le numéro est renseigné.
  email: "pa.yamsar.diagne@gmail.com"
};

const META = {
  apropos: { label: "DÉCOUVRIR MON PROFIL", number: "01" },
  experiences: { label: "MON EXPÉRIENCE PROFESSIONNELLE", number: "02" },
  projets: { label: "LES DOMAINES QUE J'EXPLORE", number: "03" },
  competences: { label: "DES COMPÉTENCES COMPLÉMENTAIRES", number: "04" },
  formations: { label: "MON PARCOURS ACADÉMIQUE", number: "05" },
  contacts: { label: "ENTRONS EN CONTACT", number: "06" }
};

const tabs = [...document.querySelectorAll('[role="tab"][data-tab]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const originals = new WeakMap();
let animationVersion = 0;

document.querySelectorAll(".type-text").forEach((element) => {
  originals.set(element, element.textContent.trim());
});

const delay = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

/** Anime progressivement les textes, avec une main écrivant après le dernier caractère. */
async function writePanel(panel, version) {
  const textElements = [...panel.querySelectorAll(".type-text")];
  for (const element of textElements) {
    if (version !== animationVersion) return;

    const content = originals.get(element) || "";
    // Le texte complet reste disponible immédiatement pour les lecteurs d'écran.
    element.setAttribute("aria-label", content);
    if (reducedMotion.matches) {
      element.textContent = content;
      continue;
    }

    element.textContent = "";
    const writingText = document.createElement("span");
    writingText.setAttribute("aria-hidden", "true");
    const writingHand = document.createElement("span");
    writingHand.className = "writing-hand";
    writingHand.setAttribute("aria-hidden", "true");
    writingHand.textContent = "✍🏾";
    element.append(writingText, writingHand);

    const characters = Array.from(content);
    for (let cursor = 1; cursor <= characters.length; cursor += 2) {
      if (version !== animationVersion) {
        element.textContent = content;
        return;
      }
      writingText.textContent = characters.slice(0, cursor + 1).join("");
      await delay(19);
    }
    writingText.textContent = content;
    writingHand.remove();
    await delay(170);
  }
}

function selectTab(name, focus = false) {
  if (!META[name]) return;

  const version = ++animationVersion;
  tabs.forEach((tab) => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });

  let activePanel;
  panels.forEach((panel) => {
    const active = panel.id === `panel-${name}`;
    panel.hidden = !active;
    if (active) activePanel = panel;
  });

  document.getElementById("sectionEyebrow").textContent = META[name].label;
  document.getElementById("sectionNumber").textContent = `/ ${META[name].number}`;
  // Relance le fondu des cartes et logos à chaque sélection de rubrique.
  activePanel.querySelectorAll(".reveal-item, .skill-tile").forEach((item) => {
    item.style.animation = "none";
    void item.offsetWidth;
    item.style.animation = "";
  });
  void writePanel(activePanel, version);
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab.dataset.tab));
  tab.addEventListener("keydown", (event) => {
    let targetIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") targetIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") targetIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") targetIndex = 0;
    else if (event.key === "End") targetIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    selectTab(tabs[targetIndex].dataset.tab, true);
  });
});

// Les trois fenêtres sont fermables par la touche Échap ou un clic à l'extérieur.
const phoneDialog = document.getElementById("phoneDialog");
const emailDialog = document.getElementById("emailDialog");
const legalDialog = document.getElementById("legalDialog");
const dialogs = [phoneDialog, emailDialog, legalDialog];

function openDialog(dialog) {
  if (typeof dialog.showModal === "function") dialog.showModal();
}

dialogs.forEach((dialog) => {
  dialog.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => dialog.close()));
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});

function showPhone() {
  const visibleNumber = PROFILE.phone.trim();
  const normalizedNumber = visibleNumber.replace(/[^\d+]/g, "");
  const hasNumber = normalizedNumber.replace(/\D/g, "").length >= 9;
  document.getElementById("phoneNumber").textContent = hasNumber ? visibleNumber : "(à remplir)";
  const callButton = document.getElementById("callNow");
  callButton.hidden = !hasNumber;
  if (hasNumber) callButton.href = `tel:${normalizedNumber}`;
  document.getElementById("phoneHelp").hidden = hasNumber;
  openDialog(phoneDialog);
}

function showEmail() {
  const encoded = encodeURIComponent(PROFILE.email);
  document.getElementById("mailDefault").href = `mailto:${PROFILE.email}`;
  document.getElementById("mailOutlook").href = `https://outlook.live.com/mail/0/deeplink/compose?to=${encoded}`;
  openDialog(emailDialog);
}

document.getElementById("heroPhone").addEventListener("click", showPhone);
document.getElementById("contactPhone").addEventListener("click", showPhone);
document.getElementById("footerEmail").addEventListener("click", showEmail);
document.getElementById("contactEmail").addEventListener("click", showEmail);
document.getElementById("legalOpen").addEventListener("click", () => openDialog(legalDialog));

// Choix visuels réversibles, sans cookie ni stockage local.
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const isLight = document.body.dataset.theme !== "light";
  document.body.dataset.theme = isLight ? "light" : "dark";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.title = isLight ? "Passer en mode sombre" : "Passer en mode clair";
  document.getElementById("themeText").textContent = isLight ? "Mode sombre" : "Mode clair";
  document.getElementById("themeIcon").textContent = isLight ? "☾" : "☀";
});

const weatherToggle = document.getElementById("weatherToggle");
weatherToggle.addEventListener("click", () => {
  const isOff = document.body.classList.toggle("weather-off");
  weatherToggle.setAttribute("aria-pressed", String(!isOff));
  weatherToggle.title = isOff ? "Activer les effets météo" : "Désactiver les effets météo";
  weatherToggle.querySelector(".utility-label").textContent = isOff ? "Pluie désactivée" : "Pluie activée";
});

function softLightning() {
  if (document.hidden || reducedMotion.matches || document.body.classList.contains("weather-off")) return;
  const overlay = document.getElementById("lightning");
  overlay.classList.remove("flash");
  void overlay.offsetWidth;
  overlay.classList.add("flash");
}

// Premier éclair après 30 secondes sur le site, puis toutes les 45 secondes.
window.setTimeout(() => {
  softLightning();
  window.setInterval(softLightning, 45000);
}, 30000);

document.getElementById("copyrightYear").textContent = String(new Date().getFullYear());
document.querySelector(".footer-email").firstChild.textContent = `${PROFILE.email} `;

// Initialisation : l'onglet À propos est actif et son texte s'écrit à l'arrivée.
window.setTimeout(() => selectTab("apropos"), 260);
