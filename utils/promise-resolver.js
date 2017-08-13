module.exports = hasUpdated => ({
	done: !!hasUpdated,
	message: hasUpdated ? 'operation successful' : 'operation failed'
});
