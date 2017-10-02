import React from 'react'

export default class ImgFigure extends React.Component{

    handleClick(e) {
        if(this.props.arrange.isCenter) {
            this.props.inverse();
        }else {
            this.props.center();
        }        
        e.stopPropagation();
        e.preventDefault();
    }

    render(){
        const {data, arrange} = this.props;
        var styleObj = {};      
        if(arrange.pos) {
            styleObj = arrange.pos;
        }
        //当不为中心图片时才做旋转
        if(arrange.rotate !== "0"){
            if(arrange.rotate && !styleObj['transform']) {
                styleObj['transform'] = 'rotate(' + arrange.rotate +'deg)';
            }
            if(arrange.isCenter) {
                styleObj.zIndex = 11;
            }
        }
        
     

        let imgFigure = "img-figure";
        imgFigure += arrange.isInverse ? ' is-inverse': '';
        return(
            <figure class={imgFigure} style={styleObj} onClick={this.handleClick.bind(this)}>
                <img src={data.imageURL} alt={data.title}/>
                <figcaption>
                    <h2 class="img-title">{data.title}</h2>
                    <div class="img-back" onClick={this.handleClick.bind(this)}>
                        <p>
                            {data.desc}
                        </p>
                    </div>
                </figcaption>
            </figure>
        )
    }
}