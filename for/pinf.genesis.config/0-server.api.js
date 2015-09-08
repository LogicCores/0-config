
exports.spin = function (context) {
    
    const CCJSON = require("../../../../lib/ccjson").forLib(context.LIB);
    
    var Config = function () {
        var self = this;
        
        var ccjson = new CCJSON();

        ccjson.parseFile(
            context.getPath(),
            {
                env: function (name) {
                    var value = context.getEnv(name);
                    if (typeof value === "undefined") {
                        throw new Error("Environment variable '" + name + "' not set!");
                    }
                    return value;
                },
                on: {
                    fileNotFound: function (path) {

                        throw new Error("Config file not found: " + path);
                    }
                }
            }
        ).then(function (Config) {

            var config = new Config();
            
            return context.LIB.Promise.all(context.getBootInstances().map(function (instanceAlias) {

                return config.getInstance(instanceAlias).spin();
            }));
        });
    }

    return new Config(context);
}
