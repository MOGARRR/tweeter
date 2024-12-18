/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  $('form').on( 'submit', function( event ) {
    event.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      type:'POST',
      url: '/tweets',
      data: data,
    });
  });

  const loadTweets = () => {
    $.ajax('/tweets',{method:'GET'})
    .then((res) => {
      renderTweets(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  loadTweets();
});




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
      <small>${timeago.format(tweetObject.created_at)}</small>
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
    $('#tweets-container').append($tweet);
  }
}
