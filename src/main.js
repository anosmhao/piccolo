/**
 * Created by Zesa on 12/3/2016.
 */
var Piccolo = (function ($, me){

    me = me || {};

    //Private properts
    var _this = {

        /**
         * List of events in library
         */
        events: {
            onready: [],
            onimageready: [],
            onimageloaded: [],
            onimageuploaded: [],
            oncropstart: [],
            oncropend: [],
            onrotatestart: [],
            onrotateend: []
        }

    };


    /**
     * Default settings
     */
    me.settings = {
        imagesdirectory: '',
        uploadurl: '',
        postvariablename: '',
        multiplefileupload: false,
        debug: true
    };


    /**
     * Registers event listener
     * @param event
     * @param callback
     */
    me.on = function(event, callback){

        me.settings.debug && console.log('Registering event: ' + event);

        if(_.isFunction(callback)){

            me.settings.debug && console.log('Registered event: ' + event);

            event = (event.indexOf('on') == 0) ? event : 'on' + event;

            var callback_index = _this.events[event].indexOf(callback);
            callback_index || _this.events[event].push(callback);

        }else{

            me.settings.debug && console.log('Event callback invalid: ' + event);

        }

    };


    /**
     * Unregisters event listeners
     * @param event
     * @param callback
     */
    me.un = function(event, callback){

        me.settings.debug && console.log('Unregistering event: ' + event);
        
        if(_.isFunction(callback)){

            event = (event.indexOf('on') == 0) ? event : 'on' + event;

            var callback_index = _this.events[event].indexOf(callback);
            callback_index && _this.events[event].splice(callback_index, 1);

        }

    };


    /**
     * Raise event
     * @param event
     * @param evt
     */
    me.raise = function(event, evt){

        //Raise event on seperate thread
        _.defer(function(){

            me.settings.debug && console.log('Raising event: ' + event);

            _this.events[event] && _this.events[event].forEach(function(fxn){
                try{
                    fxn(evt);
                }catch(e){

                }
            });

        })

    };


    /**
     * Do preliminary setup here of dom and of script
     */
    $.fn.piccolo = function(options){

        me.settings.debug && console.log('Init Piccolo from jQuery');

        //Extend settings with options passed
        me.settings = $.extend(me.settings, options);

        //Create dropzone
        me.createDropzone(this);

        return this;        //Return object for chain

    };

    /**
     * Listen for image ready event to add canvas and menue
     */

    me.on('imageready', function(evt){

        console.log(evt);

    });


    return me;

}(jQuery, {}));