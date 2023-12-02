$(document).ready(function () {
    var sounds = [];

    collectSounds();

    $('.btn-music').click(function () {
        $(this).parent().css('background', 'lightgrey');
        var file = $(this).data('file');
        var fadeIn = $(this).data('fadein');
        var fadeOut = $(this).data('fadeout');
        var volume = $(this).data('volume');
        if (fadeIn === undefined || fadeIn === '') {
            fadeIn = 0;
        }
        if (fadeOut === undefined || fadeOut === '') {
            fadeOut = 0;
        }
        if (volume === undefined || volume === '') {
            volume = 1.0;
        }
        var music = sounds[file];
        var musicId = music.play();
        music.fade(0.0, volume, fadeIn * 1000, musicId);

        $(this).siblings('.btn-fade').click(function () {
            music.fade(volume, 0.0, fadeOut * 1000, musicId);
            music.on('fade', function () {
                console.log('Faded!');
            })
        });

        $(this).siblings('.btn-pause').click(function () {
            music.pause();
        });
    });

    $('.btn-sound').click(function () {
        $(this).parent().css('background', 'lightgrey');
        var file = $(this).data('file');
        var volume = $(this).data('volume');
        if (volume === undefined || volume === '') {
            volume = 1.0;
        }
        var sound = sounds[file];
        sound.play();
        sound.volume(volume);
    });

    function collectSounds() {
        $('.btn-music, .btn-sound').each(function () {
            var file = $(this).data('file');
            if (file !== undefined && file !== '') {
                sounds[file] = new Howl({
                    src: [file],
                    preload: true
                });
                sounds[file].on('load', function () {
                    console.log('Loaded: ' + file);
                    $('[data-file="' + file + '"]').css('border', '2px solid #000');
                });
            }
        });
    }
});
