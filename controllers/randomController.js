import { fork } from 'child_process'

export const random = {
    get: (req, res) => {
        try {
            res.status(200).render('pages/random')
        } catch (error) {
            res.status(500).send({ error: true })
        }
    },
    post: async (req, res) => {
        try{
            const quantity = req.query.quantity || 100000000
            
            const randomNumbers = fork('./utils/randomNumbers.js')
            randomNumbers.send({ message: 'start', quantity: quantity })

            randomNumbers.on('message', (object) =>{
                res.json(object)
            })

        } catch(error){
            res.status(500).send({ error: true })
        }
    }
}