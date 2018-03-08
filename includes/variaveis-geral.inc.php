<?php
include_once "./verifica.php";
// ==== Variáveis Geral  ==== //

// ==== Conta (Cliente)  ==== //
$nome_da_conta = 'Painel Administrativo (Cross Host)';

// ==== Usuário  ==== //
$nome_do_usuario = $_SESSION['nome'];
$email_do_usuario = $_SESSION['email'];
switch($_SESSION['permissao']){
    case 1:
        $nome_permissao='Administrador';
    break;
    case 2:
        $nome_permissao='Suporte';
    break;
}

$nivel_do_usuario = $nome_permissao;


?>