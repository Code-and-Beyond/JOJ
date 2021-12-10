import React from 'react';

type NormalRouteProps = {
	components: Array<any>;
};

const NormalRoute: React.FC<NormalRouteProps> = (props) => {
	const { components } = props;

	return <React.Fragment>{components.map((Component) => <Component />)}</React.Fragment>;
};


export default NormalRoute;
