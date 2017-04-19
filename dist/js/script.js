var switchInterval;
var multipleInterval;

$(document).ready(function() {
    $(".hidden-top-menu").hide();
    $(".notifications").hide();
    var h = document.getElementById('chantier1').clientHeight;
    $("#images").css('height', h + 'px');
    imageEventHandler();
    multipleTitles();
    animateToDivs();
    Galleria.loadTheme('./galleria/themes/classic/galleria.classic.min.js');
    Galleria.run('#galleria');
    buttonHandler();
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
    if ($("#name").val() == "") {
        $("#name").css('border-color', 'tomato');
        $("#name-notification").text('Veuillez entrer un nom');
        $("#name-notif-div").show();
        $("#name-notification").show();
    }
    if ($("#email").val() == "") {
        $("#email").css('border-color', 'tomato');
        $("#email-notification").text('Veuillez entrer une adresse mail');
        $("#email-notif-div").show();
        $("#email-notification").show();
    } else if (! validateEmail($("#email").val())) {
        $("#email").css('border-color', 'tomato');
        $("#email-notification").text('Veuillez entrer une adresse mail valide');
        $("#email-notif-div").show();
        $("#email-notification").show();
    }
    if ($("#phone").val() == "") {
        $("#phone").css('border-color', 'tomato');
        $("#phone-notification").text('Veuillez entrer un numéro de téléphone');
        $("#phone-notif-div").show();
        $("#phone-notification").show();
    }
    if ($("#comment").val() == "") {
        $("#comment").css('border-color', 'tomato');
        $("#comment-notification").text('Veuillez entrer un commentaire');
        $("#comment-notif-div").show();
        $("#comment-notification").show();
    }

    $("#name").on('change', function(){
        $("#name").css('border-color', '#ccc');
        $("#name-notification").hide();
        $("#name-notif-div").hide();
    });

    $("#email").on('change', function(){
        if (! validateEmail($("#email").val())) {
            $("#email").css('border-color', 'tomato');
            $("#email-notification").text('Veuillez entrer une adresse mail valide');
            $("#email-notif-div").show();
            $("#email-notification").show();
        } else {
            $("#email").css('border-color', '#ccc');
            $("#email-notification").hide();
            $("#email-notif-div").hide();
        }
    });

    $("#phone").on('change', function(){
        $("#phone").css('border-color', '#ccc');
        $("#phone-notification").hide();
        $("#phone-notif-div").hide();
    });

    $("#comment").on('change', function(){
        $("#comment").css('border-color', '#ccc');
        $("#comment-notification").hide();
        $("#comment-notif-div").hide();
    });
}

var validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var buttonHandler = function() {
    $("#show-top").on('click', function() {
        if ($("#hidden-top-menu").hasClass('seen')) {
            $("#hidden-top-menu").css('position', 'initial');
            $("#hidden-top-menu").hide(300);
            $("#hidden-top-menu").removeClass('seen');
            $("#chevron-logo").removeClass('fa-chevron-up');
            $("#chevron-logo").addClass('fa-chevron-down');
        } else {
            $("#hidden-top-menu").show(300, function() {
                // $("#hidden-top-menu").css('position', 'absolute');
                $("#hidden-top-menu").addClass('seen');
                $("#chevron-logo").removeClass('fa-chevron-down');
                $("#chevron-logo").addClass('fa-chevron-up');
            });
        }
    })
}
