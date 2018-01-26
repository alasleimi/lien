Lien - a link shortener
=========================

a Link shortener made during freecodecamp: [project requirements page](https://www.freecodecamp.org/challenges/url-shortener-microservice)


live version on: https://lien.glitch.me



API
------------

Create short links: https://lien.glitch.me/new/[original_url]

original_url must be a valid URL.

response:

```JSON
{
 
 "short-url": SHORTURL,
 "original-url": ORIGINALURL
 
 }

```

example: https://lien.glitch.me/new/http://facebook.com

response:

```JSON
{

"short_url":"C",
"original_url":"http://facebook.com"

}
```

short link: https://lien.gltich.me/C



in case of an invalid url: http status code 400 

```JSON
{
 
 "error": "unvalid URL"
 
 }

```

else http status code 500:


```JSON
{
 
 "error": "database error"
 
 }

```




Front End
------------

simple webpage that consumes the api. I used [Storage API](https://developer.mozilla.org/fr/docs/Web/API/Storage) to save recently shortened links.
