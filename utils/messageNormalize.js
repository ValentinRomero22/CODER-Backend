import { schema, normalize } from 'normalizr'
import util from 'util'

export const compression = (original, normalized) =>{
    const bitOriginal = util.inspect(original, false, 12, true).length
    const bitNormalized = util.inspect(normalized, true, 7, true).length
    return (bitNormalized * 100) / bitOriginal
}

const mapChat = (messages) =>{
    const data = { id: 'messages', chats: [] }
    
    messages.foreach((message) =>{
        data.chats.push({
            id: message.id,
            author: message.author,
            text: message.text,
            date: message.date,
        })
    })

    return data
}

export const normalizedMessages = (data) =>{
    const mappedChat = mapChat(data)
    
    const author = new schema.Entity('authors')
    const messages = new schema.Entity('messages', { author: author })
    const chats = new schema.Entity('chats', { chats: [messages] })
    const normalizedChat = normalize(mappedChat, chats)
    const compression = compression(data, normalizedChat)
    
    //return [normalizedChat, compression]
    return [normalizedChat]
}