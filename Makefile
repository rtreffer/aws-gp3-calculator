github-pages:
	-rm -rf build/.git
	npm run-script build
	cd build && git init && git checkout -b github-pages
	cd build && git add * && git commit -m 'Github pages build'
	-git remote add build ./build
	git branch -D github-pages
	git fetch build && git checkout github-pages && git push origin && git checkout main
