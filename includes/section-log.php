<?php

$lastLogs=$logs->getLast3Modifications();
//Util::print_rr($lastLogs);


?><div class="row">
    <div class="col-lg-8">
        <div class="ibox float-e-margins">
            <div class="ibox-title">
                <h5>Alterações <small>(3)</small></h5>
                <div class="ibox-tools">
                    <a class="collapse-link">
                        <i class="fa fa-chevron-up"></i>
                    </a>
                </div>
            </div>
            <div class="ibox-content">
                <ul class="lista-log-alteracoes">
                    <?php for($l=0;$l<count($lastLogs);$l++){
                        $date=$lastLogs[$l]['data'];
                        ?>
                    <li><?php echo $lastLogs[$l]['nome']; ?>, <?php // echo strtolower(Util::nome_diaSemana(date('N', strtotime($date)))); ?> <span><?php echo date('d', strtotime($date)).' de '.Util::nome_meses(date('m', strtotime($date))).' '.date('Y', strtotime($date)).' - '.date('H:i', strtotime($date)); ?></span> - <?php echo $lastLogs[$l]['tipo']; ?></li>
                    <?php } ?>
                </ul>
            </div>
        </div>
    </div><!--/col-->
</div>