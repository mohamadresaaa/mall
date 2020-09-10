const {
    readdirSync
} = require("fs")
const {
    resolve
} = require("path")

const models = {};

// read schemas
const schemas = readdirSync(resolve(__dirname)).filter(item => {
    return !item.match(/\index.js/)
});

for (const schema of schemas)
    models[(schema.replace(".js", "")).replace(schema[0], schema[0].toUpperCase())] = require(`${resolve(__dirname, schema)}`)

module.exports = models;