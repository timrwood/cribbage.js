import flash.utils.getTimer;

var time:Number = getTimer();

Array.prototype.mixElements = function() {
	var ARlength:Number = this.length;
	for (var it:uint = 0; it<ARlength; it++) {
		var el= this[it];
		var rn:uint = Math.random()*ARlength;
		this[it] = this[rn];
		this[rn] = el;
	}
};
var cardsAvail:Array = new Array()
var pcCribArray:Array = [[277,233,233,263,276,226,225,223,209,206,215,199,198],
[233,293,337,245,281,229,229,227,216,211,221,210,205],
[233,337,307,274,312,224,230,232,224,213,224,211,206],
[263,245,274,300,334,246,224,227,215,208,223,205,201],
[276,281,312,334,431,344,322,290,283,341,357,338,334],
[226,229,224,246,344,326,295,270,288,198,210,194,190],
[225,229,230,224,322,295,328,351,242,198,215,199,196],
[223,227,232,227,290,270,351,314,268,235,211,198,193],
[209,216,224,215,283,288,242,268,294,250,228,189,185],
[206,211,213,208,341,198,198,235,250,280,259,212,178],
[215,221,224,223,357,210,215,211,228,259,295,251,219],
[199,210,211,205,338,194,199,198,189,212,251,266,207],
[198,205,206,201,334,190,196,193,185,178,219,207,260]]
var myCribArray:Array = [[247,195,208,250,251,177,177,175,156,157,168,157,157],
[195,263,322,208,251,181,175,168,171,163,177,165,162],
[208,322,273,226,275,175,165,180,174,164,179,165,169],
[250,208,226,259,298,177,171,176,171,165,178,165,166],
[251,251,275,298,404,305,276,252,250,306,322,305,306],
[177,181,175,177,305,265,229,213,236,146,157,149,144],
[177,175,165,171,276,229,272,300,186,149,162,149,150],
[175,168,180,176,252,213,300,251,217,175,162,147,145],
[156,171,174,171,250,236,186,217,237,197,183,138,141],
[157,163,164,165,306,146,149,175,197,219,212,152,131],
[168,177,179,178,322,157,162,162,183,212,245,221,182],
[157,165,165,165,305,149,149,147,138,152,221,220,159],
[157,162,169,166,306,144,150,145,141,131,182,159,211]]
var winSprite:Sprite = new Sprite()
var myWins:uint=0
var pcWins:uint=0
var totalGames:uint=0
var myTotalPoints:uint=0
var pcTotalPoints:uint=0
var gameOver:Boolean=false

var i:uint = 0
var j:uint = 0
var k:uint = 0
var myFont:Font = new centuryFont();
var deck:Array = new Array;
var mineToCrib:Array = new Array()
var pcToCrib:Array = new Array()
var myTurn:Boolean = false;
var myDeal:Boolean = true;
var myDealGame:Boolean = false;
var myScore:uint = 0
var myScoreSprite:Sprite = new Sprite()
var pcScore:uint = 0
var pcScoreSprite:Sprite = new Sprite()
var tallySprite:Sprite = new Sprite()
var scoreFormat:TextFormat = new TextFormat()
var addFormat:TextFormat = new TextFormat()
var buttonFormat:TextFormat = new TextFormat()
var score2Format:TextFormat = new TextFormat()
buttonFormat.font = myFont.fontName;
buttonFormat.size = 15;
buttonFormat.color = 0x000000;
score2Format.font = myFont.fontName;
score2Format.size = 12;
score2Format.color = 0x000000;
addFormat.font = myFont.fontName;
addFormat.size = 20;
addFormat.color = 0x000000;
scoreFormat.font = myFont.fontName;
scoreFormat.size = 40;
scoreFormat.color = 0x000000;
 

var myScoreText:TextField = new TextField()
var pcScoreText:TextField = new TextField()
var myScoreGameText:TextField = new TextField()
var pcScoreGameText:TextField = new TextField()
var myScoreAvgText:TextField = new TextField()
var pcScoreAvgText:TextField = new TextField()

stage.addChild(myScoreText)
stage.addChild(pcScoreText)
stage.addChild(myScoreGameText)
stage.addChild(pcScoreGameText)
stage.addChild(myScoreAvgText)
stage.addChild(pcScoreAvgText)


var pcHand:Array = new Array();
var myHand:Array = new Array();
var cribHand:Array = new Array();
var cardHolder:Sprite = new Sprite()
var cardHolderCenter:Sprite = new Sprite()
var cardHolderCrib:Sprite = new Sprite()
var cardHolderMine:Sprite = new Sprite()
var cardHolderPc:Sprite = new Sprite()
var pointsAdd:Sprite = new Sprite()
var cutDeckButton:Sprite = new Sprite()
var cutDeckText:TextField = new TextField()
var dealButton:Sprite = new Sprite()
var cutCard:uint = new uint()
var cardText:TextField = new TextField()
stage.addChild(cardHolderCenter)
stage.addChild(cardHolderCrib)
stage.addChild(cardHolderMine)
stage.addChild(cardHolderPc)
stage.addChild(pcScoreSprite)
stage.addChild(myScoreSprite)
stage.addChild(tallySprite)
stage.addChild(pointsAdd)
stage.addChild(winSprite)

makeBoard()
var toCribButton:Sprite = new Sprite()
tallyPoints(false)
tallyPoints(true)

addChild(toCribButton)
addChild(cardHolder)
sortDeck();
function sortDeck() {
	deck = createDeck(52)
	deck.mixElements();
	pcHand = deck.splice(0,6);
	pcHand.sort(16)
	myHand = deck.slice(0,6);
	myHand.sort(16)
	cardsAvail=[0,0,0,0,0,0,0,0,0,0,0,0,0]
	for (var i:uint =0;i<deck.length;i++){
		cardsAvail[uint(deck[i]/4)]++
	}
	trace (cardsAvail)
	cribHand.length=0
	getBestHand();
	showDeal()
	makeButton(toCribButton)
	if (myDeal){
		cardText.text="TO MY CRIB"
	} else {
		cardText.text="TO PC CRIB"	
	}
}
function clearCards(){
	var chcenter:uint = cardHolderCenter.numChildren
	var chpc:uint = cardHolderPc.numChildren
	var chmy:uint = cardHolderMine.numChildren
	var chcrib:uint = cardHolderCrib.numChildren
	for (var i:uint=0;i<chcenter;i++){
		cardHolderCenter.removeChildAt(0)
	}
	for (var i:uint=0;i<chcrib;i++){
		cardHolderCrib.removeChildAt(0)
	}
	for (var i:uint=0;i<chpc;i++){
		cardHolderPc.removeChildAt(0)
	}
	for (var i:uint=0;i<chmy;i++){
		cardHolderMine.removeChildAt(0)
	}
}
function displayCard(thearray:Array){
	var output:String = ""
	var suitarr:Array = ["C","D","S","H"]
	var valarr:Array = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
	for (i=0;i<thearray.length;i++){
		output+="["+valarr[Math.floor(thearray[i]/4)]+suitarr[thearray[i]%4]+" ] "
	}
	return(output)
}
function winGame(myWin:Boolean){
	var winShape:Shape = new Shape()
	var winText:TextField = new TextField()
	winSprite.addChild(winShape)
	winSprite.addChild(winText)
	winText.defaultTextFormat=scoreFormat
	winText.embedFonts = true;
	winText.autoSize=TextFieldAutoSize.CENTER
	winText.selectable=false
	winText.mouseEnabled = false
	winSprite.x = 300
    winSprite.y = 225
	if (myWin){
		if (pcScore<61){
			winText.text="YOU DOUBLE SKUNKED ME"
		} else if (pcScore<91){
			winText.text="YOU SKUNKED ME"
		} else {
			winText.text="YOU WON"
		}
		myWins++
		totalGames++
	} else {
		if (myScore<61){
			winText.text="YOU GOT DOUBLE SKUNKED"
		} else if (myScore<91){
			winText.text="YOU GOT SKUNKED"
		} else {
			winText.text="YOU LOST"
		}
		pcWins++
		totalGames++
	}
	pcTotalPoints+=pcScore
	myTotalPoints+=myScore
	myScoreGameText.text = "W-"+myWins+" L-"+pcWins
	pcScoreGameText.text = "W-"+pcWins+" L-"+myWins
	myScoreAvgText.text = Math.round(myTotalPoints/totalGames)+" AVG"
	pcScoreAvgText.text = Math.round(pcTotalPoints/totalGames)+" AVG"
	pcScoreGameText.x=138-pcScoreGameText.textWidth/2
	pcScoreGameText.y=23-pcScoreGameText.textHeight/2
	myScoreGameText.x=138-myScoreGameText.textWidth/2
	myScoreGameText.y=328-myScoreGameText.textHeight/2
	pcScoreAvgText.x=138-pcScoreAvgText.textWidth/2
	pcScoreAvgText.y=48-pcScoreAvgText.textHeight/2
	myScoreAvgText.x=138-myScoreAvgText.textWidth/2
	myScoreAvgText.y=353-myScoreAvgText.textHeight/2
	gameOver=true
	var txtWdt:uint = winText.textWidth +5
    var txtHgt:uint = winText.textHeight +5
    winText.x=-txtWdt/2
    winText.y=-txtHgt/2
    winText.width=txtWdt
    winShape.graphics.lineStyle(1,0x000000,0,true)
    winShape.graphics.beginFill(0x000000,1)
    winShape.graphics.drawRoundRect(-10-txtWdt/2,-10-txtHgt/2,txtWdt+20,txtHgt+20,20,20)
    winShape.graphics.beginFill(0xffffff,1)
    winShape.graphics.drawRoundRect(-5-txtWdt/2,-5-txtHgt/2,txtWdt+10,txtHgt+10,15,15)
    cutDeckText.text="NEW GAME"
	cutDeckButton.addEventListener(MouseEvent.CLICK,resetGame)
    function resetGame(event:Event){
        gameOver=false
		cutDeckText.text=""
		if (myDealGame){
			myDeal=false
			myDealGame=false
    	} else {
			myDeal=true
			myDealGame=true
    	}
		drawCardBack(dealButton)
		myScore=0
		pcScore=0
		tallyPoints(true)
		tallyPoints(false)
		var numKids:uint = winSprite.numChildren
		for (var i:uint=0;i<numKids;i++){
			winSprite.removeChildAt(0)
		}
		clearCards()
		sortDeck()
		cutDeckButton.removeEventListener(MouseEvent.CLICK,resetGame)
		var tallyChildren:uint=tallySprite.numChildren
		for (var i:uint=0;i<tallyChildren;i++){
			tallySprite.removeChildAt(0)
		}
    }
	
}
function makeButton(cardSprite:Sprite){
	var cardShape:Shape = new Shape()
	cardSprite.addChild(cardShape)
	cardSprite.addChild(cardText)
	cardShape.graphics.lineStyle(1,0x000000,0,true);
	cardShape.graphics.beginFill(0xffffff);
	cardShape.graphics.drawRoundRect(15, 265, 160, 35,15,15);
	cardText.x=20
	cardText.y=270
	cardText.width=150
	cardText.defaultTextFormat=buttonFormat
	cardText.embedFonts = true;
	cardText.autoSize=TextFieldAutoSize.CENTER
	cardText.selectable=false
	cardText.mouseEnabled = false
	cardText.text="TO CRIB"
	cardSprite.addEventListener(MouseEvent.CLICK,addToCrib)
	function addToCrib(event:Event){
		if (!gameOver){
			if (mineToCrib.length==2){
				mineToCrib.sort(Array.DESCENDING)
				for (i=0;i<2;i++){
					cribHand.push(myHand.splice(mineToCrib[i],1))
					cardHolderMine.removeChildAt(mineToCrib[i])
					var newCard:Sprite = new Sprite()
					newCard.x=50+cardHolderCrib.numChildren*30
					newCard.y=205
					drawCardBack(newCard)
					cardHolderCrib.addChild(newCard)
				}
				if (!myDeal){
					displayHand(false, false, 4)
					for (i = 0;i<2;i++){
						var newCard:Sprite = new Sprite()
						newCard.x=50+cardHolderCrib.numChildren*30
						newCard.y=205
						drawCardBack(newCard)
						cardHolderCrib.addChild(newCard)
					}
				}
				displayHand(true, true, 4)
				cutCards()
				cardSprite.removeEventListener(MouseEvent.CLICK,addToCrib)
			}
		}
	}
}
function drawCardBack(cardSprite:Sprite){
	var count:uint = cardSprite.numChildren;
    for(var i:uint=0;i<count;i++){
        cardSprite.removeChildAt(0);
    }
	var cardShape:Shape = new Shape()
	var cardDeco:cardBacking = new cardBacking()
	cardSprite.addChild(cardShape)
	cardSprite.addChild(cardDeco)
	cardShape.graphics.lineStyle(1,0x444444,1,true);
	cardShape.graphics.beginFill(0x000000);
	cardShape.graphics.drawRoundRect(-30, -50, 60, 100,20,20);
}
function drawCardFront(cardSprite:Sprite,cardDispNum:uint,litup:Boolean=true){
	var count:uint = cardSprite.numChildren;
    for(var i:uint=0;i<count;i++){
        cardSprite.removeChildAt(0);
    }
	var newMyCardVals:cardVal = new cardVal()
	newMyCardVals.gotoAndStop(cardDispNum+1)
	var newMyCardVals2:cardVal = new cardVal()
	newMyCardVals2.gotoAndStop(cardDispNum+1)
	var newMyCardShape:Shape = new Shape()
	newMyCardShape.graphics.lineStyle(1,0x000000,.1,true);
	if (litup){
		newMyCardShape.graphics.beginFill(0xffffff);
	} else {
		newMyCardShape.graphics.beginFill(0x999999);
	}
	newMyCardShape.graphics.drawRoundRect(-30, -50, 60, 100,20,20);
	newMyCardVals.x=-35
	newMyCardVals.y=-55
	newMyCardVals.width*=2
	newMyCardVals.height*=2
	newMyCardVals2.x=35
	newMyCardVals2.y=55
	newMyCardVals2.rotation=180
	newMyCardVals2.width*=2
	newMyCardVals2.height*=2
	cardSprite.addChild(newMyCardShape)
	cardSprite.addChild(newMyCardVals)
	cardSprite.addChild(newMyCardVals2)
}
function tallyPoints(mine:Boolean){
	if (mine){
		var childs:uint = myScoreSprite.numChildren
		for (var i:uint =0;i<childs;i++){
			myScoreSprite.removeChildAt(0)
		}
		myScoreText.text=""+myScore
		myScoreText.x=60-myScoreText.textWidth/2
		myScoreText.y=340-myScoreText.textHeight/2
		var theScorePoint:Shape = new Shape()
		myScoreSprite.addChild(theScorePoint)
		for (var i:uint=0;i<120;i++){
            var theX:uint = i%15
            var theY:uint = i/15
            if (i<myScore) {
                theScorePoint.graphics.beginFill(0xbf1e1e);
            } else {
                theScorePoint.graphics.beginFill(0x000000);
            }
            theScorePoint.graphics.drawRect(21+theX*10, 375+theY*7, 8, 5);
        }
	} else {
		var childs:uint = pcScoreSprite.numChildren
		for (var i:uint =0;i<childs;i++){
			pcScoreSprite.removeChildAt(0)
		}
		var thisText:TextField = new TextField()
		pcScoreText.text=""+pcScore
		pcScoreText.x=60-pcScoreText.textWidth/2
		pcScoreText.y=35-pcScoreText.textHeight/2
		var theScorePoint:Shape = new Shape()
		pcScoreSprite.addChild(theScorePoint)
		for (var i:uint=0;i<120;i++){
            var theX:uint = i%15
            var theY:uint = i/15
            if (i<pcScore) {
                theScorePoint.graphics.beginFill(0xbf1e1e);
            } else {
                theScorePoint.graphics.beginFill(0x000000);
            }
            theScorePoint.graphics.drawRect(21+theX*10, 70+theY*7, 8, 5);
        }
	}
}
function cutCards(){
	trace(deck.length+"decklength")
	if (!myDeal){
		cutDeckText.text = "CUT DECK"
		cutDeckButton.addEventListener(MouseEvent.CLICK, myCut)
		function myCut(event:Event){
			if (!gameOver){
				cutDeckText.text = ""
				cutCard = Math.min(cutDeckButton.mouseY*2+(Math.random()*2),39)
				trace(cutCard)
				cutCard = deck[cutCard]
				trace(cutCard)
				drawCardFront(dealButton,cutCard)
				cutDeckButton.removeEventListener(MouseEvent.CLICK, myCut)
				if (Math.floor(cutCard/4)==10){
					addPoints(false, 530, 210, 2)
				}
				startPlay()
			} else {
				cutDeckButton.removeEventListener(MouseEvent.CLICK, myCut)
			}
		}
	} else {
		cutCard = Math.random()*40
		trace(cutCard)
		cutCard = deck[cutCard]
		trace(cutCard)
		drawCardFront(dealButton,cutCard)
		if (Math.floor(cutCard/4)==10){
			addPoints(true, 530, 210, 2)
		}
		startPlay()
	}
	cardsAvail[uint(cutCard/4)]--
	trace (cardsAvail)
}
function countUp(){
	var tallyChildren:uint=tallySprite.numChildren
	for (var i:uint=0;i<tallyChildren;i++){
		tallySprite.removeChildAt(0)
	}
	clearCards()
	displayHand(false, true, 4)
	displayHand(true, true, 4)
	for (i=0;i<4;i++){
		var newCribCard:Sprite = new Sprite()
		newCribCard.x=55+cardHolderCrib.numChildren*30
		newCribCard.y=205
		drawCardFront(newCribCard,cribHand[i])
		cardHolderCrib.addChild(newCribCard)
	}
	cribHand.push(cutCard)
	myHand.push(cutCard)
	pcHand.push(cutCard)
	var myDealTemp:Boolean = myDeal
	var addpointsTimer:Timer = new Timer(1000, 3);
	addpointsTimer.addEventListener(TimerEvent.TIMER, throwPoint);
	addpointsTimer.start();
	function throwPoint(event:Event){
		if (!gameOver){
			if (event.target.currentCount==1){
				if (myDealTemp){
					addPoints(false,300,75,scoreHand(pcHand))
				} else {
					addPoints(true,300,375,scoreHand(myHand))
				}
			} else if(event.target.currentCount==2){
				if (!myDealTemp){
					addPoints(false,300,75,scoreHand(pcHand))
				} else {
					addPoints(true,300,375,scoreHand(myHand))
				}
			} else {
				if (myDealTemp){
					addPoints(true,100,225,scoreHand(cribHand,true))
				} else {
					addPoints(false,100,225,scoreHand(cribHand,true))
				}
			}
		}
	}
	cutDeckText.text = "RE DEAL"
	cutDeckButton.addEventListener(MouseEvent.CLICK, reDeal)
	function reDeal(event:Event){
		if (!gameOver){
			if (myDeal){
				myDeal=false
    		} else {
				myDeal=true
    		}
			clearCards()
			drawCardBack(dealButton)
			sortDeck()
			cutDeckButton.removeEventListener(MouseEvent.CLICK, reDeal)
		} else {
			cutDeckButton.removeEventListener(MouseEvent.CLICK, reDeal)
		}
	}
}
function addPoints(isMine:Boolean, startX:int, startY:int, numPoints:uint){
    if (isMine){
        myScore=Math.min(myScore+numPoints,121)
        tallyPoints(true)
        var endX = 100
        var endY = 375
		if (myScore==121){
			winGame(true)
		}
    } else {
        pcScore=Math.min(pcScore+numPoints,121)
        tallyPoints(false)
        var endX = 100
        var endY = 75
		if (pcScore==121){
			winGame(false)
		}
    }
    var pointSprite:Sprite = new Sprite()
    pointsAdd.addChild(pointSprite)
    pointSprite.x = startX
    pointSprite.y = startY
    var pointShape:Shape = new Shape()
    var pointText:TextField = new TextField()
    pointText.defaultTextFormat=addFormat
	pointText.embedFonts = true;
	pointText.autoSize=TextFieldAutoSize.CENTER
	pointText.selectable=false
	pointText.mouseEnabled = false
	pointText.text="+"+numPoints
    var txtWdt:uint = pointText.textWidth +5
    var txtHgt:uint = pointText.textHeight +5
    pointText.x=-txtWdt/2
    pointText.y=-txtHgt/2
    pointText.width=txtWdt
    pointSprite.addChild(pointShape)
    pointSprite.addChild(pointText)
    pointShape.graphics.lineStyle(1,0x000000,0,true)
    pointShape.graphics.beginFill(0x000000,1)
    pointShape.graphics.drawRoundRect(-10-txtWdt/2,-10-txtHgt/2,txtWdt+20,txtHgt+20,20,20)
    pointShape.graphics.beginFill(0xffffff,1)
    pointShape.graphics.drawRoundRect(-5-txtWdt/2,-5-txtHgt/2,txtWdt+10,txtHgt+10,15,15)
    pointSprite.addEventListener(Event.ENTER_FRAME,sendPoint)
    function sendPoint(event:Event){
        if (Math.abs(event.target.x-endX)<1&&Math.abs(event.target.y-endY)<1){
            event.target.x=endX
            event.target.y=endY
            event.target.alpha-=.05
            if (event.target.alpha<.05){
                pointsAdd.removeChild(event.target as DisplayObject)
                pointSprite.removeEventListener(Event.ENTER_FRAME,sendPoint)
            }   
        } else {
            event.target.x=event.target.x-(event.target.x-endX)*.35
            event.target.y=event.target.y-(event.target.y-endY)*.35
        }
    }
}
function displayHand(isMine:Boolean, isFaceup:Boolean, numCards:uint){
	if (isMine){
		var holderCount:uint = cardHolderMine.numChildren
		for (i = 0;i<holderCount;i++){
			cardHolderMine.removeChildAt(0)
		}
	} else {
		var holderCount:uint = cardHolderPc.numChildren
		for (i = 0;i<holderCount;i++){
			cardHolderPc.removeChildAt(0)
		}
	}
	if (isMine){
		var baseRotation:uint=180
		var baseY:int=350
	} else {
		var baseRotation:uint=360
		var baseY:int=-350
	}
	for (i = 0;i<numCards;i++){
		var newCard:Sprite = new Sprite()
		if (isFaceup){
			if (isMine){
				drawCardFront(newCard,myHand[i])
			} else {
				drawCardFront(newCard,pcHand[i])
			}
		} else {
			drawCardBack(newCard)
		}
		newCard.rotation=baseRotation-(numCards-1)*4+8*i
		newCard.y=225+baseY+Math.cos(newCard.rotation/180*Math.PI)*200
		newCard.x=335-Math.sin(newCard.rotation/180*Math.PI)*200
		if (isMine){
			cardHolderMine.addChild(newCard)
		} else {
			cardHolderPc.addChild(newCard)
		}
	}
}
function startPlay(){
    var myShortHand:Array = myHand.slice(0)
    var pcShortHand:Array = pcHand.slice(0)
    var playedHand:Array = new Array()
    var outplayHand:Array = new Array()
    var myGo:Boolean = false
    var pcGo:Boolean = false
    var cardNum:uint=0
    var cardCount:uint=0
	var saidGo=false
    if (myDeal){
        playpcCard()
    } else {
        playmyCard()
    }
	tallySprite.x = 230
	tallySprite.y = 225
    function runningTally(){
		var tallyChildren:uint=tallySprite.numChildren
		for (var i:uint=0;i<tallyChildren;i++){
			tallySprite.removeChildAt(0)
		}
		var tallyShape:Shape = new Shape()
		var tallyText:TextField = new TextField()
		tallyText.defaultTextFormat=addFormat
		tallyText.embedFonts = true;
		tallyText.autoSize=TextFieldAutoSize.CENTER
		tallyText.selectable=false
		tallyText.mouseEnabled = false
		tallyText.text=""+cardCount
		var txtWdt:uint = tallyText.textWidth +5
		var txtHgt:uint = tallyText.textHeight +5
		tallyText.x=-txtWdt/2
		tallyText.y=-txtHgt/2
		tallyText.width=txtWdt
		tallySprite.addChild(tallyShape)
		tallySprite.addChild(tallyText)
		tallyShape.graphics.lineStyle(1,0x000000,0,true)
		tallyShape.graphics.beginFill(0x000000,1)
		tallyShape.graphics.drawRoundRect(-10-(txtWdt/2),-10-(txtHgt/2),txtWdt+20,txtHgt+20,20,20)
		tallyShape.graphics.beginFill(0xffffff,1)
		tallyShape.graphics.drawRoundRect(-5-(txtWdt/2),-5-(txtHgt/2),txtWdt+10,txtHgt+10,15,15)
		tallySprite.addEventListener(Event.ENTER_FRAME,moveToCount)
		function moveToCount(event:Event){
			var endX:uint = 230+30*(cardNum-1)
			if (Math.abs(event.target.x-endX)<1){
				event.target.x=endX
				tallySprite.removeEventListener(Event.ENTER_FRAME,moveToCount)   
			} else {
				event.target.x=event.target.x-(event.target.x-endX)*.35			
			}
		}
	}
	for (i=0;i<cardHolderMine.numChildren;i++){
        var newMyCard:DisplayObject = cardHolderMine.getChildAt(i)
        newMyCard.addEventListener(MouseEvent.CLICK, playCard)
    }
    function scorePoints(scoreArray:Array){
        var pairs:Array = [0,0,2,6,12]
        var score:uint = 0
		var tempCount = 0
        for (var i:uint=0;i<scoreArray.length;i++){
        	tempCount+=Math.min(scoreArray[i]+1,10)
		}
		if (tempCount==15){
            score+=2
        } else if (tempCount==31){
            score+=1
        }
        var runLength:uint = 0
        for (i=0;i<scoreArray.length-2;i++){
            var newArray:Array = scoreArray.slice(i)
            newArray.sort(16)
            var allInARow:Boolean = true
            for (var j:uint=1;j<newArray.length;j++){
                if (newArray[j]!=newArray[j-1]+1){
                    allInARow=false
                }
            }
            if (allInARow){
                runLength=Math.max(runLength,newArray.length)
            }
        }
        score+=runLength
        var pairLength:uint = 0
        for (i=0;i<scoreArray.length-1;i++){
            var newArray:Array = scoreArray.slice(i)
			var allPaired:Boolean = true
            for (j=1;j<newArray.length;j++){
                if (newArray[j]!=newArray[j-1]){
                    allPaired=false
                }
            }
            if (allPaired){
                pairLength=Math.max(pairLength,newArray.length)
            }
        }
        score+=pairs[pairLength]
        return (score);
    }
    function resetDeck(){
        for (i=0;i<playedHand.length;i++){
            cardHolderCenter.removeChildAt(0)
        }
        for (i=0;i<playedHand.length;i++){
            var newCardBack:Sprite = new Sprite()
            newCardBack.x=230+30*i
            newCardBack.y=stage.stageHeight*.5+playedHand[i][1]
            drawCardFront(newCardBack,playedHand[i][0],false)
            cardHolderCenter.addChild(newCardBack)
        }
		saidGo = false
        outplayHand.length=0
        myGo = false
    	pcGo = false
		cardCount=0
		//runningTally()
		if (myShortHand.length>0||pcShortHand.length>0){
			if (!myTurn){
				playmyCard()
			} else {
				playpcCard()
			}
		} else {
			cutDeckText.text = "COUNT UP"
			cutDeckButton.addEventListener(MouseEvent.CLICK, myCount)
			function myCount(event:Event){
				if (!gameOver) {
					cutDeckText.text = ""
					countUp()
					cutDeckButton.removeEventListener(MouseEvent.CLICK, myCount)
				} else {
					cutDeckButton.removeEventListener(MouseEvent.CLICK, myCount)
				}
			}
		}
    }
    function playCard(event:Event){
        var arrayNum:uint = cardHolderMine.getChildIndex(event.currentTarget as DisplayObject)
		if (!gameOver&&myTurn&&(cardCount+Math.min(Math.floor(myShortHand[arrayNum]/4)+1,10))<32){
            event.currentTarget.removeEventListener(MouseEvent.CLICK, playCard)
            cardHolderMine.removeChildAt(arrayNum)
			var theButton:Sprite = new Sprite()
            cardHolderCenter.addChild(theButton)
            drawCardFront(theButton,myShortHand[arrayNum])
            theButton.y=stage.stageHeight*.5+15
            theButton.x=230+30*cardNum
            theButton.rotation=0
			cardNum++
            playedHand.push([myShortHand[arrayNum],15])
            outplayHand.push(Math.floor(myShortHand[arrayNum]/4))
            cardCount+=Math.min(Math.floor(myShortHand[arrayNum]/4)+1,10)
            cardsAvail[uint(myShortHand[arrayNum]/4)]--
			myShortHand.splice(arrayNum,1)
            checkGo()
			myTurn=false
			if (myGo&&pcGo){
				addPoints(true,225,300,scorePoints(outplayHand)+1)
			} else if (scorePoints(outplayHand)>0){
				addPoints(true,225,300,scorePoints(outplayHand))
			}
			runningTally()
			playpcCard()
        }
		
    }
	function checkGo(){
		myGo=true
        for (i=0;i<myShortHand.length;i++){
            var thisSprite:Sprite = cardHolderMine.getChildAt(i) as Sprite
			if ((cardCount+Math.min(Math.floor(myShortHand[i]/4)+1,10))<32){
                myGo=false
				drawCardFront(thisSprite,myShortHand[i],true)
            } else {
				drawCardFront(thisSprite,myShortHand[i],false)
			}
        }
		if (myShortHand.length==0){
			myGo=true
		}
		pcGo=true
        for (i = 0;i<pcShortHand.length;i++){
            if ((cardCount+Math.min(Math.floor(pcShortHand[i]/4)+1,10))<32){
                pcGo=false
            }
        }
		if (pcShortHand.length==0){
			pcGo=true
		}
	}
    function playmyCard(){
        checkGo()
		myTurn=true
		if (myGo){
			if (myShortHand.length>0&&!saidGo&&cardCount!=31){
				cutDeckText.text = "GO"
				cutDeckButton.addEventListener(MouseEvent.CLICK, myGoing)
				function myGoing(event:Event){
					if (!gameOver){
						cutDeckText.text = ""
						if (!pcGo){
							saidGo=true
							playpcCard()
						} else {
							if (cardCount!=31){
								addPoints(false,225,300,1)
							}
							myTurn=false
							resetDeck()
						}
						cutDeckButton.removeEventListener(MouseEvent.CLICK, myGoing)
					} else {
						cutDeckButton.removeEventListener(MouseEvent.CLICK, myGoing)
					}
				}
			} else {
				if (!pcGo){
					playpcCard()
				} else {
					myTurn=false
					resetDeck()
				}
			}
		}
    }
    function getBestCard(){
        trace("-----------start-----------------"+pcShortHand)
		var bestCard:uint = new uint()
        var bestCardScore:Number = -10
		var tempOutplay:Array = outplayHand.slice(0)
		var tempScore:Array = [cardCount]
		var tempPcHand:Array = new Array()
		var totalCounting:uint=0
        if (pcShortHand.length>1){
            for (i = 0;i<pcShortHand.length&&(tempScore[0]+Math.min(uint(pcShortHand[i]/4)+1,10)<32);i++){
                if (i==0||uint(pcShortHand[i]/4)!=uint(pcShortHand[i-1]/4)){
					totalCounting++
					tempOutplay[outplayHand.length]=uint(pcShortHand[i]/4)
					tempOutplay.length=outplayHand.length+1
					tempPcHand=pcShortHand.slice(0)
					tempPcHand.splice(i,1)
					tempScore[1]=tempScore[0]+Math.min(uint(pcShortHand[i]/4+1),10)
					var cs1:Array = [[scorePoints(tempOutplay),1],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
					//trace (tempOutplay+";"+scorePoints(tempOutplay))
					for (var j:uint=0;j<13&&tempScore[1]+Math.min(j+1,10)<32;j++){
						if (cardsAvail[j]>0){
							totalCounting++
							tempOutplay[outplayHand.length+1]=j+1
							tempOutplay.length=outplayHand.length+2
							cs1[2][0] =0
							cs1[2][1] =0
							tempScore[2]=tempScore[1]+Math.min(j+1,10)
							if (pcShortHand.length>1){
								for (var k:uint=0;k<tempPcHand.length&&tempScore[2]+Math.min(uint(tempPcHand[k]/4)+1,10)<32;k++){
									totalCounting++
									tempOutplay[outplayHand.length+2]=uint(tempPcHand[k]/4)
									tempOutplay.length=outplayHand.length+3
									tempPcHand= pcShortHand.slice(0)
									tempPcHand.splice(i,1)
									tempPcHand.splice(k,1)
									tempScore[3]=cardCount+Math.min(uint(tempPcHand[k]/4),10)
									cs1[2][0] += scorePoints(tempOutplay)
									cs1[2][1] += 1
									if (scorePoints(tempOutplay)>0){
										trace("sub set ("+scorePoints(tempOutplay)+") - "+tempOutplay)
									}
									//trace("subscore="+scorePoints(tempOutplay)+" of 1")
								}
								
								//negCardScore-=twoCardScore/sampleArray2.length
							}
							
							tempOutplay.length=outplayHand.length+2
							if (scorePoints(tempOutplay)!=0){
								trace("set ("+scorePoints(tempOutplay)*cardsAvail[j]+") - "+tempOutplay)
								//trace(scorePoints(tempOutplay)*cardsAvail[j]-(cs1[2][0]/cs1[2][1])+" of "+cardsAvail[j])
							}
							if (cs1[2][1]!=0){
								cs1[1][0] += scorePoints(tempOutplay)*cardsAvail[j]-(cs1[2][0]/cs1[2][1])
								//trace(scorePoints(tempOutplay)*cardsAvail[j]-(cs1[2][0]/cs1[2][1])+" of "+cardsAvail[j])
							} else {
								cs1[1][0] += scorePoints(tempOutplay)*cardsAvail[j]
								//trace(scorePoints(tempOutplay)*cardsAvail[j]+" of "+cardsAvail[j])
							}
							cs1[1][1] += cardsAvail[j]
							
							
							
						//cardScore-=negCardScore/39
						//if (cardScore>bestCardScore){
							//bestCardScore=cardScore
							//bestCard=i
						//}
						}
					}
					//trace("sub"+cs1[1][0]+" of "+cs1[1][1])
					if (cs1[1][1]!=0){
						cs1[0][0] -= (cs1[1][0]/cs1[1][1])
					}
					if (cs1[0][0]>bestCardScore){
						bestCardScore=cs1[0][0]
						bestCard=i
					}
					trace(uint((pcShortHand[i]/4)+1)+" scored "+cs1[0][0]+" ("+cs1[1][0]+" of "+cs1[1][1]+")")
					
				}
			}
				trace("number of calculations = "+totalCounting)
				trace(uint((pcShortHand[bestCard]/4)+1)+" is the best card")
			
        } else {
			bestCard=0
		}
		return(bestCard)
    }
    function playpcCard(){
        if (!gameOver){
			checkGo()
			var playCardNum:uint = getBestCard()
			if (!pcGo){
				cardHolderPc.removeChildAt(playCardNum)
				var theButton:Sprite = new Sprite()
				cardHolderCenter.addChild(theButton)
				drawCardFront(theButton,pcShortHand[playCardNum])
				theButton.y=stage.stageHeight*.5-15
				theButton.x=230+30*cardNum
				theButton.rotation=0
				cardNum++
				cardCount+=Math.min(Math.floor(pcShortHand[playCardNum]/4)+1,10)
				playedHand.push([pcShortHand[playCardNum],-15])
				outplayHand.push(Math.floor(pcShortHand[playCardNum]/4))
				pcShortHand.splice(playCardNum,1)
				checkGo()
				if (cardCount==31){
					addPoints(false,225,300,scorePoints(outplayHand)+1)
				} else {
					if ((myShortHand.length==0||saidGo)&&pcGo){
						addPoints(false,225,300,scorePoints(outplayHand)+1)
					} else if (scorePoints(outplayHand)>0){
						addPoints(false,225,300,scorePoints(outplayHand))
					}
				}
				runningTally()
				playmyCard()
			} else if (!myGo){
				playmyCard()
			} else {
				myTurn=true
				resetDeck()
			}
		}
    }
}
function makeBoard(){
	var boardSprite:Sprite = new Sprite()
	var boardShape:Shape = new Shape()
	stage.addChildAt(boardSprite,0)
	boardSprite.addChild(boardShape)
	//boardShape.graphics.lineStyle(1,0x000000,1,true);
	//----pc scorecard----//
	boardShape.graphics.beginFill(0x000000);
	boardShape.graphics.drawRoundRect(10, 10, 170, 125,20,20);
	boardShape.graphics.beginFill(0xffffff);
	boardShape.graphics.drawRoundRect(15, 15, 90, 44,15,15);
	boardShape.graphics.beginFill(0xffffff);
	boardShape.graphics.drawRoundRect(110, 15, 65, 19,15,15);
	boardShape.graphics.beginFill(0xffffff);
	boardShape.graphics.drawRoundRect(110, 39, 65, 20,15,15);
	boardShape.graphics.beginFill(0xffffff);
	boardShape.graphics.drawRoundRect(15, 64, 160, 66,15,15);
	/*for (var i:uint=0;i<120;i++){
		var theX:uint = i%15
		var theY:uint = i/15
		boardShape.graphics.beginFill(0x000000);
		boardShape.graphics.drawRect(21+theX*10, 70+theY*7, 8, 5);
	}*/
	//----my scorecard----//
	boardShape.graphics.beginFill(0x000000);
	boardShape.graphics.drawRoundRect(10, 315, 170, 125,20,20);
	boardShape.graphics.beginFill(0xffffff);
	boardShape.graphics.drawRoundRect(15, 320, 90, 44,15,15);
	boardShape.graphics.beginFill(0xffffff);
	boardShape.graphics.drawRoundRect(110, 320, 65, 19,15,15);
	boardShape.graphics.beginFill(0xffffff);
	boardShape.graphics.drawRoundRect(110, 344, 65, 20,15,15);
	boardShape.graphics.beginFill(0xffffff);
	boardShape.graphics.drawRoundRect(15, 369, 160, 66,15,15);
	/*for (var i:uint=0;i<120;i++){
		var theX:uint = i%15
		var theY:uint = i/15
		boardShape.graphics.beginFill(0x000000);
		boardShape.graphics.drawRect(21+theX*10, 375+theY*7, 8, 5);
	}*/
	//----crib----//
	boardShape.graphics.beginFill(0x000000);
	boardShape.graphics.drawRoundRect(10, 145, 170, 160,20,20);
	boardShape.graphics.beginFill(0xffffff);
	boardShape.graphics.drawRoundRect(15, 150, 160, 110,15,15);
	boardShape.graphics.beginFill(0xffffff);
	boardShape.graphics.drawRoundRect(15, 265, 160, 35,15,15);
	//----playing field----//
	boardShape.graphics.beginFill(0x000000);
	boardShape.graphics.drawRoundRect(190, 145, 290, 160,20,20);
	boardShape.graphics.beginFill(0xffffff);
	boardShape.graphics.drawRoundRect(195, 150, 280, 150,15,15);
	//----deck----//
	boardShape.graphics.beginFill(0x000000);
	boardShape.graphics.drawRoundRect(490, 145, 100, 160,20,20);
	boardShape.graphics.beginFill(0xffffff);
	boardShape.graphics.drawRoundRect(495, 150, 90, 110,15,15);
	//----multi purpose button-----//
	myScoreText.defaultTextFormat=scoreFormat
	pcScoreText.defaultTextFormat=scoreFormat
	myScoreGameText.defaultTextFormat=score2Format
	pcScoreGameText.defaultTextFormat=score2Format
	myScoreAvgText.defaultTextFormat=score2Format
	pcScoreAvgText.defaultTextFormat=score2Format
	myScoreText.embedFonts = true;
	pcScoreText.embedFonts = true;
	myScoreGameText.embedFonts = true;
	pcScoreGameText.embedFonts = true;
	myScoreAvgText.embedFonts = true;
	pcScoreAvgText.embedFonts = true;
	myScoreText.selectable=false
	pcScoreText.selectable=false
	myScoreGameText.selectable=false
	pcScoreGameText.selectable=false
	myScoreAvgText.selectable=false
	pcScoreAvgText.selectable=false
	myScoreGameText.text = "W-0 L-0"
	pcScoreGameText.text = "W-0 L-0"
	myScoreAvgText.text = "0 AVG"
	pcScoreAvgText.text = "0 AVG"
	
	pcScoreGameText.x=138-pcScoreGameText.textWidth/2
	pcScoreGameText.y=23-pcScoreGameText.textHeight/2
	myScoreGameText.x=138-myScoreGameText.textWidth/2
	myScoreGameText.y=328-myScoreGameText.textHeight/2
	pcScoreAvgText.x=138-pcScoreAvgText.textWidth/2
	pcScoreAvgText.y=48-pcScoreAvgText.textHeight/2
	myScoreAvgText.x=138-myScoreAvgText.textWidth/2
	myScoreAvgText.y=353-myScoreAvgText.textHeight/2
	
	
	/*myScoreText.x
	pcScoreText.x
	myScoreGameText.x
	pcScoreGameText.x
	myScoreAvgText.x
	pcScoreAvgText.x
	myScoreText.y
	pcScoreText.y
	myScoreGameText.y
	pcScoreGameText.y
	myScoreAvgText.y
	pcScoreAvgText.y*/
	cutDeckText.x=500
	cutDeckText.y=270
	cutDeckText.width=80
	cutDeckText.defaultTextFormat=buttonFormat
	cutDeckText.embedFonts = true;
	cutDeckText.autoSize=TextFieldAutoSize.CENTER
	cutDeckText.selectable=false
	cutDeckText.mouseEnabled = false
	drawCardBack(dealButton)
	dealButton.x=540
	dealButton.y=205
	var cutShape:Shape = new Shape()
	boardSprite.addChild(dealButton)
	boardSprite.addChild(cutDeckButton)
	cutDeckButton.addChild(cutShape)
	cutDeckButton.x=0
	cutDeckButton.y=0
	cutShape.graphics.beginFill(0xffffff);
	cutShape.graphics.drawRoundRect(495, 265, 90, 35,15,15);
	boardSprite.addChild(cutDeckText)
}
function getBestHand() {
	var cribhand:Array = new Array();
	var keephand:Array = new Array();
	var highscore:int = -1000;
	for (var i:uint=0; i<6; i++) {
		for (var j:uint=i+1; j<6; j++) {
			var sampleHand:Array = new Array();
			var thisscore:int = 0
			for (var k:uint=0; k<6; k++) {
				if (k!=i&&k!=j) {
					sampleHand.push(pcHand[k]);
				}
			}
			for (k=0; k<46; k++) {
				sampleHand[4]=deck[k];
				thisscore+= scoreHand(sampleHand);
			}
			if (myDeal){
				thisscore-=pcCribArray[Math.floor(pcHand[i]%4)][Math.floor(pcHand[j]%4)]
			} else {
				thisscore+=myCribArray[Math.floor(pcHand[i]%4)][Math.floor(pcHand[j]%4)]
			}
			if (thisscore>highscore){
				highscore=thisscore
				keephand=sampleHand.slice(0,4)
				cribhand=[pcHand[i],pcHand[j]]
			}
		}
	}
	cribHand.push(cribhand[0])
	cribHand.push(cribhand[1])
	pcHand=keephand.slice(0)
	deck.splice(0,6)
}
function scoreHand(hand:Array, isCrib:Boolean=false) {
	var score:uint=0;
	var cardcount:Array=[0,0,0,0,0,0,0,0,0,0,0,0,0];
	var suitcount:Array=[0,0,0,0];
	var caAR:Array = new Array()
	for (i=0;i<5;i++){
		cardcount[Math.floor(hand[i]/4)]+=1;
		suitcount[(hand[i]%4)]+=1;
		caAR[i]=Math.min((Math.floor(hand[i]/4)+1),10)
		if (Math.floor(hand[i]/4)==10&&i!=4&&(hand[i]%4)==(hand[4]%4)){
			score+=1
		}
	};
	for (i=0;i<4;i++){
		if (suitcount[i]==4&&(hand[4]%4)!=i&&!isCrib){
			score+=4
		} else if (suitcount[i]==5){
			score+=5
		}
	};
	var cnt:uint=0;
	var dup:uint=1;
	for (var n:uint=0; n<13; n++) {
		if (cardcount[n]==4) {
			score+=12;
		} else if (cardcount[n]==3) {
			score+=6;
		} else if (cardcount[n]==2) {
			score+=2;
		}
		if (n<9&&cardcount[n]>0&&cardcount[n+1]>0&&cardcount[n+2]>0&&cardcount[n+3]>0&&cardcount[n+4]>0) {
			cnt=5;
		}
		if (n<10&&cnt<5&&cardcount[n]>0&&cardcount[n+1]>0&&cardcount[n+2]>0&&cardcount[n+3]>0) {
			cnt=4;
			dup=cardcount[n]*cardcount[n+1]*cardcount[n+2]*cardcount[n+3];
		}
		if (n<11&&cnt<4&&cardcount[n]>0&&cardcount[n+1]>0&&cardcount[n+2]>0) {
			cnt=3;
			dup=cardcount[n]*cardcount[n+1]*cardcount[n+2];
		}
		var runs:uint=cnt*dup;
	}
	score+=runs
	for (var s:uint=0; s<5; s++) {
		for (var t:uint=s+1; t<5; t++) {
			if (caAR[s]+caAR[t]==15) {
				score+=2;
			}
			for (var u:uint=t+1; u<5; u++) {
				if (caAR[s]+caAR[t]+caAR[u]==15) {
					score+=2;
				}
				for (var v:uint=u+1; v<5; v++) {
					if (caAR[s]+caAR[t]+caAR[u]+caAR[v]==15) {
						score+=2;
					}
					for (var w:uint=v+1; w<5; w++) {
						if (caAR[s]+caAR[t]+caAR[u]+caAR[v]+caAR[w]==15) {
							score+=2;
						}
					}
				}
			}
		}
	}
	return(score)
}
function showDeal(){
	var minuteTimer:Timer = new Timer(100, 12);
	minuteTimer.addEventListener(TimerEvent.TIMER, throwCard);
	minuteTimer.start();
	function throwCard(event:TimerEvent){
		if (myDeal){
			var val:int=(event.target.currentCount%2)*2-1
		} else {
			var val:int=-((event.target.currentCount%2)*2-1)
		}
		var count:uint=event.target.currentCount
		var newCard:Sprite = new Sprite()
		drawCardBack(newCard)
		newCard.x=540
		newCard.y=205
		cardHolder.addChild(newCard)
		var endX:int = 250+Math.random()*200
		var endY:int = 225+125*val+Math.random()*50*val
		var endR:int = -360+Math.random()*720
		newCard.addEventListener(Event.ENTER_FRAME,sendCard);
		var cardR:int = newCard.rotation
		function sendCard(event:Event) {
			newCard.x=newCard.x+(endX-newCard.x)*.45
			newCard.y=newCard.y+(endY-newCard.y)*.45
			cardR=cardR+(endR-cardR)*.45
			newCard.rotation=cardR
			if (Math.abs(newCard.x-endX)<1){
				newCard.x=endX
				newCard.y=endY
				newCard.rotation=endR
				newCard.removeEventListener(Event.ENTER_FRAME,sendCard);
				if (count==12){
					showHands()
				}
			}
		}
	}
}
function showHands(){
	for (i = 0;i<12;i++){
		cardHolder.removeChildAt(0)
	}
	if (myDeal){
		displayHand(false, false, 4)
		for (i = 0;i<2;i++){
			var newCard:Sprite = new Sprite()
			newCard.x=50+cardHolderCrib.numChildren*30
			newCard.y=205
			drawCardBack(newCard)
			cardHolderCrib.addChild(newCard)
		}
	} else {
		displayHand(false, false, 6)
	}
	mineToCrib.length=0	
	for (i = 0;i<6;i++){
		var newMyCard:Sprite = new Sprite()
		drawCardFront(newMyCard,myHand[i])
		newMyCard.rotation=340+8*i
		newMyCard.y=575-Math.cos(newMyCard.rotation/180*Math.PI)*200
		newMyCard.x=335+Math.sin(newMyCard.rotation/180*Math.PI)*200
		cardHolderMine.addChild(newMyCard)
		clickButton(newMyCard,i)
		function clickButton(theButton:Sprite,whichCard:uint){
			theButton.addEventListener(MouseEvent.CLICK, largeSmall)
			function largeSmall(event:Event){
				if (mineToCrib.length<2){
					if (mineToCrib.length==1){
					mineToCrib[1]=mineToCrib[0]
					}
					mineToCrib[0]=whichCard
					theButton.y=575-Math.cos(theButton.rotation/180*Math.PI)*240
					theButton.x=335+Math.sin(theButton.rotation/180*Math.PI)*200
					theButton.addEventListener(MouseEvent.CLICK, smallLarge)
					theButton.removeEventListener(MouseEvent.CLICK, largeSmall)
				}
			}
			function smallLarge(event:Event){
				for (var j:uint=0;j<mineToCrib.length;j++){
					if (mineToCrib[j]==whichCard){
						mineToCrib.splice(j,1)
					}
				}
				theButton.y=575-Math.cos(theButton.rotation/180*Math.PI)*200
				theButton.x=335+Math.sin(theButton.rotation/180*Math.PI)*200
				theButton.addEventListener(MouseEvent.CLICK, largeSmall)
				theButton.removeEventListener(MouseEvent.CLICK, smallLarge)
			}
		}
	}
}
function createDeck(arraySize:Number):Array {
	var array:Array = new Array();
	for (i=0; i<arraySize; i++) {
		array[i] = i;
	}
	return array;
}





