import React, {Component} from 'react';
import styles from './styles';

class Zone extends Component {
    render() {
      const zoneStyles = styles.zone
        return (

            <div style={zoneStyles.container}>

                <h2 style={zoneStyles.nameStyle}><a style={zoneStyles.nameAtag} href="">{this.props.currentZone.name}</a></h2>
                <span className="detail">{this.props.currentZone.zipCodes}</span><br/>
                <span className="detail">{this.props.currentZone.numComments}</span>
            </div>

        )
    }
}

export default Zone
