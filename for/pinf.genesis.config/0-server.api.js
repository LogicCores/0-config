
exports.spin = function (context) {

    return require("../../../../lib/ccjson").forLib(context.LIB).then(function (CCJSON) {

        var Config = function () {
            var self = this;

console.log("start config parse");

            CCJSON.parseFile(
                context.getPath(),
                {
                    env: function (name) {
                        var value = context.getEnv(name);
                        if (typeof value === "undefined") {
                            throw new Error("Environment variable '" + name + "' not set!");
                        }
                        return value;
                    }
                }
            ).then(function (Config) {

console.log("config", new Config());


            });
        }

        return new Config(context);
    });
}
