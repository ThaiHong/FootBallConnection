/**
 * Created by XuanVinh on 1/16/2017.
 */
import React, {Component} from 'react'
import UploadImageComponent from './uploadImageComponent'

class UploadImageTest extends Component{
    render(){
        var canvasSize = {
            width: 500,
            height: 300
        }
        var crop = {
            x: 10,
            y: 10,
            width: 100,
            aspect: canvasSize.width / canvasSize.height
        }
        var fit = true;
        var defaultImage = "/images/500x300.png"
        return(
            <UploadImageComponent fit={fit} crop={crop} canvasSize = {canvasSize} defaultImage = {defaultImage}/>
        );
    }
}
export default UploadImageTest;