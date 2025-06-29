import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
    if (message === null) {
        return null;
    }

    return (
        <div style={{
            border: '1px solid',
            padding: 10,
            marginBottom: 10,
            color: type === 'error' ? 'red' : 'green'
          }}>
            {message}
          </div>
    );

};

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string
};


export default Notification;
