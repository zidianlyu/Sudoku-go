var bgmStack = ['a_look_of_love', 'butterfly', 'elegy_for_the_victims', 'last_waltz', 'merry_christmas_mr_lawrence', 'spirited_away', 'the_six_station', 'tiga'];
var bgmPlayList = shuffleArr();
$(document).ready(function() {
    bgm = document.createElement('audio');
    bgm.setAttribute('src', `audio/${bgmStack[bgmPlayList.pop()]}.mp3`);
    $('#play').click(function() {
        bgm.play();
        $('.fa-cog').addClass('fa-spin');
        $('#play').parent().hide();
        $('#pause').parent().show();
    });
    $('#volume-up').click(function() {
        if (bgm.volume < 1) {
            bgm.volume += 0.1;
        }
    });
    $('#volume-down').click(function() {
        if (bgm.volume > 0.1) {
            bgm.volume -= 0.1;
        }
    });
    $('#pause').click(function() {
        bgm.pause();
        $('.fa-cog').removeClass('fa-spin');
        $('#pause').parent().hide();
        $('#play').parent().show();
    });
    $('#random-play').click(function() {
        handleRandomPlay();
    });
    bgm.addEventListener('ended', function() {
        handleRandomPlay();
    })
});

function handleRandomPlay() {
    if (bgmPlayList.length === 0) {
        bgmPlayList = shuffleArr();
    }
    bgm.setAttribute('src', `audio/${bgmStack[bgmPlayList.pop()]}.mp3`);
    bgm.play();
    $('.fa-cog').addClass('fa-spin');
}

function shuffleArr() {
    let arr = [...Array(bgmStack.length).keys()];
    for (let i = 0; i < arr.length; i++) {
        let j = Math.floor(Math.random() * arr.length);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
