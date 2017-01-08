import React, {Component} from 'react';
import styles from './styles';

class Zone extends Component {


    onSelectTitle(event){
      event.preventDefault()
      console.log('onSelectTitle' + this.props.index)
      this.props.select(this.props.index)
    }

    render() {
      const zoneStyles = styles.zone
      const title = (this.props.isSelected) ? <a style={zoneStyles.nameAtag} href="#">{this.props.currentZone.name}</a> : <a href="#">{this.props.currentZone.name}</a>
        return (

            <div style={zoneStyles.container}>
                <h2 onClick={this.onSelectTitle.bind(this)} style={zoneStyles.nameStyle}>{title}</h2>
                <span className="detail">{this.props.currentZone.zipCodes}</span><br/>
                <span className="detail">{this.props.currentZone.numComments}</span>
            </div>

        )
    }
}

export default Zone
