var playList = function (opt){
			
	//��ʼ����
	var config ={
		dir:'E:\\my\\music\\',
		curList:'',
		curMusic:'',
		playMode:'def',
		playerState:0,
		playEvent:0
	};
	
	var data = {
	};	
		
		
	var player;
	//��ʼ��
	function init() {
		$.extend(config, opt);
		loadPlayList();
		loadMusicList();
		bindEvent();
	}
	
	//���ز����б�
	function loadPlayList(){
		var str = "";
		if($.browser.msie){
			var fileObj = new ActiveXObject("Scripting.FileSystemObject");
			var musicFolder = fileObj.GetFolder(config.dir);
			var subFolder = new Enumerator(musicFolder.SubFolders);
			for(;!subFolder.atEnd();subFolder.moveNext()){
				str+='<li>'+subFolder.item().name+'</li>'
			}
		} else {
			try {  
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
            } catch (e) {  
				alert("Permission to read file was denied.");  
            } 
		}
		$("#playList").append(str);
		config.curList = $("#playList li:first").html();
	}
	
	//���������б�
	function loadMusicList(){
		var musicList = $("#musicList");
		var curList = $("#playList .on");
		musicList.html("");
		curList = curList.length ? curList : $("#playList li:first") && $("#playList li:first").addClass('on');
		var str = "";
		var fileObj = new ActiveXObject("Scripting.FileSystemObject");
		var folderPath = config.dir+'\\'+curList.html();
		var musicFolder = fileObj.getFolder(folderPath);
		var subFiles = new Enumerator(musicFolder.files);
		for(;!subFiles.atEnd();subFiles.moveNext()){
			var f = subFiles.item();
			var eName = getFileExtensionName(f.ShortName);
			if ( eName == 'mp3' || eName == 'wma'){
				str+='<li>'+ getFileShortName(f.ShortName) +'</li>';
			}
		}
		musicList.html(str);
		config.curMusic = $("#musicList li:first").html();
	}
	
	//��������
	function loadMusic(path){
		$("#player").html("");
		var path = path;
		var musicFullPath = config.dir + "//" + $("#playList .on").html() + "//" + path +".mp3";
		var str ='<OBJECT id="nsPlayer" height="176" width="267" classid="clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6" VIEWASTEXT> ' +
				'<PARAM NAME="URL" VALUE="'+ musicFullPath +'">' +
				'<PARAM NAME="rate" VALUE="1">' +
				'<PARAM NAME="balance" VALUE="0">' +
				'<PARAM NAME="currentPosition" VALUE="0">' +
				'<PARAM NAME="defaultFrame" VALUE="">'+
				'<PARAM NAME="playCount" VALUE="1" >'+
				'<PARAM NAME="autoStart" VALUE="-1">'+
				'<PARAM NAME="currentMarker" VALUE="0">'+
				'<PARAM NAME="invokeURLs" VALUE="-1">'+
				'<PARAM NAME="baseURL" VALUE="">'+
				'<PARAM NAME="volume" VALUE="50">'+
				'<PARAM NAME="mute" VALUE="0">'+
				'<PARAM NAME="uiMode" VALUE="full">'+
				'<PARAM NAME="stretchToFit" VALUE="0">'+
				'<PARAM NAME="windowlessVideo" VALUE="0">'+
				'<PARAM NAME="enabled" VALUE="-1">'+
				'<PARAM NAME="enableContextMenu" VALUE="-1">'+
				'<PARAM NAME="fullScreen" VALUE="0">'+
				'<PARAM NAME="SAMIStyle" VALUE="">'+
				'<PARAM NAME="SAMILang" VALUE="">'+
				'<PARAM NAME="SAMIFilename" VALUE="">'+
				'<PARAM NAME="captioningID" VALUE="">'+
				'<PARAM NAME="enableErrorDialogs" VALUE="0">'+
				'<PARAM NAME="_cx" VALUE="9260">'+
				'<PARAM NAME="_cy" VALUE="7938">'+
				'</OBJECT>';
		$("#player").html(str);
		$(".musicTitle").html(path);
		loadLrc(config.dir + "//" + $("#playList .on").html() + "//" + path +'.lrc');
		config.playerState = 1;
		if(config.playEvent == 0){
			bindPlayEvent();
		}
	}
	
	//���ظ��
	function loadLrc (path) {
		if($.browser.msie){
			var lrc = {};
			var fileObj = new ActiveXObject("Scripting.FileSystemObject");
			if (fileObj.FileExists(path)) {
				lrcFile = fileObj.GetFile(path);
				fr = lrcFile.OpenAsTextStream(1,-2);
				var lrcStr="";
				var lineStr="";
				var lrc = {};
				var arrTime = new Array ();
				var arrLrc = new Array ();
				do {
					lineStr = fr.ReadLine();
					if(lineStr){
						//console.log(y.length);
						arrTime.push(lineStr.match(/^\[+.*\]+/));
						arrLrc.push(lineStr.replace(/^\[+.*\]+/g,''));
						lrcStr += '<li>' + lineStr.replace(/^\[+.*\]+/g,'') +'</li>';
					}
				} while (!fr.AtEndOfStream);
				fr.Close();
				data["timeTag"] = arrTime;
				data["lrc"] = arrLrc; 
				//$("#lrc").html(lrcStr);
				//��ʾ����
				//lrcTime();
			}
		} else {
			try {  
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
            } catch (e) {  
				alert("Permission to read file was denied.");  
            } 
		}	
	}
	
	function playNext () {
		//��һ��
		player = document.getElementById("nsPlayer");
		var j = $("#musicList .on").index("#musicList li");
		if (j!=$("#musicList li").length-1) {
			player.controls.pause();
			var path = $("#musicList li").eq(j+1).html();
			$("#musicList li").eq(j+1).addClass('on').siblings().removeClass('on');
			loadMusic(path);
		} else {
			//alert("�Ѵ����һ��");
		}
	}
	
	//���¼�
	function bindEvent(){
		//�л��б�
		$("#playList").delegate("li",'click',function(){
			$(this).addClass('on').siblings().removeClass('on');
			loadMusicList();
		});
		//�л�����
		$("#musicList").delegate("li","click",function(){
			var curList = $("#playList .on");
			$(this).addClass('on').siblings().removeClass('on');
			var path = $(this).html();
			loadMusic(path);
		});
		//���Ű�ť
		$(".play-btn").delegate("li","click",function(){
			if(!$("#musicList .on").length){
				$("#musicList li:first").addClass('on');
			}
			var i = $(this).index(".play-btn li");
			var player = document.getElementById("nsPlayer");
			//ǰһ��
			if (i == 0) {
				var j = $("#musicList .on").index("#musicList li");
				if(j!=0) {
					player.Pause();
					var path = $("#musicList li").eq(j-1).html();
					$("#musicList li").eq(j-1).addClass('on').siblings().removeClass('on');
					loadMusic(path);
				} else {
					alert("�Ѵ��һ��");
				}
			} else if (i == 1) {  //��ͣ����
				player.PlayState == 2 ? ((function(){
					player.Pause();
					$(this).html('����');
				})()) : ((function(){
					player.controls.play(); 
					$(this).html('��ͣ');
				})());
			} else if(i == 2) { 
				playNext();
			} else {
				alert("����");
			}
			
		});
		
		//����ģʽ
		$(".play-mode").delegate("li","click",function(){
			var i = $(this).index(".play-mode li");
			var player = document.getElementById("nsPlayer");
			//Ĭ��
			if (i == 0) {
				config.playMode = "def";
			} else if (i == 1) {  //����ѭ��
				config.playMode = "repeatSingle";
			} else if(i == 2) { //�б�ѭ��
				config.playMode = "repeatList";
			} else {
				config.playMode = "def";
			}
			$(this).addClass('on').siblings().removeClass('on');
		});
	}
	
	function bindPlayEvent () {
		
		player = document.getElementById("nsPlayer");
		player.attachEvent("PlayStateChange",function(){
			if (player.playState == 3) {
				if (config.playMode == 'def') {
					playNext();
				} else if (config.playMode == 'repeatSingle') {
					loadMusic($("#musicList .on").html());
				}
			}
		});
		config.playEvent = 1;
	}
	
	function lrcTime () {
		player = document.getElementById("nsPlayer");	
		$("#totalTime").html(player.controls);
		setInterval(function(){	
			$("#jindu").html(Math.ceil(document.getElementById("nsPlayer").currentMedia.duration));
		},1000);
	}
	function getFileExtensionName (fileName) {
		var name = fileName;
		var eName = fileName.split('.').pop();
		return eName;
	}
	
	function getFileShortName (fileName) {
		var name = fileName.split('.');
		name.pop();
		return name.join('.');
	}
	init();
};

playList();