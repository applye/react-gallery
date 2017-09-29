import React from 'react'

export default class ImgFigure extends React.Component{
    render(){
        const {data} = this.props;
        return(
            <figure class="img-figure">
                <img src={data.imageURL} alt={data.title}/>
                <figcaption>
                    <h2 class="img-title">{data.title}</h2>
                </figcaption>
            </figure>
        )
    }
}