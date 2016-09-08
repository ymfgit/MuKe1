//设为首页
function SetHome(obj,url){
	try{
		obj.style.behavior='url(#default#homepage)';
		obj.setHomePage(url);
	}catch(e){
		if(window.netscape){
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}catch(e){
				alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入about:config并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
			}
		}else{
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
		}
	}
}

//点击收藏
function AddFavorite(title,url){
	try{
		window.external.addFavorite(url,title);
	}catch(e){
		try{window.sidebar.addPanel(title,url,"");
		}catch(e){
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
		}
	}
}

function loginOut(){
	$("#top_login_right").html('<a href="javascript:showlogin()"><font color="#FF0000" size="2">请登录</font></a>&nbsp;&nbsp;'+
            		'<a href="javascript:showzc()"><font color="#FF0000" size="2">免费注册</font></a>');
}

//用户登录
function showlogin(){
	$("#smallpage #uname").val("");
	$("#smallpage #pwd").val("");
	$("#unamep").html("请输入昵称或邮箱").css("color","#CC6666");
	$("#pwdp").html("请输入您的密码").css("color","#CC6666");
	$("#zcpages").hide();
	$("#loginpages").mywin({left:"center",top:"center"});
	$("#uname").select();
	$(".bg").fadeIn("3000","linear");
}

//登陆框隐藏
function hidenloginpage() {
    var text = $("#loginpages").val();
    $("#loginpages").hide();
    $(".bg").hide();
}

//注册显示
function showzc(){
	$("#zcuname").val("");
	$("#zcpwd").val("");
	$("#zcpwdagain").val("");
	$("#zcemail").val("");
	$("#zccode").val("");
	
	$("#zcunamep").html("请输入您的昵称或注册邮箱(至少6位)").css("color","#CC6666");
	$("#zcpwdp").html("请输入您的登录密码(至少6位)").css("color","#CC6666");
	$("#zcpwdtwop").html("请重复输入您的登录密码(至少6位)").css("color","#CC6666");
	$("#zcemailp").html("请输入您的邮箱地址").css("color","#CC6666");
	$("#zccodep").html("请输入验证码").css("color","#CC6666");
	$("#loginpages").hide();
	$("#zcpages").mywin({left:"center",top:"center"});$("#player5").hide();$("#setswfembed").hide();
	$(".bg").fadeIn("3000","linear");
	$("#uname").select();
	
//	var uname=$("#zcuname").val();
//	var pwd=$("#zcpwd").val();
//	var email=$("#zcemail").val();
//	var zccode=$("#zccode").val();
//	
//	$.post("userServlet",{op:"userZc",uname:uname,pwd:pwd,email,status:status},function(data){
//		if(){
//			alert("用户注册失败错误");
//		}else{
//			<a href="javascript:showlogin()">马上登录</a>
//		}
//	});
//	
	
	
	
}

//注册框隐藏
function hidenzcpage() {
    var text = $("#zcpages").val();
    $("#zcpages").hide();
    $(".bg").hide();
}

//登陆用户名验证
function checkloginuname() {
    var uname = $("#uname").val();
    if ("" == uname || uname == null) {
        $("#unamep").html("用户名不能为空...").css("color", "#F00");
    } else {
        $("#unamep").html("用户名格式正确...").css("color", "#0F0");
    }
}

//登陆密码验证
function checkloginpwd() {
    var pwd = $("#pwd").val();
    if ("" == pwd || pwd == null) {
        $("#pwdp").html("您的密码不能为空...").css("color", "#F00");
    } else {
        $("#pwdp").html("密码格式正确...").css("color", "#0F0");
    }
}

//验证注册用户名
function checkzcuname() {
    var uname = $("#zcuname").val();
    var reg = /^([a-zA-Z0-9\u4E00-\u9FA5_-]{2,12})/;
    if (uname.match(reg)) {
        $.post("DoLoginServlet.do", {
            op: "checkuname",
            uname: uname
        },
        function(data) {
            if (parseInt(data) > 0) {
                $("#zcunamep").html("该名称可以使用...").css("color", "#0F0");
            } else {
                $("#zcunamep").html("用户名已经存在...").css("color", "#F00");
            }
        });
    } else {
        $("#uname").val("");
        $("#zcunamep").html("用户名格式不正确...").css("color", "#F00");
    }
}

//验证注册密码
function checkzcpwd() {
    var pwd = $("#zcpwd").val();
    var reg = /^([a-zA-Z0-9_-]{6,20})/;
    if (pwd.match(reg)) {
        $("#zcpwdp").html("可以使用该密码...").css("color", "#0F0");
    } else {
        $("#zcpwd").val("");
        $("#zcpwdp").html("密码不合格...").css("color", "#F00");
    }
}

//验证重复密码
function checkzcpwdagain() {
    var pwdagain = $("#zcpwdagain").val();
    var pwd = $("#zcpwd").val();
    if (pwdagain == pwd && pwd != "" && pwd != null) {
        $("#zcpwdtwop").html("密码重复确认正确...").css("color", "#0F0");
    } else {
        $("#zcpwdtwop").html("密码不一致请重新输入...").css("color", "#F00");
        $("#zcpwdagain").val("");
    }
}

//验证邮箱
function checkzcemail() {
    var zcemail = $("#zcemail").val();
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (zcemail.match(reg)) {
        $.post("DoLoginServlet.do", {
            op: "checkemail",
            zcemail: zcemail
        },
        function(data) {
            if (parseInt(data) > 0) {
                $("#zcemailp").html("该邮箱可以使用...").css("color", "#0F0");
            } else {
                $("#zcemailp").html("该邮箱已被注册...").css("color", "#F00");
                $("#zcemail").val("");
            }
        });
    } else {
        $("#zcemailp").html("邮箱格式不正确...").css("color", "#F00");
        $("#zcemail").val("");
    }
}


//重新获取验证码
function changeVilidateCode(obj){
	var timenow=new Date().getTime();
	obj.src="front/valiCodeImg.jsp?d="+timenow;
}

//会员登录
function userlogin(){
	var uname=$.trim($("#uname").val());
	var pwd=$.trim($("#pwd").val());
	
	$.post("userServlet?d="+new Date(),{op:"userLogin",uname:uname,pwd:pwd},function(data){
		if(parseInt($.trim(data))){
			alert("用户名或密码错误");
		}else{
			var str='<a href="#"><font color="#ff000" size="2">当前登录用户：'+data+'</font></a>&nbsp;&nbsp;';
			$("#top_login_right").html(str);
			$("#loginpages").hide();
			$(".bg").hide();
		}
	});
}
//会员注册
function userzc(){
	var uname=$("#zcuname").val();
	var pwd=$("#zcpwd").val();
	var email=$("#zcemail").val();
	var date;
	
	$.post("userServlet?d="+new Date(),{op:"userRegister",uname:uname,pwd:pwd,email:email},function(data){
		data=parseInt($.trim(data));
		console.info(data);
		if(data==1){
			alert("注册成功，请登录.....")
			location.href="javascript:showlogin()";
		}else{
			alert("注册失败，请重试.....");
		}
	});
}


$.fn.mywin=function(position){
	if (position&&position instanceof Object){
		var positionleft=position.left;
		var positiontop=position.top;

		var currentwin=this;
		var mywidth =currentwin.outerWidth(true);
		var myheight = currentwin.outerHeight(true);

		var left=0;
		var top=0;
		var width=0;
		var height=0;
		var scrollleft=0;
		var scrolltop=0;
	

		function getWinInfo(){
			width=$(window).width();
			height=$(window).height();
			scrollleft=$(window).scrollLeft();
			scrolltop=$(window).scrollTop();
		}

		function calleft(positionleft,scrollleft,width,mywidth){
			if(positionleft!=""&&typeof(positionleft)=="string"){
				if(positionleft=="center"){
					left=scrollleft+(width-mywidth)/2;
				}else if(positionleft=="left"){
					left=scrollleft;
				}else if (positionleft == "right"){
					left=scrollleft+width-mywidth;
				}else{
					left=scrollleft+(width-mywidth)/2;
				}
			}else if(positionleft != ""&&typeof(positionleft)=="number"){
				left=positionleft+scrollleft;
			}else{
				left=0;
			}
			
		}
		
		function caltop(positiontop,scrolltop,height,myheight){
			if(positiontop!=""&&typeof(positiontop)=="string"){
				if(positiontop=="center"){
					top=scrolltop+(height-myheight)/2;
				}else if(positiontop == "top"){
					top=scrolltop;
				}else if(positiontop=="bottom"){
					top = scrolltop+height-myheight;
				}else{
					top=scrolltop+(height-myheight)/2;
				}
			}else if(positiontop!=""&&typeof(positiontop)=="number"){
				top=positiontop+scrolltop;
			}else{
				top=0;
			}
		}

		getWinInfo();
		calleft(positionleft, scrollleft,width,mywidth);
		caltop(positiontop,scrolltop,height,myheight);

		$(window).scroll(function(){
			getWinInfo();
			calleft(positionleft,scrollleft,width,mywidth);
			caltop(positiontop,scrolltop,height,myheight);
			currentwin.css("left",left).css("top",top);
		});

		$(window).resize(function(){
			getWinInfo();
			calleft(positionleft, scrollleft, width, mywidth);
			caltop(positiontop, scrolltop, height, myheight);
			currentwin.animate({left : left,top : top}, 300);
		});
		
		currentwin.css("left",left).css("top", top).fadeIn("slow");
	}
	return this;
}