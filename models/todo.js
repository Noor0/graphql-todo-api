module.exports = (sequelize, DataTypes) => {
	return sequelize.define("todo",{
		description:{
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				len: [1,200]
			}
		},
		status:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	});
};
