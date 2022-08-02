// @ts-ignore
import fs from 'fs'
import spawn from 'spawndamnit'

const isPackageUpdated = async (packageJSONPath: string) => {
  const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf-8'))
  const { version: currentVersion, publishConfig, name } = packageJSON
  const registry = publishConfig.registry ?? 'https://registry.npmjs.org'

  const npmInfoOutput = await spawn('npm', ['info', name, '--registry', registry, '--json'])
  console.debug('NPM Info Output: ', npmInfoOutput.stdout.toString())
  const rawOutput = npmInfoOutput.stdout.toString()
  if (!rawOutput) return true

  try {
    const result = JSON.parse(rawOutput)
    const allVersions: string[] = result.versions

    console.debug(`All Versions: ${allVersions} | Current Version: ${currentVersion}`)

    return allVersions.find((v) => v === currentVersion) === undefined ? true : false
  } catch (e) {
    return true
  }
}

const updatePackage = async (packagePath: string) => {
  const packageName = packagePath.split('/')[1]
  console.debug('Updating Package: ', packageName)
  const result = await spawn('yarn', ['nx', 'publish', packageName])
  console.debug(`Updating Package: ${packagePath} | Result: ${result.stdout.toString()}`)
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
  console.debug(`All Processed`)
})
