var imagesDatatable;
var imagesTable;

$(document).ready(function() {
    $("#spinning-wheel").hide();
    submitHandler(function(names) {
        sendPhotos(names, function() {
            window.location.reload();
        })
    });
    initDatatable();
    buttonsHandler();
    imageDropping();
})

var sendPhotos = function(names, callback) {
    for (var name of names) {
        $.ajax({
            type: 'POST',
            url: '/api/image',
            data: JSON.stringify(name),
            contentType: "application/json",
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                showNotification('Erreur ' + xhr.status + '! ' + xhr.responseText, 'error');
            }
        });
    }
    callback(null);
}

var submitHandler = function(callback) {
    $("#upload_button").on('click', function() {
        console.log("alloooooo");
        $("#spinning-wheel").show();
        $("#dropzone").hide();
        var names = Array();

        $("#dropzone").find('img').each(function(i) {
            var imgname = $(this).attr('name');
            var name = {
                'name': imgname,
            }

            names[i] = name;
            if ($(this).attr('src') != undefined && $(this).attr('src') != "") {
                var data = {
                    'name': imgname,
                    'img': $(this).attr('src')
                }

                $.ajax({
                    type: 'POST',
                    url: '/picture',
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    success: function(response) {

                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        showNotification('Erreur ' + xhr.status + '! ' + xhr.responseText, 'error');
                    }
                })
            }
        }).promise().done(function() {
            callback(names);
        });
    })
}

var imageDropping = function() {
    $('#dropzone').filedrop({ 
        error: function(err, file) {
            switch(err) {
                case 'BrowserNotSupported':
                    alert('browser does not support HTML5 drag and drop')
                    break;
                case 'TooManyFiles':
                    showNotification("N'en envoye pas plus de 10 à la fois pour ne pas surcharger le serveur", "error")
                    break;
                case 'FileTooLarge':
                    showNotification("Le fichier est trop gros fradé", "error")
                    break;
                case 'FileTypeNotAllowed':
                    showNotification("Uniquement des fichiers jpeg, jpg ou png", "error")
                    break;
                case 'FileExtensionNotAllowed':
                    showNotification("Uniquement des fichiers jpeg, jpg ou png", "error")
                    break;
                default:
                    break;
            }
        },
        allowedfiletypes: ['image/jpeg','image/png'],   // filetypes allowed by Content-Type.  Empty array means no restrictions
        allowedfileextensions: ['.jpg','.jpeg','.png'], // file extensions allowed. Empty array means no restrictions
        maxfiles: 10,
        maxfilesize: 20,    // max file size in MBs
        dragOver: function() {
            $(".fa-10x").css('color', '#66ffff');
            $(".image-text").css('color', '#66ffff');
            $("#dropzone").css('border-color', '#66ffff');
            // user dragging files over #dropzone
        },
        dragLeave: function() {
            $(".fa-10x").css('color', 'grey');
            $(".image-text").css('color', 'grey');
            $("#dropzone").css('border-color', 'grey');
            // user dragging files out of #dropzone
        },
        drop: function() {
            $("#dropzone").css('border-color', 'grey');
        },
        uploadStarted: function(i, file, len){
            createImage(file, $("#dropzone"));
        },
        uploadFinished: function(i, file, response, time) {
        },
        progressUpdated: function(i, file, progress) {
            // $data(file).find('.progress').width(progress);
        },
        globalProgressUpdated: function(progress) {
            // progress for all the files uploaded on the current instance (percentage)
            // ex: $('#progress div').width(progress+"%");
        },
        speedUpdated: function(i, file, speed) {
            // speed in kb/s
        },
        rename: function(name) {
            // name in string format
            // must return alternate name as string
        },
        beforeEach: function(file) {
            // file is a file object
            // return false to cancel upload
        },
        beforeSend: function(file, i, done) {
            done();
        },
        afterAll: function() {
            // runs after all files have been uploaded or otherwise dealt with
        }
    });
}

var createImage = function(file, type) {
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        var copy = $("#img-tmp").clone();
        copy.attr('src', reader.result);
        // copy.addClass('thumbnail');
        copy.attr('name', file.name);
        copy.removeAttr('id');
        copy.removeAttr('hidden');
        type.append(copy);
    }, false);

    reader.readAsDataURL(file);

    $('.back').hide();
}

var initDatatable = function() {
    var imagesTable = $("#images-table").DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
        ],
        bFilter: false,
        bInfo: false,
        bPaginate: false,
        "columns": [
            null, 
            null, {
                "data": null,
                "defaultContent": '<button class="btn btn-default delete"><i class="fa fa-trash fa-3x"></i></button>'
            }
        ]
    });

    $.ajax({
        type: 'GET',
        url: '/api/image',
        contentType: "application/json",
        success: function(response) {
            imagesTable.clear().draw();
            var results = response.results;
            for (var image of results) {
                imagesTable.row.add([image._id, '<img height=50 alt="' + image.name + '" src="./webapp/images-gallery/' + image.name + '"/>', null]).draw(false);
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            showNotification('Erreur ' + xhr.status + '! ' + xhr.responseText, 'error');
        }
    })
}

var buttonsHandler = function() {
    $("#images-table").on('click', 'button.delete', function() {
        var tr = $(this).closest('tr');
        var id = $(tr).find('td').first().text();
        $("#id").text(id);
        $("#modal-remove-image").modal();
    })

    $("#remove-button-image").on('click', function() {
        id = $("#id").text();
        $.ajax({
            type: 'delete',
            url: '/api/image/' + id,
            contentType: "application/json",
            success: function(response) {
                window.location.href = '/admin';
            },
            error: function(xhr, ajaxOptions, thrownError) {
                showNotification('Erreur ' + xhr.status + '! ' + xhr.responseText, 'error');
            }
        })
    })
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
