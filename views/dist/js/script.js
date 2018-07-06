var done = false;
var nbOfImages = 0;

$(window).load(preload([
    './webapp/dist/images/chantier1.jpg',
    './webapp/dist/images/chantier2.jpg',
    './webapp/dist/images/chantier3.jpg'
]));

$(document).ready(function() {
    $(".hidden-top-menu").hide();
    $(".notifications").hide();
    animateToDivs();
    buttonHandler();
    $('#my-slide').DrSlider({
        navigationType: 'circle',
        navigationColor: '#99ff99',
        navigationHoverColor: '#00b300',
        navigationHighlightColor: '#bfbfbf',
        duration: 8000,
        showControl: true
    });
    Galleria.loadTheme('./webapp/dist/galleria/themes/classic/galleria.classic.min.js');
    Galleria.configure();
    galleriaImagesLoader(function() {
        Galleria.run('#galleria');
    });
});

var galleriaImagesLoader = function(callback) {
    var toAdd = "";
    $.ajax({
        type: 'GET',
        url: '/api/image',
        contentType: "application/json",
        success: function(response) {
            var results = response.results;
            for (var image of results) {
                toAdd += '<img id="image-' + nbOfImages + '" height="85%" src="./webapp/images-gallery/' + image.name + '"/>'
                nbOfImages++;
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            showNotification('Erreur ' + xhr.status + '! ' + xhr.responseText, 'error');
        }
    }).done(function() {
        $("#galleria").append(toAdd);
        callback(null);
    });
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
            scrollTop: $("#my-slide").offset().top - 190
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

    $("#name").on('keyup', function(){
        $("#name").css('border-color', '#ccc');
        $("#name-notification").hide();
        $("#name-notif-div").hide();
    });

    $("#email").on('keyup', function(){
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

    $("#phone").on('keyup', function(){
        $("#phone").css('border-color', '#ccc');
        $("#phone-notification").hide();
        $("#phone-notif-div").hide();
    });

    $("#comment").on('keyup', function(){
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
