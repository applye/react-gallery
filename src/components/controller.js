import React from 'react'

export default class Controll extends React.Component {
    handleClick(e){
        if(this.props.arrange.isCenter) {
            this.props.inverse();
        }else {
            this.props.center();
        }
    }

    render() {
        let controllClass = "controll-span";
        if(this.props.arrange.isCenter) {
            controllClass += " is-center";
            if(this.props.arrange.isInverse) {
                controllClass += " is-inverse";
            }
        }


        return (
            <span class={controllClass} onClick={this.handleClick.bind(this)}></span>
        )
    }
}
