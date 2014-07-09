/**
 * Created by liangzhimin on 2014/4/10.
 * 下决心建立自己的库
 * 调用的时候直接ADS.toggleDisplay(***)
 */
(function(){
    if(!window.ADS){
        window['ADS'] = {};
    }
    window['ADS']['node'] = {
        ELEMENT_NODE :1,
        ATTRIBUTE_NODE :2,
        TEXT_NODE:3,
        CDATA_SECTION_NODE :4,
        ENTITY_REFERENCE_NODE : 5,
        ENTITY_NODE : 6,
        PROCESSING_INSTRUCTION_NODE :7,
        COMMENT_NODE : 8,
        DOCUMENT_NODE : 9,
        DOCUMENT_TYPE_NODE : 10,
        DOCUMENT_FRAGMENT_NODE : 11,
        NOTATION_NODE : 12
    }
    function isCompatible(other){
       /**
        * 确定当前浏览器是否与整个库兼容
        * **/
       if(other === false||!Array.prototype.push||!Object.hasOwnProperty||!document.createElement||!document.getElementsByTagName){
           return false;
       }
        return true;
     }
    window['ADS']['isCompatible'] = isCompatible;
    function $(){
        var elements = [];
        //查找作为参数提供的所有元素
        for(var i=0;i<arguments.length;i++){
            var element = arguments[i];
            if(typeof  element =='string'){
                //如果该参数是一个字符串那么假设它是一个id
                element = document.getElementById(element);
            }
            if(arguments.length==1){
                //如果只提供了一个参数，那么返回该参数
                return element;
            }
            //否则 添加到数组中
            elements.push(element);
        }
        //返回该数组;使用方法:var ele = ADS.$('example');等价于获取id为example的dom元素
        return elements;
    }
    window['ADS']['$'] = $;
    function exampleLibraryMethod(obj){
        //传递一个dom元素引用的库方法
        if(!(obj = $(obj))) return false;
    }
    window['ADS']['exampleLibraryMethod'] = exampleLibraryMethod;
    function addEvent(node,type,listener){
        if(!isCompatible()){return false;}
        if(!(node = $(node))) return false;
        if(node.addEventListener){
            node.addEventListener(type,listener,false);
            return true;
        }else if(node.attachEvent){
            node['e'+type +listener] = listener;
            node[type+listener] = function(){
                node['e'+type+listener](window.event);
            }
            node.attachEvent('on'+type,node[type+listener]);
            return  true;
        }
        return false;
    }
    window['ADS']['addEvent'] = addEvent;
    function removeEvent(node,type,listener){
        if(!(node = $(node))) {return false;}
        if(node.removeEventListener){
            node.removeEventListener(type,listener,false);
            return true;
        }
        else if(node.detachEvent){
            node.detachEvent('on'+type,node[type+listener]);
            node[type+listener] = null;
            return true;
        }
        return false;
    }
    window['ADS']['removeEvent'] = removeEvent;
    function getElementsByClassName(className,tag,parent){
        //ADS.getElementsByClassName('findname','*',docuemnt);
        parent = parent || document;
        if(!(parent=$(parent))) return false;
        var allTags = (tag=='*'&&parent.all)?parent.all : parent.getElementsByTagName(tag);
        var matchingElements = [];
        className = className.replace(/\-/g,"\\-");
        var regex = new RegExp("(^|\\s)"+className+"(\\s|$)");
        var element;
        for(var i=0;i<allTags.length;i++){
            element = allTags[i];
            if(regex.test(element.className)){
                matchingElements.push(element);
            }
        }
        return matchingElements;
    }
    window['ADS']['getElementsByClassname'] = getElementsByClassName;
    function toggleDisplay(node,value){
            /*      切换dom树的可见性;为了实现不同的显示类型而重用该函数，在调用它时包含可选的第二函数，以定义期望默认
            * 显示的属性 ADS.toggleDisplay(ADS.$('example'),'block');
            * */
        if(!(node = $(node))) return false;
        if(node.style.display !='none'){
            node.style.display ='none';
        }
        else{
            node.style.display = value || '';
        }
        return true;
    }
    window['ADS']['toggleDisplay'] = toggleDisplay;
    function insertAfter(node,referenceNode){
        if(!(node = $(node))) return false;
        if(!(referenceNode = $(referenceNode))) return false;
        return referenceNode.parentNode.insertBefore(node,referenceNode.nextSibling);
    }
    window['ADS']['insertAfter'] = insertAfter;
    function removeChildren(parent){
        if(!(parent = $(parent))) return false;
        while(parent.firstChild){
            parent.firstChild.parentNode.removeChild(parent.firstChild);
        }
        return parent;
    }
    window['ADS']['removechildren'] = removeChildren;
    function prependChild(parent,newChild){
        if(!(parent = $(parent))) return false;
        if(!(newChild = $(newChild))) return false;
        if(parent.firstChild){
            parent.insertBefore(newChild,parent.firstChild);
        }
        else{
            parent.appendChild(newChild);
        }
        return parent;
    }
    window['ADS']['prependChild'] = prependChild;

    function bindFunction(obj,func){
        return function(){
            func.apply(obj,arguments);//给原始函数创建一个新的环境，使用该方法可以修改任何方法的环境
        }
    }
    window['ADS']['bindFunction'] = bindFunction;
    function camelize(s){
        return s.replace(/-(\w)/g,function(strMatch,pl){
            return pl.toUpperCase();
        });
    }
    window['ADS']['camelize'] = camelize;
    function  unique(arr){ //数组去重
        if(arr instanceof  Array){
            var map = {},newArr = [];
            for(var i= 0,len = arr.length;i<len;i++){
                if(!map[arr[i]]){
                    newArr.push(arr[i]);
                    map[arr[i]] = true;
                }
            }

            return newArr;
        }
    }
    window['ADS']['unique'] = unique;
    function contains(need,arr){
        var array = arr;
        for(var i in arr){
            if(arr[i]==need){
                return true;
            }
        }
        return false;
    }
    window['ADS']['contains'] = contains;
    function index(need,arr){
        for(var i= 0,il =arr.length;i<il;i++){
            if(arr[i]==need){
                return i;
            }

        }
        return -1;
    }
    function max(arr){
        var maxNum = Math.max.apply(null,arr);
        return maxNum;
    }
    function min(arr){
        var minNum = Math.min.apply(null,arr);
        return minNum;
    }
    function core() {
        var type = (
            /*@cc_on!@*/ 0 ? 'msie' :
            window.chrome ? 'chrome' :
                window.opera ? 'opera' :
                    window.MouseScrollEvent ? 'gecko' :
                        window.WheelEvent ? 'safari' : 'unknown'
            );
        var bor = {
        firefox : /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? +RegExp['\x241'] : undefined,
            ie  : /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || +RegExp['\x241']) : undefined,
        isGecko : /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent),
       isWebkit : /webkit/i.test(navigator.userAgent),
          opera : /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? +( RegExp["\x246"] || RegExp["\x242"] ) : undefined,
          safari:  /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent) ? +(RegExp['\x241'] || RegExp['\x242']) : undefined
        };

        return type;
    }

    function version(){  //输出浏览器版本信息
        var Sys = {}
            ,  ua = navigator.userAgent.toLowerCase()
            ,  s
            ,  result;
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
        if (Sys.ie) {
            result = 'ie ' + Sys.ie ;
        }else if (Sys.firefox){
            result ='firfox ' + Sys.firefox ;
        }else if (Sys.chrome){
            result = 'chrome ' + Sys.chrome ;
        }else if (Sys.opera){
            result ='opera ' + Sys.opera ;
        }else if (Sys.safari){
            result = 'safari ' + Sys.safari ;
        }else{
            result = 'other browser' ;
        }
        return result;
    }

   function delcooike(name, path, domain){//删除cookie
       document.cookie = name + "=" +
           ((path) ? "; path=" + path : "") +
           ((domain) ? "; domain=" + domain : "") +
           "; expires=Thu, 01-Jan-70 00:00:01 GMT";
   }
   function getcooike(name){//得到cookie
        var v = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
        return v ? decodeURIComponent(v[1]) : null;
   }
   function  setcooike(name, value ,expires, path, domain){//设置cookie
        var str = name + "=" + encodeURIComponent(value);
        if (expires != null || expires != '') {
            if (expires == 0) {expires = 100*365*24*60;}
            var exp = new Date();
            exp.setTime(exp.getTime() + expires*60*1000);
            str += "; expires=" + exp.toGMTString();
        }
        if (path) {str += "; path=" + path;}
        if (domain) {str += "; domain=" + domain;}
        document.cookie = str;
   }
   function datetoString(day,format){ //格式化日期
        if(typeof format == 'undefined'){
            format='yyyy-mm-dd';
        }
        var year = day.getFullYear();
        var month = day.getMonth()+1;
        var date = day.getDate();

        format = format.replace('yyyy',year);
        format = format.replace('mm',month);
        format = format.replace('dd',date);
        return format;
   }
})();
