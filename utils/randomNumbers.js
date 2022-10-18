process.on('message', (params) =>{
    const { message, quantity } = params

    const object = {}

    if(message == 'start'){
        for (let i = 0; i < quantity; i++){
            let aux = Math.floor(Math.random() * 1000 + 1)
            
            object[aux] 
            ? object[aux] = object[aux] +1
            : object[aux] = 1
        }

        process.send(object)
    }
})