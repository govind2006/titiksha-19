This is the  offical website of Titiksha 2k19 .

This website is made up of various web Technologies .

Frontend -> HTML ,CSS , JAVASCRIPT
Backend  -> Django
Database -> Sqlite  

# How to Get Started
* Fork the Repo
```bash
git clone https://github.com/yourusername/titiksha-19.git
```
* create a virtual .env
```bash
virtualenv .env
```
* Activate your virtualenv

```bash
source .env/bin/activate
```

* Install all the dependencies

```bash
pip install -r requirements.txt
```

* At last run your django server

```bash
python manage.py runserver
```

### You will see a website running on port 8000.

# Contribution Guidelines
1. Don't push your code from the master
1. Create seperate branch for adding the feature. You can create seperate branch like
```bash
git branch feature
```
3. Checkout into that branch by running below command
```bash
git checkout -b feature
```
4. Now you can modify code as you want. After adding the feature push your code to github
```bash
git push -u origin feature
```
5. After pushing go to github and create pull request.

## How to update your local master branch
* First of all add upstream remote. You can add upstream like
```bash
git remote add upstream https://github.com/govind2006/titiksha-19.git
```
* Now fetch the updated master branch
```bash
git fetch upstream
```
* Now merge fetch code to your local branch master
```bash
git merge upstream/master
```
* If there is any other query related to how to update local master branch kindly check this link --> https://digitaldrummerj.me/git-syncing-fork-with-original-repo/ 




