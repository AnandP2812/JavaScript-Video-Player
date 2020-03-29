document.addEventListener("DOMContentLoaded", handleDocumentLoad); /*the DOM loads when the page is loaded; it is used once because it has to be
checked before the page loads, so queries and listeners are not triggered before the DOM is fully loaded.*/

function handleDocumentLoad() { /*when the listeners are heard, it's when the HTML document is fully loaded; then this line of code will execute the functions.*/

    var myVideo = document.querySelector("video"); /*query selector means that it returns the first element; and it has been used because I have only used
    one video on my HTML - which does not have an ID - but if I had more than one video, then I would have to getElementbyID instead, as each video would
    have their own id.*/
    var playButton = document.getElementById("playPause"); /*var means a variable has been declared; and it has been given a name so it can be identified.
    The variables are used to store data values.*/
    var muteButton = document.getElementById("muteButton"); /*getElementbyId has been used to refer to the element by its ID on the HTML document,
    because multiple buttons have been used - therefore, using querySelector would not be necessary because all the buttons have an ID each -
    which can be targeted.*/
    var stopButton = document.getElementById("stopButton"); /*next to the getElementbyID is the ID of the HTML element - this is so that a specific
    element can be targeted - we use speech marks to target it - and brackets.*/
    var scrubSlider = document.getElementById("seekBar"); /*each line ends with a semi-colon - this means that it is the end of a statement.*/
    var volSlider = document.getElementById("moveVolume");
    var durationDisplay = document.getElementById("durationField");
    var currentDisplay = document.getElementById("currentField");
    var speedSelection = document.querySelector("select"); /*query selector has been used for the speed selection because there is only one speed
    selection menu on the HTML document - and it also does not have an ID.*/
    var fastForward = document.getElementById("fastForward");

    playPause.addEventListener("click", playPauseVideo); /*we use EventListener so that when the user clicks the button, it will listen for click event -
    EventListener listens for all events, such as: change, input, timeupdate etc.*/
    muteButton.addEventListener("click", muteVideo); /*all the events have their own function and are in speech marks; the listener will listen for
    the event to execute the function.*/
    stopButton.addEventListener("click", stopVideo); /*the click event means that it requires a mouse click in order to work / be triggered.*/
    scrubSlider.addEventListener("input", scrubVideo); /*the input event is used because we need the slider to be interactive - therefore, the input
    event triggers when something keeps changing - which is the value of the slider.*/
    myVideo.addEventListener("timeupdate", movePlaySlider); /*timeupdate has been used here because we want the current time to change when we scrub
    through the video - if we did not use this, then the time would not change when we scrub through the video. Also, we want the scrub slider
    to update/ move along in time with the video.*/
    volSlider.addEventListener("input", moveVolSlider); /*after the event, is the name I have given to the function that will be executed.*/
    myVideo.addEventListener("durationchange", displayDuration); /*durationchange event has been used to display the video's duration; when the
    video is loaded, the duration will change from "NaN"to the duration of the actual video - for example: "04:10".*/
    myVideo.addEventListener("timeupdate", displayCurrent); /*timeupdate has been used because we want the current time to change, depending on
    what minute/second the video is currently playing at - if we don't have this, the current time would be fixed and would not change.*/
    speedSelection.addEventListener("change", chooseSpeed); /*the change event has been used for the speed changer because we have multiple
    playback rates - therefore, when we select a particular speed, it will change the speed of the video depending on what speed has been chosen.*/
    fastForward.addEventListener("mousedown", tripleSpeed); /*the mouse down event is triggered when the mouse is pressed over an element.*/
    fastForward.addEventListener("mouseup", doubleSpeed); /*the mouse up event is triggered when the mouse is released over an element, such as: a button.*/
    fastForward.addEventListener("dblclick", normalSpeed); /*dbclick is double click; it is triggered when the mouse is clicked twice on a element.*/

    function playPauseVideo() { /*this is the function that we want to be executed. Next to the function, is the name of the function which I
      previously named where the EventListeners are - so it can be targeted. This function will play and pause the video.*/
        if (myVideo.paused === true) { /*this is a boolean property; it means that, if myVideo is paused, and equal to being 'true', it will pause the video.
        The "===" means that both the values must be equal.*/
            myVideo.play(); /*the "play" method here will start to play my video.*/
            playButton.innerHTML = "Pause"; /*when the video is playing, we want the play/pause button to say "Pause" instead of "Play".*/
        } else { /*else means that this is the code to be executed if the if statement is false.*/
            myVideo.pause(); /*the 'pause' method here will pause my video, preventing it from playing.*/
            playButton.innerHTML = "Play"; /*when the video is paused, we want the play/pause button to say "Play" instead of "Pause".*/
        }
    }

    function muteVideo() { /*function to be executed, along with the name I previously gave it, so it can be targeted. This function will mute and
      unmute the video's sound.*/
        if (myVideo.muted == true) { /*this is a boolean property; it means that, if myVideo is muted and equal to being 'true', then the video's
        sound will be muted.*/
            myVideo.muted = false; /*this is a boolean property; it means that, if myVideo is muted and assigned to being 'false', then the
            video's sound will be not be muted.*/
            muteButton.innerHTML = "Mute"; /*when the video is playing when it is not muted, we want the mute/unmute button to say "Mute".*/
            volSlider.value = 40; /*this means, when the video is unmuted, the volume slider will start at the value 40, so it does not play at
            the maximum sound level.*/
        } else { /*else means that this is the code to be executed if the if statement is false.*/
            volSlider.value = 0; /*when the video is muted, we want the volume slider to be assigned to the value 0 - so we know that there will be no sound.*/
            myVideo.muted = true; /*when myVideo is assigned to being 'true, it will be muted.*/
            muteButton.innerHTML = "Unmute"; /*when the video is playing when it is muted, we want the mute/unmute button to say "Unmute".*/
        }
    }

    function stopVideo() { /*function to be executed, along with the name I previously gave it, so it can be targeted. This function will stop the
       video from playing.*/
        if (myVideo.paused === true) { /*this is a boolean property; and because there is no stop event we have to use pause. This means, if
          myVideo is paused, and equal to being 'true', it will pause the video - which means it will be stopped - and won't play.*/

        } else { /*else means that this is the code to be executed if the if statement is false.*/
            myVideo.currentTime = 0; /*when the video has stopped, we use "currentTime" to change the video's current time to 0 - which means it will
            go back to the start of the video.*/
            myVideo.pause(); /*the 'pause' method here will pause my video, preventing it from playing - in other words, the video has stopped playing.*/
            playButton.innerHTML = "Play"; /*when the "Stop" button has been clicked, we want the play/pause button to say "Play" instead of "Pause".*/
        }
    }

    function scrubVideo() { /*function to be executed, along with the name I previously gave it, so it can be targeted. This function will allow us to
      scrub through the video, using the slider.*/
        var scrubTime = myVideo.duration * (scrubSlider.value / 100); /*the variable "scrubTime" has been assigned to the duration of myVideo
        multiplied by the scrubSlider's value, divided by 100 to convert it to a percentage. Therefore, when mutliplying the duration by the current
        pecentage of the slider, we get a result to update the actual playback position in the video.*/
        myVideo.currentTime = scrubTime; /*to update the position in the video, the "currentTime" is set to what has just been calculated
        - which is "scrubTime".*/
    }

    function movePlaySlider() { /*function to be executed, along with the name I previously gave it, so it can be targeted. This function will allow
      the scrub slider to move in time when the video is playing.*/
        if (myVideo.currentTime > 0) { /*this means, if the slider is greater than 0. Therefore, we want to move the slider if the current playback
          time of the video is greater than 0 - this means it will go back to 0 when the video has been stopped.*/
            scrubSlider.value = (myVideo.currentTime / myVideo.duration) * 100; /*this means, the scrub slider's value will be assigned to the
            video's current time divded by the duration, multiplied by 100. This will match the 0-100 scale control on the slider - and will move
            along as the video plays.*/
        } else { /*else means that this is the code to be executed if the if statement is false.*/
            scrubSlider.value = 0; /*if the current playback time is not greater than 0, then we want to reset its position to 0.*/
        }
    }

    function moveVolSlider() { /*function to be executed, along with the name I previously gave it, so it can be targeted. This function will allow
      us to change the volume of the video, using the volume slider.*/
        myVideo.volume = volSlider.value / 100; /*this means, that we are accessing the volume property of the video; and assigning it to the
        volume slider's value, dividing it by 100. This means that we have a range - 100 being the maximum (loudest), and 0 being the
        lowest (no sound). So we can use the slider to control the volume.*/
    }

    function displayDuration() { /*function to be executed, along with the name I previously gave it, so it can be targeted. This function will
      allow us to see the duration of the video.*/
        var minutes = Math.floor(myVideo.duration / 60); /*this will allow us to get the number of minutes. The function is dividing the number
        of seconds by 60 to get the minutes of the video's duration.*/
        var seconds = Math.floor(myVideo.duration % 60); /*this is the remainder represented in seconds of the video's duration.*/

        if (minutes < 10) minutes = "0" + minutes; /*this will add a  0 to the minutes if it is less than 10 - for example: if it was 4:00 minutes,
        it would display as 04:00. The function is stating, if the minute is less than 10, then we want to add a 0.*/

        if (seconds < 10) seconds = "0" + seconds; /*this will add a 0 to the seconds if it is less than 10 - for example: if it was 4.6 seconds,
        it would display as 4:06. The function is stating, if the second is less than 10, then we want to add a 0.*/

        durationDisplay.value = minutes + ":" + seconds; /*this means, the value of the durationDisplay will be assigned to a set attribute -
        which means that the value of any attribute can be updated - which is the durationDisplay.*/
    }

    function displayCurrent() { /*function to be executed, along with the name I previously gave it, so it can be targeted. This function
      will allow us to see the current time of the video, while it plays.*/
        var minutes = Math.floor(myVideo.currentTime / 60); /*this will allow us to get the number of minutes. The function is dividing
        the number of seconds by 60 to get the minutes of the current time of the video.*/
        var seconds = Math.floor(myVideo.currentTime % 60); /*this is the remainder represented in seconds of the video's current time.*/

        if (minutes < 10) minutes = "0" + minutes; /*this will add a 0 to the minute of the current time if it is less than 10 - for example:
        if it was at 4:00 minutes, it would display as 04:00. The function is stating, if the minute is less than 10, then we want to add a 0.*/

        if (seconds < 10) seconds = "0" + seconds; /*this will add a 0 to the second of the current time if it is less than 10 -
        for example: if it was 4.6 seconds, it would display as 4:06. The function is stating, if the second is less than 10, then we want to add a 0.*/

        currentDisplay.value = minutes + ":" + seconds; /*this means, the value of the durationDisplay will be assigned to a set attribute -
        which means that the value of any attribute can be updated - which is the durationDisplay.*/
    }

    function chooseSpeed() { /*function to be executed, along with the name I previously gave it, so it can be targeted. This function will
      allow us to change the speed of the video.*/
        myVideo.playbackRate = speedSelection.value; /*here, we are accessing the playback rate of the video, and assigining it to
        the value of the speedSelection.*/
    }

    function tripleSpeed() { /*function to be executed, along with the name I previously gave it, so it can be targeted. This
      function will allow us to make the speed triple, when the moused is pressed over the button.*/
        myVideo.playbackRate = 3; /*this means, we are using the playbackRate property of the video - and assigning it to the number 3 -
        which is to triple the video speed.*/
    }

    function doubleSpeed() { /*function to be executed, along with the name I previously gave it, so it can be targeted. This function will
      allow us to make the speed double, when the moused is released over the button.*/
        myVideo.playbackRate = 2; /*this means, we are using the playbackRate property of the video - and assigning it to the number 2 -
        which is to double the video speed.*/
    }

    function normalSpeed() { /*function to be executed, along with the name I previously gave it, so it can be targeted. This function will
      allow us to make the speed normal when the moused is doubled clicked.*/
        myVideo.playbackRate = 1; /*this means, we are using the playbackRate property of the video - and assigning it to the number 1 - which is normal speed.*/
    }

}
