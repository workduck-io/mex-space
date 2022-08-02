// @ts-ignore
import fs from 'fs'
import spawn from 'spawndamnit'

const isPackageUpdated = async (packageJSONPath: string) => {
  const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf-8'))
  const { version: currentVersion, publishConfig, name } = packageJSON
  const registry = publishConfig.registry ?? 'https://registry.npmjs.org'

  const npmInfoOutput = await spawn('npm', ['info', name, '--registry', registry, '--json'])
  console.log('NPM Info Output: ', npmInfoOutput.stdout.toString())

  const result = JSON.parse(npmInfoOutput.stdout.toString())
  const allVersions: string[] = result.versions

  console.log(`All Versions: ${allVersions} | Current Version: ${currentVersion}`)

  return allVersions.find((v) => v === currentVersion) === undefined ? true : false
}

const updatePackage = async (packagePath: string) => {
  const packageName = packagePath.split('/')[1]
  console.log('Updating Package: ', packageName)
  const result = await spawn('yarn', ['nx', 'publish', packageName])
  console.log(`Updating Package: ${packagePath} | Result: ${result.stdout.toString()}`)
}

const allPackageNames = fs
  .readdirSync('libs', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((dir) => dir.name)

const allPackagePaths = allPackageNames.map((name) => `libs/${name}/package.json`)

async function checkAndUpdatePackages(allPackagePaths: string[]) {
  for (const path of allPackagePaths) {
    const isUpdated = await isPackageUpdated(path)

    if (isUpdated) await updatePackage(path)
  }
}

checkAndUpdatePackages(allPackagePaths).then((result) => {
  console.log(`All Processed`)
})
