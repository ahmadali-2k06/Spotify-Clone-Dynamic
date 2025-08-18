// --- ELEMENT SELECTORS ---
let currentSong = document.querySelector("#audio-player");
let searchField = document.querySelector(".search-field");
const svgIcon = document.querySelector(".search-icon-svg");
let installLink = document.querySelector(".install-button");
let installIcon = document.querySelector(".install-svg");
let linktext = document.getElementById("install-link");
let searchContent = document.querySelector(".search-content");
const searchLabel = document.querySelector(".label-content");
let contextMenu = document.querySelector(".hamburger-links");
let linksMenu = document.querySelector(".links-menu");
let browseContent = document.querySelector(".browse-content");
let contextMenuMob = document.querySelector(".context-menu");
let contextMenumobbtn = document.querySelector(".context-menu-btn");
let contextMenuClosebtn = document.querySelector(".close-btn");
let navbarResizer = document.querySelector(".resizer-side-bar-nav");
let gridContainer = document.querySelector(".main");
const progressSlider = document.getElementById("progress-bar");
const volumeSlider = document.getElementById("volume-bar");
const progressbarPortrait = document.getElementById("progress-bar-portrait");
const button = document.querySelector(".play-button-main");
const btnicon = document.querySelector(".play-button-icon");
let portraitNavbar = document.querySelector(".portrait-lower-navbar");
let portraitPlayer = document.querySelector(".portrait-sgp-player");
const progressBar = document.querySelector("#progress-bar");
let volumeBar = document.getElementById("volume-bar");
const mainLowerNavbar = document.querySelector(".login-box-fixed");

// Mobile Player Selectors
const portraitPlayBtn = document.querySelector(".sgp-play-button-portrait");
const portraitNextBtn = document.querySelector(".sgp-song-forward-button");
const portraitPrevBtn = document.querySelector(".sgp-song-backward-button");
const portraitImg = portraitPlayer.querySelector(".sgp-song-img img");
const portraitSongName = portraitPlayer.querySelector(".sgp-song-name2");
const portraitSongAuthor = portraitPlayer.querySelector(".sgp-song-author2");

// --- GLOBAL VARIABLES & STATE ---
let currentPlayList;
let currentIndex = 0;
let playListActive = false;
if (currentPlayList === undefined) {
  playListActive = false;
} else {
  playListActive = true;
}
let isResizing = false;
let repeatEnabled;

// --- SVG ICONS FOR PLAYER ---
const playIcon = `
    <svg data-encore-id="icon" role="img" aria-hidden="true" id="play-button-svg"
        class="play-button-svg"
        viewBox="0 0 16 16"
        style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller);
                --encore-icon-width: var(--encore-graphic-size-decorative-smaller);">
      <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
    </svg>`;
const pauseIcon = `
    <svg data-encore-id="icon" role="img" aria-hidden="true" class="pause-main-svg"
        viewBox="0 0 16 16" id="pause-main-svg"
        style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller);
                --encore-icon-width: var(--encore-graphic-size-decorative-smaller);">
      <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path>
    </svg>`;
const playIconPortrait = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="portrait-playbtn-svg" viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path></svg>`;
const pauseIconPortrait = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="portrait-playbtn-svg" viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>`;

// --- UI HELPER & UTILITY FUNCTIONS ---
function HoverBox(element, content, left, top) {
  let elem = document.querySelector(`${element}`);
  elem.style.position = "relative";
  elem.style.cursor = "pointer";
  let a = document.createElement("div");
  a.innerHTML = `${content}`;
  a.className = "hover-box";
  a.style.left = `${left}`;
  a.style.top = `${top}`;
  elem.appendChild(a);
  let showBox = () => {
    a.classList.add("show");
  };
  let showBox2 = () => {
    a.classList.remove("show");
  };
  elem.addEventListener("mouseenter", showBox);
  elem.addEventListener("mouseleave", showBox2);
}

function updateSongPlayer() {
  let songPlayer = document.querySelector(".song-player ");
  let songPlayerportrait = document.querySelector(".portrait-sgp-player");
  const isSongLoaded = currentSong.src.includes(".mp3");
  if (window.innerWidth > 799) {
    songPlayer.style.display = isSongLoaded ? "flex" : "none";
    songPlayerportrait.style.display = "none";
  } else {
    songPlayerportrait.style.display = isSongLoaded ? "flex" : "none";
    songPlayer.style.display = "none";
  }
}

function updateSliderColor(slider, value, fill = "#ffffff") {
  slider.style.background = `linear-gradient(to right, ${fill} ${value}%, #4d4d4d ${value}%)`;
}

function attachSliderEvents(slider) {
  let isDragging = false;
  let currentColor = "#ffffff";

  slider.addEventListener("input", function () {
    updateSliderColor(slider, this.value, currentColor);
  });

  slider.addEventListener("mouseover", function () {
    if (!isDragging) {
      currentColor = "#1ed760";
      updateSliderColor(slider, this.value, currentColor);
    }
  });

  slider.addEventListener("mouseout", function () {
    if (!isDragging) {
      currentColor = "#ffffff";
      updateSliderColor(slider, this.value, currentColor);
    }
  });

  slider.addEventListener("mousedown", function () {
    isDragging = true;
    currentColor = "#1ed760";
    updateSliderColor(slider, this.value, currentColor);
  });

  document.addEventListener("mouseup", function () {
    if (isDragging) {
      isDragging = false;
      currentColor = "#ffffff";
      updateSliderColor(slider, slider.value, currentColor);
    }
  });
}

function resetColor() {
  navbarResizer.classList.remove("resize-active");
  document.removeEventListener("mouseup", resetColor);
}

function resize(e) {
  if (isResizing) {
    const newWidth = Math.min(Math.max(e.pageX, 280), 450);
    gridContainer.style.setProperty("--sidebar-min", `${newWidth}px`);
    gridContainer.style.setProperty("--sidebar-max", `${newWidth}px`);
  }
}

function stopResize() {
  isResizing = false;
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}

// --- DYNAMIC CONTENT GENERATION ---
function makeTrendingSongCard(name, authorsname, src, url) {
  let card = document.createElement("div");
  card.setAttribute("data-song-url", url);
  card.classList.add("trending-songs-card");
  card.innerHTML = `
      <div class="trending-song-image">
        <img
          src="${src}"
          alt="img"
          class="trending-song-img"
        />
      </div>
      <div class="trending-song-credits">
        <div class="trending-song-name">
          <span>${name}</span>
        </div>
      </div>
      <div class="trending-song-authors">
        <span class="song-all-authors"></span>
      </div>
      <div class="song-play-button">
                      <button class="play-button">
                        <span class="play-button-svg-box">
                          <svg
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            class="play-button-svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
    `;
  let allauthorspan = card.querySelector(".song-all-authors");
  let authorcount = 0;
  let authornumber = authorsname.length;

  authorsname.forEach((authorname) => {
    authorcount++;
    let authorspan = document.createElement("span");
    authorspan.classList.add("author");

    if (authorcount === authornumber) {
      authorspan.textContent = authorname;
    } else {
      authorspan.textContent = authorname + ",";
    }

    allauthorspan.insertAdjacentElement("beforeend", authorspan);
  });

  document
    .querySelector(".trending-songs-slider")
    .insertAdjacentElement("beforeend", card);
}

function makePopulaArtistCard(name, src) {
  let card = document.createElement("div");
  card.classList.add("popular-artist-card");
  card.innerHTML = `
      <div class="popular-artist-image">
        <img
          src="${src}"
          alt="img"
          class="popular-artist-img"
        />
      </div>
      <div class="popular-artist-credits">
        <div class="popular-artist-name">
          <span>${name}</span>
        </div>
      </div>
      <div class="popular-artist-heading">
        <span class="artist-heading">Artist</span>
      </div>
      <div class="song-play-button">
                      <button class="play-button">
                        <span class="play-button-svg-box">
                          <svg
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            class="play-button-svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
    `;
  document
    .querySelector(".popular-artist-slider")
    .insertAdjacentElement("beforeend", card);
  return card;
}

function setupSliders() {
  document
    .querySelectorAll(".trending-songs, .popular-artists")
    .forEach((sliderContainer) => {
      const slider = sliderContainer.querySelector(".slider");
      const sliderButtons = sliderContainer.querySelector(".buttons");
      const rightsliderButton = sliderContainer.querySelector(".left-button");
      const leftsliderButton = sliderContainer.querySelector(".right-button");

      function showSliderButton() {
        if (sliderButtons) {
          sliderButtons.style.display = "none";
        }
        let elements = [sliderButtons, slider];
        for (let i = 0; i < elements.length; i++) {
          if (elements[i]) {
            elements[i].addEventListener("mouseenter", () => {
              if (sliderButtons) sliderButtons.style.display = "flex";
            });

            elements[i].addEventListener("mouseleave", () => {
              if (sliderButtons) sliderButtons.style.display = "none";
            });
          }
        }
      }

      const updateButtonVisibility = () => {
        if (!slider) return;

        if (slider.scrollLeft <= 0) {
          if (leftsliderButton) leftsliderButton.style.visibility = "hidden";
        } else {
          if (leftsliderButton) leftsliderButton.style.visibility = "visible";
        }

        const maxScrollPosition = slider.scrollWidth - slider.clientWidth;

        if (slider.scrollLeft >= maxScrollPosition - 5) {
          if (rightsliderButton) rightsliderButton.style.visibility = "hidden";
        } else {
          if (rightsliderButton) rightsliderButton.style.visibility = "visible";
        }
      };

      if (slider) {
        rightsliderButton.addEventListener("click", () => {
          const card = slider.querySelector(
            ".trending-songs-card, .popular-artist-card"
          );
          if (card) {
            const cardWidth = card.offsetWidth;
            slider.scrollBy({ left: cardWidth * 3, behavior: "smooth" });
          }
        });

        leftsliderButton.addEventListener("click", () => {
          const card = slider.querySelector(
            ".trending-songs-card, .popular-artist-card"
          );
          if (card) {
            const cardWidth = card.offsetWidth;
            slider.scrollBy({ left: -cardWidth * 3, behavior: "smooth" });
          }
        });

        slider.addEventListener("scroll", () => {
          updateButtonVisibility();
        });

        showSliderButton();
        updateButtonVisibility();
        window.addEventListener("load", updateButtonVisibility);
      }
    });
}

// --- PLAYER UI UPDATE FUNCTIONS ---
function updateLowerBar(button) {
  let lowerpic = document.querySelector(".lower-sgp-image");
  let lowername = document.querySelector(".sgp-song-name");
  let lowerAuthorspan = document.querySelector(".sgp-song-author");
  if (button.parentElement.parentElement.className === "trending-songs-card") {
    let img =
      button.parentElement.parentElement.querySelector(".trending-song-img");
    lowerpic.src = img.src;
    let name = button
      .closest(".trending-songs-card")
      .querySelector(
        ".trending-song-credits .trending-song-name span"
      ).innerText;
    let authorsNames = button
      .closest(".trending-songs-card")
      .querySelector(".trending-song-authors .song-all-authors")
      .querySelectorAll("span");
    let authors = [];
    for (let i = 0; i < authorsNames.length; i++) {
      let author = authorsNames[i].innerText;
      authors.push(author.replaceAll(",", ""));
    }
    let authorsString = authors.toString();
    lowerAuthorspan.innerHTML = authorsString;
    lowername.innerHTML = name;
    // Mobile update
    portraitImg.src = img.src;
    portraitSongAuthor.innerText = authorsString;
    portraitSongName.innerText = name;
  } else {
    let author = button.parentElement.parentElement.getAttribute("data-folder");
    let img = button.parentElement.parentElement.querySelector(
      ".popular-artist-img"
    );
    lowerpic.src = img.src;
    const songFileName = currentSong.src.split("/").pop().replace(".mp3", "");
    lowername.innerHTML = decodeURIComponent(songFileName);
    lowerAuthorspan.innerHTML = author;
    // Mobile update
    portraitImg.src = img.src;
    portraitSongName.innerText = decodeURIComponent(songFileName);
    portraitSongAuthor.innerText = author;
  }
}

function syncAllButtons() {
  const isPaused = currentSong.paused;
  btnicon.innerHTML = isPaused ? playIcon : pauseIcon;
  portraitPlayBtn.innerHTML = isPaused ? playIconPortrait : pauseIconPortrait;
  const hoverBox = document.querySelector(".play-button-main .hover-box");
  if (hoverBox) {
    hoverBox.innerHTML = isPaused ? "Play" : "Pause";
    hoverBox.style.left = isPaused ? "-5px" : "-30%";
  }
  const allCards = document.querySelectorAll(
    ".trending-songs-card, .popular-artist-card"
  );
  allCards.forEach((card) => {
    const iconBox = card.querySelector(".play-button-svg-box");
    let isCurrentlyPlayingSource = false;

    if (card.classList.contains("trending-songs-card")) {
      const cardUrl = card.getAttribute("data-song-url");
      if (cardUrl && currentSong.src.endsWith(cardUrl)) {
        isCurrentlyPlayingSource = true;
      }
    } else if (card.classList.contains("popular-artist-card")) {
      const folderName = card.getAttribute("data-folder");
      if (
        folderName &&
        currentSong.src.includes(`/${encodeURIComponent(folderName)}/`)
      ) {
        isCurrentlyPlayingSource = true;
      }
    }
    const cardPlayIcon = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="play-button-svg" viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path></svg>`;
    const cardPauseIcon = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="pause-button-svg" viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7z"></path></svg>`;
    if (!isPaused && isCurrentlyPlayingSource) {
      iconBox.innerHTML = cardPauseIcon;
    } else {
      iconBox.innerHTML = cardPlayIcon;
    }
  });
}

function updateVolumesvg() {
  let fullbarVolume = `<svg data-encore-id="icon" role="presentation" aria-label="Volume high" aria-hidden="false" class="volume-icon-svg" id="volume-icon" viewBox="0 0 16 16" style="   --encore-icon-height: var(   --encore-graphic-size-informative-smaller   ); --encore-icon-width: var( --encore-graphic-size-informative-smaller     ); "> <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127z"></path></svg>`;
  let roundedbarVolume = `<svg data-encore-id="icon" role="presentation" aria-label="Volume medium" aria-hidden="false" class="volume-icon-svg" id="volume-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-informative-smaller); --encore-icon-width: var(--encore-graphic-size-informative-smaller);"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a3 3 0 0 1 0 5.175z"></path></svg>`;
  let linearbarVolume = `<svg data-encore-id="icon" role="presentation" aria-label="Volume low" aria-hidden="false" class="e-91000-icon e-91000-baseline" id="volume-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-informative-smaller); --encore-icon-width: var(--encore-graphic-size-informative-smaller);"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.64 3.64 0 0 1-1.33-4.967 3.64 3.64 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.14 2.14 0 0 0 0 3.7l5.8 3.35V2.8zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88"></path></svg>`;
  let muteVolume = `<svg data-encore-id="icon" role="presentation" aria-label="Volume off" aria-hidden="false" class="e-91000-icon e-91000-baseline" id="volume-icon" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-informative-smaller); --encore-icon-width: var(--encore-graphic-size-informative-smaller);"><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06"></path><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.64 3.64 0 0 0-1.33 4.967 3.64 3.64 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.7 4.7 0 0 1-1.5-.694v1.3L2.817 9.852a2.14 2.14 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694z"></path></svg>`;
  let svg = document.querySelector(".volume-icon-box");
  if (currentSong.volume === 0) {
    svg.innerHTML = muteVolume;
  } else if (currentSong.volume < 0.35) {
    svg.innerHTML = linearbarVolume;
  } else if (currentSong.volume < 0.75) {
    svg.innerHTML = roundedbarVolume;
  } else {
    svg.innerHTML = fullbarVolume;
  }
}

// --- MUSIC & PLAYBACK LOGIC ---
async function loadsongs(folder = "", createcards = true) {
  let url;
  if (folder === "") {
    url = "/assets/songs/";
  } else {
    url = `/assets/playLists/${encodeURIComponent(folder)}`;
  }

  const res = await fetch(url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const songs = Array.from(doc.querySelectorAll("a"))
    .map((a) => a.getAttribute("href"))
    .filter((href) => href && /\.mp3(?:\?.*)?$/i.test(href));
  console.log(songs);

  if (createcards === true) {
    for (let i = 0; i < songs.length; i++) {
      let name = songs[i].split("/");
      let fullName = name[name.length - 1].replace(".mp3", "");
      let songName = fullName.split("-")[0].replaceAll("%20", " ");
      let authorsName = fullName
        .split("-")[1]
        .split("_")
        .map((name) => name.replaceAll("%20", " "));
        let imgName=songName.trim().replaceAll(' ','_');
      if (createcards === true) {
        makeTrendingSongCard(
          songName,
          authorsName,
          `./assets/images/${imgName}.jpg`,
          songs[i]
        );
      }
    }
  }
  return songs;
}

async function loadPlaylists() {
  const url = "/assets/playLists/";
  const res = await fetch(url);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const playLists = Array.from(doc.querySelectorAll("a"))
    .map((a) => a.getAttribute("href"))
    .filter(
      (href) =>
        href &&
        href.startsWith("/assets/playLists/") &&
        href.trim() !== "/assets/playLists/"
    );
  for (let i = 0; i < playLists.length; i++) {
    let name = decodeURIComponent(
      playLists[i].replace("/assets/playLists/", "")
    );
    let playListcard = makePopulaArtistCard(
      name,
      `./assets/playLists/${encodeURIComponent(name)}/cover.jpeg`
    );
    playListcard.setAttribute("data-folder", name);
  }
}

async function playPlaylist(folder) {
  await loadsongs(folder, false).then((songlist) => {
    currentSong.src = songlist[0];
    currentSong.play();
    currentIndex = 0;
    currentPlayList = songlist;
    playListActive = true;
  });
}

async function playNext() {
  let songsHolder = document.querySelector(".trending-songs-slider");
  let allCards = document.querySelectorAll(".trending-songs-card");
  let allUrls = Array.from(allCards).map((card) =>
    card.getAttribute("data-song-url")
  );

  let songPlayingUrl;

  for (let i = 0; i < allUrls.length; i++) {
    if (currentSong.src.includes(allUrls[i])) {
      songPlayingUrl = allUrls[i];
    }
  }
  let songPlaying = document.querySelector(
    `[data-song-url="${songPlayingUrl}"]`
  );
  let nextSong;
  if (songPlaying.nextElementSibling) {
    nextSong = songPlaying.nextElementSibling.getAttribute("data-song-url");
    let nextButton =
      songPlaying.nextElementSibling.querySelector(".play-button");
    currentSong.src = nextSong;
    currentSong.play();
    updateLowerBar(nextButton);
  } else {
    nextSong =
      songPlaying.parentElement.firstElementChild.getAttribute("data-song-url");
    currentSong.src = nextSong;
    let nextButton =
      songPlaying.parentElement.firstElementChild.querySelector(".play-button");
    currentSong.play();
    updateLowerBar(nextButton);
  }
}

async function playPrevious() {
  let songsHolder = document.querySelector(".trending-songs-slider");
  let allCards = document.querySelectorAll(".trending-songs-card");
  let allUrls = Array.from(allCards).map((card) =>
    card.getAttribute("data-song-url")
  );

  let songPlayingUrl;

  for (let i = 0; i < allUrls.length; i++) {
    if (currentSong.src.includes(allUrls[i])) {
      songPlayingUrl = allUrls[i];
    }
  }
  let songPlaying = document.querySelector(
    `[data-song-url="${songPlayingUrl}"]`
  );
  let previousSong;
  if (songPlaying.previousElementSibling) {
    previousSong =
      songPlaying.previousElementSibling.getAttribute("data-song-url");
    let nextButton =
      songPlaying.previousElementSibling.querySelector(".play-button");
    currentSong.src = previousSong;
    currentSong.play();
    updateLowerBar(nextButton);
  } else {
    previousSong =
      songPlaying.parentElement.lastElementChild.getAttribute("data-song-url");
    currentSong.src = previousSong;
    let nextButton =
      songPlaying.parentElement.lastElementChild.querySelector(".play-button");
    currentSong.play();
    updateLowerBar(nextButton);
  }
}

function currentSongEnded() {
  const currentSongPath = new URL(currentSong.src).pathname;
  if (currentPlayList && currentPlayList.includes(currentSongPath)) {
    playListActive = true;
    currentIndex++;
    if (currentIndex === currentPlayList.length) {
      currentIndex = 0;
    }
    currentSong.src = currentPlayList[currentIndex];
    currentSong.play();
    let playLists = document.querySelectorAll(".popular-artist-card");
    playLists.forEach((playList) => {
      if (
        currentSong.src.includes(
          encodeURIComponent(playList.getAttribute("data-folder"))
        )
      ) {
        updateLowerBar(playList.querySelector(".play-button"));
      }
    });
  } else {
    playListActive = false;
    playNext();
  }
}

function repeatCurrent() {
  currentSong.play();
}

function enablerepeat() {
  if (repeatEnabled) {
    document.querySelector(".enable-repeat-svg").style.fill = "white";
    repeatEnabled = false;
    currentSong.addEventListener("ended", currentSongEnded);
    currentSong.removeEventListener("ended", repeatCurrent);
  } else {
    repeatEnabled = true;
    currentSong.removeEventListener("ended", currentSongEnded);
    currentSong.addEventListener("ended", repeatCurrent);
  }
  let button = document.querySelector(".erb2");
  let svg = document.querySelector(".enable-repeat-svg");
  let hoverBox = document.querySelector(".enable-repeat-icon .hover-box");
  hoverBox.innerHTML = repeatEnabled ? "Disable repeat" : "Enable repeat";
  svg.style.fill = repeatEnabled ? "black" : "#b3b3b3";
  button.classList.toggle("enable-repeat-button");
}

// --- EVENT LISTENERS INITIALIZATION ---
// Hover Boxes
HoverBox(".bg-home-div", "Home", "-2px");
HoverBox(".search-icon", "Search", "-15px", "130%");
HoverBox(".browse-icon", "Browse", "-80%", "120%");
HoverBox(".create-icon-button", "Create playlist or folder", "-65px", "-100%");
HoverBox(".add-to-liked-icon", "Add to Liked Songs", "-300%", "-170%");
HoverBox(".enable-shuffle-box", "Shuffle", "-160%", "-170%");
HoverBox(".backward-button-icon", "Previous", "-190%", "-170%");
HoverBox(".forward-button-icon", "Next", "-100%", "-170%");
HoverBox(".enable-repeat-icon", "Enable repeat", "-250%", "-170%");
HoverBox(".control-button-icon-box", "Playing view", "-250%", "-170%");
HoverBox(".lyrics-icon-box", "lyrics", "-100%", "-170%");
HoverBox(".queue-icon-box", "Queue", "-120%", "-170%");
HoverBox(".connect-todevice-icon-box", "Connect to a device", "-350%", "-170%");
HoverBox(".fullscreen-icon-box", "Enter Full Screen", "-550%", "-170%");
HoverBox(".volume-box .volume-icon-box", "Volume", "-120%", "-160%");

// Search Bar Logic
let visibleKeys = () => {
  let elem = document.querySelector(".keys");
  elem.style.visibility = "visible";
  let searchField = document.querySelector(".search-field");
  searchField.style.backgroundColor = " #2a2a2a";
};
let visiblekeys2 = () => {
  let elem = document.querySelector(".keys");
  elem.style.visibility = "hidden";
  searchField.style.backgroundColor = "  #1f1f1f";
};
let keyHoverElements = [".search-field", ".keys", ".search-content"];
for (let i = 0; i < keyHoverElements.length; i++) {
  document
    .querySelector(keyHoverElements[i])
    .addEventListener("mouseenter", visibleKeys);
  document
    .querySelector(keyHoverElements[i])
    .addEventListener("mouseleave", visiblekeys2);
}
let keys = document.querySelector(".keys");
keys.addEventListener("mousedown", () => {
  setTimeout(() => {
    searchField.focus();
  }, 0);
});
searchField.addEventListener("focus", () => {
  svgIcon.style.fill = "white";
});
searchField.addEventListener("blur", () => {
  svgIcon.style.removeProperty("fill");
});
searchContent.addEventListener("mousedown", (e) => {
  setTimeout(() => {
    searchField.focus();
  }, 0);
});
searchField.addEventListener("input", () => {
  if (searchField.value.trim() !== "") {
    searchLabel.style.visibility = "hidden";
  } else {
    searchLabel.style.visibility = "visible";
  }
});
searchField.addEventListener("input", () => {
  if (window.innerWidth < 910) {
    browseContent.style.display = "none";
  }
});
document.addEventListener("click", (e) => {
  if (window.innerWidth < 910 && document.activeElement !== searchField) {
    browseContent.style.display = "flex";
  }
});

// Install Button
installLink.addEventListener("mouseenter", () => {
  installIcon.style.fill = "white";
  installLink.style.transform = "scale(1.04)";
  linktext.style.color = "white";
});
installLink.addEventListener("mouseleave", () => {
  installIcon.style.removeProperty("fill");
  installIcon.style.removeProperty("transform");
  linktext.style.removeProperty("color");
  installLink.style.removeProperty("transform");
});

// Context Menus
contextMenu.addEventListener("mousedown", () => {
  let menuOpened;
  if (getComputedStyle(linksMenu).display === "block") {
    menuOpened = false;
  } else {
    menuOpened = true;
  }
  if (!menuOpened) {
    contextMenu.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="hamburger-icon-svg" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M15.5 13.5H.5V12h15zm0-4.75H.5v-1.5h15zm0-4.75H.5V2.5h15z"></path></svg>`;
  } else if (menuOpened) {
    contextMenu.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="close-links-svg" viewBox="0 0 16 16" style="--encore-icon-height: var(--encore-graphic-size-decorative-smaller); --encore-icon-width: var(--encore-graphic-size-decorative-smaller);"><path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06"></path></svg>`;
  }
  linksMenu.classList.toggle("links-menu2");
});
contextMenumobbtn.addEventListener("click", () => {
  contextMenuMob.classList.toggle("context-menu-none");
});
contextMenuClosebtn.addEventListener("click", () => {
  contextMenuMob.classList.toggle("context-menu-none");
});

// Sidebar Resizer
navbarResizer.addEventListener("mousedown", () => {
  navbarResizer.classList.add("resize-active");
  document.addEventListener("mouseup", resetColor);
  isResizing = true;
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
});

// Window & Player Layout
window.addEventListener("resize", updateSongPlayer);
window.addEventListener("resize", () => {
  portraitPlayer.style.bottom = portraitNavbar.offsetHeight + "px";
});
window.addEventListener("DOMContentLoaded", () => {
  portraitPlayer.style.bottom = portraitNavbar.offsetHeight + "px";
});

// Player Sliders & Buttons
progressSlider.value = 0;
volumeSlider.value = 100;
updateSliderColor(progressSlider, progressSlider.value);
updateSliderColor(volumeSlider, volumeSlider.value);
attachSliderEvents(progressSlider);
attachSliderEvents(volumeSlider);
attachSliderEvents(progressbarPortrait);
btnicon.innerHTML = playIcon;
HoverBox(".play-button-main", "Play", "-5px", "-110%");
button.addEventListener("click", () => {
  if (!currentSong.src) return;
  if (currentSong.paused) {
    currentSong.play();
  } else {
    currentSong.pause();
  }
});
document.querySelector(".forward-button-icon").addEventListener("click", () => {
  if (playListActive) {
    currentIndex++;
    if (currentIndex >= currentPlayList.length) {
      currentIndex = 0;
    }
    currentSong.src = currentPlayList[currentIndex];
    currentSong.play();
    let playLists = document.querySelectorAll(".popular-artist-card");
    playLists.forEach((playList) => {
      if (
        currentSong.src.includes(
          encodeURIComponent(playList.getAttribute("data-folder"))
        )
      ) {
        updateLowerBar(playList.querySelector(".play-button"));
      }
    });
  } else {
    playNext();
  }
});
document
  .querySelector(".backward-button-icon")
  .addEventListener("click", () => {
    if (playListActive) {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = currentPlayList.length - 1;
      }
      currentSong.src = currentPlayList[currentIndex];
      currentSong.play();
      let playLists = document.querySelectorAll(".popular-artist-card");
      playLists.forEach((playList) => {
        if (
          currentSong.src.includes(
            encodeURIComponent(playList.getAttribute("data-folder"))
          )
        ) {
          updateLowerBar(playList.querySelector(".play-button"));
        }
      });
    } else {
      playPrevious();
    }
  });
document.querySelector(".enable-repeat-icon").addEventListener("click", () => {
  enablerepeat();
});
volumeBar.addEventListener("input", () => {
  currentSong.volume = volumeBar.value / 100;
  updateVolumesvg();
});

// Mobile Player Buttons
portraitPlayBtn.addEventListener("click", () => {
  if (!currentSong.src) return;
  if (currentSong.paused) {
    currentSong.play();
  } else {
    currentSong.pause();
  }
});
portraitNextBtn.addEventListener("click", () => {
  document.querySelector(".forward-button-icon").click();
});
portraitPrevBtn.addEventListener("click", () => {
  document.querySelector(".backward-button-icon").click();
});

// Audio Element Events
currentSong.addEventListener("timeupdate", () => {
  const progressPercentage =
    (currentSong.currentTime / currentSong.duration) * 100;
  progressBar.value = progressPercentage;
  updateSliderColor(progressBar, progressPercentage);
  // Mobile progress bar
  const mobileProgress = document.getElementById("progress-bar-portrait");
  mobileProgress.value = progressPercentage;
  updateSliderColor(mobileProgress, progressPercentage);
});
progressBar.addEventListener("change", () => {
  const newTime = (progressBar.value / 100) * currentSong.duration;
  currentSong.currentTime = newTime;
});
document
  .getElementById("progress-bar-portrait")
  .addEventListener("change", (e) => {
    const newTime = (e.target.value / 100) * currentSong.duration;
    currentSong.currentTime = newTime;
  });
currentSong.addEventListener("play", syncAllButtons);
currentSong.addEventListener("pause", syncAllButtons);
currentSong.addEventListener("ended", currentSongEnded);

// --- MAIN EXECUTION ---
async function main() {
  await loadsongs();
  await loadPlaylists();

  const allCards = document.querySelectorAll(
    ".trending-songs-card, .popular-artist-card"
  );

  allCards.forEach((card) => {
    const isMobile = window.innerWidth <= 799;
    const clickTarget = isMobile ? card : card.querySelector(".play-button");

    clickTarget.addEventListener("click", async () => {
      const button = card.querySelector(".play-button");
      mainLowerNavbar.style.display = "none";

      if (card.classList.contains("trending-songs-card")) {
        playListActive = false;
        const source = card.getAttribute("data-song-url");
        if (!currentSong.src.endsWith(source)) {
          currentSong.src = source;
          currentSong.play();
        } else {
          if (currentSong.paused) {
            currentSong.play();
          } else {
            currentSong.pause();
          }
        }
        updateLowerBar(button);
        updateSongPlayer();
      } else {
        let playListname = card.getAttribute("data-folder");
        const isThisPlaylistActive = currentSong.src.includes(
          `/${encodeURIComponent(playListname)}/`
        );
        if (isThisPlaylistActive) {
          if (currentSong.paused) {
            currentSong.play();
          } else {
            currentSong.pause();
          }
        } else {
          await playPlaylist(playListname);
        }
        updateSongPlayer();
        updateLowerBar(button);
      }
    });
  });

  setupSliders();
}

main();
