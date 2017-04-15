var switchInterval;
var multipleInterval;

$(document).ready(function() {
    var h = document.getElementById('chantier1').clientHeight;
    $("#images").css('height', h + 'px');
    imageEventHandler();
    multipleTitles();
    animateToDivs();
    Galleria.loadTheme('./galleria/themes/classic/galleria.classic.min.js');
    Galleria.run('#galleria');
});

var imageEventHandler = function() {
    $("#play").hide();
    $("#div-title2").hide();
    $("#div-subtitle2").hide();
    $("#div-title3").hide();
    $("#title-3-2").hide();
    $("#title-3-3").hide();
    $("#title-3-4").hide();
    $("#div-subtitle3").hide();
    switchInterval = setInterval(function() {
        // Bottom one is shown, first one is hidden
        if ($('#chantier1').hasClass('seen')) {
            $("#div-title1").hide(100);
            $("#div-subtitle1").hide(100);
            $(".line").hide(100);

            $('#chantier1').animate({"left": "100%"}, "slow").removeClass('seen');
            $("#chantier2").animate({"right": 0}, "slow").addClass('seen');
            $("#chantier3").css('left', 'auto').css('right', '100%');

            $("#div-title2").show();
            $("#div-subtitle2").show();
        } else if ($('#chantier2').hasClass('seen')) {
            $("#div-title2").hide(100);
            $("#div-subtitle2").hide(100);

            $('#chantier2').animate({"left": "100%"}, "slow").removeClass('seen');
            $("#chantier3").animate({"right": 0}, "slow").addClass('seen');
            $("#chantier1").css('left', 'auto').css('right', '100%');

            $("#div-title3").show();
            $("#div-subtitle3").show();
        } else if ($("#chantier3").hasClass('seen')) {
            $("#div-title3").hide(100);
            $("#div-subtitle3").hide(100);

            $('#chantier3').animate({"left": "100%"}, "slow").removeClass('seen');
            $("#chantier1").animate({"right": 0}, "slow").addClass('seen');
            $("#chantier2").css('left', 'auto').css('right', '100%');
            
            $("#div-title1").show();
            $("#div-subtitle1").show();
            $(".line").show();
        }
    },10000);

    $("#pause").on('click', function() {
        clearInterval(switchInterval);
        $("#pause").hide();
        $("#play").show();
    })

    $("#play").on('click', function() {
        switchInterval = setInterval(function() {
            // Bottom one is shown, first one is hidden
            if ($('#chantier1').hasClass('seen')) {
                $('#chantier1').animate({"left": "100%"}, "slow").removeClass('seen');
                $("#chantier2").animate({"right": 0}, "slow").addClass('seen');
                $("#chantier3").css('left', 'auto').css('right', '100%');
            } else if ($('#chantier2').hasClass('seen')) {
                $('#chantier2').animate({"left": "100%"}, "slow").removeClass('seen');
                $("#chantier3").animate({"right": 0}, "slow").addClass('seen');
                $("#chantier1").css('left', 'auto').css('right', '100%');
            } else if ($("#chantier3").hasClass('seen')) {
                $('#chantier3').animate({"left": "100%"}, "slow").removeClass('seen');
                $("#chantier1").animate({"right": 0}, "slow").addClass('seen');
                $("#chantier2").css('left', 'auto').css('right', '100%');
            }
        },10000);
        $("#play").hide();
        $("#pause").show();
    })
}

var multipleTitles = function() {
    multipleInterval = setInterval(function() {
        // Bottom one is shown, first one is hidden
        if ($('#title-3-1').hasClass('shown')) {
            $('#title-3-1').removeClass('shown').hide(100);
            $('#title-3-2').addClass('shown').show();
        } else if ($('#title-3-2').hasClass('shown')) {
            $('#title-3-2').removeClass('shown').hide(100);
            $('#title-3-3').addClass('shown').show();
        } else if ($("#title-3-3").hasClass('shown')) {
            $('#title-3-3').removeClass('shown').hide(100);
            $('#title-3-4').addClass('shown').show();
        } else if ($("#title-3-4").hasClass('shown')) {
            $('#title-3-4').removeClass('shown').hide(100);
            $('#title-3-1').addClass('shown').show();
        }
    },2500);
}

var stopMultipleTitles = function() {
    clearInterval(multipleInterval);
}

var animateToDivs = function() {
    $("#toDescription").click(function() {
        $('html, body').animate({
            scrollTop: $("#description").offset().top
        }, 1000);
    });

    $(".toPictures").click(function() {
        $('html, body').animate({
            scrollTop: $("#pictures").offset().top
        }, 1000);
    });

    $(".home").click(function() {
        $('html, body').animate({
            scrollTop: $("#top").offset().top
        }, 1000);
    });

    $(".toContact").click(function() {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top
        }, 1000);
    });
}

var formValidation = function() {
    
}
