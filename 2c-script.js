	   var r = new XMLHttpRequest();
	   r.open("GET", "http://pb-api.herokuapp.com/bars", true);
	   r.onreadystatechange = function () {
	   	if (r.readyState != 4 || r.status != 200) return;
	   	//alert("Success: " + r.responseText);

	   	var data = JSON.parse(r.responseText);
	   	if (data) {
	   		document.getElementById("limitValue").value = data.limit; /*putting limit value to input*/

	   		/*creating buttons*/
	   		data.buttons.map((item) => {

	   			var btn = document.createElement("button");
	   			btn.innerText = item; // Create a <button> element
	   			btn.setAttribute("onclick", "barCal(" + item + ")");
	   			document.getElementById("btns").append(btn); // adding text

	   		});

	   		data.bars.map((item, index) => {

	   			var sel = document.getElementById('progress_bar'); /*creating progress bar div*/
	   			var opt = document.createElement('option');
	   			var counter = Number(index) + 1;
	   			opt.appendChild(document.createTextNode('#progress' + counter));
	   			opt.value = item;
	   			sel.appendChild(opt);

	   			g = document.createElement('div'); /*creating progress bar div*/
	   			g.setAttribute("class", "progress-wrap");
	   			g.setAttribute("id", "progress-" + item);
	   			document.getElementById("main").append(g);

	   			var divElement1 = document.createElement('div'); /*creating progress bar div*/
	   			divElement1.setAttribute("class", "progress-bar");
	   			divElement1.setAttribute("id", "pb-demo-" + item);
	   			document.getElementById("progress-" + item).append(divElement1);

	   			var divElement2 = document.createElement('div'); /*creating progress bar div*/
	   			divElement2.setAttribute("class", "progress-text");
	   			divElement2.setAttribute("id", "pb-text-" + item);
	   			divElement2.innerText = item + '%';
	   			document.getElementById("progress-" + item).append(divElement2);

	   			var input = document.createElement('input'); /*creating input for current value div*/
	   			input.setAttribute("id", "cur-" + item);
	   			input.setAttribute("value", item);
	   			input.setAttribute("type", "hidden");
	   			document.getElementById("inputs").append(input);

	   			var bar = document.getElementById("pb-demo-" + item); /*creating default percent*/
	   			var text = document.getElementById("pb-text-" + item);
	   			bar.style.width = item + "%";
	   			text.innerHTML = item + "%"


	   		});
	   	}
	   };
	   r.send("banana=yellow");
	   //let data={"buttons":[21,25,-17,-46],"bars":[77,70,38],"limit":220}



	   function barCal(percent) {

	   	var selectBox = document.getElementById("progress_bar").value;

	   	var bar = document.getElementById("pb-demo-" + selectBox);
	   	var text = document.getElementById("pb-text-" + selectBox);
	   	var cvalue = document.getElementById("cur-" + selectBox).value;
	   	var lvalue = document.getElementById("limitValue").value;


	   	var finalPercent = Number(percent) + Number(cvalue);
	   	if (finalPercent <= lvalue) {
	   		if (finalPercent <= 0) {
	   			finalPercent = 0;
	   		}
	   		document.getElementById("cur-" + selectBox).value = finalPercent;
	   		if (finalPercent >= 100) {
	   			bar.classList.add("redc");
	   		} else {
	   			bar.classList.remove("redc");
	   		}
	   		bar.style.width = finalPercent + '%';
	   		text.innerHTML = finalPercent + '%';
	   		return false;
	   	}

	   }