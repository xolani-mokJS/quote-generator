const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading 
function complete(){
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;

    }
}

// getGuote from api

async function  getQuote(){
    loading();
    const proxyUrl = 'https://pacific-basin-70579.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
   
    try{
        const response =  await fetch( proxyUrl + apiUrl);
        const data = await response.json();
        
        // if author blank add unkwown
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // reduce font-sixe for long qoutes
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        } 
            quoteText.innerText = data.quoteText;

        //stop loader show quote
        complete();

    } catch(error){
        getQuote();
        
    }

    //twitter quote
    function tweetQuote(){
        const quote = quoteText.innerText;
        const author = authorText.innerText;
        const twitterUrl = 'https://twitter.com/intent/tweet?text=${quote} - ${author}';
        window.open(twitterUrl,'_blank');
    }

    //event listeners
    newQuoteBtn.addEventListener('click', getQuote);
    twitterButton.addEventListener('click', tweetQuote);


}
// on load
getQuote();
