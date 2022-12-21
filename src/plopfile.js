module.exports = (plop) => {
    plop.setGenerator('component', {
      description: 'Create a component',
      prompts: [
        {
          type: 'list',
          name: 'componentType',
          message: 'What type of component do you want to create?',
          choices: [
            'Component',
            'Screen'
          ]
        },
        {
          type: 'input',
          name: 'name',
          message: 'Component Name: '
        }
      ],
      actions: function (data) {
        const actions = []

        if (data.componentType === 'Component') {
          actions.push({
            type: 'addMany',
            destination: 'components/{{pascalCase name}}',
            templateFiles: 'plop-templates/*.hbs'
          })
        }  else if (data.componentType === 'Screen') {
          actions.push({
            type: 'addMany',
            destination: 'screens/{{pascalCase name}}',
            templateFiles: 'plop-templates/*.hbs'
          })
        }
        return actions
      }
    })
  }