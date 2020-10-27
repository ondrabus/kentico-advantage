import React from "react"


class Scenario extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {active: false};
        this.toggleVisiblity = this.toggleVisibility.bind(this);
    }

    toggleVisibility = event => {
        this.setState(state => ({active: !state.active}));
    }

    render(){
        return (<li key={this.props.scenario.system.id}>
            <h3><a class={this.state.active ? 'open' : 'closed'} href="#!" onClick={this.toggleVisibility}>{this.props.scenario.elements.title.value}</a></h3>
                {this.state.active &&  
            <div dangerouslySetInnerHTML={{__html: this.props.scenario.elements.detail.value}}></div>}
        </li>);
    }
}

export default Scenario