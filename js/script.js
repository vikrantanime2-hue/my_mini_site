document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("getQuoteBtn").addEventListener("click", () => {
  fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(data => {
      document.getElementById("quote").textContent = data.content;
      document.getElementById("author").textContent = `— ${data.author}`;
    })
    .catch(() => {
      document.getElementById("quote").textContent = "Quote fetch karne me problem aayi 😅";
      document.getElementById("author").textContent = "";
    });
});

    // Sample quotes array (aap API se bhi la sakte ho)
const quotes = [
  { text: "Zindagi ek safar hai suhana", author: "Kishore Kumar" },
  { text: "Kabhi haar mat mano", author: "Master" },
  { text: "Mehnat se kabhi mat ghabrana", author: "Master" },
  { text: "Kamyabi ki kunji lagan hai", author: "Unknown" },
];

// Search button event
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!query) {
    alert("Search field khali hai!");
    return;
  }
  const found = quotes.find(q => q.text.toLowerCase().includes(query));
  if (found) {
    document.getElementById("quote").textContent = found.text;
    document.getElementById("author").textContent = `- ${found.author}`;
  } else {
    document.getElementById("quote").textContent = "Koi quote nahi mila";
    document.getElementById("author").textContent = "";
  }
});

const quotes = [
  { text: "Zindagi ek safar hai suhana", author: "Kishore Kumar" },
  { text: "Kabhi haar mat mano", author: "Master" },
  { text: "Mehnat se kabhi mat ghabrana", author: "Master" },
  { text: "Kamyabi ki kunji lagan hai", author: "Unknown" },
];

// Image URLs (ya API se bhi fetch kar sakte ho)
const images = [
  "https://picsum.photos/1200/500?random=1",
  "https://picsum.photos/1200/500?random=2",
  "https://picsum.photos/1200/500?random=3",
  "https://picsum.photos/1200/500?random=4",
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function updateQuoteAndImage() {
  const randomQuote = getRandomItem(quotes);
  const randomImage = getRandomItem(images);

  document.getElementById("quote").textContent = randomQuote.text;
  document.getElementById("author").textContent = `- ${randomQuote.author}`;
  document.querySelector(".hero-img").src = randomImage;
}

// Page load pe aur button click pe update karo
window.onload = updateQuoteAndImage;
document.getElementById("getQuoteBtn").addEventListener("click", updateQuoteAndImage);

// 30 second me automatic update
setInterval(updateQuoteAndImage, 30000);

const greetingEl = document.getElementById("greeting");
const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");

// Page load par localStorage se naam check karo
window.onload = function() {
  const savedName = localStorage.getItem("masterName");
  if (savedName) {
    greetingEl.textContent = `Namaste, ${savedName} 👋`;
    nameInput.style.display = "none";
    saveNameBtn.style.display = "none";
  }
};

// Naam save karne ka event
saveNameBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (!name) {
    alert("Naam daalo, Master!");
    return;
  }
  localStorage.setItem("masterName", name);
  greetingEl.textContent = `Namaste, ${name} 👋`;
  nameInput.style.display = "none";
  saveNameBtn.style.display = "none";
});

function fadeInElements() {
  const img = document.querySelector(".hero-img");
  const quote = document.getElementById("quote");
  const author = document.getElementById("author");

  img.classList.remove("show");
  quote.classList.remove("show");
  author.classList.remove("show");

  setTimeout(() => {
    img.classList.add("show");
    quote.classList.add("show");
    author.classList.add("show");
  }, 100);  // 100ms ke baad fade in start hoga
}

function updateQuoteAndImage() {
  const randomQuote = getRandomItem(quotes);
  const randomImage = getRandomItem(images);

  const img = document.querySelector(".hero-img");
  img.src = randomImage;

  const quote = document.getElementById("quote");
  const author = document.getElementById("author");

  quote.textContent = randomQuote.text;
  author.textContent = `- ${randomQuote.author}`;

  fadeInElements();
}

// Same pehle waala event listeners and interval
window.onload = () => {
  updateQuoteAndImage();
  // other onload stuff
};

document.getElementById("getQuoteBtn").addEventListener("click", updateQuoteAndImage);
setInterval(updateQuoteAndImage, 30000);

const weatherResult = document.getElementById("weatherResult");
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Shehar ka naam daalo, Master!");
    return;
  }
  
  const apiKey = "6ef6a62b3bfcc7da1ec3c2a26a2ac170";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=hi`;
  
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Shehar nahi mila");
      return res.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      weatherResult.textContent = `${city} me mausam: ${desc}, Taapman: ${temp}°C`;
    })
    .catch(err => {
      weatherResult.textContent = `Error: ${err.message}`;
    });
});
