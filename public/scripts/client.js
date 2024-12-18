/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  $('form').on( 'submit', function( event ) {
    event.preventDefault();
    const data = $(this).serialize();
    const charCounter = $(this).parents().find('.counter'); // to check of char counter is over limit
    if(data === 'text=') { // default value for empty post
      return alert('Cannot post empty Tweet');
    } else if ($(charCounter).hasClass('negative')) {
      return alert('Cannot post tweet above 140 characters')
    } else {
      $.ajax({
        type:'POST',
        url: '/tweets',
        data: data,
      }).then(() => {
        loadTweets();
      }).catch((err) => {
        console.log(err);
      })
    }
    $('textarea').val('');
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
      <span class="header-info" id="header-name"> ${tweetObject.user.name} </span>
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
    $('#tweets-container').prepend($tweet);
  }
}
