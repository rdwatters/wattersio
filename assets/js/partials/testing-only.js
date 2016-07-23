function tSL(evt){
	var searchVal = document.getElementById('search-input').value;
	var theLink = evt.target.attr('href');
	console.log(searchVal);
	console.log(theLink);
	return false;
}