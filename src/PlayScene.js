var PlayLayer=cc.Layer.extend({
	bgSprite:null,
	SushiSprites:null,
	ctor:function(){ //构造函数
		this._super();
		
		var size=cc.winSize;
		this.SushiSprites=[];
		this.timeout=60;
		
		//add bg
		this.bgSprite=new cc.Sprite(res.BackGround_png);
		this.bgSprite.attr({
			x:size.width/2,
			y:size.height/2,
			//scale:0.5,
			rotation:180
		});
		this.addChild(this.bgSprite,0);//加入到layer
		
		//add sushi
		this.addSushi();
		
		cc.spriteFrameCache.addSpriteFrames(res.Sushi_plist); //加载帧图片到缓存
		
		
		//timer
		this.schedule(this.update, 1, 16*1024, 1); //(callback_fn,interval,repeat,delay)
		
		//score
		this.scoreLabel=new cc.LabelTTF("score:0","Arial",20);
		this.scoreLabel.attr({
			x:size.width/2+100,
			y:size.height-20
		});
		this.addChild(this.scoreLabel,5);
		

		//timeout60
		this.timeoutLabel=cc.LabelTTF(""+this.timeout,"Arial",30);
		this.timeoutLabel.x=20;
		this.timeoutLabel.y=size.height-20;
		this.addChild(this.timeoutLabel,5);
		
		return true;
		
	},
	
	addSushi:function(){
		
		var sushi=new SushiSprite(res.sushi_png);
		var size=cc.winSize;
		
		var x=sushi.width/2+size.width/2*cc.random0To1();
		sushi.attr({
			x:x,
			y:size.height-30
		});
		this.SushiSprites.push(sushi);
		this.addChild(sushi,5);
		
		var dorpAction=cc.MoveTo.create(4,cc.p(sushi.x,-30 ));//规定时间内移动到指定位置
		sushi.runAction(dorpAction);
		
	},
	
	//update and create new sushi
	update:function(){
		this.addSushi();
		this.removeSushi();
	},
	
	//remove
	removeSushi:function(){
		for(var i=0;i<this.SushiSprites.length;i++)
			{
				cc.log("removesushi");
				if(this.SushiSprites[i].y<=0)
					{
					cc.log("remove:"+i);
					this.SushiSprites[i].removeFromParent();
					this.SushiSprites[i]=undefined;
					this.SushiSprites.splice(i, 1);
					i=i-1;
					}
			}
	},
	
	//add score
	addScore:function()
	{
		this.score+=1;
		this.scoreLabel.setString("score:"+this.score);
	}
});

var PlayScene=cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer=new PlayLayer();
		this.addChild(layer);
	}
});