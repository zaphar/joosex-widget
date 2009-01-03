(function() {
    var t = new Test.TAP.Class();
    t.plan('no_plan');

    t.testSanity = function() {
        var self = this;
        self.is(typeof Joose, 'function',
            'The Joose Object is there');
        self.ok(JooseX.UI, 'the JooseX.UI namespace exists');
        self.ok(JooseX.UI.meta.meta.isa(Joose.Module),
            'the JooseX.UI namespace isa Joose.Module');
        self.ok(JooseX.UI.WidgetRole, 'the WidgetRole class exists');
        self.ok(JooseX.UI.WidgetRole.meta.meta.isa(Joose.Role),
            'the widget role class isa Joose.Role');
        self.ok(JooseX.UI.Util, 'the Util class exists');
        self.ok(JooseX.UI.Util.meta.meta.isa(Joose.Class),
            'the JooseX.UI.Util class isa Joose.Class');
    };

    t.testRoleImplements = function() {
        var self = this;
        var gclass;
        self.lives_ok(function() {
            gclass = Class('testValidClass', {
                does: JooseX.UI.WidgetRole,
                has: {},
                methods: {
                    buildIt: function() {}
                }
            });
        }, 'classes that implement a buildIt method can do the widget role');
        
        self.dies_ok(function() {
            Class('testInvalidClass', {
                does: JooseX.UI.WidgetRole,
                has: {},
                methods: {
                }
            });
        }, 'classes that dont implement a buildIt method can not do the widget role');
        
        self.diag(gclass.meta);
        self.ok(gclass.meta.does(JooseX.UI.WidgetRole),
            'the role is applied to the good class');
        var obj = new gclass();
        
        self.diag('testing the gettable attributes');
        var getList = ['IsDirty',
                      'MyParent',
                      'MyTop',
                      'PreSubmitHooks',
                      'SaveHook',
                      'UpdateHook',
                      'PreBuildHooks',
                      'PostBuildHooks'];

        for (attr in getList) {
            self.ok(obj['get'+getList[attr]],
                'the good class can get the '+getList[attr]+' attribute');
        }
       
        self.diag('testing the settable attributes');
        var setList = ['IsDirty',
                      'PreSubmitHooks',
                      'SaveHook',
                      'UpdateHook',
                      'PreBuildHooks',
                      'PostBuildHooks'];

        for (attr in setList) {
            self.ok(obj['set'+setList[attr]],
                'the good class can set the '+setList[attr]+' attribute');
        }
       
        self.diag('testing the methods');
        var methods = ['submit',
                       'update',
                       'bindChangeHandler',
                       'runPreBuildHooks',
                       'runPostBuildHooks'];
        for (meth in methods) {
            self.is(typeof obj[methods[meth]], 'function',
                'the '+methods[meth]+' method exists in the class');
        }

    }

    return t;
})();
