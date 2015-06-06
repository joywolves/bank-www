# bank-www

操作系统 ubuntu

安装nodejs环境

sudo apt-get install nodejs

sudo apt-get install npm

安装ionic框架

sudo -i

npm install -g cordova ionic


创建项目

ionic start bank tabs

cd bank

ionic setup sass

rm -r /www

git clone https://github.com/joywolves/bank-www.git ./www

ionic serve

deamon 启动

screen -d -m -L ionic serve -p 8100 --nolivereload
