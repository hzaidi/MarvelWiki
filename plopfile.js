module.exports = function (plop) {
    // container component generator
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
        }]
	});

	// Presentation component generator
    plop.setGenerator('Presentation Component', {
        description: 'Presentation Component that manage the display only.',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Presentation component name please'
        }],
        actions: [{
            type: 'add',
            path: 'src/presentation-components/{{ dashCase name }}/{{ dashCase name}}.js',
            templateFile: 'plop-templates/presentation/presentation.js'
        }]
    });
};