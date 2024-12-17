/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  renderTweets(data);

});
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = (tweetObject) => {
  return `
  <article class="tweet">
    <header>
      <img src="${tweetObject.user.avatars}" alt="">
      <span class="header-info"> ${tweetObject.user.name} </span>
      <div class="header-info" id="header-handle">${tweetObject.user.handle}</div>
    </header>
    <p>${tweetObject.content.text}</p>
    <footer>
      <small>${tweetObject.created_at}</small>
      <div class="tweet-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>    
  </article> `
}

const renderTweets = (tweetsArray) => {
  for (const tweet of tweetsArray) {
    let $tweet = createTweetElement(tweet);
    console.log($tweet);
    $('#tweets-container').append($tweet);
  }
}
