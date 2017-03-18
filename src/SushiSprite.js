var SushiSprite = cc.Sprite.extend({
	
	disappearAction:null, //消失动画
	
	onEnter:function(){
		cc.log("onEnter");
		this._super();
		this.addTouchEventListenser();
		this.disappearAction=this.createDisappearAction();
		this.disappearAction.retain(); //对生成的消失动画增加一次引用
	},
	
	onExit:function(){
		cc.log("OnExit");
		this.disappearAction.release();
		this._super();
	},
	
	//touch event
	addTouchEventListenser:function(){
		this.touchListener = cc.EventListener.create({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			//when "swallow touches" is true,then returning 'true'
			swallowTouches:true,
			//onTouchBegan event callback function
			onTouchBegan:function(touch,event){
				var pos=touch.getLocation();
				var target=event.getCurrentTarget();
				
				if(cc.rectContainsPoint(target.getBoundingBox(), pos))
					{
						cc.log("touched");
						this.addScore();
						//响应精灵点中
						cc.log("pos.x="+pos.x+",pos.y="+pos.y);

						target.stopAllActions();

						var ac=target.disappearAction;  //获取当前对象的消失动画
						var seqAc=cc.Sequence.create(ac,cc.CallFunc.create(function(){		//cc.callfunc结束处理回调
							cc.log("callfun.....");
							target.removeFromParent();
						}, target));  //生成消失动画序列
						target.runAction(seqAc); //播放消失动画动作

						
						return true;
					}
				return false;	
			}
		});
		cc.eventManager.addListener(this.touchListener, this);  //注册事件监听
		//target.removeTouchEventListenser();
	},
	
	createDisappearAction:function(){
		var frames=[];
		for(var i=0;i<11;i++)
			{
				var str="sushi_1n_"+i+".png";
				//cc.log(str);
				var frame=cc.spriteFrameCache.getSpriteFrame(str);
				frames.push(frame);
			}
		//存放每一帧
		
		var animation=new cc.Animation(frames,0.02);//将每一帧变成动画序列
		var action=new cc.Animate(animation); //变成动画动作
		
		return action;
	}
})