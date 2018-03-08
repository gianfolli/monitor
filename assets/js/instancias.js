/*
 ****************************************************************
 * WebRadios - Cross Host - 2017
 * Programacao: Gian Folli
 * Design: Gian Folli / Halyson Brito
 ****************************************************************
 */
var ports = {};
$(document).ready(function(){
    var socket = io.connect('http://dev.crosshost.com.br:3050');
    socket.on('clock', function (data) {
        var date=new Date(data);
        var hours=date.getHours();
        (hours<10)?hours='0'+hours:hours=hours;
        var minutes=date.getMinutes();
        (minutes<10)?minutes='0'+minutes:minutes=minutes;
        var seconds=date.getSeconds();
        (seconds<10)?seconds='0'+seconds:seconds=seconds;
        var timeServer= hours+':'+minutes+':'+seconds;
      //  console.log( timeServer );
        $('.relogio').html(timeServer);
    });

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });


    $('input[type="submit"]').prop("disabled",false);

    if($("#formInstancia").attr('data-form')=='create'){
        var action='cria_instancia';
    }else{
        var action='edita_instancia';
    }

    $('form').on('submit', function(e){
        e.preventDefault();
    });



    $.validator.setDefaults({
        submitHandler:function(){
            $('input[type="submit"]').prop("disabled",true);
            var file=$('#imageInstancias');

            uploadFile(file[0].files[0], 'ObjImgInstancias');

            var refreshSend = setInterval(function () {

                console.log('uploading...');
                console.log('Status Upload'+$('#uploadStatus').val());
                if ($('#uploadStatus').val() == 1 && $('#uploadError').val() == 0) {
                    console.log('FILE:'+$('#ObjImgInstanciasFile').val());
                    console.log('uploaded!');
                    clearInterval(refreshSend);

                    ($('#status').is(':checked')) ? status = 1 : status = 0;

                    var lastLoaded = 0;
                    var obj = '';
                    var lastResponse = '';
                    var erros = {};
                    erros.count = 0;
                    console.log('clear setInterval');
                    console.log(action);

                    if (!checkRepeatDate()) {
                        console.log($('#data_ini').val() + ' ' + $('.time_ini input').val());
                        console.log($('#data_end').val() + ' ' + $('.time_end input').val());
                        if (checkDates($('#data_ini').val() + ' ' + $('.time_ini input').val(), $('#data_end').val() + ' ' + $('.time_end input').val(), '#modal-erro-na-data')) {
                            $('#data_end').val('');
                        }
                    }
                    getAgendamentos();
                    if ($('#repeat_stream').is(':checked')) {
                        var repeat_stream=1;
                    }
                    else {
                        var repeat_stream=0;
                    }


                    ($('#repeat_M').is(':checked')) ? repeat_M=1 : repeat_M=0;
                    ($('#repeat_T').is(':checked')) ? repeat_T=1 : repeat_T=0;
                    ($('#repeat_W').is(':checked')) ? repeat_W=1 : repeat_W=0;
                    ($('#repeat_H').is(':checked')) ? repeat_H=1 : repeat_H=0;
                    ($('#repeat_F').is(':checked')) ? repeat_F=1 : repeat_F=0;
                    ($('#repeat_S').is(':checked')) ? repeat_S=1 : repeat_S=0;
                    ($('#repeat_U').is(':checked')) ? repeat_U=1 : repeat_U=0;

                    $.ajax({
                        type: "POST",
                        url: 'acoes.php',
                        dataType: 'json',
                        data: {
                            acao: action
                            , id: $('#id').val()
                            , nome: $('#nome').val()
                            , instancia: $('#instancia').val()
                            , streaming: $('#streaming').val()
                            , arquivo: $('#ObjImgInstanciasFile').val()
                            , tipo:$('#typeFile').val()
                            , status:status
                            ,idAgendamentos:$('#idAgendamentos').val()
                            ,startDates:$('#datesStart').val()
                            ,endDates:$('#datesEnd').val()
                            ,datesRecursion:$('#datesRecursion').val()
                            ,repeat_M:repeat_M
                            ,repeat_T:repeat_T
                            ,repeat_W:repeat_W
                            ,repeat_H:repeat_H
                            ,repeat_F:repeat_F
                            ,repeat_S:repeat_S
                            ,repeat_U:repeat_U
                            ,data_ini:$('#data_ini').val()
                            ,data_end:$('#data_end').val()
                            ,recurviseDates:$('#recurviseDates').val()
                        },
                        beforeSend: function () {

                            if (action == 'cria_instancia') {
                                swal({
                                    title: "Cadastrando nova instancia!",
                                    text: "Aguarde até o final do processo!",
                                    type: "success",
                                    showCancelButton: false,
                                    showConfirmButton: false
                                });
                            } else {
                                swal({
                                    title: "Alterando instancia!",
                                    text: "Aguarde até o final do processo!",
                                    type: "success",
                                    showCancelButton: false,
                                    showConfirmButton: false
                                });
                            }
                        }
                        , xhrFields: {
                            onprogress: function (e) {
                                console.log(e.currentTarget.response);
                                // console.log(e.currentTarget.response.replace(lastResponse, ''));
                                if (isJsonString(e.currentTarget.response.replace(lastResponse, ''))) {
                                    var result = JSON.parse(e.currentTarget.response.replace(lastResponse, '').replace(/(\r\n|\n|\r)/gm, ""));
                                } else {
                                    var result = '';

                                }

                                if (typeof (result.progress) !== 'undefined') {
                                    swal({
                                        title: result.progress.title,
                                        html: true,
                                        text: result.progress.message,
                                        type: "success",
                                        showCancelButton: false,
                                        showConfirmButton: false
                                    });
                                    console.info('Outros');
                                } else if (typeof (result.error) !== 'undefined') {
                                    swal({
                                        title: result.error.title,
                                        html: true,
                                        text: result.error.message,
                                        type: "error",
                                        confirmButtonColor: "#1ab394",
                                        confirmButtonText: "Ok",
                                        closeOnConfirm: true
                                    });
                                    erros.count++;
                                    console.info('Erro');
                                    console.log(result.error);

                                }
                                lastLoaded++;
                                lastResponse = e.currentTarget.response;
                            }
                        },
                        error: function (request, status, error) {
                            $('input[type="submit"]').prop("disabled", false);
                            if (action == 'cria_instancia') {
                                if (erros.count == 0) {
                                    swal({
                                        title: "Instancia Cadastrado!",
                                        text: "O novo instancia foi criado com sucesso!",
                                        type: "success",
                                        confirmButtonColor: "#1ab394",
                                        confirmButtonText: "Ok",
                                        closeOnConfirm: true
                                    }, function () {
                                       // $(location).prop('href', 'lista-instancias.php');
                                    });
                                    //setTimeout(function () {
                                    //    swal.close();
                                    //    $(location).prop('href', 'lista-instancias.php');
                                    //}, 4000);
                                } else {
                                    swal({
                                        title: "Ops! Instancia Não Cadastrado!",
                                        html: true,
                                        text: "Não foi possivel realizar o cadastro deste instancia por haver erros.<br><br>Saída de Erro:<br><pre style='height: 200px; overflow: scroll;'>" + request.responseText.replace('  ', ' ').replace('   ', '') + "<pre>",
                                        type: "error",
                                        confirmButtonColor: "#ed5565",
                                        confirmButtonText: "Ok",
                                        closeOnConfirm: true
                                    }, function () {
                                        $('input[type="submit"]').prop("disabled", false);
                                    });

                                    console.log("Error In Web Service...." + request.responseText);
                                    return false;
                                }
                            } else {
                                if (erros.count == 0) {
                                    swal({
                                        title: "Instancia Alterado!",
                                        text: "O instancia foi alterado com sucesso!",
                                        type: "success",
                                        confirmButtonColor: "#1ab394",
                                        confirmButtonText: "Ok",
                                        closeOnConfirm: true
                                    }, function () {
                                        $(location).prop('href', 'lista-instancias.php');
                                    });
                                    setTimeout(function () {
                                        swal.close();
                                        $(location).prop('href', 'lista-instancias.php');
                                    }, 4000);
                                } else {
                                    swal({
                                        title: "Ops! Instancia Não Alterado!",
                                        html: true,
                                        text: "Não foi possivel realizar a alteração deste instancia por haver erros.<br><br>Saída de Erro:<br><pre style='height: 200px; overflow: scroll;'>" + request.responseText.replace('  ', ' ').replace('   ', '') + "<pre>",
                                        type: "error",
                                        confirmButtonColor: "#ed5565",
                                        confirmButtonText: "Ok",
                                        closeOnConfirm: true
                                    }, function () {
                                        $('input[type="submit"]').prop("disabled", false);
                                    });

                                    console.log("Error In Web Service...." + request.responseText);
                                    return false;
                                }
                            }
                        },
                        //success: function (data) {
                        //    console.log("Success....");
                        //
                        //},
                        complete: function (xhr, status) {
                            $('input[type="submit"]').prop("disabled", false);
                            if (erros == 0) {
                                //console.log(data.success);
                                instanciaCadastrado();
                            } else {
                                // console.log(data);
                                //  erroCadastro();
                            }
                        }
                    });
                }else if($('#uploadStatus').val() == 0 && $('#uploadError').val() == 1){
                    console.log('Error on Upload'+$('#uploadError').val());
                    clearInterval(refreshSend);
                    $('input[type="submit"]').prop("disabled",false);
                }
            },1000);
        }
    });

    $("#formInstancia").validate({
        errorClass:"has-error help-block m-b-none",
        rules:{
            nome:{
                required:true,
                minlength:2
            },
            instancia:{
                required:true,
            },
        },
        messages:{
            nome:"Insira nome e sobrenome do usuário",
            instancia:"Por favor digite um instancia válido",
        },
        highlight:function(element){
                $(element).closest("div").prev().closest("div").addClass('has-error');
                $('input[type="submit"]').prop("disabled", false);
        },
        unhighlight:function(element){
                $(element).closest("div").prev().closest("div").removeClass('has-error');
                $('input[type="submit"]').prop("disabled", false);
        },
    });



    var grid=$("#instancias").bootgrid({
        //columnSelection:true,

        ajax:true,
        rowCount:[25, 50, 75, 100],
        type:"POST",
        url:"acoes.php",
        templates:{
            header:'<div id="{{ctx.id}}" class="{{css.header}}"><div class="row"><div class="col-sm-12 actionBar"><p class="{{css.search}}"></p><p class="{{css.actions}}"></p><button class=\"btn btn-novo\" type=\"button\">Adicionar Novo</button></div></div>' +
            '<div class="row"><div class="col-sm-12 infos"><p class="{{css.infos}}"></p></div></div>'
            ,headerCell:'<th data-column-id="{{ctx.column.id}}" class="{{ctx.css}}" style="{{ctx.style}}"><a href="javascript:void(0);" class="{{css.columnHeaderAnchor}} {{ctx.sortable}}"><span class="{{css.columnHeaderText}}">{{ctx.column.text}}</span>{{ctx.icon}}</a></th>'
            ,icon:'<span class="{{css.icon}} {{ctx.iconCss}}"></span>'
            ,infos:'<div class="{{css.infos}}">{{lbl.infos}}</div>'
            ,loading:'<tr><td colspan="{{ctx.columns}}" class="loading">{{lbl.loading}}</td></tr>'
            ,noResults:'<tr><td colspan="{{ctx.columns}}" class="no-results">{{lbl.noResults}}</td></tr>'
            ,pagination:'<ul class="{{css.pagination}}"></ul>'
            ,paginationItem:'<li class="{{ctx.css}}"><a href="{{ctx.uri}}" class="{{css.paginationButton}}">{{ctx.text}}</a></li>'
            ,rawHeaderCell:'<th class="{{ctx.css}}">{{ctx.content}}</th>'
            ,row:"<tr{{ctx.attr}}>{{ctx.cells}}</tr>"
            ,search:'<div class="{{css.search}}"><div class="input-group"><span class="{{css.icon}} input-group-addon {{css.iconSearch}}"></span> <input type="text" class="{{css.searchField}}" placeholder="{{lbl.search}}" /></div></div>'
            ,select:'<input name="select" type="{{ctx.type}}" class="{{css.selectBox}}" value="{{ctx.value}}" {{ctx.checked}} />'
        }
        , requestHandler:function(request){
            request.acao='list_instancias';
            return request;
        },
        labels:{
            "infos":"Exibindo {{ctx.start}} até {{ctx.end}} de {{ctx.total}} registros",
            "search":"Procurar",
            "all":"Todos",
            "loading":"Carregando...",
            "noResults":"Não foi encontrado registros",
            "refresh":"Atualizar",
        },
        formatters:{
            "nome":function(column,row){
                console.log(row);
                return row.nome+'<span class="line-options"><a href="instancia.php?instancia='+row.id+'" data-toggle="tooltip" data-placement="top" title="Editar">Editar</a> | <a href="javascript:void(0);" class="excluir-instancia" data-instancia="'+row.nome+'" id="'+row.id+'" data-toggle="tooltip" data-placement="top" title="Excluir">Excluir</a></span>';
            },
            "status":function(column, row){
                if(row.status=='1'){
                    return 'Ativo';
                }else{
                    return 'Suspenso';
                }

            },
            "opcoes":function(column, row){
                return '<a href="editar-instancia.php?user='+row.id+'" data-toggle="tooltip" data-placement="top" title="Editar">\
<i class="fa fa-edit" aria-hidden="true"> </i>\
</a> \
<a href="javascript:void(0);" class="excluir-usuario" data-user="'+row.nome+'" id="'+row.id+'" data-toggle="tooltip" data-placement="top" title="Excluir">\
<i class="fa fa-trash" aria-hidden="true"> </i>';
            }

        },statusMapping: {
            0: "none"
            ,1: "none"
            ,2: "none"
            ,3: "none"
            ,4: "none"
        }
    }).on("loaded.rs.jquery.bootgrid", function(){
        var i=0;
        grid.find("tr").each(function(){
            var n=0;
            var Id=$(this).attr('data-row-id');
            var Titles=[];
            var t=0;
            $("thead tr:first").find("th").each(function(){
                Titles.push($(this).html().split("class=\"text\">")[1].split("<\/span>")[0]);
                t++;
            });
            $(this).find("td").each(function(){
                $(this).attr('title', Titles[n]);
                n++;
            });
        });
        grid.find("tbody tr").each(function(){
            i++;
        });
        grid.find(".excluir-instancia").on("click", function(e){
            // get txn id from current table row
            var nome=$(this).attr('data-instancia');
            var id=$(this).attr('id');
            var heading='Atenção!';
            var question='<strong>Tem certeza que deseja excluir o instancia '+nome+'?</strong>';
            var cancelButtonTxt='Cancelar';
            var okButtonTxt='Excluir';
            var callbackConfirm=function(){
                $.ajax({
                    type:"POST",
                    url:'acoes.php',
                    data:{
                        acao:'delete_instancia',
                        id:id
                    },
                    success:function(data){
                        $('#saida').html(data);
                        $('#instancias').bootgrid('reload');
                        swal("Instancia Excluído!", "O instancia foi removido com sucesso"+data, "success");
                        setTimeout(function(){
                            swal.close();
                        },4000)
                    }
                });
            };
            var callbackCancel=function(){
                swal.close();
            };
            confirmBox(heading, question, cancelButtonTxt, okButtonTxt, callbackConfirm, callbackCancel);
        });
    });
    $('#formInstancia .bt_cancelar').on("click", function(e){
        window.location='./lista-instancias.php';
    });


    $('.btn-novo').on('click',function(){
        window.location='./instancia.php';
    });


    /*Agendamentos*/

    $('.time_ini').clockpicker({
        afterDone:function () {
            $(".time_ini").closest(".clockpicker").css("border-color", "#a7b1c2");
            checkDataHora();
        }
    });
    $('.time_end').clockpicker({
        afterDone:function () {
            $(".time_end").closest(".clockpicker").css("border-color", "#a7b1c2");
            checkDataHora()
        }
    });
    $('.data_ini input').datepicker({
        autoclose:true,
        format:"dd/mm/yyyy",
        language:"pt-BR",
        startDate:new Date(),
        forceParse:false
    }).on('changeDate', function (e) {
        if (typeof e.date=== 'undefined') {
            $(this).val(new Date().getDate() + '/' + new Date().getMonth() + 1 + '/' + new Date().getFullYear()).datepicker('update');
        }
        /*var _date_ini=$(this).val().split('/');
         var _date_end=$('#data_end').val().split('/');
         console.log('new Date('+parseInt(_date_ini[2])+', '+parseInt(_date_ini[1])+', '+parseInt(_date_ini[0])+', 0, 0, 0, 0);');
         var date_ini= new Date(parseInt(_date_ini[2]), parseInt(_date_ini[1]-1), parseInt(_date_ini[0]), 0, 0, 0, 0);
         var date_end= new Date(parseInt(_date_end[2]), parseInt(_date_end[1]-1), parseInt(_date_end[0]), 0, 0, 0, 0);

         if(date_ini>date_end){
         $('.data_end input').val('').datepicker('update');
         }*/
        $(".data_ini").closest(".date-picker").css("border-color", "#a7b1c2");
        checkDataHora();
    }).on('keydown', function (e) {
        console.log($(this).val());
    });
    $('.data_end input').datepicker({
        autoclose:true,
        format:"dd/mm/yyyy",
        language:"pt-BR",
        startDate:new Date(),
    }).on('changeDate', function (e) {
        $(".data_end").closest(".date-picker").css("border-color", "#a7b1c2");
        checkDataHora();
        $('.data_ini input').val($('.data_ini input').val()).datepicker('update');
        checkDataHora();
    });
    $('.bt_addAgendamento').show();
    $('#repeat_M, #repeat_T, #repeat_W, #repeat_H, #repeat_F, #repeat_S, #repeat_U').on('ifChecked', function (e) {
        if ($('#recursiveDates').val() != 1) {
            $('.data_end input').val('').datepicker('update');
        }
        if ($('#recursiveDates').val()== 0) {
            $('#recursiveDates').val(1);
        }
        $('.msg_selecione_data').hide();
        console.log('mudou para recursivo');
        $('.bt_addAgendamento').show();
    }).on('ifUnchecked', function (e) {
        var qtd=0;
        $('.recursiveDate').each(function (e) {
            if ($(this).is(':checked')) {
                qtd++;
            }
        });
        if (qtd== 0) {
            $('.data_end input').val('').datepicker('update');
            $('#recursiveDates').val(0);
            console.log('mudou para simples');
            $('.bt_addAgendamento').show();
        }
    });

    $('.bt_addAgendamento').on("click", function (e) {
        checkDataHora();
        if ($('#data_ini').val() != '' && $('#data_end').val() != "" && $('.time_ini input').val() != '' && $('.time_end input').val() != '') {
            var _date_ini=$('#data_ini').val().split('/');
            var date_ini=_date_ini[2] + '-' + _date_ini[1] + '-' + _date_ini[0];
            var _date_end=$('#data_end').val().split('/');
            var date_end=_date_end[2] + '-' + _date_end[1] + '-' + _date_end[0];
            var dateStart=date_ini + ' ' + $('.time_ini input').val();
            var repeat=checkRepeatDate();
            if (!repeat) {
                var dateEnd=date_end + ' ' + $('.time_end input').val();
            }
            else {
                var dateEnd=date_end + ' ' + $('.time_end input').val();
            }
            var count=parseInt($('#formInstancia .agendamentos li').length);
            var n=0;
            $('#formInstancia .agendamentos li').each(function () {
                $(this).attr('id', 'agendamento' + n);
                n++;
            });
            var repeat=checkRepeatDate();
            if (!repeat) {
                var diasSemana=['U', 'M', 'T', 'W', 'H', 'F', 'S'];
                var diaW=new Date(dateStart).getDay();
                var html_new='<li id="agendamento' + n + '">\
<input type="hidden" class="form-control" id="idDateStart' + n + '" name="startDates[]" value="' + dateStart + '">\
<input type="hidden" class="form-control" id="idDateEnd' + n + '" name="endDates[]" value="' + dateEnd + '">\
<input type="hidden" class="form-control" id="idRecursive' + n + '" name="recurviseDates[]" value="' + $('#recursiveDates').val() + '">\
<input type="hidden" class="form-control" id="dayrecursion' + n + '" name="dayRecursion[]" value="[' + diasSemana[diaW] + ']">\
<strong>' + $('#data_ini').val() + ' as ' + $('.time_ini input').val() + '</strong> até <strong>' + $('#data_end').val() + ' as ' + $('.time_end input').val() + '</strong> <i class="fa fa-trash del-agendamento" data-id="' + n + '" onClick="removeAgendamento(this);"></i></li>\
				';
            }
            else {
                var html_new='<li id="agendamento' + n + '">\
<input type="hidden" class="form-control" id="idDateStart' + n + '" name="startDates[]" value="' + dateStart + '">\
<input type="hidden" class="form-control" id="idDateEnd' + n + '" name="endDates[]" value="' + dateEnd + '">\
<input type="hidden" class="form-control" id="idRecursive' + n + '" name="recurviseDates[]" value="' + $('#recursiveDates').val() + '">\
				\
				';
                var dias_recursao='[';
                var r=0;
                $('.recursiveDate:checked').each(function (e) {
                    if ($(this).is(':checked')) {
                        console.log('r:' + r);
                        console.log('qtdr:' + parseInt($('.recursiveDate:checked').length - 1));
                        var diaRecursao=$(this).attr('id').split('_');
                        if (r != parseInt($('.recursiveDate:checked').length - 1)) {
                            dias_recursao += diaRecursao[1] + ',';
                        }
                        else {
                            dias_recursao += diaRecursao[1] + '';
                        }
                    }
                    r++;
                });
                dias_recursao += ']';
                html_new += '<input type="hidden" class="form-control" id="dayrecursion' + n + '" name="dayRecursion[]" value="' + dias_recursao + '">';
                //<strong>Das ' + $('.time_ini input').val() + '</strong> até <strong> as ' + $('.time_end input').val() + '</strong> <i class="fa fa-trash del-agendamento" data-id="' + n + '" onClick="removeAgendamento(this);"></i></li>\
                var days=0;
                var days_checked=0;
                var nameDays=['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
                $('.recursiveDate').each(function (e) {
                    if ($(this).is(':checked')) {
                        if (days_checked== 0) {
                            html_new += '<strong>Todo(a) ' + nameDays[days] + ' de ' + $('#data_ini').val() + ' até ' + $('#data_end').val() + ' das ' + $('.time_ini input').val() + '</strong> até <strong> as ' + $('.time_end input').val() + '</strong> <i class="fa fa-trash del-agendamento" data-id="' + n + '" onClick="removeAgendamento(this);"></i><br>';
                        }
                        else {
                            html_new += '<strong>Todo(a) ' + nameDays[days] + ' de ' + $('#data_ini').val() + ' até ' + $('#data_end').val() + ' das ' + $('.time_ini input').val() + '</strong> até <strong> as ' + $('.time_end input').val() + '</strong><br>';
                        }
                        days_checked++;
                    }
                    days++;
                });
                html_new += '</li>'
            }
            $('#formInstancia .agendamentos').append(html_new);
            reordenaAgendamentos();
            var newHorarioIni=hmsToSecondsOnly('00:' + $('.time_end input').val()) + 1;
            var newHorarioEnd=hmsToSecondsOnly('00:' + $('.time_end input').val()) + 60;
            if (newHorarioIni >= 1440) {
                newHorarioIni=newHorarioIni - 1440;
            }
            if (newHorarioEnd >= 1440) {
                newHorarioEnd=newHorarioEnd - 1440;
            }
            $('.time_ini input').val(secondstotime(newHorarioIni).substr(3, 8));
            $('.time_end input').val(secondstotime(newHorarioEnd).substr(3, 8));
            $('#data_ini').val();
            //$('.bt_addAgendamento').hide();
            $('.horarios').show();
        } else {
            $('.msg_horas').hide();
            $('.msg_selecione_data').show();
            if ($('#data_ini').val()== '') {
                $(".data_ini").closest(".date-picker").css("border-color", "#ed5565");
            }
            if ($('#data_end').val()== '') {
                $(".data_end").closest(".date-picker").css("border-color", "#ed5565");
            }
            if ($('.time_ini input').val()== '') {
                $(".time_ini").closest(".clockpicker").css("border-color", "#ed5565");
            }
            if ($('.time_end input').val()== '') {
                $(".time_end").closest(".clockpicker").css("border-color", "#ed5565");
            }
            setTimeout(function () {
                $('.msg_selecione_data').hide();
            }, 5000);
        }
    });

    $('.selecionaImagemInstancias').on('click',function(){
        $('#imageInstancias').click();
    });


    $('.dragandrophandler').css({'height':'280px','border':'1px #EFEFEF solid'});


    $('.image').on('change', function() {
        var fileSelected = this.files[0];
        var next = $(this).val().split('.');
        var ext = next[next.length-1];
        console.log(ext);
        var objectId = $(this).data('element');
        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'mp4':
                $('#uploadButton').attr('disabled', false);
                $(this).css('border', 'none');
                previewImage(fileSelected, objectId);
                //uploadFile(fileSelected, objectId);
                break;
            default:
                swal({
                    html:true,
                    title: "Ops! Um erro cocorreu!",
                    text: "O tipo de arquivo escolhido não é uma imagem válida.<br>Só são aceitos arquivos dos tipos JPEG, JPG, PNG e GIF.<br>Tente novamente",
                    type: "error",
                    confirmButtonColor: "#ed5565",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true
                }, function () {
                    $('input[type="submit"]').prop("disabled", false);
                });
                $(this).val('');
                $(this).css('border', 'none');
                break;
        }
    });

    $('.preview-img').css('max-width','100%');


    var objDrag = $(".dragandrophandler");
    objDrag.on('dragenter', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).css('border', '2px solid #0B85A1');
    });
    objDrag.on('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    objDrag.on('drop', function(e) {
        var objectId = $(this).data('element');
        /* var Id = objectId.replace('Obj', '');*/
        $(this).css('border', '2px dotted #0B85A1');
        e.preventDefault();
        var files = e.originalEvent.dataTransfer.files;
        var fd = new FormData();
        fd.append('file', files[0]);
        $('#' + objectId)[0].file = files[0];
        console.log(objectId);
        $('#' + objectId).val(files[0].name);
        //We need to send dropped files to Server
        //handleFileUpload(files,objDrag);
        var ext = files[0].type;
        switch (ext) {
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
            case 'video/mp4':
                $('#uploadButton').attr('disabled', false);
                $(this).css('border', 'none');
                previewImage(files[0], objectId);
               // uploadFile(files[0], objectId);

                break;
            default:
                swal({
                    html:true,
                    title: "Ops! Um erro cocorreu!",
                    text: "O tipo de arquivo escolhido não é uma imagem válida.<br>Só são aceitos arquivos dos tipos JPEG, JPG, PNG e GIF.<br>Tente novamente",
                    type: "error",
                    confirmButtonColor: "#ed5565",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true
                }, function () {
                    $('input[type="submit"]').prop("disabled", false);
                });
                $('.image').val('');
                $(this).css('border', 'none');
                break;
        }
    });

});


function previewImage(file, objId) {
    var preview = document.getElementById(objId);
    var imageType = /image.*/;
    console.log(file.type);
    if (!file.type.match(imageType)) {
        var videoType = /video.*/;
        if (!file.type.match(videoType)) {
            throw "File Type must be an image or video";
        }else{
            $('#ch-flowplayer').remove();
            $('#' + objId + ' img').remove();
            $('#typeFile').val('video');
            $('#ObjImgInstancias').append('<div id="ch-flowplayer"></div>');
            var player = flowplayer("#ch-flowplayer", {
                autoplay: false
                , ratio: 9 / 16
                , clip: {
                    live: true,
                    sources: [
                        {
                            type: file.type,
                            src: URL.createObjectURL(file)
                        }
                    ]
                }
                , embed: false
                , key: '$857906151707839'
                , facebook: false
                , twitter: false
                , native_fullscreen: true
                //,logo:'http://player.crosshost.com.br/playerdev/assets/img/seu-logo-horizontal-teste.png'
            });
            player.on("ready", function (api, root) {
                var fsbutton = $('#ch-flowplayer').find(".fp-fullscreen");
                $('#ch-flowplayer').find(".fp-controls").append(fsbutton);// #1- Ajuste do botão FullScreen
                api.embedCode = function () {
                    // #2- Embed
                    return 'KATANA';
                };
            });

            $('#' + objId + 'File').val(file.name);
        }
       //
    }else {
        $('#ch-flowplayer').remove();
        $('#' + objId + ' img').remove();
        $('#typeFile').val('image');
        var img = document.createElement("img");
        img.file = file;
        preview.appendChild(img);
        img.onload = function () {
            $('#' + objId).css({
                'width': '300px'
            });
        };
        // Using FileReader to display the image content
        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);
    }
}

function uploadFile(file, objectId) {

    swal({
        title: "Enviando Arquivo!",
        text: "Aguarde até o final do upload!",
        type: "success",
        showCancelButton: false,
        showConfirmButton: false
    });

    console.log(objectId);
    var url = "uploadFile.php";
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open("POST", url, true);
    $('#' + objectId).append('<div class="progress progress-striped active progressUpload">'+
        '<div style="width: 75%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="75" role="progressbar" class="progress-bar progress-bar-default">'+
        '<span class="sr-only">40% Complete (success)</span>'+
        '</div>'+
        '</div>');
    if(xhr.upload)
        xhr.upload.onprogress=function(evt){
            if (evt.lengthComputable){
                var percentComplete = (evt.loaded / evt.total) * 100;
                $('#' + objectId).find('.progress-bar').width(percentComplete + '%');
                $('#' + objectId).find('.sr-only').html(percentComplete + '%');
                if(percentComplete==100){
                    $('#' + objectId).find('.progressUpload').remove();
                }else{
                    $('#uploadStatus').val('0');
                }
            }
        };
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data=$.parseJSON(xhr.responseText);
            if(data.success){
                $('#'+ objectId+'File').val(data.success.file);
                $('#uploadError').val('0');
                $('#uploadStatus').val('1');
            }else if(data.error){
                swal({
                    html:true,
                    title: data.error.type,
                    text: data.error.type+"<br>Por favor, tente novamente...",
                    type: "error",
                    confirmButtonColor: "#ed5565",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true
                });
                $('#uploadStatus').val('0');
                $('#uploadError').val('1');
                $('.image').val('');
                $('#' + objectId).find('img').remove();
            }
        }
    };
    fd.append('uploaded_file', file);
    xhr.send(fd);
}

function moverImagem(acao,imagem,msg){
    $.ajax({
        type: "POST",
        url: 'acoes.php',
        dataType:'json',
        data: {
            acao:acao
            ,imagem:imagem
        },
        beforeSend: function () {
            console.log('movendo');
        },
        success: function (data) {
            console.log(data);
            if(data.success){
                console.log(msg);
                swal({
                    title: "Configurações sendo alteradas...",
                    text: msg,
                    type: "success",
                    confirmButtonColor: "#1ab394",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true
                });
            }else{
                swal({
                    html:true,
                    title: "Ops! Um erro cocorreu!",
                    text: "Um erro ocorreu enquanto as configurações eram salvas.<br>Tente novamente",
                    type: "error",
                    confirmButtonColor: "#ed5565",
                    confirmButtonText: "Ok",
                    closeOnConfirm: true
                });
            }
            $('#saida').html(data);
        }
    });
}

function removeAgendamento(obj) {
    var id=$(obj).data('id');
    var idAgendamento=$(obj).attr('data-idAgendamento');
    var nome=$(obj).data('data');
    if ($("#formInstancia").data('form')== 'create') {
        var countfields=parseInt($('#formInstancia .agendamentos .form-group').length);
        $('#formInstancia #agendamento' + id).remove();
        reordenaAgendamentos();
    }
    else {
        if (typeof nome != 'undefined') {
            var heading='Exclusão de Agendamento';
            var question='Tem certeza que deseja excluir o agendamento ' + data + '.';
            var cancelButtonTxt='Cancelar';
            var okButtonTxt='Excluir';
            var callbackConfirm=function () {
                $.ajax({
                    type:"POST",
                    url:'acoes.php',
                    data:{
                        acao:'delete_agendamento',
                        idAgendamento:idAgendamento
                    },
                    success:function (data) {
                        $('#saida').html(data);
                    }
                });
                var countfields=parseInt($('#formInstancia .agendamentos .form-group').length);
                $('#formInstancia #agendamento' + id).remove();
              //  reordenaStreams();
            };
            var callbackCancel='';
            confirmBox(heading, question, cancelButtonTxt, okButtonTxt, callbackConfirm, callbackCancel);
        }
        else {
            var countfields=parseInt($('#formInstancia .agendamentos .form-group').length);
            $('#formInstancia #agendamento' + id).remove();
          //  reordenaStreams();
        }
    }
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


function reordenaAgendamentos() {
    var count=parseInt($('#formInstancia .agendamentos li').length);
    var n=0;
    $('#formInstancia .agendamentos li').each(function () {
        $(this).attr('id', 'agendamento' + n);
        $(this).find('.numberAgendamento').html(n + 1);
        //console.debug($(this).find('.del-stream'));
        $(this).find('.del-agendamento').removeAttr('data-id');
        $(this).find('.del-agendamento').attr('data-id', n);
        n++;
    });
}

function hmsToSecondsOnly(str) {
    var p=str.split(':'),
        s=0,
        m=1;
    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    if (validTime(s)== '') {
        return '0';
    }
    else {
        return s;
    }
}

function validTime(time) {
    if (time=== parseInt(time, 10)) {
        return time;
    }
    else {
        return '';
    }
}
function secondstotime(secs) {
    var t=new Date(1970, 0, 1);
    t.setSeconds(secs);
    var s=t.toTimeString().substr(0, 8);
    if (secs > 86399) s=Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
    return s;
}
function instanciaCadastrado(){
    swal({
        title: "Instancia Cadastrado!",
        text: "O novo instancia foi criado com sucesso!",
        type: "success",
        confirmButtonColor: "#1ab394",
        confirmButtonText: "Ok",
        closeOnConfirm: true
    },function(){
        $(location).prop('href', 'lista-instancias.php');
    });
    setTimeout(function(){
        swal.close();
        $(location).prop('href', 'lista-instancias.php');
    },4000);
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

var DateDiff = {

    inMinutes: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(60*1000));
    },

    inHours: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(3600*1000));
    },
    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000));
    },

    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    },

    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}

function checkDataHora() {
    var agendados=[];
    var novosAgendamentos=[];
    agendados=getAgendados();
    //console.log('Agendados');
    //console.log(agendados);
    novosAgendamentos=getNovos();
    //console.log('Novos');
    //console.log(novosAgendamentos);
    var livre=0;
    aDays=["U", "M", "T", "W", "H", "F", "S"];
    var _date_ini=$('#data_ini').val().split('/');
    var date_ini=_date_ini[2] + '-' + _date_ini[1] + '-' + _date_ini[0];
    var _date_end=$('#data_end').val().split('/');
    var date_end=_date_end[2] + '-' + _date_end[1] + '-' + _date_end[0];
    var isRecursive=Boolean(checkRepeatDate());


    var timeInit=parseInt(new Date(date_ini + ' ' + $('.time_ini input').val()).getTime());

    if(isRecursive) {
        var timeEnd = parseInt(new Date(date_ini + ' ' + $('.time_end input').val()).getTime());
    }else{
        var timeEnd = parseInt(new Date(date_end + ' ' + $('.time_end input').val()).getTime());
    }
    var d1 = new Date(timeInit);
    var d2 = new Date(timeEnd);

    if(DateDiff.inHours(d1, d2)<0){
        d2 = addDays(new Date(timeEnd),1);
        console.log('NEW: menor que zero');
        //document.write("<br />Number of <b>hours correct</b> since "+dString+": "+DateDiff.inHours(d1, d2));
        console.log('NEW: CORRECT'+DateDiff.inHours(d1, d2));
    }

    var currentDate=new Date();

    if (timeInit > currentDate && timeInit < timeEnd) {
        console.log('NEW: DATA OK '+timeInit + '<' + timeEnd);
        console.log('NEW: TOTAL: '+ parseInt(timeInit - timeEnd));
    }else{
        if(!isRecursive) {
            console.log('data inicial anterior a final');
            $('.msg_selecione_data_posterior').show();
            $('.bt_addAgendamento').hide();
            setTimeout(function () {
                $('.msg_selecione_data_posterior').hide();
            }, 15000);
            return false;
        }else{
            if(timeInit < currentDate){
                console.log('data inicial anterior a final');
                $('.msg_selecione_data_posterior').show();
                $('.bt_addAgendamento').hide();
                setTimeout(function () {
                    $('.msg_selecione_data_posterior').hide();
                }, 15000);
                return false;
            }else{
                $('.msg_selecione_data_posterior').hide();
            }
        }
    }
    console.log('NEW: HORAS-> '+DateDiff.inHours(d1, d2));
    var horas = DateDiff.inHours(d1,d2);
    var minutos = DateDiff.inMinutes(d1,d2);
console.log(minutos);
    if (horas < 24 && horas >= 0 && minutos>0) {
        $('.bt_addAgendamento').show();
        $('.msg_agendamento').hide();
        $('.msg_horas').hide();
        $('.msg_agendamento_simples').hide();
        for (ng=0; ng < novosAgendamentos.Start.length; ng++) {
            var dayN=aDays[new Date(novosAgendamentos.Start[ng]).getDay()];
            //console.log(dayN);
            var startN=novosAgendamentos.Start[ng];
            var endN=novosAgendamentos.End[ng];
            for (ag=0; ag <agendados.Start.length; ag++) {
                //console.log('Agendado Start ' + ag + ': ' + agendados.Start[ag] + ' - End ' + ag + ': ' + agendados.End[ag]+', '+aDays[new Date(agendados.Start[ag]).getDay()]);
                //console.log('Novo Start ' + startN + ' - End ' + endN+', '+dayN);
                if (dateRangeOverlaps(agendados.Start[ag], agendados.End[ag], aDays[new Date(agendados.Start[ag]).getDay()], startN, endN, dayN)) {
                    console.log('data sobreposta');
                    livre++;
                } else {
                    console.log('data livre');
                    livre=livre;
                }
            }
        }
        //console.log(livre);
        if (livre > 0 && isRecursive) {
            var heading='Sobreposição de Agendamento';
            var info='Já existe um ou mais agendamentos para o horário selecionado. No caso de sobreposição de agendamento será registrado somente o primeiro horário, os sobrepostos serão descartados e os demais registrados como novos.';
            infoBox(heading, info);

            return true;
        } else if (livre > 0 && !isRecursive) {
            $('.msg_agendamento_simples').show();
            $('.bt_addAgendamento').hide();
            setTimeout(function () {
                $('.msg_agendamento_simples').hide();
            }, 15000);
            return false;
        }
    } else {
        //console.log('Recursivos? R:'+isRecursive);
        if(!isRecursive){
            console.log('selecione recursivos');
            $('.msg_selecione_data').show();
            setTimeout(function () {
                $('.msg_selecione_data').hide();
            }, 15000);
            $('.bt_addAgendamento').hide();
            return false;
        }else {
            console.info('Mais de 4 horas*');
            $('.msg_horas').show();
            $('.bt_addAgendamento').hide();
            setTimeout(function () {
                $('.msg_horas').hide();
            }, 15000);
            return false;
        }
    }
}

function getAgendados() {
    var datasAgendadas=[];
    var Datas=[];
    Datas.Start=[];
    Datas.End=[];
    aDays=["U", "M", "T", "W", "H", "F", "S"];
    n=0;
    $("input[name='startDates[]']").each(function () {
        datasAgendadas[n]=[];
        datasAgendadas[n].dateStart=[];
        datasAgendadas[n].dateEnd=[];
        var agHourStart=$($("input[name='startDates[]']")[n]).val().split(' ');
        var agHourEnd=$($("input[name='endDates[]']")[n]).val().split(' ');
        var isRecursive=$($("input[name='recurviseDates[]']")[n]).val();
        var agDayWeek=$($("input[name='dayRecursion[]']")[n]).val().replace('[', '').replace(']', '').split(',');
        //console.log("DATA AGENDADA: "+agHourStart[0]);
        if (isRecursive==1) {
            for (dw=0; dw <agDayWeek.length; dw++) {
                //console.log(agDayWeek[dw]);
                //console.log('CalcSchedule(['+agHourStart[0]+'], '+agHourStart[0]+', '+agHourEnd[0]+', \'Weekly\', '+agDayWeek[dw]+')');
                var dates=CalcSchedule([agHourStart[0]], agHourStart[0], agHourEnd[0], 'Weekly', agDayWeek[dw]);
                //console.log(dates);
                for (d=0; d < dates.length; d++) {
                    //datasAgendadas.push(dates[d]);
                    var dateObj = new Date(dates[d]);
                    var month = dateObj.getUTCMonth() + 1; //months from 1-12
                    var day = dateObj.getUTCDate();
                    var year = dateObj.getUTCFullYear();
                    //console.log('Adicionado Agendamento: '+year + '-' + month + '-' + day + ' ' + agHourStart[1]);
                    datasAgendadas[n].dateStart.push(year + '-' + month + '-' + day + ' ' + agHourStart[1]);
                    datasAgendadas[n].dateEnd.push(year + '-' + month + '-' + day + ' ' + agHourEnd[1]);
                }
            }
        } else {
            var dateObjS = new Date(agHourStart[0]+' '+agHourStart[1]);
            var monthS = dateObjS.getUTCMonth() + 1; //months from 1-12
            var dayS = dateObjS.getUTCDate();
            var yearS = dateObjS.getUTCFullYear();
            var dateObjE = new Date(agHourEnd[0]+' '+agHourEnd[1]);
            var monthE = dateObjE.getUTCMonth() + 1; //months from 1-12
            var dayE = dateObjE.getUTCDate();
            var yearE = dateObjE.getUTCFullYear();
            datasAgendadas[n].dateStart=[yearS + '-' + monthS + '-' + dayS + ' ' + agHourStart[1]];
            datasAgendadas[n].dateEnd=[yearE + '-' + monthE + '-' + dayE + ' ' + agHourEnd[1]];
        }
        n++;
    });
    for (da=0; da < datasAgendadas.length; da++) {
        for (dt=0; dt < datasAgendadas[da].dateStart.length; dt++) {
            Datas.Start.push(datasAgendadas[da].dateStart[dt]);
            Datas.End.push(datasAgendadas[da].dateEnd[dt]);
        }
    }
    return Datas;
}

function getNovos() {
    var datesN=[];
    var datasNovas=[];
    var Datas=[];
    //console.log(Datas);
    Datas.Start=[];
    Datas.End=[];

    var isRecursive=Boolean(checkRepeatDate());
    aDays=["U", "M", "T", "W", "H", "F", "S"];
    var _date_ini=$('#data_ini').val().split('/');
    var date_ini=_date_ini[2] + '-' + _date_ini[1] + '-' + _date_ini[0] + ' ' + $('.time_ini input').val();
    var _date_end=$('#data_end').val().split('/');
    var date_end=_date_end[2] + '-' + _date_end[1] + '-' + _date_end[0] + ' ' + $('.time_end input').val();
    n=0;
    datasNovas[n]=[];
    datasNovas[n].dateStart=[];
    datasNovas[n].dateEnd=[];
    if (isRecursive== 1) {
        console.log('Nova Data Recursiva');
        //console.log($('.recursiveDate:checked').length);
        $('.recursiveDate:checked').each(function () {
            //	console.log($(this));
            var dia_recursao='';
            diaRecursao=$(this).attr('id').split('_');

            dia_recursao=diaRecursao[1];
            //console.log('DIA RECURSÃO: '+dia_recursao);
            //	console.log('CalcSchedule(['+date_ini+'], '+date_ini+', '+date_end+', \'Weekly\', '+dia_recursao+');');

            datesN=CalcSchedule([date_ini], date_ini, date_end, 'Weekly', dia_recursao);
            //console.log(CalcSchedule([date_ini], date_ini, date_end, 'Weekly', dia_recursao));
            //	console.log(datesN);
            for (d=0; d < datesN.length; d++) {
                //datasAgendadas.push(dates[d]);
                //console.log(datesN[d]);
                var dateObj = new Date(datesN[d]);
                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();

                newdate = year + "/" + month + "/" + day;
                //console.log('Data Adicionada:'+year + '-' + month + '-' + day + ' ' + $('.time_ini input').val());
                datasNovas[n].dateStart.push(year + '-' + month + '-' + day + ' ' + $('.time_ini input').val());
                datasNovas[n].dateEnd.push(year + '-' + month + '-' + day + ' ' + $('.time_end input').val());
            }
        });
    } else {
        console.log('Nova Data Não Recursiva');
        var dateObj = new Date(date_ini);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        datasNovas[n].dateStart=[year + '-' + month + '-' + day + ' ' + $('.time_ini input').val()];
        datasNovas[n].dateEnd=[year + '-' + month + '-' + day + ' ' + $('.time_end input').val()];
    }
    n++;
    for (da=0; da < datasNovas.length; da++) {
        for (dt=0; dt < datasNovas[da].dateStart.length; dt++) {
            Datas.Start.push(datasNovas[da].dateStart[dt]);
            Datas.End.push(datasNovas[da].dateEnd[dt]);
        }
    }
    //console.log(Datas);
    return Datas;
}

function checkRepeatDate() {
    ($('#repeat_M').is(':checked')) ? repeat_M=1 : repeat_M=0;
    ($('#repeat_T').is(':checked')) ? repeat_T=1 : repeat_T=0;
    ($('#repeat_W').is(':checked')) ? repeat_W=1 : repeat_W=0;
    ($('#repeat_H').is(':checked')) ? repeat_H=1 : repeat_H=0;
    ($('#repeat_F').is(':checked')) ? repeat_F=1 : repeat_F=0;
    ($('#repeat_S').is(':checked')) ? repeat_S=1 : repeat_S=0;
    ($('#repeat_U').is(':checked')) ? repeat_U=1 : repeat_U=0;
    var totalSchedule=parseInt(repeat_M + repeat_T + repeat_W + repeat_H + repeat_F + repeat_S + repeat_U);
    if (totalSchedule > 0) {
        var value=true;
    }
    else {
        var value=false;
    }
    return value;
}

function CalcSchedule(paCal, pdtStart, pdtEnd, pstrRecurr, pstrDays) {
    //console.log('Recursive DayWeek:'+pstrDays);
    var myDates='';
    pdtStart=new Date(new Date(pdtStart).getUTCFullYear(), new Date(pdtStart).getUTCMonth(), new Date(pdtStart).getUTCDate(), 0, 0, 0, 0);
    pdtEnd=new Date(new Date(pdtEnd).getUTCFullYear(), new Date(pdtEnd).getUTCMonth(), new Date(pdtEnd).getUTCDate(), 0, 0, 0, 0);
    var values=[];
    //Calculated values
    dtCurr=pdtStart;
    aDays=[strstr(pstrDays, "U"), strstr(pstrDays, "M"), strstr(pstrDays, "T"), strstr(pstrDays, "W"), strstr(pstrDays, "H"), strstr(pstrDays, "F"), strstr(pstrDays, "S")];
    while (dtCurr <= pdtEnd) {
        if (pstrRecurr== "Yearly" || pstrRecurr== "Monthly" || pstrRecurr== "Quarterly") {
            //These assume that the first date is the startdate
            paCal[paCal.length]=dtCurr;
            switch (pstrRecurr) {
                //Monthly,Yearly,Quarter all push the date ahead by their increment.
                case "Monthly":
                    //dtCurr=mktime(0, 0, 0, 1 + date("m", dtCurr), date("d", dtCurr), date("Y", dtCurr));
                    dtCurr=new Date(new Date(dtCurr).getUTCFullYear(), new Date(dtCurr).getUTCMonth() + 1, new Date(dtCurr).getUTCDate(), 0, 0, 0, 0);
                    break;
                case "Yearly":
                    //dtCurr=mktime(0, 0, 0, date("m", dtCurr), date("d", dtCurr), 1 + date("Y", dtCurr));
                    dtCurr=new Date(new Date(dtCurr).getUTCFullYear() + 1, new Date(dtCurr).getUTCMonth(), new Date(dtCurr).getUTCDate(), 0, 0, 0, 0);
                    break;
                case "Quarterly":
                    //dtCurr=mktime(0, 0, 0, 3 + date("m", dtCurr), date("d", dtCurr), date("Y", dtCurr));
                    dtCurr=new Date(new Date(dtCurr).getUTCFullYear(), new Date(dtCurr).getUTCMonth() + 3, new Date(dtCurr).getUTCDate(), 0, 0, 0, 0);
                    break;
                default:
                    dtCurr=pdtEnd;
            }
            myDates=dtCurr;
        } else {
            //These recurrence types require that every day be analyzed.
            bolAddDate=false;
            bolValidDay=false;
            var days=['U', 'M', 'T', 'W', 'H', 'F', 'S'];
            if (days[new Date(dtCurr).getUTCDay()]== pstrDays) {
                bolValidDay=true;
            } else {
                bolValidDay=false;
            }
            intWeekOfMonth=OccurrenceInMonth(dtCurr);
            switch (pstrRecurr) {
                case "Weekly":
                case "Daily":
                    bolAddDate=(bolValidDay);
                    break;
                case "1st Week":
                    bolAddDate=(bolValidDay && intWeekOfMonth== 1);
                    break;
                case "2nd Week":
                    bolAddDate=(bolValidDay && intWeekOfMonth== 2);
                    break;
                case "3rd Week":
                    bolAddDate=(bolValidDay && intWeekOfMonth== 3);
                    break;
                case "4th Week":
                    bolAddDate=(bolValidDay && intWeekOfMonth== 4);
                    break;
                case "1st and 3rd":
                    bolAddDate=(bolValidDay && (intWeekOfMonth== 1 || intWeekOfMonth== 3));
                    break;
                case "2nd and 4th":
                    bolAddDate=(bolValidDay && (intWeekOfMonth== 2 || intWeekOfMonth== 4));
                    break;
            }
            //Save the date.
            //echo date("l dS of F Y h:i:s A",dtCurr)."   Valid Day:".bolValidDay."    AddDate:".bolAddDate."    WeekOfMonth: ".intWeekOfMonth." <BR>";
            if (bolAddDate && (dtCurr <= pdtEnd)) {
                paCal[paCal.length]=dtCurr;
            }
            if (bolAddDate== 1 && pstrRecurr != 'Daily') {
                myDates=dtCurr;
            }
            //} else {
            //myDates=dtCurr;
            //}
            dtCurr=new Date(new Date(dtCurr).getUTCFullYear(), new Date(dtCurr).getUTCMonth(), new Date(dtCurr).getUTCDate() + 1, 0, 0, 0, 0);
            //dtCurr=mktime(0, 0, 0, date("m", dtCurr), 1 + date("d", dtCurr), date("Y", dtCurr));
        }

        if (typeof myDates !== '') {
            if(myDates!='') {
                values.push(myDates);
            }
        }
    }

    return unique(values);
}

function strstr(haystack, needle, bool) {
    var pos=0;
    haystack += "";
    pos=haystack.indexOf(needle);
    if (pos== -1) {
        return '';
    } else {
        if (bool) {
            return haystack.substr(0, pos);
        } else {
            return haystack.slice(pos);
        }
    }
}

/***********************************************
 * Funcao: OccurrenceInMonth(pdtDate)
 * Autor: Gian Folli
 * Objetivo:  Determinar quantas vezes o dia selecionado ocorre no mes.
 * Argumentos:
 *  pdtDate   -- Data para analise
 * Return: Numero de ocorrencias da data. 1-5
 ***********************************************/
function OccurrenceInMonth(pdtDate) {
    var days=['U', 'M', 'T', 'W', 'H', 'F', 'S'];
    pdtDate=new Date(new Date(pdtDate).getUTCFullYear(), new Date(pdtDate).getUTCMonth(), new Date(dtCurr).getUTCDate(), 0, 0, 0, 0);
    intWeekDay=days[new Date(pdtDate).getUTCDay()];
    //Find the first occurrence of this day from the month start.
    dtCurr=new Date(new Date(pdtDate).getUTCFullYear(), new Date(pdtDate).getUTCMonth(), 1, 0, 0, 0, 0);
    while (days[new Date(dtCurr).getUTCDay()] != intWeekDay) {
        dtCurr=new Date(new Date(dtCurr).getUTCFullYear(), new Date(dtCurr).getUTCMonth(), new Date(dtCurr).getUTCDate() + 1, 0, 0, 0, 0);
    }
    //Find which occurrence this day is
    intOccur=1;
    while (dtCurr < pdtDate) {
        intOccur++;
        dtCurr=new Date(new Date(dtCurr).getUTCFullYear(), new Date(dtCurr).getUTCMonth(), new Date(dtCurr).getUTCDate() + 7, 0, 0, 0, 0);
    }
    return intOccur;
}

function unique(array) {
    return array.filter(function (el, index, arr) {
        return index== arr.indexOf(el);
    });
}

function dateRangeOverlaps(a_start, a_end, day_w_start, b_start, b_end, day_w_end) {
    if (a_start <= b_start && b_start <= a_end && day_w_start== day_w_end) return true; // b starts in a
    if (a_start <= b_end && b_end <= a_end && day_w_start== day_w_end) return true; // b ends in a
    if (b_start <a_start && a_end < b_end && day_w_start== day_w_end) return true; // a in b
    return false;
}

function getAgendamentos() {
    console.log('resgata agendamentos');
    var idAgendamentos='';
    var datesStart='';
    var datesEnd='';
    var datesRecursion='';
    var recurviseDates='';
    var count=$("input[name='startDates[]']").length;
    console.log('total agendamentos: ' + count);
    if (count== 0) {
        datesStart='';
        datesEnd='';
        idAgendamentos='';
    }
    else {
        var i=0;
        $("input[name='idAgendamento[]']").each(function () {
            if (i== 0) {
                idAgendamentos=$(this).val();
            }
            else {
                idAgendamentos=idAgendamentos + ',' + $(this).val();
            }
            i++;
        });
        var s=0;
        $("input[name='startDates[]']").each(function () {
            if (s== 0) {
                datesStart=$(this).val();
            }
            else {
                datesStart=datesStart + ',' + $(this).val();
            }
            s++;
        });
        var e=0;
        $("input[name='endDates[]']").each(function () {
            if (e== 0) {
                datesEnd=$(this).val();
            }
            else {
                datesEnd=datesEnd + ',' + $(this).val();
            }
            e++;
        });
        var r=0;
        $("input[name='dayRecursion[]']").each(function () {
            if (r== 0) {
                datesRecursion=$(this).val();
            }
            else {
                datesRecursion=datesRecursion + ',' + $(this).val();
            }
            r++;
        });
        var rd=0;
        $("input[name='recurviseDates[]']").each(function () {
            if (rd== 0) {
                recurviseDates=$(this).val();
            }
            else {
                recurviseDates=recurviseDates + ',' + $(this).val();
            }
            rd++;
        });
    }
    console.log('starts: ' + datesStart);
    console.log('ends: ' + datesEnd);
    console.log('days_recursions: ' + datesRecursion);
    $('#datesStart').val(datesStart);
    $('#datesEnd').val(datesEnd);
    $('#idAgendamentos').val(idAgendamentos);
    $('#datesRecursion').val(datesRecursion);
    $('#recurviseDates').val(recurviseDates);
}

function checkDates(date1, date2, modal) {
    console.log('date1:' + date1);
    console.log('date2:' + date2);
    var date_ini=new Date(date1).getTime();
    var date_end=new Date(date2).getTime();
    console.error(date_end);
    if (isNaN(date_ini)) {
        console.log('error in date_ini');
        return false;
    }
    if (isNaN(date_end)) {
        console.log('error in date_end');
        return false;
    }
    if (date_ini > date_end || date_ini== date_end) {
        $(modal).modal('show');
        setTimeout(function () {
            $(modal).modal('hide')
        }, 3000);
        return false;
    }
    else {
        return true;
    }
}