import fs from 'fs'
import path from 'path'

const baseLocation = './data'
const outputLocation = './build'

fs.rmSync(outputLocation, { recursive: true })
console.log(`Cleaning ${outputLocation}...`)


for (const directory of fs.readdirSync(baseLocation)) {
  const __dirname = `${baseLocation}/${directory}`

  for (const name of fs.readdirSync(__dirname)) {
    const file = path.join(__dirname, name)
    const stat = fs.lstatSync(file)

    if (stat.isFile()) {
      const parse = path.parse(file)
      if (parse.ext === '.json') {
        const source = JSON.parse(fs.readFileSync(file))
        const networks = source.networks
        const addresses = source.addresses

        for (const network of networks) {
          for (const address of addresses) {

            const addressLow = address.toLowerCase()

            console.log(`New ${directory}: `, name, network, addressLow)

            const __outputDirname = `${outputLocation}/${directory}/${network}`
            const copy = { ...source }
            delete copy.networks
            delete copy.addresses

            if (!fs.existsSync(__outputDirname)) {
              fs.mkdirSync(__outputDirname, { recursive: true })
            }

            fs.writeFileSync(
              path.join(__outputDirname, addressLow),
              JSON.stringify(copy)
            )
          }
        }
      }
    }
  }
}
