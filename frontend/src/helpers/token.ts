import { decodeToken, isExpired } from "react-jwt";
import { getAccessToken } from "./session";

const checkAccess = () => {
	const acs = getAccessToken();

	let tknData: any = null;
	let isExp = true;

	if (acs) {
		tknData = decodeToken(acs);
		isExp = isExpired(acs);
	}
	return ({ tknData, isExp });

};

export default checkAccess;