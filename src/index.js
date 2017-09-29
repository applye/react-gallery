import React from 'react'
import ReactDom from 'react-dom'
import ImgFigure from './components/imgFigure'
require('./style/main.scss');
var imageDatas = require('./data/imagesData.json');

imageDatas =(function genImageUrl(imageDatasArr) {
    for(var i=0;i<imageDatasArr.length;i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('./images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);





class Index extends React.Component {    
    render() {
        var controllerUtils =[],imgFigures=[];
        imageDatas.forEach(function(item, index) {
            imgFigures.push(<ImgFigure data={item} key={index}/>);
        }, this);
      
        return(
            <section class="stage">
                <section class="img-sec">
                    {imgFigures}
                </section>
                <nav class="controller-nav">

                </nav>
            </section>
        )
    }
}

ReactDom.render(<Index/>, document.getElementById('root'));
