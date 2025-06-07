import { questions, personalities } from './questions.js';

// DOM-Elemente
const $ = (data) => document.querySelector(data);
const questionText = $('#question-text');
const answerOptions = $('#answer-options');
const nextBtn = $('#next-btn');
const progressBar = $('#progress-bar');
const captchaContainer = $('#captcha-container');
const captchaGrid = $('#captcha-grid');
const captchaSubmit = $('#captcha-submit');
const questionContainer = $('#question-container');
const resultContainer = $('#result-container');
const resultTitle = $('#result-title');
const resultDescription = $('#result-description');
const restartBtn = $('#restart-btn');
const mainTitle = $('#main-title');

// Variablen für den Zustand des Quizzes
let currentQuestion = 0;
let selectedAnswers = [];
let popupCount = 0;
let headerDraggable = false;
let shyTimeout;
let camActive = false;

// Zufällige Worte, die im Hintergrund erscheinen können
const randomWords = [
    "FALSCH!", "Bist du sicher?", "Deine Zeit läuft!", "Alle schauen dich an!", 
    "ERROR 404", "Datenübertragung...", "Bitte warten...", "Unsicher?", 
    "ACHTUNG!", "Wirklich?", "Zweifelhaft", "Fragwürdig", "Schlechte Wahl",
    "Überwacht", "Gestresst?", "Zeitdruck!", "Deine IP wird gespeichert",
    "Antworten werden analysiert", "Psychoprofil erstellt", "Denk nochmal nach!"
];

// Initialisierung
window.onload = function() {
    loadQuestion(currentQuestion);
    setInterval(showRandomWord, 3000);
    setInterval(changeBackgroundColor, 10000);
    
    // Mache den Header beweglich
    mainTitle.onmousedown = function(event) {
        headerDraggable = true;
        
        let shiftX = event.clientX - mainTitle.getBoundingClientRect().left;
        let shiftY = event.clientY - mainTitle.getBoundingClientRect().top;
        
        mainTitle.style.position = 'absolute';
        mainTitle.style.zIndex = 1000;
        
        moveAt(event.pageX, event.pageY);
        
        function moveAt(pageX, pageY) {
            mainTitle.style.left = pageX - shiftX + 'px';
            mainTitle.style.top = pageY - shiftY + 'px';
        }
        
        function onMouseMove(event) {
            if (headerDraggable) {
                moveAt(event.pageX, event.pageY);
            }
        }
        
        document.addEventListener('mousemove', onMouseMove);
        
        mainTitle.onmouseup = function() {
            headerDraggable = false;
            document.removeEventListener('mousemove', onMouseMove);
            mainTitle.onmouseup = null;
        };
    };
    
    mainTitle.ondragstart = function() {
        return false;
    };
    
    // Aufnahme-Symbol dauerhaft sichtbar
    const recordingLight = document.createElement('div');
    recordingLight.textContent = '🔴 Kamera aktiv';
    Object.assign(recordingLight.style, {
      position: 'fixed',
      top: '10px',
      right: '10px',
      backgroundColor: 'red',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '10px',
      fontWeight: 'bold',
      zIndex: 10000,
    });
    document.body.appendChild(recordingLight);

    // Erste Cam-Einblendung
    setTimeout(showFakeCam, 10000);
    // Wiederkehrende Cam
    setInterval(() => {
      if (!camActive) showFakeCam(randomUserAnalysis());
    }, 30000);
};

// Web Audio API–basiertes Glitch-Geräusch
function playGlitchSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const duration = 0.1; // Sekunden
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // Weißes Rauschen
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
  
    // Bandpass-Filter für den "Glitch"-Sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000 + Math.random() * 2000; // zufällige Mittenfrequenz
    filter.Q.value = 1 + Math.random() * 10;            // Bandbreite
  
    noise.connect(filter).connect(ctx.destination);
    noise.start();
}

// Schüchterner Button
// Weiter-Klick aus Button UND schüchterner Nachricht
function goToNextQuestion() {
    if (popupCount < 2 && Math.random() < 0.5) {
      showRandomPopup();
      popupCount++;
      return;
    }
  
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion(currentQuestion);
  
      if (Math.random() < 0.33) {
        showCaptcha();
      }
    } else {
      showResult();
    }
}

// Fake-Kamera Popup
function showFakeCam(text = '[CAM 01] Aufnahme läuft...\nSubjekt analysieren...\nMimik + Körpersprache werden gespeichert.') {
    camActive = true;
    const cam = document.createElement('div');
    cam.id = 'fake-cam-popup';
    cam.textContent = text;
    Object.assign(cam.style, {
      position: 'fixed',
      top: '10%',
      right: '10%',
      width: '240px',
      height: '180px',
      backgroundColor: '#000',
      color: '#0f0',
      padding: '10px',
      fontFamily: 'monospace',
      fontSize: '12px',
      border: '2px solid #ff69b4',
      zIndex: 9999,
      boxShadow: '0 0 15px #ff69b4',
      whiteSpace: 'pre-wrap',
    });
    document.body.appendChild(cam);
    playGlitchSound();
    setTimeout(() => {
      cam.remove();
      camActive = false;
    }, 15000);
}

// Profilanalyse-Texte
function randomUserAnalysis() {
    return [
      '[CAM 01] Analyse abgeschlossen...\nErgebnisse: \n',
      '✔️ Ausdruck: nervös und zögerlich\n',
      '✖️ Augenkontakt: kaum vorhanden\n',
      '❓ Körpersprache: sehr verwitzt\n',
      '💡 Psychologischer Eindruck: nicht vertrauenswürdig, aber unterhaltsam\n',
    ].join('');
}

// Event-Listener
nextBtn.addEventListener('click', goToNextQuestion);

// Schüchterner Button bei Hover
nextBtn.addEventListener('mouseenter', () => {
    nextBtn.style.transform = `translate(${Math.random() * 150 - 75}px, ${Math.random() * 75 - 37}px)`;
    playGlitchSound();
    nextBtn.classList.add('hidden');
  
    const msg = document.createElement('div');
    msg.innerHTML = `
      Der <span id="force-next" style="text-decoration: underline; cursor: pointer;">Button</span> ist 
      <span style="text-decoration: underline;">schüchtern</span>... 
      Er braucht etwas Zeit, um sich an dich zu gewöhnen...
    `;
  
    Object.assign(msg.style, {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '10px 15px',
      backgroundColor: '#ff69b4',
      color: '#fff',
      borderRadius: '10px',
      zIndex: 999,
      maxWidth: '80%',
      textAlign: 'center',
      fontSize: '16px',
    });
    document.body.appendChild(msg);
  
    msg.querySelector('#force-next').addEventListener('click', () => {
      msg.remove();
      nextBtn.classList.remove('hidden');
      nextBtn.style.transform = 'translate(0,0)';
      goToNextQuestion();
    });
  
    shyTimeout = setTimeout(() => {
      msg.remove();
      nextBtn.classList.remove('hidden');
      nextBtn.style.transform = 'translate(0,0)';
    }, 5000);
});

// Restart Button
restartBtn.addEventListener('click', function() {
    currentQuestion = 0;
    selectedAnswers = [];
    popupCount = 0;
    loadQuestion(currentQuestion);
    resultContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    progressBar.style.width = '0%';
});

// Captcha-Bestätigung mit Validierung - KORRIGIERTE VERSION
captchaSubmit.addEventListener('click', () => {
    // Alle gewählten Emojis einsammeln
    const selected = Array.from(document.querySelectorAll('.captcha-item.selected'))
                          .map(el => el.textContent);
  
    // Definiere hier die korrekten „Glücks-Emojis"
    const correct = ['😊', '😂', '😍'];
  
    // Prüfe: Sind genau diese dreien ausgewählt (kein mehr, kein weniger)?
    const isCorrect = selected.length === correct.length
                    && correct.every(e => selected.includes(e));
  
    if (!isCorrect) {
      // Falsche Auswahl → zeige Fehlermeldung und bleibe im Captcha
      const err = document.createElement('div');
      err.className = 'popup';
      err.innerHTML = `
        <span class="popup-close">&times;</span>
        <p>Hoppla, das war nichts. Versuch's noch mal!</p>
      `;
      Object.assign(err.style, {
        maxWidth: '300px',
        textAlign: 'center',
        position: 'fixed',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000
      });
      document.body.appendChild(err);
      err.querySelector('.popup-close').addEventListener('click', () => err.remove());
      setTimeout(() => err.remove(), 2000);
      return;
    }
  
    // Richtige Auswahl → weiter
    captchaContainer.style.display = 'none';
    questionContainer.style.display = 'block';
  
    // Popup „Ich lasse dich durch…"
    const humanMsg = document.createElement('div');
    humanMsg.className = 'popup';
    humanMsg.innerHTML = `
      <span class="popup-close">&times;</span>
      <p>Wie… hmmm, na gut – ich lass dich als Menschen durchgehen 🤖➡️🧑</p>
    `;
    Object.assign(humanMsg.style, {
      maxWidth: '300px',
      textAlign: 'center',
      position: 'fixed',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000
    });
    document.body.appendChild(humanMsg);
    humanMsg.querySelector('.popup-close').addEventListener('click', () => humanMsg.remove());
  
    // Nach 2 Sekunden Popup weg und nächste Frage
    setTimeout(() => {
      if (humanMsg.parentNode) humanMsg.remove();
      currentQuestion++; // Direkt zur nächsten Frage
      loadQuestion(currentQuestion);
    }, 2000);
});

// Funktionen
function loadQuestion(index) {
    questionText.textContent = questions[index].question;
    answerOptions.innerHTML = '';
    
    questions[index].options.forEach((option, i) => {
        const button = document.createElement('button');
        button.className = 'answer-btn moving-option';
        button.textContent = option;
        button.dataset.index = i;
        
        button.addEventListener('click', function() {
            selectAnswer(this);
        });
        
        button.addEventListener('mouseover', function() {
            // Mit 30% Wahrscheinlichkeit bewegt sich die Option
            if (Math.random() < 0.3) {
                const xMove = (Math.random() - 0.5) * 30;
                const yMove = (Math.random() - 0.5) * 15;
                this.style.transform = `translate(${xMove}px, ${yMove}px)`;
            }
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translate(0, 0)';
        });
        
        answerOptions.appendChild(button);
    });
    
    // Aktualisiere die Fortschrittsleiste
    const progress = ((index + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function selectAnswer(selectedButton) {
    // Entferne die Auswahlmarkierung von allen Buttons
    const buttons = answerOptions.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        button.style.backgroundColor = '#e0e0e0';
        button.style.color = '#000';
    });
    
    // Markiere den ausgewählten Button
    selectedButton.style.backgroundColor = '#ff69b4';
    selectedButton.style.color = '#fff';
    
    // Speichere die ausgewählte Antwort
    selectedAnswers[currentQuestion] = parseInt(selectedButton.dataset.index);
    
    // Mit 20% Wahrscheinlichkeit die Antwort zurücksetzen
    if (Math.random() < 0.2) {
        setTimeout(() => {
            selectedButton.style.backgroundColor = '#e0e0e0';
            selectedButton.style.color = '#000';
            
            // Korrigierter Code: Erstelle ein Popup statt die nicht existierende Funktion aufzurufen
            const message = document.createElement('div');
            message.className = 'popup';
            message.innerHTML = `
                <span class="popup-close">&times;</span>
                <p>Ups, deine Antwort wurde nicht gespeichert! Bitte wähle erneut.</p>
            `;
            
            // Positioniere das Popup in der Mitte
            message.style.left = '50%';
            message.style.top = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            
            document.body.appendChild(message);
            
            // Schließen-Button-Funktionalität
            const closeBtn = message.querySelector('.popup-close');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(message);
            });
            
            // Popup nach einiger Zeit automatisch entfernen
            setTimeout(() => {
                if (document.body.contains(message)) {
                    document.body.removeChild(message);
                }
            }, 3000);
        }, 800);
    }
}

function showCaptcha() {
    questionContainer.style.display = 'none';
    captchaContainer.style.display = 'block';
    captchaGrid.innerHTML = '';
    
    const emotions = ['😊', '😂', '😍', '😢', '😎', '😡', '🤔', '😴', '🙄'];
    
    // Mische die Emotionen
    emotions.sort(() => Math.random() - 0.5);
    
    emotions.forEach(emotion => {
        const item = document.createElement('div');
        item.className = 'captcha-item';
        item.textContent = emotion;
        
        item.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
        
        captchaGrid.appendChild(item);
    });
}

function showResult() {
    questionContainer.style.display = 'none';
    captchaContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    // Berechne das Ergebnis (hier einfach zufällig für den Spaß)
    const personalityIndex = Math.floor(Math.random() * personalities.length);
    const personality = personalities[personalityIndex];
    
    resultTitle.textContent = personality.title;
    resultDescription.textContent = personality.description;
}

function showRandomWord() {
    const word = document.createElement('div');
    word.className = 'random-word';
    word.textContent = randomWords[Math.floor(Math.random() * randomWords.length)];
    
    // Positioniere das Wort zufällig auf dem Bildschirm
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 50);
    word.style.left = `${x}px`;
    word.style.top = `${y}px`;
    
    document.body.appendChild(word);
    
    // Lass das Wort langsam verblassen und entferne es dann
    setTimeout(() => {
        word.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(word);
        }, 500);
    }, 2000);
}

function showRandomPopup() {
    const popupMessages = [
        "Deine letzte Antwort wurde für psychologische Forschungszwecke gespeichert.",
        "Du hast nur noch 30 Sekunden Zeit für diese Frage!",
        "Wusstest du, dass 87% der Teilnehmer diese Frage falsch beantworten?",
        "Deine Antworten deuten auf bedenkliche Persönlichkeitsmerkmale hin...",
        "Bitte beachte, dass deine IP-Adresse protokolliert wird.",
        "SYSTEMWARNUNG: Ungewöhnliches Antwortmuster erkannt!",
        "Momentan schauen 5 andere Personen zu, wie du diesen Test ausfüllst."
    ];
    
    const popup = document.createElement('div');
    popup.className = 'popup';
    
    const message = popupMessages[Math.floor(Math.random() * popupMessages.length)];
    
    popup.innerHTML = `
        <span class="popup-close">&times;</span>
        <p>${message}</p>
    `;
    
    // Positioniere das Popup zufällig
    const x = 50 + Math.random() * (window.innerWidth - 350);
    const y = 50 + Math.random() * (window.innerHeight - 150);
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    
    document.body.appendChild(popup);
    
    // Schließen-Button-Funktionalität
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(popup);
    });
    
    // Popup nach einiger Zeit automatisch entfernen
    setTimeout(() => {
        if (document.body.contains(popup)) {
            document.body.removeChild(popup);
        }
    }, 5000);
}

function changeBackgroundColor() {
    const colors = ['#f7e6ff', '#e6f7ff', '#fff7e6', '#e6ffe6', '#ffe6e6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}