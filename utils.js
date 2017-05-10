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
 */
function moneySplitter (total, amount) {
	$('#results').html('');

	const output = [];
	const base = (total/amount).toFixed(2);

	appendToApp('First Round!')

	for (i = amount; i > 0; i--) {
		output.push(base);
		appendToApp('<br>'+base);
	}

	splitValidator(output,total);
}

/**
 * adds text to #results div
 * @param  {string} text  	text to add
 */
function appendToApp (text) {
	$('#results').html(`${$('#results').html()} ${text}`);
}

/**
 * validates a sum of an array is equal to the desired total and outputs
 * corrected results if needed
 * @param  {array} output  			output array to evaluate
 * @param  {number} desiredTotal  	the total we want to achieve
 */
function splitValidator (output, desiredTotal) {
	const oldTotal = output[0] * output.length;
	let remainder = Math.floor((desiredTotal - oldTotal).toFixed(2) * 100);

	if (remainder !== 0) {
		appendToApp('<br>Corrected results!<br>')
		for (i = output.length - 1; i >= 0; i--) {
			if (remainder > 0) {
				output[i] = Number(output[i]) + .01;
				remainder--;
			} else if (remainder < 0) {
				output[i] = Number(output[i]) - .01;
				remainder++;
			}
		}
		appendToApp(output.join('<br>'));
	} else {
		appendToApp('<br> Looks good to me!');
	}
}


/* at first, I accidentally wrote this as a single function, thought I would leave this here anyways

/**
 * evenly distributes total into x portions
 * @param  {number} total  	total to split
 * @param  {number} amount 	number of ways to split
 *
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
*/
