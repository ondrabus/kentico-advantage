import React from "react"
import styled from "styled-components"
import * as style from '../styles'
import Scenario from './scenario'

const ScenariosContainer = styled.div`

color: ${style.palette.zone_content_foreground};

ul
{
	list-style-type: none;
	margin: 0;
}

ul li
{
	background: ${style.palette.scenarios_background};
	border-bottom: 1px solid ${style.palette.scenarios_bottom_border};
	padding: 10px 20px;
	display: block;
}
ul li::before
{
	display: none;
	content: none;
}

h3
{
	margin: -10px -20px;
}

h3 a
{
	padding: 10px 20px;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	text-decoration: none;
	color: ${style.palette.heading_foreground};
}
h3 a:hover,
h3 a.open
{
	background: ${style.palette.scenarios_selected_background};
}
h3 a::before
{
	color: ${style.palette.scenarios_plus_foreground};
	font-size: 1.6em;
	padding-right: 20px;
	align-self: center;
	flex: 0 0 20px;
	text-align: center;
}
h3 a.closed::before
{
	content: "+";
}
h3 a.open::before
{
	content: "-";
}
ul li div
{
	margin: 20px 0 10px;
}

${style.media.sm`
    ul li div
	{
		margin-left: 40px;
	}
`}

.zone ul.scenarios
{
	margin-bottom: 20px;
}
`;

class Scenarios extends React.Component
{
    render(){
        if (!this.props.data || !Array.isArray(this.props.data) || this.props.data.length === 0)
        {
            return null;
        }

        var scenarios = this.props.data.map((scenario, index) => {
            return (<Scenario scenario={scenario} />);
        });

        if (scenarios)
        {
            scenarios = 
                (<ScenariosContainer>
                    <ul>
                        {scenarios}
                    </ul>
                </ScenariosContainer>);
        }

        return scenarios;
    }
}

export default Scenarios