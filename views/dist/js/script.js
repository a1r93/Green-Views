var switchInterval;
var multipleInterval;
var url_base = "localhost:3000";
var done = false;
var nbOfImages = 0;

$(window).load(preload([
    './webapp/dist/images/chantier1.jpg',
    './webapp/dist/images/chantier2.jpg',
    './webapp/dist/images/chantier3.jpg'
]));

$(document).ready(function() {
    console.log($(window).height());
    $(".hidden-top-menu").hide();
    $(".notifications").hide();
    imageEventHandler();
    multipleTitles();
    animateToDivs();
    galleriaImagesLoader();
    buttonHandler();
});

var galleriaImagesLoader = function() {
    var toAdd = "";
    $.ajax({
        type: 'GET',
        url: '/api/image',
        contentType: "application/json",
        success: function(response) {
            var results = response.results;
            for (var image of results) {
                if (nbOfImages == 0) {
                    var img = new Image();

                    img.onload = function(){
                        var height = img.height;
                        var width = img.width;

                        if ($(window).width() > width) {
                            $(img).attr('height', '100%');
                        } else {
                            $(img).attr('width', '100%');
                        }
                        img.id = "image-0-full"
                        $(img).addClass('shown-image');
                        
                        $("#gallery").append(img);
                    }

                    img.src = './webapp/images-gallery/' + image.name;

                }
                toAdd += '<img id="image-' + nbOfImages + '" height="85%" class="thumb-images hover-thumbnail" src="./webapp/images-gallery/' + image.name + '"/>'
                nbOfImages++;
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            showNotification('Erreur ' + xhr.status + '! ' + xhr.responseText, 'error');
        }
    }).done(function() {
        $("#gallery-thumbnail").append(toAdd);
        $("#image-0").removeClass('hover-thumbnail');
        console.log($("#image-0"));
    });
}

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
            scrollTop: $("#description").offset().top - 190
        }, 1000);
    });

    $(".toPictures").click(function() {
        $('html, body').animate({
            scrollTop: $("#pictures").offset().top - 190
        }, 1000);
    });

    $(".home").click(function() {
        $('html, body').animate({
            scrollTop: $("#top").offset().top
        }, 1000);
    });

    $(".toContact").click(function() {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top - 190
        }, 1000);
    });
};

var formValidation = function() {
    let fine = true;

    if ($("#name").val() == "") {
        $("#name").css('border-color', 'tomato');
        $("#name-notification").text('Veuillez entrer un nom');
        $("#name-notif-div").show();
        $("#name-notification").show();
        fine = false;
    }
    if ($("#email").val() == "") {
        $("#email").css('border-color', 'tomato');
        $("#email-notification").text('Veuillez entrer une adresse mail');
        $("#email-notif-div").show();
        $("#email-notification").show();
        fine = false;
    } else if (! validateEmail($("#email").val())) {
        $("#email").css('border-color', 'tomato');
        $("#email-notification").text('Veuillez entrer une adresse mail valide');
        $("#email-notif-div").show();
        $("#email-notification").show();
        fine = false;
    }
    if ($("#phone").val() == "") {
        $("#phone").css('border-color', 'tomato');
        $("#phone-notification").text('Veuillez entrer un numéro de téléphone');
        $("#phone-notif-div").show();
        $("#phone-notification").show();
        fine = false;
    }
    if ($("#comment").val() == "") {
        $("#comment").css('border-color', 'tomato');
        $("#comment-notification").text('Veuillez entrer un commentaire');
        $("#comment-notif-div").show();
        $("#comment-notification").show();
        fine = false;
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
            fine = false;
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

    return fine;
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
    });

    $("#send-comment").on('click', function(event) {
        event.preventDefault();
        if (formValidation()) {
            let data = {
                "name": $("#name").val(),
                "email": $("#email").val(),
                "phone": $("#phone").val(),
                "comment": $("#comment").val(),
            };

            $.ajax({
                type: 'POST',
                url: '/contact',
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(response) {
                    showNotification('Votre commentaire à bien été envoyé.', 'success');
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    showNotification('Erreur ' + xhr.status + '! ' + xhr.responseText, 'error');
                }
            });
        }
    })

    $("#next-image").on('click', function() {
        var idCurrent = $("#gallery").find('img').first().attr('id');
        $('.thumb-images').addClass('hover-thumbnail');

        var res = idCurrent.split('-');
        if ($('#image-' + (+res[1]+1)).length) {
            var id = $('#image-' + (+res[1]+1)).attr('id');
            var src = $('#image-' + (+res[1]+1)).attr('src');
            $('#image-' + (+res[1]+1)).removeClass('hover-thumbnail');
        } else {
            var id = $('#image-0').attr('id');
            var src = $('#image-0').attr('src');
            $('#image-0').removeClass('hover-thumbnail');
        }
        addImage(id, src)
    })

    $("#previous-image").on('click', function() {
        var idCurrent = $("#gallery").find('img').first().attr('id');
        $('.thumb-images').addClass('hover-thumbnail');

        var res = idCurrent.split('-');
        if ($('#image-' + (+res[1]-1)).length) {
            var id = $('#image-' + (+res[1]-1)).attr('id');
            var src = $('#image-' + (+res[1]-1)).attr('src');
            $('#image-' + (+res[1]-1)).removeClass('hover-thumbnail');
        } else {
            var id = $('#image-' + (nbOfImages-1)).attr('id');
            var src = $('#image-' + (nbOfImages-1)).attr('src');
            $('#image-' + (nbOfImages-1)).removeClass('hover-thumbnail')
        }
        addImage(id, src)
    })

    $("body").on('click', 'img.thumb-images', function() {
        $('.thumb-images').addClass('hover-thumbnail');
        $(this).removeClass('hover-thumbnail');

        var id = $(this).attr('id');
        var src = $(this).attr('src');

        addImage(id, src);
    })
}

var addImage = function(id, src) {
    var img = new Image();

    img.onload = function(){
        var height = img.height;
        var width = img.width;

        if ($(window).width() > width) {
            $(img).attr('height', '100%');
        } else {
            $(img).attr('width', '100%');
        }
        img.id = id + '-full'
        $(img).addClass('shown-image');
        
        $("#gallery").find('img').each(function() {$(this).remove()});
        $("#gallery").append($(img))
    }
    
    $(img).addClass('animated fadeIn');
    img.src = src;
}

function showNotification(message, code) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr[code](message);
}

$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}
