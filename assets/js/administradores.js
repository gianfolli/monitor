/*
 ****************************************************************
 * WebRadios - Cross Host - 2017
 * Programacao: Gian Folli
 * Design: Gian Folli / Halyson Brito
 ****************************************************************
 */
$(document).ready(function(){


    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    $.validator.setDefaults({
        submitHandler: function () {
            $('#saida').fadeIn();
            $('#saida').html('Salvando...');
            $('input[type="submit"]').prop("disabled",true);
            $.ajax({
                type: "POST",
                url: 'acoes.php',
                data: {
                    acao: 'edita_email_senha',
                    id_user: $('#id_user').val(),
                    nome: $('#nome').val(),
                    email: $('#email').val(),
                    senha: $('#senha').val()
                },
                success: function (data) {
                    $('#saida').html(data);
                }
            });
            return false;
        }
    });
    $("#formMinhaConta .bt_cancelar").on("click", function (e) {
        window.location='index.php';
    });
    $("#formMinhaConta").validate({
        errorClass: "has-error",
        rules: {
            nome: {
                required: true,
                minlength: 2
            },
            senha: {
                required: passwordRequired,
                //required: true,
                minlength: 5
            },
            confirma_senha: {
                required: passwordRequired,
                minlength: 5,
                equalTo: "#senha"
            }
        },
        messages: {
            nome: "Por favor digite nome e sobrenome",
            email: "Por favor digite um e-emails válido",
            senha: {
                required: "Por favor digite uma senha",
                minlength: "Sua senha deverá ter no mínimo 5 caracteres"
            },
            confirma_senha: {
                required: "Por favor digite uma senha",
                minlength: "Sua senha deverá ter no mínimo 5 caracteres",
                equalTo: "A confirmação de senha deve ser igual a senha digitada acima"
            },
        },
        highlight: function (element) {
            $(element).closest("div").prev().closest("div").addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest("div").prev().closest("div").removeClass('has-error');
        },
    });

    $.validator.setDefaults({
        submitHandler: function() {
            $.ajax({
                type: "POST",
                url: 'pass.php',
                data:{
                    acao: 'mudarSenha'
                    ,hash:$('#hash').val()
                    ,email:$('#email').val()
                    ,senha:$('#senha').val()
                },
                success: function(data){
                    if(data!='erro'){
                        $('#saida').html(data);
                    }else{
                        $('#saida').html('<p class="alert alert-danger" role="alert"><strong>Um erro ocorreu!</strong><br />Não foi possivel alterar a senha. Tente novamente clicando em "Reenviar email de redefinição"</p>');
                    }
                }
            });
        }
    });

    $("#alteraSenha").validate({
        errorClass:"has-error",
        rules: {
            senha: {
                required: passwordRequired2,
                required: true,
                minlength: 5
            },
            confirma_senha: {
                required: passwordRequired2,
                minlength: 5,
                equalTo: "#senha"
            },
        },
        messages: {
            senha: {
                required: "Por favor digite uma senha",
                minlength: "Sua senha deverá ter no mínimo 5 caracteres"
            },
            confirma_senha: {
                required: "Por favor digite uma senha",
                minlength: "Sua senha deverá ter no mínimo 5 caracteres",
                equalTo: "A confirmação de senha deve ser igual a senha digitada acima"
            },
        },
        highlight: function(element) {
            $(element).closest("div").prev().closest("div").addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest("div").prev().closest("div").removeClass('has-error');
        },
    });

    $.validator.setDefaults({
        submitHandler: function() {
            $.ajax({
                type: "POST",
                url: 'pass.php',
                dataType: "json",
                data:{
                    acao: 'emailSenha'
                    ,email:$('#email').val()
                },
                success: function(data){
                    if(typeof (data.success)!=='undefined'){
                        $('#saida').html('<p class="alert alert-success" role="alert"><strong>E-email enviado!</strong><br />Você receberá em instantes um e-email com o link para redefinir sua senha.</p>\
						<script language= "JavaScript">\
						setTimeout(function(){\
			   location.href="login.php";\
			}, 4000);\
			</script>');
                    }else{
                        $('#saida').html('<p class="alert alert-danger" role="alert"><strong>Um erro ocorreu!</strong><br />Não foi possivel enviar o email para este usuário ou o email não existe.</p>');
                    }
                }
            });
        }
    });

    $("#formSenha").validate({
        errorClass:"has-error",
        rules: {
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            email: "Por favor digite um e-emails válido",
        },
        highlight: function(element) {
            $(element).closest("div").prev().closest("div").addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest("div").prev().closest("div").removeClass('has-error');
        },
    });

    function passwordRequired2() {
        return $('#senha').val().length > 0;
    }

    $('input[type="submit"]').prop("disabled",false);

    if($("#formAdministrador").attr('data-form')=='create'){
        var action='cria_administrador';
    }else{
        var action='edita_administrador';
    }

   /* $('form').on('submit', function(e){
            e.preventDefault();
    });*/

    $.validator.setDefaults({
        submitHandler:function(){

            $('html, body').animate({
                scrollTop: $("#saida").offset().top
            }, 500);
            //$('input[type="submit"]').prop("disabled",true);
            ($('#informacoes').is(':checked')) ? informacoes = 1 : informacoes = 0;
            console.log(informacoes);
            ($('#statusadministrador').is(':checked')) ? statusadministrador = 1 : statusadministrador = 0;
              $.ajax({
                type:"POST",
                url:'acoes.php',
                data:{
                    acao:action,
                    id_user:$('#id_user').val(),
                    nome:$('#nome').val(),
                    email:$('#email').val(),
                    senha:$('#senha').val(),
                    tipoadministrador:$('#tipoAdministrador').val(),
                    statusadministrador:statusadministrador,
                    informacoes:informacoes,
                },
                success:function(data){
                    $('#saida').html(data);
                }
            });
        }
    });
    // validate signup form on keyup and submit
    function passwordRequired(){
        if($("#formAdministrador").attr('data-form')=='create'){
            return true;
        }
        else{
            return $('#senha').val().length>0;
        }
    }
    $("#formAdministrador").validate({
        errorClass:"has-error help-block m-b-none",
        rules:{
            nome:{
                required:true,
                minlength:2
            },
            email:{
                required:true,
                email:true
            },
            senha:{
                required:passwordRequired,
                //required: true,
                minlength:5
            },
            confirma_senha:{
                required:passwordRequired,
                minlength:5,
                equalTo:"#senha"
            }
        },
        messages:{
            nome:"Insira nome e sobrenome do usuário",
            email:"Por favor digite um e-emails válido<br>Esse e-emails será usado como login e para recuperação de senha",
            senha:{
                required:"Por favor digite uma senha<br>A senha poderá ser alterada pelo usuário após o primeiro login",
                minlength:"Sua senha deverá ter no mínimo 5 caracteres"
            },
            confirma_senha:{
                required:"Por favor digite uma senha",
                minlength:"Sua senha deverá ter no mínimo 5 caracteres",
                equalTo:"A confirmação de senha deve ser igual a senha digitada acima"
            },
        },
        highlight:function(element){
            $(element).closest("div").prev().closest("div").addClass('has-error');
            $('input[type="submit"]').prop("disabled",false);
        },
        unhighlight:function(element){
            $(element).closest("div").prev().closest("div").removeClass('has-error');
            $('input[type="submit"]').prop("disabled",false);
        },
    });
    var grid=$("#administradores").bootgrid({
        //columnSelection:true,

        ajax:true,
        rowCount:[25, 50, 75, 100],
        type:"POST",
        url:"acoes.php",
        templates:{
            actionButton:'' +
            '<button class="btn btn-default" type="button" title="{{ctx.text}}">{{ctx.content}}</button>'
            ,header:'<div id="{{ctx.id}}" class="{{css.header}}"><div class="row"><div class="col-sm-12 actionBar"><p class="{{css.search}}"></p><p class="{{css.actions}}"></p></div></div>' +
            '<div class="row"><div class="col-sm-12 infos"><p class="{{css.infos}}"></p></div></div>'
            ,headerCell:'<th data-column-id="{{ctx.column.id}}" class="{{ctx.css}}" style="{{ctx.style}}"><a href="javascript:void(0);" class="{{css.columnHeaderAnchor}} {{ctx.sortable}}"><span class="{{css.columnHeaderText}}">{{ctx.column.text}}</span>{{ctx.icon}}</a></th>'
            ,footer:'<div id="{{ctx.id}}" class="{{css.footer}}"><div class="row"><div class="col-sm-12 text-right no_padding"><p class="{{css.pagination}}"></p></div></div></div>'
        }
       , requestHandler:function(request){
            request.acao='list_administradores';
            request.data=$('.date input').val();
            request.time_ini=$('#time_ini').val();
            request.time_end=$('#time_end').val();
            request.diretorio=$('.selecao-radio').val();
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
                return row.nome+'<span class="line-options"><a href="administrador.php?user='+row.id+'" data-toggle="tooltip" data-placement="top" title="Editar">Ver</a> | <a href="javascript:void(0);" class="excluir-administrador" data-user="'+row.nome+'" id="'+row.id+'" data-toggle="tooltip" data-placement="top" title="Excluir">Excluir</a></span>';
            },
            "ultimoAcesso":function(column, row){
                if(row.ULTIMOACESSO){
                    var _data=row.ULTIMOACESSO.split(' ');
                    var data=_data[0].split('-');
                    var horario=_data[1].split(':');
                    return '<span class="tempo">'+data[2]+'/'+data[1]+'/'+data[0]+' às </i> '+horario[0]+':'+horario[1]+'</span>';
                }
            },
            "numAcessos":function(column, row){
                return '<a href="javascript:void(0);" data-acesso="'+row.id+'" data-nome="'+row.nome+'" data-toggle="modal" data-target="#modal-lista-acessos" data-remote="false" title="Acessos do Usuário" data-original-title="Acessos do Usuário" class="acessos">'+row.NUMACESSOS+'</a>';
            },
            "status":function(column, row){
                if(row.status=='1'){
                    return 'Ativo';
                }else{
                    return 'Suspenso';
                }

            },
            "opcoes":function(column, row){
                return '<a href="editar-administrador.php?user='+row.id+'" data-toggle="tooltip" data-placement="top" title="Editar">\
<i class="fa fa-edit" aria-hidden="true"> </i>\
</a> \
<a href="javascript:void(0);" class="excluir-administrador" data-user="'+row.NOME+'" id="'+row.id+'" data-toggle="tooltip" data-placement="top" title="Excluir">\
<i class="fa fa-trash" aria-hidden="true"> </i>';
            },

        }
        ,statusMapping: {
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
        grid.find(".acessos").on("click", function(e){
            $.ajax({
                type:"POST",
                url:'acoes.php',
                data:{
                    acao:'list_acessosByID',
                    idUsuario:$(this).attr('data-acesso')
                },
                success:function(data){
                    $('.modal-body').html(data);
                    $('.nomeUsuario').html($(this).attr('data-nome'));
                }
            });
            $("#modal-lista-acessos").modal('show');
        });
        grid.find(".excluir-administrador").on("click", function(e){
            // get txn id from current table row
            var nome=$(this).attr('data-user');
            var id=$(this).attr('id');
            var heading='Atenção!';
            var question='<strong>Tem certeza que deseja excluir o administrador '+nome+'?</strong>';
            var cancelButtonTxt='Cancelar';
            var okButtonTxt='Excluir';
            var callbackConfirm=function(){
                $.ajax({
                    type:"POST",
                    url:'acoes.php',
                    data:{
                        acao:'delete_administrador',
                        id_user:id
                    },
                    success:function(data){
                        $('#saida').html(data);
                        $('#administradores').bootgrid('reload');
                        swal("Usuário Excluído!", "O usuário foi removido com sucesso"+data, "success");
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
    $('#formAdministrador .bt_cancelar').on("click", function(e){
        window.location='lista-administradores.php';
    });

    $('#formMinhaConta .bt_cancelar').on("click", function(e){
        window.location='index.php';
    });

    $('.btn-novo').on('click',function(){
        window.location='administrador.php';
    });



});

function administradorCadastrado(){
    swal({
        title: "Usuário Cadastrado!",
        text: "O novo usuário foi criado com sucesso!",
        type: "success",
        confirmButtonColor: "#1ab394",
        confirmButtonText: "Ok",
        closeOnConfirm: true
    },function(){
            $(location).prop('href', 'lista-administradores.php');
    });
    setTimeout(function(){
        swal.close();
        $(location).prop('href', 'lista-administradores.php');
    },4000);
}
function contaAlterada(url){
    swal({
        title: "Conta Alterada!",
        text: "A conta foi alterada com sucesso!",
        type: "success",
        confirmButtonColor: "#1ab394",
        confirmButtonText: "Ok",
        closeOnConfirm: true
    },function(){
        $(location).prop('href', url);
    });
    setTimeout(function(){
        swal.close();
        $(location).prop('href', url);
    },4000);
}
function administradorAlterado(){
    swal({
        title: "Usuário Alterado!",
        text: "O usuário foi alterado com sucesso!",
        type: "success",
        confirmButtonColor: "#1ab394",
        confirmButtonText: "Ok",
        closeOnConfirm: true
    },function(){
        $(location).prop('href', 'lista-administradores.php');
    });
    setTimeout(function(){
        swal.close();
        $(location).prop('href', 'lista-administradores.php');
    },4000);
}
function erroEditando(){
    swal({
        title: "Ops! Um erro cocorreu!",
        text: "Não foi possivel realizar a alteração deste usuário.",
        type: "error",
        confirmButtonColor: "#ed5565",
        confirmButtonText: "Ok",
        closeOnConfirm: true
    },function(){
        $('input[type="submit"]').prop("disabled",false);
    });
}
function erroCadastro(){
    swal({
        title: "Ops! Usuário já cadastrado!",
        text: "Não foi possivel realizar o cadastro com este email de usuário.",
        type: "error",
        confirmButtonColor: "#ed5565",
        confirmButtonText: "Ok",
        closeOnConfirm: true
    },function(){
        $('input[type="submit"]').prop("disabled",false);
    });
}
