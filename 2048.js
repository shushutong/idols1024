var score = 0;
var board = new Array();
var hasConflicted = new Array();

$(document).ready(function(){

	//初始化
	setGrid();	

	$("#newgame").on("click",function(){
		setGrid();
	})
})

//根据按键判断移动方向
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			if(moveLeft()){
				setTimeout("generateNumber()",210);
				setTimeout("gameover()",300);
			}
			break;
		case 38://up
			if(moveUp()){
				setTimeout("generateNumber()",210);
				setTimeout("gameover()",300);
			}
			break;
		case 39://right
			if(moveRight()){
				setTimeout("generateNumber()",210);
				setTimeout("gameover()",300);
			}
			break;
		case 40://down
			if(moveDown()){
				setTimeout("generateNumber()",210);
				setTimeout("gameover()",300);
			}
			break;
		default:
			break;
	}
})

//游戏结束
function gameover(){
	
	if(canMoveLeft(board))
		return false;
	if(canMoveUp(board))
		return false;
	if(canMoveRight(board))
		return false;
	if(canMoveDown(board))
		return false;
	var gameover = "<div id='cover'></div><div id='over'><h2>游戏结束</h2><a id='restart'>再玩一次</a></div>"
	$("#container").append(gameover);
	$("#restart").on("click",function(){
		setGrid();
	})
}

//向左移动
function moveLeft(){
	if(!canMoveLeft(board))
		return false;

	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
			if(board[i][j] != 0)
				for(var k=0;k<j;k++)
					if(board[i][k] == 0&&noBlockX(i,k,j,board)){
						//
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j]&&noBlockX(i,k,j,board)&&!hasConflicted[i][k]){
						//
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						hasConflicted[i][k] = true;
						score += board[i][k];
						updatescore(score,board[i][k]);
						continue;
					}

	setTimeout("update()",200);
	return true;
}
//
function moveUp(){
	if(!canMoveUp(board))
		return false;

	for(var j=0;j<4;j++)
		for(var i=0;i<4;i++)
			if(board[i][j] != 0)
				for(var k=0;k<i;k++)
					if(board[k][j] == 0&&noBlockY(j,k,i,board)){
						//
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j] == board[i][j]&&noBlockY(j,k,i,board)&&!hasConflicted[k][j]){
						//
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						hasConflicted[k][j] = true;
						score += board[k][j];
						updatescore(score,board[k][j]);
						continue;
					}

	setTimeout("update()",200);
	return true;
}
//
function moveRight(){
	if(!canMoveRight(board))
		return false;

	for(var i=0;i<4;i++)
		for(var j=3;j>=0;j--)
			if(board[i][j] != 0)
				for(var k=3;k>j;k--)
					if(board[i][k] == 0&&noBlockX(i,j,k,board)){
						//
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j]&&noBlockX(i,j,k,board)&&!hasConflicted[i][k]){
						//
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						hasConflicted[i][k] = true;
						score += board[i][k];
						updatescore(score,board[i][k]);
						continue;
					}

	setTimeout("update()",200);
	return true;
}
//
function moveDown(){
	if(!canMoveDown(board))
		return false;

	for(var j=0;j<4;j++)
		for(var i=3;i>=0;i--)
			if(board[i][j] != 0)
				for(var k=3;k>i;k--)
					if(board[k][j] == 0&&noBlockY(j,i,k,board)){
						//
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j] == board[i][j]&&noBlockY(j,i,k,board)&&!hasConflicted[k][j]){
						//
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						hasConflicted[k][j] = true;
						score += board[k][j];
						updatescore(score,board[k][j]);
						continue;
					}

	setTimeout("update()",200);
	return true;
}
//初始化的函数
function setGrid(){

	$("#cover").remove();
	$("#over").remove();

	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var $gridCell = $("#grid-"+i+"-"+j);
			$gridCell.css({
				top:getPosTop(i,j),
				left:getPosLeft(i,j)
			})
		}
	}
	for(var i=0;i<4;i++){
		board[i] = new Array();
		hasConflicted[i] =new Array();
		for(var j=0;j<4;j++){
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}

	score = 0;
	updatescore(score);
	update()
	//调用随机生成函数2次
	generateNumber();
	generateNumber();
}

function update(){
	
	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var  numberBox = '<div class="number-cell" id="number-' +i+'-'+j+'"></div>'
			$("#container").append(numberBox);
			var theNumberCell = $("#number-"+i+"-"+j);



			if(board[i][j] == 0){
				theNumberCell.css({
					width:"0px",
					height:"0px",
					top:getPosTop(i,j)+50,
					left:getPosLeft(i,j)+50
				})
			}else{
				theNumberCell.css({
					width:"100px",
					height:"100px",
					top:getPosTop(i,j),
					left:getPosLeft(i,j),
					backgroundColor:getBackColor(board[i][j]),
					color:getNumberColor(board[i][j])
				}).text(board[i][j])
			}
			hasConflicted[i][j] = false;
		}

		
	}
}

function generateNumber(){
	if(nospace(board))
		return false;

	//随机位置
	var randx = parseInt(Math.floor(Math.random()*4));
	var randy = parseInt(Math.floor(Math.random()*4));
	var times = 0;
	while(times<50){
		if(board[randx][randy] == 0)
			break;
		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));

		times++;
	}
	if(times == 50){
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++)
				if(board[i][j] == 0)
					randx = i;
					randy = j;
	}
	//随机数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;
	//合成
	board[randx][randy] = randNumber;
	showNumberAnimation(randx,randy,randNumber);
	return true;
}



function showNumberAnimation(i,j,randNumber){
	var numbercell = $("#number-"+i+"-"+j);

	numbercell.css({
		backgroundColor:getBackColor(randNumber),
		color:getNumberColor(randNumber)
	})
	numbercell.text(randNumber);

	numbercell.animate({
		width:"100px",
		height:"100px",
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50)
}