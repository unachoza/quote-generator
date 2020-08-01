# Quote-Generator [See Live](https://unachoza.github.io/quote-generator/)

Generate a new quote with a click of a button and also share the quote to Twitter.

# Process

I searched for a variety of different quote APIs looking for a Jane Austin Quote API. Along the way I found APIs for Movie Quotes, Hacker Quotes, Mulder of the X Files Quotes, along with the suggested API, forsmatic.

I chose to give the user options of which quotes they would like generated to appeal to a wider user audiance. Working with mutliple APIs, I need a way to normalize the data response to aviod writing repetitive code for each API call. This became a two very nested ternary functions. Another challenge I ran into, the DevLorem Api returned html not a string like the others. I implemented a Regular Expression to remove the <p> tags and normalize further.

#### Code Snipet

> <p> const normalizeQuoteDataFromApis = (data) => { <br/>
> let quoteText;<br/>
> return (quoteText = data.quotes<br/>
> ? data.quotes[0]<br/>
> : data.quoteText<br/>
> ? data.quoteText<br/>
> : data.paragraphs[0]<br/>
> ? data.paragraphs[0].replace(/[< p >][<\/p>]/g, '')<br/>
> : 'end');<br/>
> }; </p>

# Online Tools

-Background was made using [Pattern Cooler](https://www.patterncooler.com/)

-Icons from [Fontawesome](https://fontawesome.com/)

-Wise Quotes from [Forismatic API](https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json)

-Hacker Quotes from [Hacker API](https://hackerman.wtf/api/n)

-Movie Quotes from [DevLorem API](https://devlorem.kovah.de/api/1)

-Jane Austin Quotes from [Jane Austin Twitter Bot Github Repo](https://github.com/matthewberryman/JaneAustenQuotes) by [Matthew Berryman](https://github.com/matthewberryman)
