echo `git commit -m 'ready for deploy'`
echo `git checkout deploy`
echo `git merge develop`
echo `git push --all`
echo `git checkout develop`