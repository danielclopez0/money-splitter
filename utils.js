//do some validation and call moneySplitter()
$('#compute').click(() => {
	const total = Number($('#total').val());
	let amount = Number($('#amount').val());

	//validate the total
	if(isNaN(parseFloat(total)) || !isFinite(total) || total <= 0) {
		alert('Please enter a positive number into the "Total" field');
		return false;
	}

	//validate the amount
	if(amount < 0 || !Number.isInteger(amount)) {
		alert('Please enter a positive whole number into the "Amount" field');
		return false;
	} else if (amount === 0) {
		$('#amount').val(3);
		amount = 3;
	}

	moneySplitter(total,amount);
})


/**
 * evenly distributes total into x portions
 * @param  {number} total  	total to split
 * @param  {number} amount 	number of ways to split
 * @return {array}         	an array of the evenly split numbers
 */
function moneySplitter (total, amount) {
	const output = [];
	const base = Math.floor((total/amount)*100)/100;
	let remainder = Math.floor((total - base * amount).toFixed(2) * 100);

	console.log('base',base);
	console.log('remainder',remainder);

	for (i = amount; i > 0; i--) {
		if (remainder > 0) {
			output.push(base + .01)
			remainder--
		} else {
			output.push(base)
		}
	}

	console.log('output',output);
}
