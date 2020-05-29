import moment from 'moment';

export function apiCall(s, errorHandler, body = null) {
	const server = localStorage.getItem('miniflux_server');
	const token  = localStorage.getItem('miniflux_api_key')
	 if (!(server && token)) {
	 	return new Promise((x,y) => {return null} );
	}
	
	const params = { headers: {'X-Auth-Token': token}};
	if (body) {
		params['method'] = 'PUT';
		params['body']   = JSON.stringify(body);
	}

	const url = server + '/v1/' + s;
	const err = (s) => errorHandler(s + ' (' + url + ')');

	return fetch(url, params)
   	 .then(r => { 
			if (!r.ok) { throw r }
			if (r.status === 204 ) { return r }
			return r.json()
			})

	 .catch(e => {
		if (e instanceof TypeError) {
			 err(e.message);
		 } else if (e instanceof Response) {
			const contentType = e.headers.get("content-type");
			if (contentType && contentType.indexOf("application/json") !== -1) {
				e.json().then(msg => err(msg['error_message']));
			} else {
				e.text().then(msg => err(msg));
			}
		} else {
			err(String(e));
		}
		 return Promise.reject();
	 });


};

export function relaTimestamp(t) {
	const d = (Date.now() - Date.parse(t))/1000;
	if (d > 60*60*24) {
		return Math.floor(d / (60*60*24)) + "d";
	} else if (d > 60*60) {
		return Math.floor(d / (60*60)) + "h";
	} else {
		return Math.floor(d / 60) + "m";
	}
}

export function formatDate(t) {
	return moment(t).format('D MMM HH:mm');

}