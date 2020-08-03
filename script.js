const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const movieQuoteBtn = document.getElementById('movie-quote');
const hackerQuoteBtn = document.getElementById('hacker-quote');
const janeQuoteBtn = document.getElementById('jane-quote');
const loader = document.getElementById('loader');
const quotes = document.getElementById('quote-text-container');

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

const normalizeQuoteDataFromApis = (data) => {
  let quoteText;
  return (quoteText = data.quotes
    ? data.quotes[0]
    : data.quoteText
    ? data.quoteText
    : data.paragraphs[0]
    ? data.paragraphs[0].replace(/[<p>][<\/p>]/g, '')
    : 'end');
};

const normalizeAuthorDataFromApis = (data) => {
  let authorText;
  return (authorText = data.quotes
    ? ' - Hacker'
    : data.source
    ? `${data.source} - in character`
    : data.quoteAuthor === ''
    ? 'Unknown'
    : data.quoteAuthor);
};

const getNewQuote = async (apiURL) => {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  try {
    quotes.classList.remove('remove');
    const response = await fetch(proxyUrl + apiURL);
    const data = await response.json();
    authorText.innerText = normalizeAuthorDataFromApis(data);
    quoteText.innerText = normalizeQuoteDataFromApis(data);
    removeLoadingSpinner();
  } catch (error) {
    authorText.innerText = 'Oops, there is a problem! Try again';
    quotes.classList.add('remove');
    removeLoadingSpinner();
    console.log(error);
  }
};
const getWiseQuote = async () => {
  getNewQuote('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json');
};
const getMovieQuote = async () => {
  getNewQuote('https://devlorem.kovah.de/api/1');
};
const getHackerQuote = async () => {
  getNewQuote('https://hackerman.wtf/api');
};
const getJaneAustinQuote = () => {
  console.log(generate());
  quoteText.classList.add('long-quote');
  quoteText.innerHTML = generate();
  authorText.innerText = 'Jane Austin';
};

const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
};

getWiseQuote();

newQuoteBtn.addEventListener('click', getWiseQuote);
movieQuoteBtn.addEventListener('click', getMovieQuote);
hackerQuoteBtn.addEventListener('click', getHackerQuote);
janeQuoteBtn.addEventListener('click', getJaneAustinQuote);
twitterBtn.addEventListener('click', tweetQuote);
