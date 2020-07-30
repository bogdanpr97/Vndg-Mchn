import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const Alert = ({ alerts }) => 
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert, index) => (
    <div key={alert.id} style={{ top: index * 50 }} className={`alert alert-${alert.type}`}>
      {alert.msg}
    </div>
));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert);
