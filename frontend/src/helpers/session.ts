/*	AUTH TOKENS	*/
export function getAccessToken() { return localStorage.getItem("acsTkn"); }
export function setAccessToken(acsTkn: string) { if (acsTkn !== 'undefined' && acsTkn !== null) localStorage.setItem("acsTkn", acsTkn); }

export function getRefreshToken() { return localStorage.getItem("rfsTkn"); }
export function setRefreshToken(rfsTkn: string) { if (rfsTkn !== 'undefined' && rfsTkn !== null) localStorage.setItem("rfsTkn", rfsTkn); }

/*	USER	*/
// export function getAdmin() { return JSON.parse(localStorage.getItem("admin")); }
// export function setAdmin(admin) { localStorage.setItem("admin", JSON.stringify(admin)); }

export function getUser() { const user = localStorage.getItem("user"); if (user) return JSON.parse(user); }
export function setUser(user: Object) { localStorage.setItem("user", JSON.stringify(user)); }

export function isLoggedIn() {
	if ((localStorage.getItem("acsTkn") !== null && localStorage.getItem("acsTkn") !== 'undefined'))
		// && (localStorage.getItem("rfsTkn") !== null && localStorage.getItem("rfsTkn") !== 'undefined')
		// && (localStorage.getItem("admin") !== null && localStorage.getItem("admin") !== 'undefined'))
		return true;

	return false;
}

export function setLogout() { localStorage.clear(); }