const Notification = ({ message, type }) => {
    if (message === null) {
        return null
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
    )

}

export default Notification
