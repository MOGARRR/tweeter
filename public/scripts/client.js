/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Tweet POST request
  $('form').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const charCounter = $(this).parents().find('.counter'); // to check of char counter is over limit
    if (data === 'text=') { // default value for empty post
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
        loadTweets(false);
      }).catch((err) => {
        console.log(err);
      });
    }
  });

  const loadTweets = (startUp) => { //
    $.ajax('/tweets',{method:'GET'})
      .then((res) => {
        renderTweets(res,startUp);
      }).catch((err) => {
        console.log(err);
      });
  };

  // New tweet toggle
  $('#dropDown').on('click', () => {
    if ($('#new-tweet-container').hasClass('hidden')) {
      return $('#new-tweet-container').removeClass('hidden') && $('#tweet-text').focus();
    } else {
      return $('#new-tweet-container').addClass('hidden') && $('#tweet-text').blur();
    }
  });
  // Scroll button toggle
  $(window).on('scroll', function() {
    let scrollPosition = this.scrollY;
    if (scrollPosition > 400) {
      return $('.scroll-button').removeClass('hidden');
    }
    if (scrollPosition < 400 && !$('.scroll-button').hasClass('hidden')) {
      return $('.scroll-button').addClass('hidden');
    }
  });
  
  $('.scroll-button').on('click',() => {
    window.scrollTo(0,0);
    $('scroll-button').addClass('hidden');
  });

  loadTweets(true);
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
  </article> `;
};

const renderTweets = (tweetsArray, startUp) => {
  if (startUp) { // intial page rendering
    for (const tweet of tweetsArray) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  } else { // user adding tweet
    let $tweet = createTweetElement(tweetsArray[tweetsArray.length - 1]);
    $('#tweets-container').prepend($tweet);
  }
};

// XSS Security Function
const escapeHtml = function(str) {
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};