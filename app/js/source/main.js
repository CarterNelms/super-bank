(function()
{
	'use strict';

	var balance = 1000;

	$(document).ready(initialize);

	function initialize()
	{
		updateBalance();
		$('#deposit').click(deposit);
		$('#withdraw').click(withdraw);
	}

	function addRow(fee, dep, withd)
	{
		var $tr = $('<tr>');
		var data = [fee, dep, withd, balance];
		var className = ['fee',
						'deposit',
						'withdraw',
						'balance'];

		for(var i = 0; i < 4; ++i)
		{
			var $td = $('<td>');
			$td.addClass(className[i]);
			$td.text(numToFinancial(data[i]));
			$tr.append($td);
		}
		$('#ledgerBody').append($tr);
		updateBalance();
	}

	function deposit()
	{
		var amount = getAmountAndSetBlank();
		if(amount > 0)
		{
			balance += amount;
			addRow(0, amount, 0);
		}
	}

	function withdraw()
	{
		var amount = getAmountAndSetBlank();
		if(amount > 0)
		{
			balance -= amount;
			addRow(0, 0, amount);

			if(balance < 0)
			{
				var fee = 50;
				balance -= fee;
				addRow(fee, 0, 0);
			}
		}
	}

	function getAmountAndSetBlank()
	{
		var amount = roundTo2Dec($('#amount').val());
		$('#amount').val('');
		return amount;
	}

	function updateBalance()
	{
		$('#balance').text(numToFinancial(balance));
	}

	function numToFinancial(num)
	{
		num = roundTo2Dec(num);
		var numStr = Math.abs(num).toString();
		var decimalIndex = numStr.indexOf('.');
		if(decimalIndex === -1)
		{
			numStr += '.00';
		}
		else if((numStr.length - 1) - decimalIndex === 1)
		{
			numStr += '0';
		}

		var orderOfMag = numStr.length - 3;
		for(var i = 1; i <= Math.floor((orderOfMag - 1)/3); ++i)
		{
			var commaIndex = orderOfMag - 3 * i;
			numStr = numStr.substring(0, commaIndex) + ',' + numStr.substring(commaIndex);
		}

		numStr = (num < 0) ? '(' + numStr + ')' : numStr + ' ';

		return '$' + numStr;
	}

	function roundTo2Dec(num)
	{
		return Math.round(num * 100)/100;
	}

})();