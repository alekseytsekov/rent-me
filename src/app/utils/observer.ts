let container = new Map();

const observer = {
    addFunc : function (funcName, func) {
        
        container.set(funcName, func);
    },
    getFunc : function (name) {
        if (container.has(name)) {
            return container.get(name);
        }

        return null;
    },
    executeFunc : function (funcName, ...rest) {
        if (container.has(funcName)) {
            let func = container.get(funcName);

            // console.log('exe func');
            // console.log(...rest);
            func(...rest);
        }
    }
};

export default observer;