let bgm_stack = ['a_look_of_love', 'tiga', 'the_six_station'];
$(document).ready(function() {
    bgm = document.createElement('audio');
    bgm.setAttribute('src', `audio/${bgm_stack[~~(Math.random() * bgm_stack.length)]}.mp3`);
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
    $('#restart').click(function() {
        $('.fa-cog').removeClass('fa-spin');
        bgm.setAttribute('src', `audio/${bgm_stack[~~(Math.random() * bgm_stack.length)]}.mp3`);
        bgm.play();
        $('.fa-cog').addClass('fa-spin');
    });
    bgm.addEventListener('ended', function() {
        bgm.currentTime = 0;
        bgm.play();
    })
});
