/**
 * Configuration
 */
const {projectsdir} = require('./config.json')

/**
 * Imports
 */
const Git = require('simple-git')
const fs  = require('fs')


fs.readdir(projectsdir, (err, items) => {
  if (err)
    console.log(err)
  else
    items.forEach(fetchIfRepository)
})
/**
 * Todo: log anbout fs.stat(Sync), fs.Stats
 */

function fetchIfRepository (path) {
  const absolute = projectsdir + '/' + path
  const gitdir   = absolute + '/.git'

  fs.stat(absolute, (err, stats) => {
    if (stats.isDirectory())
      fs.stat(gitdir, (err, stats) => {
        if (!err && stats.isDirectory()) {
          Git(absolute).fetch()
            .log((err, summary) => console.log(path + ' ' + summary.latest.message))
        }
      })
  })
}
