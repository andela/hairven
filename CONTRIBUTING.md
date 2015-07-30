## Getting Started
* Open a Github issue, assuming one does not already exist.
  * Clearly describe the issue including steps to reproduce when it is a bug.
  * Make sure you fill in the earliest version that you know has the issue.

## Making Changes

* Create a topic branch from where you want to base your work.
  * This is usually the staging branch.
  * Only target release branches if you are certain your fix must be on that
    branch.
  * To quickly create a topic branch based on staging; `git checkout -b
    issue/1/fix-server staging`. Please avoid working directly on the
    `master` or `staging` branches.
* Make commits of logical units.
* Check for unnecessary whitespace with `git diff --check` before committing.
* Make sure your commit messages are in the proper format. You can do this by following the instructions in this [article](http://adamsimpson.net/writing/git-commit-template). You can get a sample template [here](https://gist.github.com/Linell/bd8100c4e04348c7966d)
* Make sure you have added the necessary tests for your changes.
* Run _all_ the tests to assure nothing else was accidentally broken.

## Making Trivial Changes

### Documentation

For changes of a trivial nature to comments and documentation, it is not
always necessary to create a new ticket in Jira. In this case, it is
appropriate to start the first line of a commit with '(doc)'.

## Submitting Changes

* Push your changes to a topic branch in your fork of the repository.
* Submit a pull request to the `andela/hairven` repository.

# Additional Resources

* [General GitHub documentation](http://help.github.com/)
* [GitHub pull request documentation](http://help.github.com/send-pull-requests/)
