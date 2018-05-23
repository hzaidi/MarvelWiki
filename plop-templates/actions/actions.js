import axios from 'axios'
import { baseUrl } from '../resolvedUrl';
import debounce from 'debounce';
import { filterToQueryString } from '../helper/objectHelper';


export function someFunction(filter) {
	return (dispatch) => {
		/* dispatch({ type: SOMETHING, payload: filter }); */
	}
}


