Module("JooseX.UI", function() {

    var util = Class("Util", {
        classMethods: {
            buildUUID:  function() {
                function S4() {
                    return (((1+Math.random())*0x10000)|0)
                        .toString(16)
                        .substring();
                };
                return (S4()+S4()+"-"
                    +S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
            }
        }
    });
    
    Role("WidgetRole", {
        requires: ['buildIt'],
        has: {
            isDirty: {
                is: 'rw',
                isa: TYPE.Bool,
                init: function() { return false }
            },
            myParent: {
                is: 'ro', 
                init: function() { return $(document.body); }
            },
            myTop:     {
                is: 'ro', 
                init: function() { return $('<div>'); }
            },
            preSubmitHooks: {
                is: 'rw',
                isa: TYPE.Array,
                init: function() { return [] }
            },
            saveHook:  {
                is: 'rw',
                isa: TYPE.Func,
                init: function() { 
                    return function(doc) { 
                        throw new Error('override me');
                    }; 
                }
            },
            updateHook: {
                is: 'rw',
                isa: TYPE.Func,
                init: function(doc) { 
                    return function() { 
                        throw new Error('override me');
                    }; 
                }
            },
            preBuildHooks:  {
                is: 'rw',
                isa: TYPE.Array,
                init: function() { return []; }
            },
            postBuildHooks: {
                is: 'rw',
                isa: TYPE.Array,
                init: function() { return []; }
            }
        },
        before: {
            buildIt: function() {
                var self = this;
                self.runPreBuildHooks();
            }
        },
        after: {
            buildIt: function() {
                var self = this;
                    self.runPostBuildHooks();
            }
        },
        methods: {
                submit: function() {
                    var self = this;
                    for (preHookIndex in self.getPreSubmitHooks()) {
                        self.getPreSubmitHooks()[preHookIndex]();
                    }
                    var hook = self.getSaveHook();
                    hook(self.getDoc());
                    self.setIsDirty(false);
                    return false;
                },
                update: function(doc) {
                    //TODO(jwall): handle the whole update case
                },
                bindChangeHandler: function(el, handler) {
                    var self = this;
                    el.bind('change', function() {
                        self.setIsDirty(true);
                        handler();
                    });
                },
                runPreBuildHooks: function() {
                    var self = this;
                    for (hookIndex in self.getPreBuildHooks()) {
                        self.getPreBuildHooks()[hookIndex]();
                    }
                },
                runPostBuildHooks: function() {
                    var self = this;
                    for (hookIndex in self.getPostBuildHooks()) {
                        self.getPostBuildHooks()[hookIndex]();
                    }
                },
        }
    });

});
