// == info-tela > Smartphones Landscape == //
$("#tela").html ( "Tamanho da sua tela " + window.screen.availWidth +"x" + window.screen.availHeight);

// == sweetalert > logout == //
$('.logout').click(function () {
    var idCliente=$(this).attr('data-idCliente');
    var APIKEY=$(this).attr('data-APIKEY');
    swal({
        title: "Deseja realmente sair?",
        text: "Você terá que fazer login novamente para acesar",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ed5565",
        confirmButtonText: "Sim, eu quero sair",
        closeOnConfirm: true
    },function(){
        $(location).prop('href', 'logout.php?idCliente='+idCliente+'&APIKEY='+APIKEY);
    })
});

function confirmBox(heading, question, cancelButtonTxt, okButtonTxt, callbackConfirm, callbackCancel) {
    swal({
        title: heading,
        html: true,
        text: question,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: okButtonTxt,
        cancelButtonText: cancelButtonTxt,
        closeOnConfirm: false,
        closeOnCancel: false
    },function(isConfirm) {
        if (isConfirm) {
            callbackConfirm();
        } else {
            if (callbackCancel) {
                callbackCancel();
            }
        }
    });
    /*var confirmModal=$('<div id="question" class="modal fade" role="dialog">\
<div class="modal-dialog">\
<!-- Modal content-->\
<div class="modal-content">\
<div class="modal-header">\
<h4 class="modal-title"> ' + heading + ' </h4>\
</div>\
<div class="modal-body">\
<span > ' + question + ' </span>\
</div>\
<div class="modal-footer">\
<a href="#" class="btn btn-w-m btn-default bt_cancelar" id="cancelButton" data-dismiss="modal"> ' + cancelButtonTxt + ' </a>\
<a href="#" id="okButton" class="btn btn-w-m btn-primary"> ' + okButtonTxt + ' </a>\
</div>\
</div>\
</div>\
</div>');
    confirmModal.find('#okButton').click(function (event) {
        callbackConfirm();
        confirmModal.modal('hide').on('hide.bs.modal', function (e) {
            $('#question').remove();
        });
        console.log('removequestion');
    });
    if (callbackCancel) {
        confirmModal.find('#cancelButton').click(function (event) {
            callbackCancel();
            confirmModal.modal('hide').on('hide.bs.modal', function (e) {
                $('#question').remove();
            });
        });
    }
    confirmModal.modal('show').on('hide.bs.modal', function (e) {
        $('#question').remove();
    });
    ;*/
}
function infoBox(heading, info) {
    var confirmModal=$('<div id="info" class="modal fade" role="dialog">\
<div class="modal-dialog">\
<!-- Modal content-->\
<div class="modal-content">\
<div class="modal-header">\
<h4 class="modal-title"> ' + heading + ' </h4>\
</div>\
<div class="modal-body">\
<span > ' + info + ' </span>\
</div>\
<div class="modal-footer">\
<a href="#" id="okButton" class="btn btn-w-m btn-primary"> OK </a>\
</div>\
</div>\
</div>\
</div>');
    confirmModal.find('#okButton').click(function (event) {
        confirmModal.modal('hide').on('hide.bs.modal', function (e) {
            $('#info').remove();
        });
        //console.log('removequestion');
    });
    confirmModal.modal('show').on('hide.bs.modal', function (e) {
        $('#info').remove();
    });
}