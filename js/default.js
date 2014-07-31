(function(){
	'use strict';
	
	var progress = document.getElementById('progress')
		,PACKS_SIZE = 30
		,handler;
	
	var getRandomColor = function(){
		var letters = '0123456789ABCDEF'.split(''),
			color = '#';
			
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};
		
	var perform = function(el, content, i, arr){
		
		if(handler){
			handler = window.clearTimeout();
		}
		
		handler = window.setTimeout(function(){
			el.innerHTML += content.join(' ');
			
			if(i >= arr.length - 1){
				document.getElementById('preloader').style.display = 'none';
				progress.style.display = 'none';
				document.getElementById('pascalsTriangle').style.display = 'block';
				progress.innerHTML = '100%';	
				arr = null;
			}
			else{
				//set progress	
				progress.innerHTML = (i*100/arr.length).toFixed(2) + '%';				
				appendLargeHTML(el, arr, i);
			}
			
			content = [];
		}, 100);
	};
	
	var appendLargeHTML = function(el, arr, i){
	
		var packsCounter = 0,
			helper = [];
	
		while(i<arr.length && packsCounter <= PACKS_SIZE){
			
			helper.push(arr[i]);
			packsCounter++;
			i++;
		}
		
		perform(el, helper, i, arr);
	};
	
	var buildPascal = function(rows){
	
		var arr = [],
			row,
			leftIndex,
			rightIndex,
			prevRowIndex,
			prevRow,
			leftValue,
			rightValue,
			htmlList=[],
			html,
			ulWidth,
			LI_WIDTH = 34;			
			
		document.getElementById('pascalsTriangle').innerHTML = '';
		
		for(var i=0; i<rows; i++){
		
			row = [];
			
			for(var j=0; j<=i; j++){
				
				leftIndex = j - 1;
				rightIndex = j + 1;
				
				if(leftIndex < 0 || rightIndex > i){
					row.push(1);
				}				
				else{
					prevRowIndex = i - 1;								
					
					if(prevRowIndex < 0){
						row.push(1);
					}
					else{
						prevRow = arr[prevRowIndex];	
						
						leftValue = prevRow[leftIndex];
						rightValue = prevRow[rightIndex - 1];
						
						row.push(leftValue + rightValue);
					}
				}							
			}
			
			arr.push(row);
		}
							
		for(var i=0; i<arr.length; i++){			
			
			html = '';
			row = arr[i];
			ulWidth = row.length * (LI_WIDTH + 2);
			html += '<ul style="width: ' + ulWidth + 'px">';
			
			for(var j=0; j<row.length; j++){
				html += '<li style="background-color: ' + getRandomColor() + '" title="' + row[j] + '">' + row[j] + '</li>';		
			}
			
			html += '</ul>';
			
			htmlList.push(html);
		}
		
		document.getElementById('preloader').style.display = 'block';
		progress.style.display = 'block';
		document.getElementById('pascalsTriangle').style.display = 'none';
		
		appendLargeHTML(document.getElementById('pascalsTriangle'), htmlList, 0);
	};
	
	var initEvents = function(){
	
		var btnEl = document.getElementById('btn');
		
		btnEl.addEventListener('click', function(){
			var rows;
			rows = window.prompt('Enter depth', '');
			
			rows = parseInt(rows);
			if(!isNaN(rows)){
				buildPascal(rows);
			}
		}, false);
		
	};
	
	buildPascal(30);
	initEvents();
	
})();