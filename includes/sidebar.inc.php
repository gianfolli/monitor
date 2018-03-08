<nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav metismenu" id="side-menu">
                <li class="nav-header">
                   <div class="nome-sistema">Web<span>Radio</span></div>
                    <div class="dropdown profile-element">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold"><?php echo $administrador['nome']; ?></strong>
                             </span> <span class="text-muted text-xs block"><?php echo $tipoAdministrador['NOME']; ?><b class="caret"></b></span> </span> </a>
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                               <li><a href="minha-conta.php">Minha Conta</a></li>
                                <li><a href="#">Sair</a></li>
                            </ul>
                    </div>
                    <div class="logo-element">
                        WR
                    </div>
                </li>

                <li<?php if(basename($_SERVER["SCRIPT_FILENAME"], '.php')=='index'){ echo ' class="active"';} ?>>
                    <a href="index.php"><i class="fa fa-tachometer"></i> <span class="nav-label">Dashboard</span></a>
                </li>

                <li<?php if(basename($_SERVER["SCRIPT_FILENAME"], '.php')=='lista-streamings' || basename($_SERVER["SCRIPT_FILENAME"], '.php')=='streaming'){ echo ' class="active"';} ?>>
                    <a href="#"><i class="fa fa-film"></i> <span class="nav-label">Streamings </span><span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level collapse">
                        <li<?php if(basename($_SERVER["SCRIPT_FILENAME"], '.php')=='lista-streamings'){ echo ' class="active"';} ?>><a href="lista-streamings.php">Todos os Streamings</a></li>
                        <li><a href="streaming.php">Adicionar Novo</a></li>
                    </ul>
                </li>

                <li<?php if(basename($_SERVER["SCRIPT_FILENAME"], '.php')=='lista-instancia' || basename($_SERVER["SCRIPT_FILENAME"], '.php')=='streaming'){ echo ' class="active"';} ?>>
                    <a href="#"><i class="fa fa-gears"></i> <span class="nav-label">Instâncias </span><span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level collapse">
                        <li<?php if(basename($_SERVER["SCRIPT_FILENAME"], '.php')=='lista-instancias'){ echo ' class="active"';} ?>><a href="lista-instancias.php">Todos as Instâncias</a></li>
                        <li><a href="streaming.php">Adicionar Nova</a></li>
                    </ul>
                </li>
                <?php if ($_SESSION['permissao']==1){?>
                <li<?php if(basename($_SERVER["SCRIPT_FILENAME"], '.php')=='lista-administradores'){ echo ' class="active"';} ?>>
                    <a href="#"><i class="fa fa-users"></i> <span class="nav-label">Administradores </span><span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level collapse">
                        <li<?php if(basename($_SERVER["SCRIPT_FILENAME"], '.php')=='lista-administradores'){ echo ' class="active"';} ?>><a href="lista-administradores.php">Todos os Administradores</a></li>
                        <li><a href="administrador.php">Adicionar Novo</a></li>
                        <li><a href="minha-conta.php">Minha Conta</a></li>
                    </ul>
                </li>
                <?php } ?>

            </ul>
        </div><!-- /sidebar-collapse -->
            
            <!-- === Assinatura Cross Host === -->
            <div class="crosshost-signature">
                <a href="https://www.crosshost.com.br/" target="_blank">
                <img src="https://www.crosshost.com.br/assets/crosshost-web-signature/logo/branco/crosshost-logo-xs.png" srcset="https://www.crosshost.com.br/assets/crosshost-web-signature/logo/branco/crosshost-logo-xs-1x.png 1x, https://www.crosshost.com.br/assets/crosshost-web-signature/logo/branco/crosshost-logo-xs-2x.png 2x, https://www.crosshost.com.br/assets/crosshost-web-signature/logo/branco/crosshost-logo-xs-3x.png 3x, https://www.crosshost.com.br/assets/crosshost-web-signature/logo/branco/crosshost-logo-xs-4x.png 4x" alt="Cross Host" /></a>
            </div><!-- /signature -->

        
    </nav>