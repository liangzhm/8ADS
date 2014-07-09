/**
 * Created by liangzhimin on 2014/4/18.
 */
function myLogger(id){
    id = id || 'ADSLogWindow';
    var logWindow = null;
    var createWindow = function(){

    }
    this.writeRaw = function(message){

    }
}
myLogger.prototype = {
    write : function(message){

    },
    header : function(message){

    },
    link : function(link){

    }

};
if(!window.ADS){window['ADS'] = {};}
window['ADS']['log'] = new myLogger();