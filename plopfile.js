module.exports = function (plop) {
    // controller generator
    plop.setGenerator('Container Component', {
        description: 'Container Component that manage the state.',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Container name please'
        }],
        actions: [{
            type: 'add',
            path: 'src/container-components/{{ dashCase name }}/{{ dashCase name}}.js',
            templateFile: 'plop-templates/container/container.js'
        },{
            type: 'add',
            path: 'src/container-components/{{ dashCase name }}/{{ dashCase name}}.scss',
            templateFile: 'plop-templates/container/container.scss'
        }]
    });
};