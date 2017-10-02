import React from 'react'
import ReactDom from 'react-dom'
import ImgFigure from './components/imgFigure'
require('./style/main.scss');
var imageDatas = require('./data/imagesData.json');
import Controller from './components/controller'

imageDatas =(function genImageUrl(imageDatasArr) {
    for(var i=0;i<imageDatasArr.length;i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('./images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);





class Index extends React.Component {
    constructor() {
        super();
        this.Constant = {
                //中心位置点
                centerPos: {
                   left: 0,
                   right: 0
                },
                //水平
                hPosRange: {
                    leftSecX: [0, 0],
                    rightSecY: [0, 0],
                    y: [0, 0]
                },
                vPosRange: {
                    x: [0, 0],
                    topY: [0, 0]
                }
            }
    
        this.state = {
            imgArrange: [
                /**{
                    pos: {
                        left: '0',
                        top: '0'
                    },
                    rotate:0,
                    isInverse: false
                }**/
            ]
        }
    };
    
    /**
     * 计算每个图片位置
     * 
     */
    componentDidMount() {
        let stageDom = this.refs.stage;
        let stageW =stageDom.scrollWidth;
        let stageH = stageDom.scrollHeight;
        let halfStageW = Math.ceil(stageW/2);
        let halfStageH = Math.ceil(stageH/2);
        let imgFigureDom = ReactDom.findDOMNode(this.refs.imFigure0);
        let imgW = imgFigureDom.scrollWidth;
        let imgH = imgFigureDom.scrollHeight;
        let halfImgW = Math.ceil(imgW/2);
        let halfImgH = Math.ceil(imgH/2);
        //中心点
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        };
        //计算左侧右侧取值范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
        this.Constant.hPosRange.rightSecY[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecY[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;
        //计算上侧取值
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;
        this.Constant.vPosRange.x[0] =  halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.rearrange(1);
    }
    
    getRangeRandom(low, high) {
        return Math.ceil(Math.random()*(high-low) + low);
    }

    get30DegRamdom() {
      return ((Math.random() > 0.5 ? '': '-') + Math.ceil(Math.random()*30));
    }

    //翻转图片index
    inverse(index){
        let imgsArr = this.state.imgArrange;
        imgsArr[index].isInverse = !imgsArr[index].isInverse;
        this.setState({
            imgArrange: imgsArr
        }); 
    }

    center(index) {
        this.rearrange(index);
    }

    //重新布局图片
    rearrange(centerIndex) {
        const imgsArr = this.state.imgArrange;
        const Constant = this.Constant;
        let centerPos = Constant.centerPos;
        let hPosRange = Constant.hPosRange;
        let vPosRange = Constant.vPosRange;

        let hPosRangeLeftSecX = hPosRange.leftSecX;
        let hPosRangeLeftSecY = hPosRange.rightSecY;

        let hPosRangeY = hPosRange.y;
        
        let vPosRangeTopY = vPosRange.topY;
        let vPosRangeX = vPosRange.x;

        var imgsArrTop = [];
        let topimgNum = Math.floor(Math.random()*2);
        let topImgSpliceIndex =0;
        let imgsArrCenterArr  = imgsArr.splice(centerIndex, 1);
        //居中
        imgsArrCenterArr[0] = {
            pos: centerPos,
            rotate: "0",
            isInverse: false,
            isCenter: true
        };

        //取出布局上侧图片
        topImgSpliceIndex = Math.ceil((Math.random()* (imgsArr.length - topimgNum)));
        imgsArrTop = imgsArr.splice(topImgSpliceIndex, topimgNum);

        imgsArrTop.forEach((value, index) => {
            imgsArrTop[index] ={
                pos:{
                    top:this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left:this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: this.get30DegRamdom(),
                isInverse: false,
                isCenter: false
            }
        });

        for(var i=0,j=imgsArr.length,k=j/2;i<j;i++) {
            var hPosRangeLORX = null;
            //前部分在左，右在右边
            if(i<k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            }else {
                hPosRangeLORX = hPosRangeLeftSecY
            }
            imgsArr[i] = {
                pos: {
                    top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: this.get30DegRamdom(),
                isInverse: false,
                isCenter: false
            }
        }

        if(imgsArrTop && imgsArrTop[0]) {
            imgsArr.splice(topImgSpliceIndex,0, imgsArrTop[0]);
        }
        imgsArr.splice(centerIndex, 0, imgsArrCenterArr[0]);

        this.setState({
            imgArrange: imgsArr
        });
    }

    render() {
        var controllerUtils =[],imgFigures=[];
        imageDatas.forEach(function(item, index) {
            if(!this.state.imgArrange[index]) {
                this.state.imgArrange[index] = {
                    pos: {
                        left:0,
                        top:0
                    },
                    rotate: "0",
                    isInverse: false,
                    isCenter: false
                }
            }
            imgFigures.push(<ImgFigure inverse={this.inverse.bind(this, index)} center = {this.center.bind(this, index)}  arrange={this.state.imgArrange[index]} data={item} key={index} ref={'imFigure' + index}/>);
            controllerUtils.push(<Controller  arrange={this.state.imgArrange[index]} key={index} center={this.center.bind(this, index)} inverse={this.inverse.bind(this, index)}/>);
    }, this);
      
        return(
            <section class="stage" ref="stage">
                <section class="img-sec">
                    {imgFigures}
                </section>
                <nav class="controller-nav">
                    {controllerUtils}
                </nav>
            </section>
        )
    }
}

ReactDom.render(<Index/>, document.getElementById('root'));
