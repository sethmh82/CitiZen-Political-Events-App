var Sequelize = require('sequelize')

 var myDB = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: process.env.DATABASEPATH
  });

var User = myDB.define('User', {
    username: {type: Sequelize.STRING,, unique: true, allowNull: false},
    passwordHASH: {type: Sequelize.STRING, allowNull: false},
    isAdmin: {type: Sequelize.BOOLEAN, defaultValue: false},
  },
  {
    timestamps: false,
  });

var Task = myDB.define('Task', {
    title: {type: Sequelize.STRING, allowNull: false},
    ticket: Sequelize.STRING,
    description: Sequelize.TEXT,
    endeAt: Sequelize.DATE
  },
  {
    timestamps: true,
  }
);

var Subtask = myDB.define('Subtask', {
  title: {type: Sequelize.STRING, allowNull: false},
  ticket: Sequelize.STRING,
  ended: {type: Sequelize.BOOLEAN, defaultValue: false},
  },
  {
    timestamps: false,
    getterMethods: {
      text: function () {
          return [this.ended ? '[X]' : '[ ]', this.title].join(' ');
      }
    }
  });

var State = myDB.define('State', {
  title: {type: Sequelize.STRING, allowNull: false},
  isTerminate: {type: Sequelize.BOOLEAN, defaultValue: false},
  weight: {type: Sequelize.INTEGER, defaultValue: 0},
  type: {type: Sequelize.STRING, defaultValue: "default"},
  },
  {
    timestamps: false,
  });

var Application = myDB.define('Application', {
  name: {type: Sequelize.STRING, allowNull: false},
  infos: {type: Sequelize.TEXT},
  weight: {type: Sequelize.INTEGER, defaultValue: 0},
  color: {type: Sequelize.STRING, defaultValue: "grey"},
  },
  {
    timestamps: false,
  });

Task.belongsTo(User, { as: 'Responsible' })
User.hasMany(Task, { as: 'Tasks' })

Task.belongsTo(State, { as: 'State' })
Etat.hasMany(Task, { as: 'Tasks' })

Task.belongsTo(Application, { as: 'Application' })
Application.hasMany(Task, { as: 'Tasks' })

Subtask.belongsTo(Task, { as: 'Task', foreignKey: 'TaskId' })
Task.hasMany(Subtask, { as: 'Subtasks', foreignKey: 'TaskId' })