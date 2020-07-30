console.log('obviouusl this works');

// const nextQuoteButton = document.querySelector('#new-quote');

// console.log(nextQuoteButton, 'obviouusl this works');
// nextQuoteButton.addEventListener('click', async () => {
//   let results = await fetch();
// });
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuoteFromApi() {
  showLoadingSpinner();
  // We need to use a Proxy URL to make our API call in order to avoid a CORS error
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const hackerApiUrl = 'hackerman.wtf/api';
  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + hackerApiUrl);
    const data = await response.json();
    console.log(data.quotes[0]);

    // if (data.quoteAuthor === '') {
    authorText.innerText = 'Unknown';
    // } else {
    //   authorText.innerText = data.quoteAuthor;
    // }
    if (data.quotes[0] > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quotes[0];
    removeLoadingSpinner();
  } catch (error) {
    console.log(error);
    getQuoteFromApi();
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuoteFromApi);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuoteFromApi();
