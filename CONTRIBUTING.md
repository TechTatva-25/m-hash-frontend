# Creating Environment Variables

```bash
$ type nul > .env
```

> Open with Notepad or any other text editor and add the API_URL (ask your team lead for access)

# Contributing

```bash
$ git branch [component-modified-contributor-name]
$ git checkout [component-modified-contributor-name]
$ git add .  // after making the required changes, duhh
$ git commit -m "feat/fix: description of changes"
$ git push -u origin HEAD
```

Finally, create a PR with a sufficiently detailed description from your IDE's source control tab, the GitHub desktop app, or the GitHub website.
Pray for your PR to be merged without any conflicts (or change requests during code review).

> Pro tip: before starting the day's work or making a push, Make sure to pull and merge the latest changes from the master into your branch. If any conflict arises, use the GitHub UI to keep the required lines and delete the rest. Steps illustrated below:

# Keeping in sync with everyone else

```bash
$ git checkout master
$ git pull
$ git checkout [component-modified-contributor-name]
$ git merge master
$ git status
```
