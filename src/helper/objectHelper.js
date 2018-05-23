export const filterToQueryString = (filter) => {
	return Object.keys(filter).reduce((prev, curr) => {
		if (filter[curr]) { prev.push(`${curr}=${filter[curr]}`) }
		return prev
	}, []).join('&')
};

export const pick = (object, props) => {
	return props.reduce((a, c) => ({ ...a, [c]: object[c] }), {});
}
