<div class="row border-bottom">
            <nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
                </div>
                <ul class="nav navbar-top-links navbar-right">
                <li>
                    <span class="m-r-sm text-muted welcome-message"><?php echo $nome_da_conta ?></span>
                </li>
                
<!--
                <li class="dropdown">
                    <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#" aria-expanded="false">
                        <i class="fa fa-bell"></i>  <span class="label label-danger">16</span>
                    </a>
                    <ul class="dropdown-menu dropdown-alerts">
                        <li>
                            <a href="#">
                                <div>
                                    <i class="fa fa-envelope fa-fw"></i> Você tem 16 mensagens
                                    <span class="pull-right text-muted small">há 4 minutos</span>
                                </div>
                            </a>
                        </li>
                        <li class="divider"></li>
                        
                        <li>
                            <div class="text-center link-block">
                                <a href="#">
                                    <strong>Ver Todas as Mensagens</strong>
                                    <i class="fa fa-angle-right"></i>
                                </a>
                            </div>
                        </li>
                    </ul>
                </li>
-->


                <li>
                    <a class="logout" data-idCliente="<?php echo $_SESSION['idCliente']; ?>"  data-APIKEY="<?php echo $_SESSION['APIKEY']; ?>">
                        <i class="fa fa-sign-out"></i> Sair
                    </a>
                </li>
            </ul>

            </nav>
        </div>
        
        <!-- === Page-Heading === -->
        <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-10">
                    <h2><?php echo $nome_da_pagina; ?></h2>
                    
                    <!-- === Breadcrumb === -->
                    <ol class="breadcrumb">
                        <li>
                            <a href="#">Início</a>
                        </li>
                        <li>
                            <a href="#">Breadcrumb</a>
                        </li>
                        <li class="active">
                            <strong><?php echo $nome_da_pagina; ?></strong>
                        </li>
                    </ol><!--/breadcrumb-->
                    
                </div>
                <div class="col-lg-2">

                </div>
        </div>