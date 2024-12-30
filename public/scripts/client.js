/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  $('form').on( 'submit', function( event ) {
    event.preventDefault();
    const data = $(this).serialize(); // FIGURE OUT CROSS SCRIPT HERE!!!!
    const charCounter = $(this).parents().find('.counter'); // to check of char counter is over limit
    if(data === 'text=') { // default value for empty post
      return $('.warning').removeClass('hidden') && $('#warning-message').text('Cannot Post Empty Tweet!');
    } else if ($(charCounter).hasClass('negative')) {
      return $('.warning').removeClass('hidden') && $('#warning-message').text('Tweet Cannot Have More Than 140 Characters!');
    } else {
      $('.warning').addClass('hidden');
      $.ajax({
        type:'POST',
        url: '/tweets',
        data: data,
      }).then(() => {
        $('textarea').val('');
        $(charCounter).val(140);
        loadTweets();
        
      }).catch((err) => {
        console.log(err);
      })
    }
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
    <p>${escapeHtml(tweetObject.content.text)}</p>
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

const escapeHtml = function (str) {
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};

