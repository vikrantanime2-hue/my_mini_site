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