import fs from 'fs-extra'
import path from 'path'

const baseLocation = './data'
const outputLocation = './build'

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
            console.log(`New ${directory}: `, name, network, address)

            const __outputDirname = `${outputLocation}/${directory}/${network}`
            const copy = { ...source }
            delete copy.networks
            delete copy.addresses

            if (!fs.existsSync(__outputDirname)) {
              fs.mkdirSync(__outputDirname, { recursive: true })
            }

            fs.writeFileSync(
              path.join(__outputDirname, address),
              JSON.stringify(copy)
            )
          }
        }
      }
    }
  }
}
