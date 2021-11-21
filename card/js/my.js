function $error(msg,title) {
	   return swal({
	        title: title||'非常遗憾',
	        text: msg||'',
	        type: "error",
	        showCancelButton: false,
	        confirmButtonColor: "#DD6B55",
	        confirmButtonText: "知道了",
	        closeOnConfirm: true
	    });
}
function $warning(msg,title) {
	   return swal({
	        title: title||'系统提示',
	        text: msg||'',
	        type: "warning",
	        showCancelButton: false,
	        confirmButtonColor: "#DD6B55",
	        confirmButtonText: "知道了",
	        closeOnConfirm: true
	    });
}

function $ok(msg,arg,text) {
	if(typeof(arg) == 'function') {
	   return swal({
	        title: "恭喜您",
	        text: msg,
	        type: "success",
	        showCancelButton: false,
	        confirmButtonColor: "#DD6B55",confirmButtonText: text||"是的，我要继续!",
	        closeOnConfirm: true
	    }).then(arg);
	}
   return swal({
        title: arg||"恭喜您",
        text: msg,
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定!",
        closeOnConfirm: true
    });
}

function $alert(msg,f,text) {
    swal({
        title: "系统提示",
        text: msg,
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",confirmButtonText: text||"知道了!",
    }).then(function() {
    	if(typeof(f) == 'function') f.call(this);
	});
}

function $confirm(msg,f0,f1,text1,text2) {
    swal({
        title: "系统提示",
        text: msg,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",confirmButtonText: text1||"是的，我要继续!",
        cancelButtonText: text2||"不，我要放弃!"
    }).then(function() {
    	if(typeof(f0) == 'function') f0.call(this);
	}, function(dismiss) {
	  if (dismiss === 'cancel') {
	    	if(typeof(f1) == 'function') f1.call(this);
	  }
	});
}

function $post(url, obj, success, error) {
	$.ajax({
	    type: "POST",
	    url: url,
	    contentType: "application/json; charset=utf-8",
	    data: obj ? JSON.stringify(obj):null,
	    dataType: "json",
	    success: function (r) {
	    	if(typeof(success) == 'function') success.call(obj, r);
	    },
	    error: function (r) {
	    	if(typeof(error) == 'function') error.call(obj, r);
	    }
	});
}


/** 是否时间格式 **/
function isDateTime(format, reObj) {
    format = format || 'yyyy-MM-dd';
    var input = this, o = {}, d = new Date();
    var f1 = format.split(/[^a-z]+/gi), f2 = input.split(/\D+/g), f3 = format.split(/[a-z]+/gi), f4 = input.split(/\d+/g);
    var len = f1.length, len1 = f3.length;
    if (len != f2.length || len1 != f4.length) return false;
    for (var i = 0; i < len1; i++) {if (f3[i] != f4[i]) return false;}
    for (var j = 0; j < len; j++) o[f1[j]] = f2[j];
    o.yyyy = s(o.yyyy, o.yy, d.getFullYear(), 9999, 4);
    o.MM = s(o.MM, o.M, d.getMonth() + 1, 12);
    o.dd = s(o.dd, o.d, d.getDate(), 31);
    o.hh = s(o.hh, o.h, d.getHours(), 24);
    o.mm = s(o.mm, o.m, d.getMinutes());
    o.ss = s(o.ss, o.s, d.getSeconds());
    o.ms = s(o.ms, o.ms, d.getMilliseconds(), 999, 3);
    if (o.yyyy + o.MM + o.dd + o.hh + o.mm + o.ss + o.ms < 0) return false;
    if (o.yyyy < 100) o.yyyy += (o.yyyy > 30 ? 1900 : 2000);
    d = new Date(o.yyyy, o.MM - 1, o.dd, o.hh, o.mm, o.ss, o.ms);
    var reVal = d.getFullYear() == o.yyyy && d.getMonth() + 1 == o.MM && d.getDate() == o.dd && d.getHours() == o.hh && d.getMinutes() == o.mm && d.getSeconds() == o.ss && d.getMilliseconds() == o.ms;
    return reVal && reObj ? d : reVal;
    function s(s1, s2, s3, s4, s5) {
        s4 = s4 || 60, s5 = s5 || 2;
        var reVal = s3;
        if (s1 != undefined && s1 != '' || !isNaN(s1)) reVal = s1 * 1;
        if (s2 != undefined && s2 != '' && !isNaN(s2)) reVal = s2 * 1;
        return (reVal == s1 && s1.length != s5 || reVal > s4) ? -10000 : reVal;
    }
}

function isIdcard(value) {
    if (value.length == 18 && 18 != value.length) return false;
    var number = value.toLowerCase();
    var d, sum = 0, v = '10x98765432', w = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91';
    var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/);
    if (re == null || a.indexOf(re[1]) < 0) return false;
    if (re[2].length == 9) {
        number = number.substr(0, 6) + '19' + number.substr(6);
        d = ['19' + re[4], re[5], re[6]].join('-');
    } else d = [re[9], re[10], re[11]].join('-');
    if (!isDateTime.call(d, 'yyyy-MM-dd')) return false;
    for (var i = 0; i < 17; i++) sum += number.charAt(i) * w[i];
    return (re[2].length == 9 || number.charAt(17) == v.charAt(sum % 11));
}