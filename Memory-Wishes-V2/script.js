/* ==========================================
   MEMORY WISHES V2
   SCRIPT.JS
   PART 1
========================================== */

// ---------- VARIABLES ----------

let currentPhoto = 0;
let currentPoem = 0;
let typingTimer = null;

// ---------- PAGE ELEMENTS ----------

const pages = {
    welcome: document.getElementById("welcome"),
    gallery: document.getElementById("gallery"),
    poem: document.getElementById("poemPage"),
    letter: document.getElementById("letterPage"),
    dua: document.getElementById("duaPage"),
    cake: document.getElementById("cakePage"),
    voice: document.getElementById("voicePage"),
    celebration: document.getElementById("celebrationPage")
};

// ---------- ELEMENTS ----------

const memoryPhoto = document.getElementById("memoryPhoto");
const typingText = document.getElementById("typingText");
const letterContent = document.getElementById("letterContent");
const duaContent = document.getElementById("duaContent");

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");

const progressFill = document.getElementById("progressFill");

const music = document.getElementById("bgMusic");
const voiceAudio = document.getElementById("voiceAudio");

// ---------- SHOW PAGE ----------

function showPage(page){

    Object.values(pages).forEach(p=>{

        if(!p) return;

        p.classList.remove("active");
        p.style.display="none";

    });

    page.style.display="flex";

    setTimeout(()=>{

        page.classList.add("active");

    },10);

}

// ---------- START ----------

function startMemory(){

    showPage(pages.gallery);

    updateProgress(20);

    loadPhoto();

    if(music){

        music.volume=0.5;

        music.play().catch(()=>{});

    }

}

// ---------- MUSIC ----------

function toggleMusic(){

    if(!music) return;

    if(music.paused){

        music.play();

    }else{

        music.pause();

    }

}

// ---------- PROGRESS ----------

function updateProgress(percent){

    if(progressFill){

        progressFill.style.width = percent + "%";

    }

}
/* ==========================================
   PART 2
   PHOTO GALLERY + POPUP
========================================== */

// ---------- LOAD PHOTO ----------

function loadPhoto() {

    if (!memoryPhoto) return;

    memoryPhoto.src = photos[currentPhoto];

}

// ---------- NEXT PHOTO ----------

function nextPhoto() {

    currentPhoto++;

    if (currentPhoto >= photos.length) {

        currentPhoto = 0;

    }

    loadPhoto();

}

// ---------- PREVIOUS PHOTO ----------

function previousPhoto() {

    currentPhoto--;

    if (currentPhoto < 0) {

        currentPhoto = photos.length - 1;

    }

    loadPhoto();

}

// ---------- PHOTO POPUP ----------

memoryPhoto.addEventListener("click", function () {

    popupImg.src = photos[currentPhoto];

    popup.classList.add("active");

});

// ---------- CLOSE POPUP ----------

function closePopup() {

    popup.classList.remove("active");

}

popup.addEventListener("click", function (e) {

    if (e.target === popup) {

        closePopup();

    }

});

// ---------- TYPE WRITER ----------

function typeText(element, text, speed = 25) {

    clearInterval(typingTimer);

    element.innerHTML = "";

    let index = 0;

    typingTimer = setInterval(function () {

        if (index < text.length) {

            element.innerHTML += text.charAt(index);

            index++;

        } else {

            clearInterval(typingTimer);

        }

    }, speed);

}
/* ==========================================
   PART 3
   POEM + LETTER + DUA
========================================== */

// ---------- SHOW POEM ----------

function showPoem() {

    showPage(pages.poem);

    updateProgress(40);

    currentPoem = 0;

    typeText(typingText, poems[currentPoem], 25);

}

// ---------- NEXT POEM ----------

function nextPoem() {

    currentPoem++;

    if (currentPoem >= poems.length) {

        showLetter();

        return;

    }

    typeText(typingText, poems[currentPoem], 25);

}

// ---------- PREVIOUS POEM ----------

function previousPoem() {

    if (currentPoem > 0) {

        currentPoem--;

        typeText(typingText, poems[currentPoem], 25);

    }

}

// ---------- SHOW LETTER ----------

function showLetter() {

    showPage(pages.letter);

    updateProgress(60);

    typeText(letterContent, letter, 20);

}

// ---------- SHOW DUA ----------

function showDua() {

    showPage(pages.dua);

    updateProgress(80);

    typeText(duaContent, dua, 20);

}
/* ==========================================
   PART 4
   CAKE + CELEBRATION
========================================== */

// ---------- SHOW CAKE ----------

function showCake() {

    showPage(pages.cake);

    updateProgress(100);

}

// ---------- BLOW CANDLES ----------
function blowCandles() {

    const cake = document.getElementById("cakeImage");

    if (cake) {
        cake.style.transition = "0.8s ease";
        cake.style.transform = "scale(1.08)";
        cake.style.filter = "drop-shadow(0 0 25px gold)";
    }

    createHearts(40);
    createConfetti(180);
    createFireworks();

    setTimeout(function () {

        if (music) {
            music.volume = 0.15;
        }

        showPage(pages.voice);

        if (voiceAudio) {
            voiceAudio.currentTime = 0;
            voiceAudio.play().catch(() => {});
        }

    }, 2500);

}

if (voiceAudio) {

    voiceAudio.addEventListener("ended", function () {

        if (music) {
            music.volume = 0.4;
        }

        showCelebration();

    });

}

// ---------- SHOW CELEBRATION ----------

function showCelebration() {

    showPage(pages.celebration);

    const heading = pages.celebration.querySelector("h1");

    const message = pages.celebration.querySelector("p");

    if (heading) {

        heading.innerHTML = "🎉 Happy Birthday ❤️ 🎉";

    }

    if (message) {

        if (typeof birthdayMessage !== "undefined" && birthdayMessage.trim() !== "") {

            message.innerHTML = birthdayMessage;

        } else {

            message.innerHTML = finalWish;

        }

    }

    createHearts(60);

    createConfetti(250);

    createFireworks();

}
/* ==========================================
   PART 5
   HEARTS + CONFETTI + FIREWORKS
========================================== */

// ---------- HEARTS ----------

function createHearts(count = 30) {

    const container = document.getElementById("hearts");

    if (!container) return;

    for (let i = 0; i < count; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = "❤";

        heart.style.left = Math.random() * 100 + "%";

        heart.style.animationDuration =
            (4 + Math.random() * 4) + "s";

        heart.style.fontSize =
            (18 + Math.random() * 18) + "px";

        container.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 8000);

    }

}

// ---------- CONFETTI ----------

function createConfetti(count = 150) {

    const container = document.getElementById("confetti");

    if (!container) return;

    const colors = [
        "#ff4d6d",
        "#ffd93d",
        "#6bcBef",
        "#95e06c",
        "#c77dff",
        "#ffffff"
    ];

    for (let i = 0; i < count; i++) {

        const piece = document.createElement("div");

        piece.style.position = "absolute";

        piece.style.left = Math.random() * 100 + "%";

        piece.style.top = "-20px";

        piece.style.width = "8px";

        piece.style.height = "12px";

        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.opacity = "1";

        piece.style.transform =
            "rotate(" + (Math.random() * 360) + "deg)";

        container.appendChild(piece);

        piece.animate(

            [

                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        "translateY(" +
                        (window.innerHeight + 100) +
                        "px) rotate(720deg)",
                    opacity: 0
                }

            ],

            {

                duration: 3000 + Math.random() * 2000,

                easing: "linear"

            }

        );

        setTimeout(() => {

            piece.remove();

        }, 5500);

    }

}

// ---------- FIREWORKS ----------

function createFireworks() {

    const container = document.getElementById("fireworks");

    if (!container) return;

    for (let i = 0; i < 12; i++) {

        const fire = document.createElement("div");

        fire.innerHTML = "✨";

        fire.style.position = "absolute";

        fire.style.left = Math.random() * 100 + "%";

        fire.style.top = Math.random() * 60 + "%";

        fire.style.fontSize =
            (25 + Math.random() * 20) + "px";

        container.appendChild(fire);

        fire.animate(

            [

                {
                    transform: "scale(0)",
                    opacity: 0
                },

                {
                    transform: "scale(2)",
                    opacity: 1
                },

                {
                    transform: "scale(3)",
                    opacity: 0
                }

            ],

            {

                duration: 1200,

                delay: i * 180,

                easing: "ease-out"

            }

        );

        setTimeout(() => {

            fire.remove();

        }, 4000);

    }

}
/* ==========================================
   PART 6 (FINAL)
   RESTART + INITIALIZE
========================================== */

// ---------- RESTART ----------

function restartMemory() {

    currentPhoto = 0;
    currentPoem = 0;

    clearInterval(typingTimer);

    updateProgress(0);

    loadPhoto();

    if (typingText) typingText.innerHTML = "";
    if (letterContent) letterContent.innerHTML = "";
    if (duaContent) duaContent.innerHTML = "";

    popup.classList.remove("active");

    if (music) {

        music.currentTime = 0;

    }

    showPage(pages.welcome);

}

// ---------- KEYBOARD SUPPORT ----------

document.addEventListener("keydown", function (e) {

    if (pages.gallery.classList.contains("active")) {

        if (e.key === "ArrowRight") {

            nextPhoto();

        }

        if (e.key === "ArrowLeft") {

            previousPhoto();

        }

    }

    if (e.key === "Escape") {

        closePopup();

    }

});

// ---------- PRELOAD IMAGES ----------

window.onload = function () {

    if (Array.isArray(photos)) {

        photos.forEach(function (src) {

            const img = new Image();

            img.src = src;

        });

    }

    loadPhoto();

};
if (voiceAudio) {

    voiceAudio.addEventListener("ended", function () {

        if (music) {

            music.volume = 0.4;

        }
          showCelebration();
    });

}
// ---------- END ----------