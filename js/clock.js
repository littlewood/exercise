function clock(){
	this.init();
};
clock.prototype = {
	init:function(){
		
		var self = this;
		this.setClock();
		this.timeGo();
		setInterval(function(){
			self.timeGo();
		},1000);
	},
	setClock:function(){
	var c=document.getElementById("can");
		var ctx=c.getContext("2d");

		//画圆
		ctx.beginPath();
		ctx.translate(100,100);
		ctx.arc(0,0,100,0,2*Math.PI);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(0,0,90,0,2*Math.PI);
		ctx.stroke();

		ctx.beginPath();
		ctx.textBaseline = "middle";
		ctx.font = "16px bold Arial";

		//描绘数字与分钟刻度
		for(i=0;i<12;i++){
			ctx.beginPath();
			var coordinate = this.getXY(80,(i+1)*30);
			ctx.fillText(i+1,coordinate.x,coordinate.y);
			
			ctx.beginPath();
			
			var coordinate2 = this.getXY(90,(i+1)*30);
			var coordinate3 = this.getXY(85,(i+1)*30);
			ctx.moveTo(coordinate3.x,coordinate3.y);
			ctx.lineTo(coordinate2.x,coordinate2.y);
			ctx.stroke();
		}

		//描绘分钟刻度
		for(i=0;i<60;i++){
			if (i%5 == 0) {
			} else {
				var coordinate = this.getXY(90,(i)*6);
				ctx.beginPath();
				ctx.moveTo(coordinate.x,coordinate.y);
				
				var coordinate2 = this.getXY(88,(i)*6);
				ctx.lineTo(coordinate2.x,coordinate2.y);
				ctx.stroke();
			}
			
		}


		this.ctx = ctx;
	},
	getXY:function (r,angle){
		var cosR = r*Math.cos(angle*(Math.PI*2/360));
		var sinR = r*Math.sin(angle*(Math.PI*2/360));
		var xy = {};
		if (r>=0 && r<=90){
			xy =  {
				x:sinR,
				y:-cosR
			}
		} else if(r>=90 && r<=180){
			xy = {
				x:cosR,
				y:sinR
			}
		} else if(r>=180 && r<=270){
			xy =  {
				x:-sinR,
				y:cosR
			}
		} else {
			xy =  {
				x:-sinR,
				y:-cosR
			}	
		}
		return xy;
	},
	timeGo:function(){
		var t = new Date();
		var h = t.getHours();
		var m = t.getMinutes();
		var s = t.getSeconds();
		var self = this;
		var ctx = self.ctx;
		ctx.beginPath();
		ctx.fillStyle = '#fff';
		ctx.arc(0,0,65,Math.PI*2,false);
		ctx.fill();
		
		
		ctx.beginPath();
		ctx.fillStyle = '#ddd';
		ctx.arc(0,0,5,0,Math.PI*2,false);
		ctx.fill();

		
		//描绘指针
		//时针
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.moveTo(0,0);
		var sDot = this.getXY(55,(h+m/60)*30);
		ctx.lineTo(sDot.x,sDot.y);
		ctx.stroke();
		
		//分针
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(0,0);
		var mDot = this.getXY(60,(m+s/60)*6);
		ctx.lineTo(mDot.x,mDot.y);
		ctx.stroke();
		
		//秒针
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(0,0);
		var sDot = this.getXY(63,s*6);
		ctx.lineTo(sDot.x,sDot.y);
		ctx.stroke();
		
		
	},
	setDate:function(){
		var now = new Date();
		var str = "";
		var year = now.getFullYear();
		var month = now.getMonth()+1;
		var day = now.getDate();
		var week = now.getDay();
		str = year+"年"+month+"月"+day+"日 "+week;
		var myDate = document.getElementById("myDate");
		myDate.innerHTML = str;
	}
};


new clock();
