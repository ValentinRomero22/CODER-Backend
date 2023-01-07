const textMessage = document.getElementById('text')
const chatMessagesContainer = document.getElementById('chatMessagesContainer')

const scrollChats = () => {
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight
}

scrollChats()

const sendMessage = (email) => {
    try {
        if (textMessage.value) {
            socket
            socket.emit('saveUserChat', {
                email,
                text: textMessage.value,
                response: false
            })

            textMessage.value = ''
        } else {
            showChatMessage('Escriba un mensaje', '#F23030')
        }
    } catch (error) {
        showChatMessage('Se produjo un error inesperado', '#F23030')
    }
}

socket.on('allMessages', async (args) => {
    const currentEmail = JSON.parse(localStorage.getItem('currentEmail'))

    if (args.userEmail == currentEmail) {
        chatMessagesContainer.innerHTML = ''

        for (message of args.allMessages) {
            if (message.response) {
                chatMessagesContainer.innerHTML +=
                    `<div class="message__to__left">
                    <div class="message__response__box">
                        <p>${message.text}</p>
                        <p class="message__date__response">${message.date}</p>
                    </div>
                </div>`
            } else {
                chatMessagesContainer.innerHTML +=
                    `<div class="message__to__right">
                    <div class="message__box">
                        <p>${message.text}</p>
                        <p class="message__date">${message.date}</p>
                    </div>
                </div>`
            }
        }

        scrollChats()
    }
})

const showChatMessage = (notificationMessage, backgroundColor) => {
    Toastify({
        text: notificationMessage,
        style: {
            color: "#FFFFFF",
            background: backgroundColor,
            duration: 2000,
            stopOnFocus: true,
        }
    }).showToast()
}