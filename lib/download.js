var http = require('http');
var fs = require('fs');
var path = require('path');
var host = require('./host.js');
var func_stat = require('./stat.js');
function Download(remote, local, done) {
    this.remote = remote;
    this.local  = local;
    this.done   = done;
    var stat = fs.statSync(local);
    if (!stat.isDirectory) {
        done(local +  ' is not a directory');
        return;
    }
    this.local = `${this.local}/${path.basename(this.remote)}`;
    console.log(`[download]${this.remote} -> ${this.local}`);
    func_stat(this.remote, function (err, result) {
        if (err) {
            done(err);
        } else {
            if (result.type === 'folder') {
                this.download_folder();
            } else if (result.type === 'file') {
                this.download_file();
            } else {
                this.done(result);
            }
        }
    }.bind(this));
};
Download.prototype.download_folder = function () {
    console.log('download_folder')
};
Download.prototype.download_file = function () {
    console.log('download_file')
};
function download(remote, local, done) {
    var task = new Download(remote, local, done);
    return;
    var stat = fs.statSync(local);
    if (!stat.isDirectory) {
        done(local +  ' is not a directory');
        return;
    }
    local = `${local}/${path.basename(remote)}`;
    console.log(`[download]${remote} -> ${local}`);
    func_stat(remote, function (err, result) {
        console.log(err, result);
        done();
    });
    return;
    // type=$(curl -s  "http://localhost:7000/tree2/stat?tree=$opt_tree&path=$remote" | jq -r .type)
    // if [ "$type" = "file" ]; then
    //     echo "asdf"
    //     path=$(node --eval "console.log(encodeURIComponent('$remote'))")
    //     curl -s  "http://localhost:7000/tree2/cat?tree=$opt_tree&path=$path" > $local
    // elif [ "$type" = "folder" ]; then
    //     [ ! "$opt_recursive" = "true" ] && echo "$remote is directory" && exit -1
    //     option="{}"
    //     option=$(echo "$option" | jq -c .cmd={})
    //     option=$(echo "$option" | jq -c .output={})
    //     option=$(echo "$option" | jq -c .cmd.recursive=$opt_recursive)
    //     option=$(node --eval "console.log(encodeURIComponent(JSON.stringify($option)))")
    //     path=$(node --eval "console.log(encodeURIComponent('$remote'))")
    //     curl -s  "http://localhost:7000/tree2/find?tree=$opt_tree&path=$path&option=$option" | while read file; do
    //         type=$(echo $file | sed 's/\(.*\) .*/\1/');
    //         file=$(echo $file | sed 's/.* \(.*\)/\1/');
    //         path="$remote$file"
    //         target="$local$file"
    //         if [ "$type" = "file" ]; then
    //             echo "[download] $path"
    //             path=$(node --eval "console.log(encodeURIComponent('$path'))")
    //             curl -s  "http://localhost:7000/tree2/cat?tree=$opt_tree&path=$path" > $target
    //         elif [ "$type" = "folder" ]; then
    //             echo "[mkdir] $target"
    //             mkdir -p $target
    //         else
    //             echo "knknown type=$type  $path"
    //         fi
    //     done
    // else
    //     echo "unknown type: $type"
    // fi
};
module.exports = download;
