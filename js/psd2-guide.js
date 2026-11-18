(function () {
  var current = 0;
  var REDIRECT_URL = "https://localhost/girocrab/callback";
  var steps = [
    {
      short: "1. Registrieren",
      url: "https://enablebanking.com/cp/applications",
      title: "Schritt 1: Anwendung auf enablebanking.com anlegen",
      hint: "Wähle zwingend „Production“ (nicht Sandbox!), lass den Schlüssel im Browser erzeugen und trage als Redirect-URL exakt https://localhost/girocrab/callback ein. Klicke unten auf „Register“.",
      html: '<div class="eb-nav"><span class="pill">API applications</span><span>ASPSP status</span><span>Data insights</span></div><div class="eb-box"><h3 class="sec-title">Add a new application</h3><div class="eb-grid"><div><p class="step-label">1. Choose your application\'s environment.</p><div class="toggle-group"><button type="button" class="toggle-btn" data-action="sandbox-warn">Sandbox</button><button type="button" class="toggle-btn selected">Production ✓</button></div><p class="step-label">2. Choose how to generate a private RSA key and a certificate</p><label class="radio-line"><input type="radio" checked disabled> <strong>Generate in the browser (using SubtleCrypto) and export private key</strong></label><label class="radio-muted"><input type="radio" disabled> Generate outside the browser and import public certificate</label><p class="step-label">3. Fill out information about your application.</p><div class="field"><label>Application name (frei wählbar)</label><input value="Personal banking client using GiroCrab" readonly></div><div class="field"><label>Allowed redirect URLs (wichtig – exakt diese Adresse eintragen!)</label><textarea rows="2" readonly>' + REDIRECT_URL + '</textarea><button type="button" class="copy-chip" data-action="copy-redirect">Kopieren</button></div><div class="field"><label>Application description (kurzer Hinweis genügt)</label><input value="Private Kontoverwaltung mit GiroCrab" readonly></div><div class="field"><label>Email for data protection matters (deine eigene E-Mail)</label><input value="name@example.com" readonly></div><div class="field"><label>Privacy URL &amp; Terms URL (für eigene Konten optional – https://girocrab.de genügt)</label><input class="input-spaced" value="https://girocrab.de" readonly><input value="https://girocrab.de/" readonly></div><button type="button" class="btn-eb" data-action="next">Register (.pem-Schlüssel herunterladen)</button></div><div class="side-note"><p><strong>Was passiert beim Klick auf „Register“?</strong></p><p>Dein Browser erzeugt lokal deinen privaten RSA-Schlüssel und speichert ihn als <code>&lt;application-id&gt;.pem</code> in deinem <strong>Downloads</strong>-Ordner.</p><p>GiroCrab fängt die Callback-Adresse <code>https://localhost/girocrab/callback</code> direkt im Login-Fenster ab – es muss kein lokaler Server laufen.</p></div></div></div>'
    },
    {
      short: "2. Aktivieren",
      url: "https://enablebanking.com/cp/applications",
      title: "Schritt 2: „Activate by linking accounts“ klicken",
      hint: "Nach dem Anlegen steht deine App noch auf „Inactive“. Klicke auf den grünen Button „Activate by linking accounts“ (NICHT auf „Request activation“ – das wäre für kostenpflichtige Firmenverträge).",
      html: '<div class="eb-nav"><span class="pill">API applications</span><span>ASPSP status</span></div><div class="eb-box eb-box-narrow"><div class="row-between"><strong>Personal banking client using GiroCrab</strong><span class="badge inactive">Inactive</span></div><p class="meta-line"><strong>Environment:</strong> PRODUCTION</p><p class="meta-line"><strong>Redirect URLs:</strong> <code>' + REDIRECT_URL + '</code></p><p class="italic-note">You can link own accounts and use the application with these accounts. The application will be activated after account linking is complete. Only linked accounts can be accessed.</p><div class="btn-row"><button type="button" class="btn-eb" data-action="next">Activate by linking accounts</button><button type="button" class="btn-outline" data-action="commercial-warn">Request activation</button></div></div>'
    },
    {
      short: "3. Bank wählen",
      url: "https://enablebanking.com/cp/applications",
      title: "Schritt 3: Land & eigene Bank auswählen und auf „Link“ klicken",
      hint: "Im kostenlosen Restricted Mode schaltest du hier deine eigenen Banken frei (Positivliste). Wähle Country (z. B. Germany), deine Bank unter ASPSP (z. B. Trade Republic oder N26) und „personal“, dann klicke auf „Link“.",
      html: '<div class="eb-nav"><span class="pill">API applications</span><span>ASPSP status</span></div><div class="eb-box"><p class="italic-note">You can link own accounts and use the application with these accounts. The application will be activated after account linking is complete. Only linked accounts can be accessed.</p><div class="link-row"><select aria-label="Country"><option>Germany</option><option>Austria</option><option>Luxembourg</option></select><select aria-label="ASPSP"><option>Trade Republic</option><option>N26</option><option>C24 Bank</option><option>American Express</option><option>Revolut</option><option>ING</option></select><select aria-label="Usage type"><option>personal</option><option>business</option></select><button type="button" class="btn-eb" data-action="next">Link</button></div><p class="italic-note">Tipp: Du kannst diesen Schritt beliebig oft wiederholen, um mehrere eigene Banken (z. B. Trade Republic und N26) für deine Anwendung freizuschalten.</p></div>'
    },
    {
      short: "4. Zustimmung",
      url: "https://tilisy.enablebanking.com/...",
      title: "Schritt 4: Weiterleitung zur Bank bestätigen",
      hint: "Enable Banking startet die einmalige Kontoverknüpfung mit deiner Bank. Klicke auf „Authentifizierung fortsetzen“.",
      html: '<div class="consent-wrap"><p>Die Authentifizierung wird von <strong>Enable Banking Control Panel</strong> initiiert. Nachdem Sie die Authentifizierung abgeschlossen haben, wird <em>die Liste Ihrer Zahlungskonten</em> mit dem Authentifizierungsinitiator geteilt.</p><div class="consent-actions"><button type="button" class="btn-eb btn-dark" data-action="next">Authentifizierung fortsetzen</button><div class="cancel-txt">Absagen</div></div><hr class="divider"><p class="italic-note">Enable Banking Oy ist ein regulierter Kontoinformationsdienstleister (AISP), beaufsichtigt durch die finnische Finanzaufsichtsbehörde (FIN-FSA). Deine Kontodaten werden nur durchgeleitet und nicht dauerhaft gespeichert.</p></div>'
    },
    {
      short: "5. App-Freigabe",
      url: "https://app.traderepublic.com/...",
      title: "Schritt 5: Einmalig in deiner Banking-App (z. B. Trade Republic / N26) bestätigen",
      hint: "Scanne den QR-Code oder öffne die Push-Anfrage in deiner Banking-App: „Enable Banking möchte auf deine Bank zugreifen“ → tippe auf „Akzeptieren“. Danach springt deine App im Portal sofort auf „Active“!",
      html: '<div class="tr-layout"><div class="qr-box" aria-hidden="true"><svg viewBox="0 0 100 100" width="148" height="148" fill="#fff"><rect x="5" y="5" width="26" height="26" fill="none" stroke="#fff" stroke-width="6"/><rect x="13" y="13" width="10" height="10"/><rect x="69" y="5" width="26" height="26" fill="none" stroke="#fff" stroke-width="6"/><rect x="77" y="13" width="10" height="10"/><rect x="5" y="69" width="26" height="26" fill="none" stroke="#fff" stroke-width="6"/><rect x="13" y="77" width="10" height="10"/><rect x="40" y="40" width="20" height="20" rx="4"/></svg></div><div><h3 class="sec-title">Öffne die Banking-App, um dein Konto freizugeben</h3><p class="meta-line">1. QR-Code scannen oder Push-Mitteilung öffnen</p><p class="meta-line">2. In der App anmelden</p><p class="meta-line">3. Kontofreigabe bestätigen</p></div><div class="phone-mock"><div class="phone-tag">IN DEINER BANK-APP</div><h4>Enable Banking möchte auf deine Bank zugreifen</h4><p>Kontoliste, Salden und Umsätze für deine persönliche Anwendung freigeben (bis zu 180 Tage ohne erneute 2FA bei jedem Abruf).</p><button type="button" class="btn-tr" data-action="next">Akzeptieren ✓</button></div></div>'
    },
    {
      short: "6. In GiroCrab laden",
      url: "girocrab://settings/enable-banking",
      title: "Schritt 6: Heruntergeladene .pem-Datei in GiroCrab auswählen – fertig!",
      hint: "Deine Anwendung auf enablebanking.com ist jetzt grün („Active“). Wähle in GiroCrab einfach die beim Registrieren heruntergeladene <uuid>.pem-Datei aus dem Downloads-Ordner.",
      html: '<div class="eb-box eb-box-white"><div class="row-between"><strong>GiroCrab · Enable-Banking-Einrichtung</strong><span class="badge active">Active (Restricted Mode)</span></div><p class="meta-line">1. Klicke in GiroCrab auf <strong>„Schlüsseldatei (.pem) wählen …“</strong> (startet direkt im Ordner <code>Downloads</code>).</p><p class="meta-line">2. GiroCrab übernimmt den privaten Schlüssel sowie die <strong>Application-ID</strong> automatisch aus dem Dateinamen und prüft deine Anwendung:</p><div class="ok-banner">✓ Anwendung „Personal banking client using GiroCrab“ ist bereit (Production, aktiv, Redirect-URL eingetragen).</div><p class="italic-note">Nach dem ersten Login in GiroCrab wird die PSD2-Sitzung verschlüsselt im Tresor gespeichert – künftige Synchronisationen laufen bis zu 90–180 Tage lang im Hintergrund ohne ständige 2FA-Abfrage.</p></div>'
    }
  ];
  function render() {
    var s = steps[current];
    document.getElementById("urlBar").textContent = s.url;
    document.getElementById("screen").innerHTML = s.html;
    document.getElementById("coachTitle").textContent = s.title;
    document.getElementById("coachHint").textContent = s.hint;
    var stepper = document.getElementById("stepper");
    stepper.innerHTML = "";
    steps.forEach(function (st, idx) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "step-tab" + (idx === current ? " active" : (idx < current ? " done" : ""));
      btn.textContent = st.short;
      btn.addEventListener("click", function () { current = idx; render(); });
      stepper.appendChild(btn);
    });
    var prevBtn = document.getElementById("prevBtn");
    if (current === 0) prevBtn.classList.add("hidden"); else prevBtn.classList.remove("hidden");
    document.getElementById("nextBtn").textContent = current === steps.length - 1 ? "Von vorn starten ↺" : "Weiter zum nächsten Schritt →";
  }
  function nextStep() { current = current + 1 >= steps.length ? 0 : current + 1; render(); }
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("prevBtn").addEventListener("click", function () { if (current > 0) { current -= 1; render(); } });
    document.getElementById("nextBtn").addEventListener("click", nextStep);
    document.getElementById("screen").addEventListener("click", function (ev) {
      var btn = ev.target.closest("[data-action]");
      if (!btn) return;
      var act = btn.getAttribute("data-action");
      if (act === "next") nextStep();
      else if (act === "sandbox-warn") window.alert("Hinweis: „Sandbox“ enthält nur Spielgeld-Testbanken. Für echte Banken wie N26 oder Trade Republic bitte „Production“ wählen!");
      else if (act === "commercial-warn") window.alert("Nicht hier klicken! „Request activation“ ist nur für kostenpflichtige Firmenverträge. Für deine eigenen Konten ist „Activate by linking accounts“ dauerhaft kostenlos.");
      else if (act === "copy-redirect") {
        if (navigator.clipboard) navigator.clipboard.writeText(REDIRECT_URL);
        btn.textContent = "Kopiert ✓";
        setTimeout(function () { btn.textContent = "Kopieren"; }, 1500);
      }
    });
    render();
  });
})();
