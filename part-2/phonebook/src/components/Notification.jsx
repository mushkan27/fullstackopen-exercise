const Notification = ({ message }) => {
    if (!message) return null         // avoids the unwanted div when there's no notification message
  
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
  
  export default Notification
  