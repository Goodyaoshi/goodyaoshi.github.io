var roms = $.parseJSON($.ajax({
	url: "./roms/roms.json",
	dataType: "json",
	async: false
}).responseText);

var nes;
$(function() {
	nes = new JSNES({
		'ui': $('#emulator').JSNESUI(roms)
	});
});
