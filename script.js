const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterButton = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

//show loading
function loading() {
  loader.classList.remove('hidden')
  quoteContainer.classList.add('hidden')
}

function loadingComplete() {
  loader.classList.add('hidden')
  quoteContainer.classList.remove('hidden')
}

async function getQuote() {
  loading()
  const proxyUrl = 'https://pacific-basin-70579.herokuapp.com/'
  const apiUrl =
    'api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

  try {
    const response = await fetch(proxyUrl + apiUrl, {
      method: 'GET',
      headers: {
        Origin: '*',
      },
    })
    const data = await response.json()

    loadingComplete()
    // if author blank add unkwown
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown'
    } else {
      authorText.innerText = data.quoteAuthor
    }

    // reduce font-sixe for long qoutes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote')
    } else {
      quoteText.classList.remove('long-quote')
    }
    quoteText.innerText = data.quoteText

    //stop loader show quote
  } catch (error) {
    console.log(error)
  }
}
newQuoteBtn.addEventListener('click', getQuote)
twitterButton.addEventListener('click', tweetQuote)

// tweet quote
function tweetQuote() {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl =
    'https://twitter.com/intent/tweet?text=${quote} - ${author}'
  window.open(twitterUrl, '_blank')
}

// on load
getQuote()
