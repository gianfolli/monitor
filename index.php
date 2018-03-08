<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="robots" content="noindex">

	<title>Monitor Test</title>
	<link href="assets/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
	<link href="assets/css/jquery-ui.css" rel="stylesheet">
	<link href="assets/fonts/font-awesome/css/font-awesome.css" rel="stylesheet">
	<link href="assets/lib/animate/animate.css" rel="stylesheet">
	<link href="assets/css/style.css" rel="stylesheet">

	<link href="assets/css/main.css" rel="stylesheet">
	<link href="assets/plugins/clockpicker/clockpicker.css" rel="stylesheet">
	<!-- include summernote css/js-->
	<link href="assets/plugins/flowplayer/ch-skin.css" rel="stylesheet">
	<link href="assets/plugins/flowplayer/main.css" rel="stylesheet">
	<link href="assets/plugins/noUiSlider/nouislider.min.css" rel="stylesheet">

	<link href="assets/plugins/jquery-gauge/jquery-gauge.css" rel="stylesheet">
	<style type="text/css">

		.noUi-horizontal .noUi-handle,.noUi-origin,noUi-handle noUi-handle-lower{height:10px !important;}
		.noUi-handle:after,.noUi-handle:before{height:10px !important;}
		.noUi-horizontal .noUi-handle, .noUi-horizontal{ top: -1px !important;}
		.noUi-handle:after, .noUi-handle:before{ top: 0px !important;}

		#valor-temperatura,#valor-humidade,#valor-temp-server,#valor-fisical_memory {
			position: absolute;
			top: 160px;
			left: 10px;
			right: 0;
			text-align: center;
			font-size: 2em;
			font-weight: bold;
			color: black;
			font-family: 'Amaranth', sans-serif;
		}
	</style>
</head>
<body style="overflow: hidden;">
<div id="wrapper">
	<!-- ====================================
	Sidebar
	===================================== --><?php include_once "includes/sidebar.inc.php"; ?>
	<div id="page-wrapper" class="gray-bg">
		<!-- ====================================
		Header
		===================================== --><?php include_once "includes/header.inc.php"; ?>
		<!-- ====================================
		Conteúdo
		===================================== -->
		<div class="wrapper wrapper-content animated fadeInRight">
			<div class="row">
				<div class="col-lg-8">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<h5>Temperatura </h5>
						</div>
						<div class="ibox-content">
							<div id="saida"></div>
							<form id="formMinhaConta" action="" method="" data-form="edit" class="form-horizontal" novalidate="novalidate">
								<!-- ====================================================
								NOTA:
								- Usar classes "has-success" ou "has-error" no input
								para a validação do formulário;
								===================================================== -->
								<input type="hidden" id="id_user" name="id_user" value="<?php echo $administrador['id']; ?>">
								<!-- NOME -->
								<div class="form-group">
									<div class="col-sm-12">
										<div class="col-lg-12">
											<div class="col-lg-4 no-padding text-center">
												<div class="label label-default">Horário do Servidor</div>
												<canvas id="relogio" style="margin-top: 20px" width="170" height="170"></canvas>
												<div id="valor-relogio"></div>
											</div>
											<div class="col-lg-4 no-padding text-center">
												<div class="label label-default">Temperatura</div>
												<canvas id="temperatura" style="margin-top: 20px"></canvas>
												<div id="valor-temperatura"></div>
											</div>
											<div class="col-lg-4 no-padding text-center">
												<div class="label label-default">Humidade</div>
												<canvas id="humidade" style="margin-top: 20px"></canvas>
												<div id="valor-humidade"></div>
											</div>
											<div class="col-lg-12">
												<div class="col-lg-4 no-padding text-center">
													<div class="label label-default">Processamento do Servidor</div>
													<canvas id="processor_server" style="margin-top: 20px" width="200" height="170"></canvas>
													<div id="valor-processor-server"></div>
												</div>
												<div class="col-lg-4 no-padding text-center">
													<div class="label label-default">Temperatura Servidor</div>
													<canvas id="temp_server" style="margin-top: 20px" width="200" height="170"></canvas>
													<div id="valor-temp-server"></div>
												</div>
												<div class="col-lg-4 no-padding text-center">
													<div class="label label-default">Memória Física Servidor</div>
													<canvas id="fisical_memory" style="margin-top: 20px" width="200" height="170"></canvas>
													<div id="valor-fisical_memory"></div>
												</div>

											</div>
										</div>

										<div class="col-lg-12" style="display: none"><div class="col-lg-5 no-padding temperatura"></div><div id="slider-temp" class="no-padding col-lg-7 noUi-target noUi-ltr noUi-horizontal"></div></div>
										<div class="col-lg-12" style="display: none"><div class="col-lg-5 no-padding humidade"></div><div id="slider-humidity" class="no-padding col-lg-7 noUi-target noUi-ltr noUi-horizontal"></div></div>
										<div class="col-lg-12 data" style="display: none"></div>
										<div class="col-lg-12 alert" style="display: none"></div>

									</div>
								</div>
								<!--/nome-->
								<div class="hr-line-dashed"></div>
								<!-- BOTÕES -->
								<div class="form-group">
									<div class="col-sm-4 col-sm-offset-2">
										<button type="button" class="btn btn-w-m btn-default bt_cancelar">Cancelar</button>
									</div>
									<div class="col-sm-4 col-sm-offset-2">
										<input class="btn btn-w-m btn-primary" name="" type="submit" value="Salvar"/>
									</div>
								</div>
								<!--/botoes-->
							</form>
						</div>


						<!--/ibox-content-->
					</div>
					<!--/ibox-->
				</div>
				<!--/col-->
			</div>
			<!--/row-->
		</div>
		<!--/wrapper-content-->
		<!-- ====================================
		Footer
		===================================== --><?php include_once "includes/footer.inc.php"; ?>
	</div>
	<!--/page-wrapper-->
</div>
<!--/wrapper-->


<!-- Mainly scripts -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>


<!--<script src="assets/lib/jquery/jquery-2.1.1.js"></script>
<script src="assets/lib/jquery-ui/jquery-ui-1.10.4.min.js"></script>-->
<script src="assets/lib/bootstrap/bootstrap.min.js"></script>
<script src="assets/plugins/noUiSlider/nouislider.min.js"></script>
<script src="assets/plugins/flowplayer/flowplayer-7.0.1-Comercial.js"></script>
<script src="assets/plugins/flowplayer/flowplayer.hlsjs.min.js"></script>


<!-- Mainly scripts -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>


<!--<script src="assets/lib/jquery/jquery-2.1.1.js"></script>
<script src="assets/lib/jquery-ui/jquery-ui-1.10.4.min.js"></script>-->
<script src="assets/lib/bootstrap/bootstrap.min.js"></script>
<script src="assets/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>

<!-- Custom and plugin javascript -->
<script src="assets/js/inspinia.js"></script>
<script src="assets/plugins/pace/pace.min.js"></script>
<script src="assets/plugins/sweetalert/sweetalert.min.js"></script>
<script src="assets/plugins/iCheck/icheck.min.js"></script>
<script src="assets/plugins/dataTables/datatables.min.js"></script>

<script src="assets/js/jquery.bootgrid.min.js"></script>
<script src="assets/plugins/validate/jquery.validate.min.js"></script>
<script src="assets/plugins/validate/messages_pt_BR.min.js"></script>
<script src="assets/plugins/noUiSlider/nouislider.min.js"></script>


<script src="assets/plugins/gauge/gauge.min.js"></script>

<script src="assets/js/socket.io.js"></script>
<!-- Custom and plugin javascript -->
<script>
	// == i-checks > Checkbox de formulário == //
	$(document).ready(function () {

		function makeLabels(init,end,interval){
			var labels=[];
			for(i=init;i<end;i++){
				if(i%interval==0){
					labels.push(i);
				}
			}
			return labels;
		}
		function getlabels(){
			var labels=[];
			for(i=0;i<102;i++){
				if(i%5==0){
					labels.push(i);
				}
			}
			return labels;
		}
		function getlabelsTemp(){
			var labels=[];
			for(i=0;i<42;i++){
				if(i%2==0){
					labels.push(i);
				}
			}
			return labels;
		}
		function getlabelsTempServer(){
			var labels=[];
			for(i=0;i<82;i++){
				if(i%5==0){
					labels.push(i);
				}
			}
			return labels;
		}
		$('#humidade').css({width:'200px',	height:'170px'});

		var opts = {
			angle: -0.25, // The span of the gauge arc
			lineWidth: 0.11, // The line thickness
			radiusScale: 1, // Relative radius
			pointer: {
				length: 0.65, // // Relative to gauge radius
				strokeWidth: 0.023, // The thickness
				color: '#000000' // Fill color
			},
			limitMax: false,     // If false, max value increases automatically if value > maxValue
			limitMin: false,     // If true, the min value of the gauge will be fixed
			colorStart: '#6FADCF',   // Colors
			colorStop: '#8FC0DA',    // just experiment with them
			strokeColor: '#E0E0E0',  // to see which ones work best for you
			generateGradient: true,
			highDpiSupport: true,     // High resolution support

			percentColors : [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],


			staticLabels: {
				font: "10px sans-serif",  // Specifies font
				labels: getlabels(),  // Print labels at these values
				color: "#000000",  // Optional: Label text color
				fractionDigits: 0,  // Optional: Numerical precision. 0=round off.
			},
//			staticZones: [
//				{strokeStyle: "#F03E3E", min: 100, max: 130}, // Red from 100 to 130
//				{strokeStyle: "#FFDD00", min: 130, max: 150}, // Yellow
//				{strokeStyle: "#30B32D", min: 150, max: 220}, // Green
//				{strokeStyle: "#FFDD00", min: 220, max: 260}, // Yellow
//				{strokeStyle: "#F03E3E", min: 260, max: 300}  // Red
//			],

		};
		var target = document.getElementById('humidade'); // your canvas element
		var humidade = new Gauge(target).setOptions(opts); // create sexy gauge!
		//humidade.setTextField(document.getElementById('valor-humidade'));
		humidade.maxValue = 100; // set max gauge value
		humidade.setMinValue(0);  // Prefer setter over gauge.minValue = 0
		humidade.animationSpeed = 29; // set animation speed (32 is default value)

		$('#temperatura').css({width:'200px',	height:'170px'});
		var opts = {
			angle: -0.25, // The span of the gauge arc
			lineWidth: 0.11, // The line thickness
			radiusScale: 1, // Relative radius
			pointer: {
				length: 0.65, // // Relative to gauge radius
				strokeWidth: 0.023, // The thickness
				color: '#000000' // Fill color
			},
			limitMax: false,     // If false, max value increases automatically if value > maxValue
			limitMin: false,     // If true, the min value of the gauge will be fixed
			colorStart: '#6FADCF',   // Colors
			colorStop: '#8FC0DA',    // just experiment with them
			strokeColor: '#E0E0E0',  // to see which ones work best for you
			generateGradient: true,
			highDpiSupport: true,     // High resolution support

			percentColors : [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],


			staticLabels: {
				font: "10px sans-serif",  // Specifies font
				labels: getlabelsTemp(),  // Print labels at these values
				color: "#000000",  // Optional: Label text color
				fractionDigits: 0,  // Optional: Numerical precision. 0=round off.
			},
//			staticZones: [
//				{strokeStyle: "#F03E3E", min: 100, max: 130}, // Red from 100 to 130
//				{strokeStyle: "#FFDD00", min: 130, max: 150}, // Yellow
//				{strokeStyle: "#30B32D", min: 150, max: 220}, // Green
//				{strokeStyle: "#FFDD00", min: 220, max: 260}, // Yellow
//				{strokeStyle: "#F03E3E", min: 260, max: 300}  // Red
//			],

		};
		var target = document.getElementById('temperatura'); // your canvas element
		var temperatura = new Gauge(target).setOptions(opts); // create sexy gauge!
		//humidade.setTextField(document.getElementById('valor-humidade'));
		temperatura.maxValue = 40; // set max gauge value
		temperatura.setMinValue(0);  // Prefer setter over gauge.minValue = 0
		temperatura.animationSpeed = 29; // set animation speed (32 is default value)

		var opts = {
			angle: -0.25, // The span of the gauge arc
			lineWidth: 0.11, // The line thickness
			radiusScale: 1, // Relative radius
			pointer: {
				length: 0.65, // // Relative to gauge radius
				strokeWidth: 0.023, // The thickness
				color: '#000000' // Fill color
			},
			limitMax: false,     // If false, max value increases automatically if value > maxValue
			limitMin: false,     // If true, the min value of the gauge will be fixed
			colorStart: '#6FADCF',   // Colors
			colorStop: '#8FC0DA',    // just experiment with them
			strokeColor: '#E0E0E0',  // to see which ones work best for you
			generateGradient: true,
			highDpiSupport: true,     // High resolution support

			percentColors : [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],


			staticLabels: {
				font: "10px sans-serif",  // Specifies font
				labels: makeLabels(0,82,5),  // Print labels at these values
				color: "#000000",  // Optional: Label text color
				fractionDigits: 0,  // Optional: Numerical precision. 0=round off.
			},
//			staticZones: [
//				{strokeStyle: "#F03E3E", min: 100, max: 130}, // Red from 100 to 130
//				{strokeStyle: "#FFDD00", min: 130, max: 150}, // Yellow
//				{strokeStyle: "#30B32D", min: 150, max: 220}, // Green
//				{strokeStyle: "#FFDD00", min: 220, max: 260}, // Yellow
//				{strokeStyle: "#F03E3E", min: 260, max: 300}  // Red
//			],

		};
		var target = document.getElementById('temp_server'); // your canvas element
		var temp_server = new Gauge(target).setOptions(opts); // create sexy gauge!
		//humidade.setTextField(document.getElementById('valor-humidade'));
		temp_server.maxValue = 80; // set max gauge value
		temp_server.setMinValue(0);  // Prefer setter over gauge.minValue = 0
		temp_server.animationSpeed = 29; // set animation speed (32 is default value)

		var temp = document.getElementById('slider-temp');

		temp.style.height='10px';
		temp.style.background='#3FB8AF';
		$('.noUi-horizontal .noUi-handle').css('height','10px');
		noUiSlider.create(temp, {
			start: [ 50 ],
			behaviour: 'tap',
			connect: 'upper',
			range: {
				'min': 0,
				'max': 50
			}
			,tooltips: true
//			pips: { // Show a scale with the slider
//				mode: 'steps',
//				stepped: true,
//				density: 4
//			}
			,step: 1,
		});
		var humidity = document.getElementById('slider-humidity');

		humidity.style.height='10px';
		$('.noUi-horizontal .noUi-handle').css('height','10px');
		noUiSlider.create(humidity, {
			start: [ 50 ],
			behaviour: 'tap',
			connect: 'upper',
			range: {
				'min': 0,
				'max': 100
			}
			,tooltips: true
//			pips: { // Show a scale with the slider
//				mode: 'steps',
//				stepped: true,
//				density: 4
//			}
			,step: 1,
		});



		/*** Memory ***/
		var opts = {
			angle: -0.25, // The span of the gauge arc
			lineWidth: 0.11, // The line thickness
			radiusScale: 1, // Relative radius
			pointer: {
				length: 0.65, // // Relative to gauge radius
				strokeWidth: 0.023, // The thickness
				color: '#000000' // Fill color
			},
			limitMax: false,     // If false, max value increases automatically if value > maxValue
			limitMin: false,     // If true, the min value of the gauge will be fixed
			colorStart: '#6FADCF',   // Colors
			colorStop: '#8FC0DA',    // just experiment with them
			strokeColor: '#E0E0E0',  // to see which ones work best for you
			generateGradient: true,
			highDpiSupport: true,     // High resolution support

			percentColors : [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],


			staticLabels: {
				font: "10px sans-serif",  // Specifies font
				labels:  makeLabels(0,2148,256),  // Print labels at these values
				color: "#000000",  // Optional: Label text color
				fractionDigits: 0,  // Optional: Numerical precision. 0=round off.
			},
//			staticZones: [
//				{strokeStyle: "#F03E3E", min: 100, max: 130}, // Red from 100 to 130
//				{strokeStyle: "#FFDD00", min: 130, max: 150}, // Yellow
//				{strokeStyle: "#30B32D", min: 150, max: 220}, // Green
//				{strokeStyle: "#FFDD00", min: 220, max: 260}, // Yellow
//				{strokeStyle: "#F03E3E", min: 1796, max: 2048}  // Red
//			],

		};
		var target = document.getElementById('fisical_memory'); // your canvas element
		var fisical_memory = new Gauge(target).setOptions(opts); // create sexy gauge!
		//humidade.setTextField(document.getElementById('valor-humidade'));
		fisical_memory.maxValue = 2014; // set max gauge value
		fisical_memory.setMinValue(0);  // Prefer setter over gauge.minValue = 0
		fisical_memory.animationSpeed = 29; // set animation speed (32 is default value)

		/*** Memory ***/
		var opts = {
			angle: -0.25, // The span of the gauge arc
			lineWidth: 0.11, // The line thickness
			radiusScale: 1, // Relative radius
			pointer: {
				length: 0.65, // // Relative to gauge radius
				strokeWidth: 0.023, // The thickness
				color: '#000000' // Fill color
			},
			limitMax: false,     // If false, max value increases automatically if value > maxValue
			limitMin: false,     // If true, the min value of the gauge will be fixed
			colorStart: '#6FADCF',   // Colors
			colorStop: '#8FC0DA',    // just experiment with them
			strokeColor: '#E0E0E0',  // to see which ones work best for you
			generateGradient: true,
			highDpiSupport: true,     // High resolution support

			percentColors : [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],


			staticLabels: {
				font: "10px sans-serif",  // Specifies font
				labels:  makeLabels(0,100,10),  // Print labels at these values
				color: "#000000",  // Optional: Label text color
				fractionDigits: 0,  // Optional: Numerical precision. 0=round off.
			},
//			staticZones: [
//				{strokeStyle: "#F03E3E", min: 100, max: 130}, // Red from 100 to 130
//				{strokeStyle: "#FFDD00", min: 130, max: 150}, // Yellow
//				{strokeStyle: "#30B32D", min: 150, max: 220}, // Green
//				{strokeStyle: "#FFDD00", min: 220, max: 260}, // Yellow
//				{strokeStyle: "#F03E3E", min: 1796, max: 2048}  // Red
//			],

		};
		var target = document.getElementById('processor_server'); // your canvas element
		var processor_server1 = new Gauge(target).setOptions(opts); // create sexy gauge!
		//humidade.setTextField(document.getElementById('valor-humidade'));
		processor_server1.maxValue = 100; // set max gauge value
		processor_server1.setMinValue(0);  // Prefer setter over gauge.minValue = 0
		processor_server1.animationSpeed = 29; // set animation speed (32 is default value)





		var socket = io.connect('http://192.168.0.50:3060');
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

		socket.on('processor_server', function (data){
		console.log(data);
			temp_server.set(parseInt(data.processor_server)); // set actual value
			$('#valor-processor-server').html(parseInt(data.processor_server.trim())+'%');

		});

		socket.on('info_temp', function (data) {
			//console.log(data);
			if(typeof(data!=='undefined')){
				if(typeof(data.data!=='undefined')){
				//	console.log(data.data);
					if(typeof(data.data.temp!=='undefined')){
						$('.temperatura').html('Temperatura:'+data.data.temp+'&deg;');
						temp.noUiSlider.set([data.data.temp, null]);
						temperatura.set(data.data.temp); // set actual value
						humidade.set(data.data.humidity); // set actual value
						$('#valor-humidade').html(data.data.humidity+'%');
						$('#valor-temperatura').html(data.data.temp+'&deg;');
						if(data.data.humidity>70){
							$('.noUi-connect').css({'background':'#ff0000'});
						}else{
							$('.noUi-connect').css({'background':'#3FB8AF'});
						}

					}
					if(typeof(data.data.humidity!=='undefined')){
						$('.humidade').html('Humidade:'+data.data.humidity);
						if(data.data.humidity>70){
							$('.noUi-connect').css({'background':'#ff0000'});
						}else{
							$('.noUi-connect').css({'background':'#3FB8AF'});
						}
						humidity.noUiSlider.set([data.data.humidity, null]);

					}
					if(typeof(data.data.date!=='undefined')){
						$('.data').html('Data:'+data.data.date);
						$('#relogio').text(data.data.date);
					}
					if(data.data.alert){
						$('.alert').html(data.data.alert);
					}else{
						$('.alert').hide();
					}
				}
			}
		});

		socket.on('temp_server', function (data) {
			temp_server.set(data.temp_server); // set actual value
			$('#valor-temp-server').html(data.temp_server.trim()+'&deg;');
		});

		socket.on('meminfo', function (data) {
			console.log(data.meminfo);
			var MemTotal=parseInt(data.meminfo.MemTotal);
			var MemFree=parseInt(data.meminfo.MemFree);
			var used = MemTotal-MemFree;
			fisical_memory.set(used/1024);
			$('#valor-fisical_memory').html(Math.round(used/1024)+'Mb');

			console.log("FREE:"+used/1024)
//			temp_server.set(data.temp_server); // set actual value
//			$('#valor-temp-server').html(data.temp_server+'&deg;');
		});

	});
	//$('#relogio').css({width:'200px',	height:'170px'});
	//$('#relogio').css({width:'200px',height:'200px', margin:'0', padding:'0'});

	$('body').css({overflow:'auto'});

</script>


<script>
	var canvas = document.getElementById("relogio");
	canvas.style.height=170;
	canvas.style.width=170;
	var ctx = canvas.getContext("2d");
	var radius = canvas.height / 2;
	ctx.translate(radius, radius);
	radius = radius * 0.90;
	//drawClock();
	setInterval(drawClock, 1000, );

	function drawClock() {
		ctx.arc(0, 0, radius, 0 , 2*Math.PI);
		ctx.fillStyle = "white";
		ctx.fill();
		drawFace(ctx, radius);
		drawNumbers(ctx, radius);
		drawTime(ctx, radius);
	}

	function drawFace(ctx, radius) {
		var grad;

		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, 2*Math.PI);
		ctx.fillStyle = 'white';
		ctx.fill();

		grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
		grad.addColorStop(0, '#333');
		grad.addColorStop(0.5, 'white');
		grad.addColorStop(1, '#333');
		ctx.strokeStyle = grad;
		//ctx.lineWidth = 0.1;

		ctx.lineWidth = radius*0.1;

		ctx.stroke();


		ctx.beginPath();
		ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
		ctx.fillStyle = '#333';

		ctx.fill();
	}
	function drawNumbers(ctx, radius) {
		var ang;
		var num;
		ctx.font = radius*0.15 + "px arial";
		ctx.textBaseline="middle";
		ctx.textAlign="center";
		for(num= 1; num < 13; num++){
			ang = num * Math.PI / 6;
			ctx.rotate(ang);
			ctx.translate(0, -radius*0.85);
			ctx.rotate(-ang);
			ctx.fillText(num.toString(), 0, 0);
			ctx.rotate(ang);
			ctx.translate(0, radius*0.85);
			ctx.rotate(-ang);
		}
	}
	function drawTime(ctx, radius){
		if(canvas.textContent!=''){
			var now = new Date(canvas.textContent);
		}else{
			var now=new Date(canvas);
		}
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		//hour
		hour=hour%12;
		hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
		drawHand(ctx, hour, radius*0.5, radius*0.07);
		//minute
		minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
		drawHand(ctx, minute, radius*0.8, radius*0.07);
		// second
		second=(second*Math.PI/30);
		drawHand(ctx, second, radius*0.9, radius*0.02);
	}

	function drawHand(ctx, pos, length, width) {
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.lineCap = "round";
		ctx.moveTo(0,0);
		ctx.rotate(pos);
		ctx.lineTo(0, -length);
		ctx.stroke();
		ctx.rotate(-pos);

	}
</script>

</body>
</html>


