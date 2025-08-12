// Show current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Quotes array
const quotes = [
  { text: "Zindagi ek safar hai suhana", author: "Kishore Kumar" },
  { text: "Kabhi haar mat mano", author: "Master" },
  { text: "Mehnat se kabhi mat ghabrana", author: "Master" },
  { text: "Kamyabi ki kunji lagan hai", author: "Unknown" },
];

// Images array
const images = [
  "https://picsum.photos/1200/500?random=1",
  "https://picsum.photos/1200/500?random=2",
  "https://picsum.photos/1200/500?random=3",
  "https://picsum.photos/1200/500?random=4",
];

// Random item picker
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Fade-in effect
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
  }, 100);
}

// Update quote and image
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

// On page load
window.onload = () => {
  updateQuoteAndImage();

  // Load saved name
  const savedName = localStorage.getItem("masterName");
  if (savedName) {
    document.getElementById("greeting").textContent = `Namaste, ${savedName} 👋`;
    document.getElementById("nameInput").style.display = "none";
    document.getElementById("saveNameBtn").style.display = "none";
  }
};

// Quote button event
document.getElementById("getQuoteBtn").addEventListener("click", updateQuoteAndImage);

// Update every 30 seconds
setInterval(updateQuoteAndImage, 30000);

// Search quotes
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

// Save name
document.getElementById("saveNameBtn").addEventListener("click", () => {
  const nameInput = document.getElementById("nameInput");
  const greetingEl = document.getElementById("greeting");
  const name = nameInput.value.trim();
  if (!name) {
    alert("Naam daalo, Master!");
    return;
  }
  localStorage.setItem("masterName", name);
  greetingEl.textContent = `Namaste, ${name} 👋`;
  nameInput.style.display = "none";
  document.getElementById("saveNameBtn").style.display = "none";
});

// Weather API
document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const cityInput = document.getElementById("cityInput");
  const weatherResult = document.getElementById("weatherResult");
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
