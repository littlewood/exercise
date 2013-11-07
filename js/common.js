/*
*check the ie browser version
*/
function checkIeVersion (){
	var type = navigator.userAgent.toLowerCase();
	var version = type.indexOf("msie")>-1 && parseInt(type.replace(/.*msie /,""));
	return version && version <= 6 ? true : false;
}

/*
*delay execute a function
*/
function delayExc(fn) {
	var tid = 0;
	var delayTime = 50;
	return function(){
		if(tid){
			clearTimeout(tid);
		}
		tid = setTimeout(function (){
			fn();
		},delayTime);
	}
	
}

/*截取指定长度字符串，中文2个长度，英文1个*/
function subStr (txt,subLength) {
	var n =0;
	for(var i=0; i<txt.length; i++) {
		if (txt.charCodeAt(i) <=122) {
			n++;
		} else {
			n+=2;
		}
		if (n>subLength) {
			return txt.substring(0,i)
		}
	}
	return txt;
}

/*get elements by className*/
function getElementsByClassName(className, arr, arr2) {
	var arr = arr || document.documentElement.childNodes;
	var ret = arr2 || new Array();
	for(var i in arr) {
		if(arr[i].className == className) {
			ret.push(arr[i]);
		}
		if (arr[i].childNodes && arr[i].childNodes.length>0){
			arguments.callee(className, arr[i].childNodes, ret);
		}
	}
	return ret;
}

//clear repeat elements of the array
function clearRepeatOfArray(arr) {
	var temp = {};
	var newArr = new Array ();
	for(var i = 0; i < arr.length; i++) {
		if(!temp[arr[i]]) {
			newArr.push(arr[i]);
			temp[arr[i]] = 1;
		}
	}
	return newArr;
}

function sortByDesc(a, b) {
	if (a <= b) {
		return -1;
	} else {
		return 1;
	}
}

function sortByAsc(a,b) {
	if (a > b) {
		return -1;
	} else {
		return 1;
	}
	
}

