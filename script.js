const songs = [
    {
      name: "Kudmayi",
      link: "https://paglasongs.com/files/download/id/14933",
      artists: "Shahid Mallya",
      image: "https://raw.githubusercontent.com/developergtm24/music-web/main/image%20musuic.jpg"
    },
    {
      name: "Tum Se",
      link: "https://pagalsongs.com.in/siteuploads/files/sfd3/1494/Tum%20Se-(PagalSongs.Com.IN).mp3",
      artists: "Sachin-Jigar",
      image: "https://raw.githubusercontent.com/developergtm24/music-web/main/image%20musuic.jpg"
    },
  ];
  
  // DOM elements
  const progress = document.querySelector("#progress");
  const song = document.querySelector("#song");
  const playBtn = document.querySelector("#play i");
  const prevBtn = document.querySelector("#prev");
  const nextBtn = document.querySelector("#next");
  const img = document.querySelector(".img img");
  
  const title = document.querySelector("#title");
  const thumb = document.querySelector("#thumb");
  const artist = document.querySelector("#musician");
  const start = document.querySelector("#start");
  const end = document.querySelector("#end");
  
  let index = 0;
  
  // Initialize first song
  song.src = songs[index].link;
  title.innerHTML = songs[index].name;
  artist.innerHTML = songs[index].artists;
  thumb.src = songs[index].image;
  
  // Load metadata to set duration
  song.addEventListener('loadedmetadata', () => {
    progress.max = song.duration;
    updateTime();
  });
  
  // Update progress bar and time
  setInterval(() => {
    if (!isNaN(song.duration)) {
      updateTime();
      progress.value = song.currentTime;
    }
  }, 1000);
  
  // Change song position using progress bar
  progress.onchange = function () {
    song.currentTime = progress.value;
  };
  
  // Play or pause the song
  playBtn.addEventListener("click", () => {
    if (song.paused) {
      song.play();
      playBtn.classList.remove("bx-play");
      playBtn.classList.add("bx-pause");
      img.classList.add("play");
    } else {
      song.pause();
      playBtn.classList.remove("bx-pause");
      playBtn.classList.add("bx-play");
      img.classList.remove("play");
    }
  });
  
  // Next song
  nextBtn.addEventListener("click", nextPlay);
  prevBtn.addEventListener("click", prevPlay);
  
  function nextPlay() {
    index++;
    if (index >= songs.length) {
      index = 0;
    }
    updateSong();
  }
  
  function prevPlay() {
    index--;
    if (index < 0) {
      index = songs.length - 1;
    }
    updateSong();
  }
  
  function updateSong() {
    song.src = songs[index].link;
    title.innerHTML = songs[index].name;
    artist.innerHTML = songs[index].artists;
    thumb.src = songs[index].image;
    song.play();
    playBtn.classList.remove("bx-play");
    playBtn.classList.add("bx-pause");
    img.classList.add("play");
  }
  
  // Update time display
  function updateTime() {
    const curMin = Math.floor(song.currentTime / 60);
    const curSec = Math.floor(song.currentTime % 60);
    const durationMin = Math.floor(song.duration / 60);
    const durationSec = Math.floor(song.duration % 60);
  
    start.innerHTML = `${curMin < 10 ? '0' + curMin : curMin}:${curSec < 10 ? '0' + curSec : curSec}`;
    end.innerHTML = `${durationMin < 10 ? '0' + durationMin : durationMin}:${durationSec < 10 ? '0' + durationSec : durationSec}`;
  }
  