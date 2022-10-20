import parseArgs from 'minimist'

export const info = {
    get: (req, res) => {
        try {
            const args = parseArgs(process.argv.slice(2))

            const info = {
                arguments: JSON.stringify(args),
                os: process.platform,
                version: process.version,
                memory: JSON.stringify(process.memoryUsage().rss, null, 2),
                path: process.execPath,
                processId: process.pid,
                directory: process.cwd()
            }

            res.render('pages/info', { info })
        } catch(error){
            return res.status(400).send({ error: true })
        }
    }
}