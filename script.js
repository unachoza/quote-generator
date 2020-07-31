console.log('obviouusl this works');

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const movieQuoteBtn = document.getElementById('movie-quote');
const hackerQuoteBtn = document.getElementById('hacker-quote');
const janeQuoteBtn = document.getElementById('jane-quote');
const loader = document.getElementById('loader');

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

const normalizeData = (data) => {
  console.log('data is ', generate());
  let quoteText;
  quoteText = janeQuote
    ? generate()
    : data.quotes
    ? data.quotes[0]
    : data.quoteText
    ? data.quoteText
    : data.paragraphs[0]
    ? data.paragraphs[0]
    : 'end';
  // authorText = janeQuote
  //   ? 'Jane Austin'
  //   : data.quotes
  //   ? 'Hacker'
  //   : data.quoteText
  //   ? data.quoteAuthor
  //   : data.paragraphs[0]
  //   ? data.source + ' - in character'
  //   : 'end';
  return quoteText;
};

const getNewQuote = async (apiURL) => {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  try {
    const response = await fetch(proxyUrl + apiURL);
    const data = await response.json();
    console.log(normalizeData(data));
    authorText.innerText = data.quoteAuthor;
    quoteText.innerText = normalizeData(data);
    removeLoadingSpinner();
  } catch (error) {
    console.log(error);
  }
};

const getQuoteFromApi = async () => {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // if (data.quoteText.length > 120) {
    //   quoteText.classList.add('long-quote');
    // } else {
    //   quoteText.classList.remove('long-quote');
    // }
    // console.log(normalizeData(data));
    quoteText.innerText = normalizeData(data);
    removeLoadingSpinner();
  } catch (error) {
    console.log(error);
  }
};

// Tweet Quote
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
};

const getHackerQuoteFromApi = async () => {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const hackerApiUrl = 'hackerman.wtf/api';
  try {
    const response = await fetch(proxyUrl + hackerApiUrl);
    const data = await response.json();
    console.log(normalizeData(data));
    console.log('trying');
    // authorText.innerText = 'Hacker';
    // if (data.quotes[0] > 120) {
    //   quoteText.classList.add('long-quote');
    // } else {
    //   quoteText.classList.remove('long-quote');
    // }
    quoteText.innerText = normalizeData(data);
    removeLoadingSpinner();
  } catch (error) {
    console.log(error);
  }
};

const getDevLoremQuoteFromApi = async () => {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const devLoremUrl = 'https://devlorem.kovah.de/api/1';
  try {
    const response = await fetch(proxyUrl + devLoremUrl);
    const data = await response.json();
    console.log(normalizeData(data));
    if (data.source === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.source + ' - in character';
    }
    quoteText.classList.add('long-quote');
    quoteText.innerHTML = data.paragraphs[0];
    removeLoadingSpinner();
  } catch (error) {
    console.log(error);
  }
};
const getJaneAustinQuote = () => {
  console.log('clickd jane');
  console.log(normalizeData(generate()));
  generate();
  quoteText.classList.add('long-quote');
  quoteText.innerHTML = generate();
  authorText.innerText = 'Jane Austin';
};

getQuoteFromApi();

newQuoteBtn.addEventListener('click', getQuoteFromApi);
movieQuoteBtn.addEventListener('click', getDevLoremQuoteFromApi);
hackerQuoteBtn.addEventListener('click', getHackerQuoteFromApi);
janeQuoteBtn.addEventListener('click', getJaneAustinQuote);
twitterBtn.addEventListener('click', tweetQuote);
