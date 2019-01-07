import React from "react"
import ContentZone from "./content-zone"

class Teaser extends React.Component
{
    render(){
        return (
            <ContentZone className="highlighted">
                {this.props.children}
            </ContentZone>)
    }
}

export default Teaser