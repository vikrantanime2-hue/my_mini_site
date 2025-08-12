// js/script.js
document.getElementById('year').textContent = new Date().getFullYear();

const qBtn = document.getElementById('getQuoteBtn');
const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');

qBtn.addEventListener('click', fetchQuote);

async function fetchQuote(){
  quoteEl.textContent = 'Loading…';
  authorEl.textContent = '';
  try{
    const res = await fetch('https://api.quotable.io/random');
    if(!res.ok) throw new Error('Network error');
    const data = await res.json();
    quoteEl.textContent = `"${data.content}"`;
    authorEl.textContent = `— ${data.author}`;
  } catch(err){
    quoteEl.textContent = 'Kuch problem hui. Internet check karo ya dobara try karo.';
    authorEl.textContent = '';
    console.error(err);
  }
}