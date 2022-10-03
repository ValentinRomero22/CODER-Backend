import { schema, normalize } from 'normalizr'

const mapChat = (messages) =>{
    const data = { id: 'messages', chats: [] }
    
    data.chats = messages.map((item) =>{
        return{
            id: item._id,
            author: item.author,
            text: item.text,
            date: item.date
        }
    })
    
    return data
}

export const normalizedMessages = (data) =>{
    const mappedChat = mapChat(data)
    
    const author = new schema.Entity('authors')
    const messages = new schema.Entity('messages', { author: author })
    const chats = new schema.Entity('chats', { chats: [messages] })

    const normalizedChat = normalize(mappedChat, chats)

    return normalizedChat
}