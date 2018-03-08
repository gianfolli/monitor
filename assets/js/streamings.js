/*
 ****************************************************************
 * WebRadios - Cross Host - 2017
 * Programacao: Gian Folli
 * Design: Gian Folli / Halyson Brito
 ****************************************************************
 */
var ports = {};
$(document).ready(function(){


    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });


    $('input[type="submit"]').prop("disabled",false);

    if($("#formStreaming").attr('data-form')=='create'){
        var action='cria_streaming';
    }else{
        var action='edita_streaming';
    }

    $('form').on('submit', function(e){
        e.preventDefault();
    });

    $.validator.setDefaults({
        submitHandler:function(){
            $('input[type="submit"]').prop("disabled",true);

            ($('#status').is(':checked')) ? status = 1 : status = 0;
            var lastLoaded = 0;
            var obj = '';
            var lastResponse='';
            var erros={};
            erros.count=0;
            $.ajax({
                type:"POST",
                url:'acoes.php',
                dataType:'json',
                data:{
                    acao:action
                    ,id:$('#id').val()
                    ,nome:$('#nome').val()
                    ,streaming:$('#streaming').val()
                    ,status:status
                },
                beforeSend: function () {
                    if(action=='cria_usuario') {
                        swal({
                            title: "Cadastrando novo streaming!",
                            text: "Aguarde até o final do processo!",
                            type: "success",
                            showCancelButton: false,
                            showConfirmButton: false
                        });
                    }else{
                        swal({
                            title: "Alterando streaming!",
                            text: "Aguarde até o final do processo!",
                            type: "success",
                            showCancelButton: false,
                            showConfirmButton: false
                        });
                    }
                }
                ,xhrFields: {
                   onprogress: function (e) {
                       console.log(e.currentTarget.response);
                      // console.log(e.currentTarget.response.replace(lastResponse, ''));
                       if (isJsonString(e.currentTarget.response.replace(lastResponse,''))) {
                           var result = JSON.parse( e.currentTarget.response.replace(lastResponse,'').replace(/(\r\n|\n|\r)/gm,"") );
                       }else{
                           var result='';

                       }

                       if (typeof (result.progress) !== 'undefined') {
                               swal({
                                   title: result.progress.title,
                                   html:true,
                                   text: result.progress.message,
                                   type: "success",
                                   showCancelButton: false,
                                   showConfirmButton: false
                               });
                           console.info('Outros');
                       }else if (typeof (result.error) !== 'undefined') {
                           swal({
                               title: result.error.title,
                               html:true,
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
                       lastResponse=e.currentTarget.response;
                    }
                },
                error: function (request, status, error) {
                    $('input[type="submit"]').prop("disabled",false);
                    if(action=='cria_streaming') {
                        if (erros.count == 0) {
                            swal({
                                title: "Streaming Cadastrado!",
                                text: "O novo streaming foi criado com sucesso!",
                                type: "success",
                                confirmButtonColor: "#1ab394",
                                confirmButtonText: "Ok",
                                closeOnConfirm: true
                            }, function () {
                                  $(location).prop('href', 'lista-streamings.php');
                            });
                            setTimeout(function(){
                                swal.close();
                                $(location).prop('href', 'lista-streamings.php');
                            },4000);
                        } else {
                            swal({
                                title: "Ops! Streaming Não Cadastrado!",
                                html: true,
                                text: "Não foi possivel realizar o cadastro deste streaming por haver erros.<br><br>Saída de Erro:<br><pre style='height: 200px; overflow: scroll;'>" + request.responseText.replace('  ', ' ').replace('   ', '') + "<pre>",
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
                    }else{
                        if (erros.count == 0) {
                            swal({
                                title: "Streaming Alterado!",
                                text: "O streaming foi alterado com sucesso!",
                                type: "success",
                                confirmButtonColor: "#1ab394",
                                confirmButtonText: "Ok",
                                closeOnConfirm: true
                            }, function () {
                                  $(location).prop('href', 'lista-streamings.php');
                            });
                            setTimeout(function(){
                                swal.close();
                                $(location).prop('href', 'lista-streamings.php');
                            },4000);
                        } else {
                            swal({
                                title: "Ops! Streaming Não Alterado!",
                                html: true,
                                text: "Não foi possivel realizar a alteração deste streaming por haver erros.<br><br>Saída de Erro:<br><pre style='height: 200px; overflow: scroll;'>" + request.responseText.replace('  ', ' ').replace('   ', '') + "<pre>",
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
                    $('input[type="submit"]').prop("disabled",false);
                        if(erros==0){
                            //console.log(data.success);
                            streamingCadastrado();
                        }else{
                           // console.log(data);
                          //  erroCadastro();
                        }
                }
            });
        }
    });

    $("#formStreaming").validate({
        errorClass:"has-error help-block m-b-none",
        rules:{
            nome:{
                required:true,
                minlength:2
            },
            streaming:{
                required:true,
            },
        },
        messages:{
            nome:"Insira nome e sobrenome do usuário",
            streaming:"Por favor digite um streaming válido",
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



    var grid=$("#streamings").bootgrid({
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
            request.acao='list_streamings';
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
                return row.nome+'<span class="line-options"><a href="streaming.php?streaming='+row.id+'" data-toggle="tooltip" data-placement="top" title="Editar">Editar</a> | <a href="javascript:void(0);" class="excluir-streaming" data-streaming="'+row.nome+'" id="'+row.id+'" data-toggle="tooltip" data-placement="top" title="Excluir">Excluir</a></span>';
            },
            "status":function(column, row){
                if(row.status=='1'){
                    return 'Ativo';
                }else{
                    return 'Suspenso';
                }

            },
            "opcoes":function(column, row){
                return '<a href="editar-streaming.php?user='+row.id+'" data-toggle="tooltip" data-placement="top" title="Editar">\
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
        grid.find(".excluir-streaming").on("click", function(e){
            // get txn id from current table row
            var nome=$(this).attr('data-streaming');
            var id=$(this).attr('id');
            var heading='Atenção!';
            var question='<strong>Tem certeza que deseja excluir o streaming '+nome+'?</strong>';
            var cancelButtonTxt='Cancelar';
            var okButtonTxt='Excluir';
            var callbackConfirm=function(){
                $.ajax({
                    type:"POST",
                    url:'acoes.php',
                    data:{
                        acao:'delete_streaming',
                        id:id
                    },
                    success:function(data){
                        $('#saida').html(data);
                        $('#streamings').bootgrid('reload');
                        swal("Streaming Excluído!", "O streaming foi removido com sucesso"+data, "success");
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
    $('#formStreaming .bt_cancelar').on("click", function(e){
        window.location='./lista-streamings.php';
    });


    $('.btn-novo').on('click',function(){
        window.location='./streaming.php';
    });


});

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


function streamingCadastrado(){
    swal({
        title: "Streaming Cadastrado!",
        text: "O novo streaming foi criado com sucesso!",
        type: "success",
        confirmButtonColor: "#1ab394",
        confirmButtonText: "Ok",
        closeOnConfirm: true
    },function(){
        $(location).prop('href', 'lista-streamings.php');
    });
    setTimeout(function(){
        swal.close();
        $(location).prop('href', 'lista-streamings.php');
    },4000);
}


