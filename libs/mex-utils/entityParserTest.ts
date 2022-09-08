/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')

const { noteParser } = require('./src/parsers/entityParser')

const data = JSON.parse(fs.readFileSync('mex.json', 'utf-8'))
const nodeId = 'NODE_r3wd6CP9rqDTypPqjzBck'
const title = data.ilinks[0].path
const contents = data.contents[nodeId].content

const parsed = noteParser(nodeId, contents, title)
console.log(parsed)
