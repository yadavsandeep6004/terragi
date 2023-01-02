set -e
cd /home/ubuntu/projects/terragi-web || return
export NVM_DIR=$HOME/.nvm;

source $NVM_DIR/nvm.sh;

nvm use 14

git fetch --all

git reset --hard origin/develop

yarn

yarn build

pm2 restart 1