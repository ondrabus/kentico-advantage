$('.toggle a').click(function(e){
	$(this).closest('div').toggleClass('active');
	$(this).closest('div').siblings('div').toggleClass('active');
});

$('.left-bar-button').click(function(e){

	$('.left-bar').toggleClass('closed open');
});