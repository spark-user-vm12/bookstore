const context = require('rabbit.js').createContext();

const pub = context.socket('PUSH');

function sendMessage(message,guest){
  pub.connect('emails', () => {
    pub.write(JSON.stringify({
      senderEmail: 'alerts@eventmanager.com',
      senderName: 'Event Manager Alerts',
      receiverEmail: guest.email,
      receiverName: `${guest.last_name}, ${guest.first_name}`,
      subject: 'Alert from Event Manager',
      body: `${message}`,
    }), 'utf8');
  });
}

module.exports.alertAdded = (guest) =>{
    var message = "You have been added to an event"
    sendMessage(message,guest);
}

module.exports.alertRemoved = (guest) =>{
    var message = "You have been removed from an event"
    sendMessage(message,guest); 
}
