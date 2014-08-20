var Notifier=function()
{

}

Notifier.prototype.error=function(message)
{
	new PNotify({
	    title: 'Error!',
	    text: message,
	    type: 'error'
	});
}
Notifier.prototype.info=function(message)
{
	new PNotify({
	    title: 'Info',
	    text: message,
	    type: 'info'
	});
}

Notifier.prototype.success=function(message)
{
	new PNotify({
	    title: 'success',
	    text: message,
	    type: 'success'
	});
}

exports.getInstance=function()
{
	return new Notifier();
}