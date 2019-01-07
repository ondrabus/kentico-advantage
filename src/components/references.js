import React from "react"

class References extends React.Component
{
    render(){
        if (!this.props.data || !Array.isArray(this.props.data) || this.props.data.length === 0)
        {
            return null;
        }

        var references = this.props.data.map((reference, index) => {
            return (<li key={reference.system.id}><a target="_blank" title={reference.elements.title.value} href={reference.elements.url.value} rel="noopener noreferrer">{reference.elements.title.value}</a></li>);
        });

        if (references)
        {
            references = 
                (<React.Fragment>
					<h2>References</h2>
                    <ul>
                        {references}
                    </ul>
				</React.Fragment>);
        }

        return references;
    }
}

export default References