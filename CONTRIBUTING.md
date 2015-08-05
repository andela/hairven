# Contributing to Hairven

 - [Getting Started](#gs)
 - [Issues and Bugs](#issue)
 - [Submission Guidelines](#submit)
 - [Making Changes](#mc)
 - [Git Commit Guidelines](#commit)
 - [Submitting Changes](#sc)
 - [Feature Requests](#feature)
 - [Code Guidelines](#cg)
 - [Additional Resources](#ar)


## <a name="gs"></a> Getting Started
We'd love if you contribute to our source code and make Hairven even better than it is! Here are the guidelines we'd like you to follow:


## <a name="issue"></a> Found an Issue?
If you find a bug in the source code or a mistake in the documentation, you can help us by submitting an issue to our [GitHub Repository](https://github.com/andela/hairven/issues). Even better you can submit a Pull Request with a fix.

**Please see the Submission Guidelines below**.


## <a name="submit"></a> Submission Guidelines

### Submitting an Issue
Before you submit your issue search the archive, maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue, but please do not report duplicate issues. 

* Open a Github issue, assuming one does not already exist.
  * Clearly describe the issue including steps to reproduce when it is a bug.
  * Make sure you fill in the earliest version that you know has the issue.

Providing the following information will increase the chances of your issue being dealt with quickly:

* **Overview of the Issue** - if an error is being thrown a non-minified stack trace helps
* **Motivation for or Use Case** - explain why this is a bug for you
* **Browsers and Operating System** - is this a problem with all browsers or only IE8?
* **Reproduce the Error** - provide a live example (using [Plunker][plunker] or[JSFiddle][jsfiddle]) or a unambiguous set of steps.
* **Related Issues** - has a similar issue been reported before?
* **Suggest a Fix** - if you can't fix the bug yourself, perhaps you can point to what might be causing the problem (line of code or commit)


## <a name="mc"></a> Making Changes

* Create a topic branch from where you want to base your work.
  * This is usually the staging branch.
  * Only target release branches if you are certain your fix must be on that
    branch.
  * To quickly create a topic branch based on staging; `git checkout -b
    issue/1/fix-server staging`. Please avoid working directly on the
    `master` or `staging` branches.
* Make commits of logical units.
* Check for unnecessary whitespace with `git diff --check` before committing.
* Make sure you have added the necessary tests for your changes.
* Run _all_ the tests to assure nothing else was accidentally broken.


## <a name="commit"></a> Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more readable messages** that are easy to follow when looking through the **project history**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**. The header has a special format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Scope
The scope could be anything specifying place of the commit change. For example `$location`, `$browser`, `$compile`, `$rootScope`, `ngHref`, `ngClick`, `ngView`, etc...

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.

A detailed explanation can be found in this [article](http://adamsimpson.net/writing/git-commit-template). You can get a sample template [here](https://gist.github.com/Linell/bd8100c4e04348c7966d).


## <a name="sc"></a> Submitting Changes

* Push your changes to a topic branch in your fork of the repository.
* Submit a pull request to the `andela/hairven` repository.


## <a name="feature"></a> Want a Feature?
You can request a new feature by submitting an issue to our [GitHub Repository](https://github.com/andela/hairven/issues). If you would like to implement a new feature then consider what kind of change it is:


## <a name="cg"></a> Code Guidelines
To ensure consistency throughout the source code, keep these rules in mind as you are working:

### HTML

* Use tags and elements appropriate for an HTML5 doctype 
* 2 spaces (no tabs)

### CSS

* Use HEX Color (e.g., #000000), only use RGBA when working with opacity (e.g., RGBA(255, 255, 255, .4))
* 2 spaces (no tabs)
* Leave spaces where necessary e.g.,

```
  body {
    background: #FAFAFA;
  }
```

### JS

* Use semicolons where necessary
* 2 spaces (no tabs)
* strict mode
* "Attractive"
* Leave spaces where necessary e.g.,

```
  if (a > b) { 
    console.log('Success');
  };
```


# <a name="ar"></a> Additional Resources

* [General GitHub documentation](http://help.github.com/)
* [GitHub pull request documentation](http://help.github.com/send-pull-requests/)
